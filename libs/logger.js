var config = require('../config.js');
var logLevel = config.config("logLevel");
var colors = require('colors');
var color = {
    'error':'red',
    'trace':'blue',
    'warning':'green',
    'request':'magenta',
    'debug':'yellow'
}
function writeLog(logger)
{
    var fs = require('fs');
    var dateFormat = require('dateformat');  
    var date = dateFormat(Date.now(),'isoDateTime');
    var output = "";
    var sep = '============= '+ date +'  @'+(logger.caller.name || 'main')+' =============='
    output += sep +'\n'
     logger.logMsg.forEach(function(obj,k){
         for(var key in obj ){
             var msg = ' [ ' + key + ' ] -> ' + obj[key];
             output += msg + '\n';
             console.log(msg[color[key]]);
         }
     });
     output += "=====================================================\n";
    
    fs.open('log.txt','a',function(err,fd){
        if(err) return console.error(err);
        try{
            var stats = fs.statSync("log.txt");
            var fileSizeInKb = stats["size"]/1000;
            if(fileSizeInKb > 50){
                fs.renameSync('log.txt', Date.now()+'_'+'log.txt')
            }
        }catch(e){
            logger.init("open").error(e).log();
        }
        fs.write(fd,output,0,'utf-8',function(err){
            if(err)console.log(err);
        })
    });

}

var logger = {
caller :{},
logMsg :[]
,
init:function(func){
    logger.caller = func;
    logger.logMsg = [];
    return logger;
},
    /*
        log the request information 
    */
request:function(){
    var url = require('url');
    var param = logger.caller.arguments[0];
    if(param.constructor.name == 'IncomingMessage'){
        var request = param; 
        var method = request.method;
        var query = url.parse(request.url).query; 
        var ip =  request.connection.remoteAddress; 
        logger.logMsg.push({
        "request":" Method : "+method+" - Ip : "+
            ip+" - url: "
            +(url.parse(request.url).pathname || '')
            +" - Query: "+(query || '')
        });
    }
  return logger;
},
    /*
      write the logged info 
    */
log:function (request){
    writeLog(logger);
},
trace:function(msg){
    if(logLevel >= 4)
    logger.logMsg.push({
        "trace":msg
    })
    return logger;
},
    /*
      write debug massege 
    */
debug:function(msg){
    if(logLevel >= 3)
    logger.logMsg.push({
        "debug":msg
    })
    return logger;
},
   /*
      write error massege 
   */    
error:function(msg){
    if(logLevel > 0)
    logger.logMsg.push({
        "error":msg
    })
    return logger;
},
/* 
    write warning massege 
*/
warning: function(msg){
    if(logLevel >= 2)
    logger.logMsg.push({
        "warning":msg
    })
    return logger;
},

}
exports.logger = logger.init;

//trace 