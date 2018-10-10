var Koa=require('koa');
var router = require('koa-router')();
var path=require('path');
const render = require('koa-art-template');
var  static = require('koa-static');
var  session = require('koa-session');
var  bodyParser = require('koa-bodyparser');


//实例化Koa
var app = new Koa();

//配置模板引擎
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

//配置session
app.keys = ['mynode.com cms'];
const CONFIG = {
    key: 'mynode.koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 3600000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  };
  app.use(session(CONFIG, app));

//配置静态文件 通过中间件
app.use(static(__dirname+'/public'));

//配置解析
app.use(bodyParser());

// 路由配置
var admin=require('./routes/admin.js');
router.use('/admin',admin);
app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());


//启动服务器
app.listen(5000);
