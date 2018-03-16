const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
// const logger = require('koa-logger')
const logUtil = require("./utils/log_util");

const router = require('./app/routes/index');

const api = require("./app/routes");
const response_formatter = require("./app/middleware/response_formatter");


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())

// app.use(logger()) use my logger instead
app.use(async (ctx, next) => {
    const start = new Date();
    var ms;
    try {
        await next();
        ms = new Date() - start;

        logUtil.logResponse(ctx, ms);
    } catch (error) {
        ms = new Date() - start;
        logUtil.logError(ctx, error, ms);
    }
})

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// add middlewares
app.use(response_formatter('^/user'));

// routes
app.use(router.routes(), router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


module.exports = app
