var log4js = require("log4js");

var log_config = require("../config/log_config");

// load log config file
log4js.configure(log_config);

var logUtil = {};

var errorLogger = log4js.getLogger('errorLogger');
var resLogger = log4js.getLogger('resLogger');

//encapsulate error logs
logUtil.logError = (ctx, error, resTime) => {
    if (ctx && error) {
        errorLogger.error(formatError(ctx, error, resTime));
    }
};

//encapsulate response logs
logUtil.logResponse = (ctx, resTime) => {
    if (ctx) {
        resLogger.info(formatRes(ctx, resTime));
    }
};

//format response logs
var formatRes = (ctx, resTime) => {
    var logText = new String();

    //start of log
    logText += "\n" + "*************** response log start ***************" + "\n";

    //add request info
    logText += formatReqLog(ctx.request, resTime);

    //add status code
    logText += "response status: " + ctx.status + "\n";

    //add request body
    logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";

    //end of log
    logText += "*************** response log end ***************" + "\n";

    return logText;
};


var formatError = (ctx, err, resTime) => {
    var logText = new String();

    //start of error log
    logText += "\n" + "*************** error log start ***************" + "\n";

    //add error log info
    logText += formatReqLog(ctx.request, resTime);

    //add error name
    logText += "err name: " + err.name + "\n";
    //add error info
    logText += "err message: " + err.message + "\n";
    //add error detail
    logText += "err stack: " + err.stack + "\n";

    //end of error
    logText += "*************** error log end ***************" + "\n";

    return logText;
};

var formatReqLog = (req, resTime) => {
    var logText = new String();
    var method = req.method;

    //request methods
    logText += "request method: " + method + "\n";

    logText += "request originalUrl: " + req.originalUrl + "\n";

    logText += "request ip: " + req.ip + "\n";

    // var startTime;

    if (method === 'GET') {
        logText += "request query: " + JSON.stringify(req.query) + "\n";
        // startTime = req.query.requestStartTime;
    } else {
        logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
        // startTime = req.body.requestStartTime;
    }
    return logText;
};

module.exports = logUtil;
