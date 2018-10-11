

const router = require('koa-router')();

router.get('/', async (ctx) => {
    await ctx.render('admin/user/list');
});


module.exports = router.routes();    