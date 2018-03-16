var path = require("path");

//log root dir
var baseLogPath = path.resolve(__dirname, '../logs');

//error log dir
var errorPath = "/error";
//error log filename
var errorFileName = "error";
//error log full pass
var errorLogPath = baseLogPath + errorPath + "/"  + errorFileName;


//response log dir
var responsePath = "/reponse";
var responseFileName = "response";
var responseLogPath = baseLogPath + responsePath + "/" + responseFileName;

module.exports = {
    "appenders":
    {
        //error logs
        "out":
        {
            "type": "console"
        },
        "errorLogger":
        {
            "type": "dateFile",
            "filename": errorLogPath,
            "encoding": "utf-8",
            "alwaysIncludePattern": true,
            "pattern": "-yyyy-MM-dd-hh.log",
            "path": errorPath
        },
        //response logs
        "resLogger":
        {
            "type": "dateFile",
            "filename": responseLogPath,
            "encoding": "utf-8",
            "alwaysIncludePattern": true,
            "pattern": "-yyyy-MM-dd-hh.log",
            "path": responsePath
        }
    },
    "categories":
    {
        "default":
        {
            "appenders":["out"],
            "level": "info"
        },
        "errorLogger":
        {
            "appenders":["errorLogger"],
            "level": "error"
        },
        "resLogger":
        {
            "appenders":["resLogger"],
            "level": "info"
        }
    }
}
