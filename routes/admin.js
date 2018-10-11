

var router = require('koa-router')();
var login = require('./login/login.js');
var user = require('./user/user.js');
var url=require('url');

// router.use((ctx,next)=> {
//     ctx.state.__HOST__='http://'+ ctx.request.header.host;
//     console.log(ctx.request.url);
//     next();
// });



//配置中间件 获取url的地址
router.use(async (ctx,next)=>{
    //模板引擎配置全局的变量
    ctx.state.__HOST__='http://' + ctx.request.header.host;
    // console.log('dddddddddd',ctx.request.url);  //   /admin/user

    //  /admin/login/code?t=709.0399997523431
    var pathname=url.parse(ctx.request.url).pathname;

    //权限判断
    if(ctx.session.userinfo){
        await  next();
    } else{  //没有登录跳转到登录页面
        if(pathname=='/admin/login' || pathname=='/admin/login/doLogin'  || pathname=='/admin/login/code'){
            await  next();
        }else{//没等来且不是登录等界面 重定向到登录界面
            ctx.redirect('/admin/login');
        }
    }
})


router.get('/',async (ctx)=>{
    ctx.render('admin/index');
 })

 router.use('/login',login);
 router.use('/user',user);

 module.exports = router.routes();