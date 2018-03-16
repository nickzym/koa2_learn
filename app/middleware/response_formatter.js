var response_formatter = async ctx => {
    if (ctx.body) {
        ctx.body = {
            code: 0,
            message: 'success',
            data: ctx.body
        }
    } else {
        ctx.body = {
            code: 0,
            message: 'success'
        }
    }
}

var url_filter = pattern => {
    return async (ctx, next) => {
        var reg = new RegExp(pattern);

        //go first execute router funct
        await next();

        if(reg.test(ctx.originalUrl)) {
            response_formatter(ctx);
        }
    }
}
module.exports = url_filter;
