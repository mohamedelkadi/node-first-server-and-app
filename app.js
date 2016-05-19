const http = require('http');
const router = require('./router.js');
const logger = require('./libs/logger.js').logger;

/*methods*/
function handeler(req,res){
    logger(handeler)
    .request()
    .trace("the handeler start working")
    .log();
    router.route(req,res);
}



/*Start the server*/
const server = http.createServer(handeler);
server.on('error', function(err, socket){
    console.error("can not start the server on this port");
});

server.listen(8081);
console.log("server started at 8081");