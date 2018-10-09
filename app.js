var Koa=require('koa');
var router = require('koa-router')();
var path=require('path');
const render = require('koa-art-template');
var  static = require('koa-static');
// var  session = require('koa-session');
// var  bodyParser = require('koa-bodyparser');


//实例化Koa
var app = new Koa();

//配置模板引擎
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

//配置静态文件 通过中间件
app.use(static(__dirname+'/public'));

// 路由配置
var admin=require('./routes/admin.js');
router.use('/admin',admin);
app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());


//启动服务器
app.listen(5000);
