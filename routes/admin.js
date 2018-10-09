

var router = require('koa-router')();
var login = require('./login/login.js');


router.use('/login',login);


router.get('/',(ctx)=>{
    ctx.body = 'hello world';
 })

 module.exports = router.routes();