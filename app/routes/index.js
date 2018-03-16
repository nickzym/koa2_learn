var router = require("koa-router")();
var user_router = require("./user_router");

router.use('/user', user_router.routes(), user_router.allowedMethods());

module.exports = router;
