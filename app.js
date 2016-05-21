const http = require('http');
const router = require('./router.js');
const logger = require('./libs/logger.js').logger;
const config = require('./config').config;
var SESSIONS = require('./libs/sessions.js').SESSIONS;

/*
name :handeler
params:request,response 
description:handel server request and response 
author:mohammed 
*/

function handeler(req,res){
    logger(handeler)
    .request()
    .trace("the handeler start working")
    .log();
    router.route(req,res);
}


/*
name :handeler
params:request,response 
description:handel server request and response 
author:mohammed 
*/

const server = http.createServer(handeler);
server.on('error', function(err, socket){
    console.error("can not start the server on this port");
});
var port = config("port");
server.listen(port);
logger(server).trace("server started on "+ port).log();

module.exports.SESSIONS = SESSIONS;