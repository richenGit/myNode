
// 登录页面路由

const router = require('koa-router')();
var DB = require('../../module/db.js');

// 登录界面
router.get('/', async (ctx) => {
    ctx.session.code = '1234';
    var result= await DB.find('user',{});
    await ctx.render('admin/login');
});

// 登录提交路由
router.post('/doLogin', async (ctx) => {
    //1、验证用户名密码是否合法

    //2、去数据库匹配

    //3、成功以后把用户信息写入sessoin
    let username=ctx.request.body.username;

    let password=ctx.request.body.password;

    let code=ctx.request.body.code + '';
    console.log('code',code);
    if (code.toLocaleLowerCase()==ctx.session.code.toLocaleLowerCase()) {
        ctx.session.userinfo = 'richen';
        ctx.redirect(ctx.state.__HOST__+'/admin');
    } else {
        await ctx.render('admin/error',{
            message:'验证码错误',
            redirect: ctx.state.__HOST__+'/admin/login'
        })
    }
});


module.exports = router.routes();