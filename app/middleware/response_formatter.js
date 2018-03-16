var ApiError = require("../error/ApiError");

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
        try {
            await next();
        } catch (err) {
            // deal with all excecption here happend in routes or middlewares
            if (err instance of ApiError && reg.test(ctx.originalUrl)) {
                ctx.status = 200;
                ctx.body = {
                    code: error.code,
                    message: error.message
                }
            }
            //continue throw error for log to cacth
            throw err;
        }

        if(reg.test(ctx.originalUrl)) {
            response_formatter(ctx);
        }
    }
}
module.exports = url_filter;
