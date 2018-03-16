//get a user
exports.getUser = async (ctx, next) => {
    ctx.body = {
        username: 'nick',
        age: 24
    }
}

//register a user
exports.registerUser = async (ctx, next) => {
    console.log('registerUser', ctx.request.body);
}
