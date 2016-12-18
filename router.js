const logger = require('./libs/logger.js').logger;

/*
name :writeHead
params:params 
description:choose the head content based on the ext  
author:mohammed 
*/
//add useless comment 
function writeHeadStatic(res,ext){
  //static files with no errors
  var type = 'text/html';
  if(['.jpg','.jpeg'].indexOf(ext)>-1){
      type = 'image/jpeg';
  }else if(ext == '.css'){
      type='text/css';
  }else if(ext == '.js'){
      type ='application/javascript';
  }

  res.writeHead(200,  {
        'Content-type':type
  });
}

function responder(res,ext){
    var default_type = {
        'Content-type':'text/html'};
  return function(msg,code,type){
      var type = type || default_type;
          if(code == undefined)
          {   writeHeadStatic(res,ext);
              res.end(msg);
          }
          else if(code == 404)
          {
              res.writeHead(404,type);
              res.end("404 Not found");
          }
          else
          {
             res.writeHead(code,type);
             if(msg)
             res.end(msg);
             else
             res.end();
          }
  }
}


/*
name :toWhere
params:params 
return:{controller,method,params}
description:decide which controller will response to the request  
author:mohammed 
*/

function toWhere(req_params) {
 var path = req_params.path;
 var ext = req_params.ext;
 var url_params = req_params.params;
 var routing = require('./routing.js');
 var rules = routing.rules;

    
 //need enhanacement [search controllers then static files , then not found]
if(ext == ''){
    for (var key in url_params){
        path +='/{'+key+'}'
    }
    if(rules.hasOwnProperty(path)){
        var target = rules[path][req_params.method.toLowerCase()].split('.');
        var method = target[1];
        var controller = target[0];
    return {
         'controller': controller,
         'method' : method,
         'params' : url_params,  
          'ext': ext
     }     
     }else{
         return false
     }
 }else {
    return {
         'controller': 'static',
         'method' : 'fetch',
         'params' : path ,
         'ext':ext
     }   
 }

}

/*
name :parser
params:request 
return:{path,method,extention}
description:parse the request to extract the needed info 
author:mohammed 
*/

function parser(req){
 var querystring = require('querystring');
 var url =  require('url');
 var pathmod = require('path');
 var method = req.method;
 var parsed_url = url.parse(req.url);
 var path = parsed_url.pathname;
 var query =parsed_url.query; 
 var ext = pathmod.extname(path);
    
 return {
     path : path,
     method : method,
     ext : ext,
     params:querystring.parse(query) 
 }
 
}

/*
name :exec
params:executers,res,req 
description:execute the function in the controller and get the respose 
author:mohammed 
*/

function exec(executers,res,req){
    var controllers = require('./controllers.js');
    var controller = executers['controller'];
    var method = executers['method'];
     controllers[controller][method](res,executers.params,req);
}

/*
name :route 
params:request,response 
description:route the request to responder 
author:mohammed 
*/

function route (req , res){
    var info = parser(req);
    logger(route).debug(JSON.stringify(info)).log();
    var executers = toWhere(info);
    if(executers){
        exec(executers,responder(res,info.ext),req);
    }else {
        res.writeHead(404,{
        'Content-type':'text/html'
        });
        res.end("Not found");

    }
}
module.exports.route = route ;
