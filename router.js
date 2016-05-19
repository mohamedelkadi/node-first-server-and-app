
//take the path and return the contoller and function to reqponse 

function toWhere(params) {
 var path = params.path;
 var type = params.ext;
 var routing = require('./routing.js');
 var rules = routing.rules;
 var static = routing.static;
 console.log("routing rules: \n ",rules);
 console.log("routing params: \n ",params);
 
if(type == ''){ 
    if(rules.hasOwnProperty(path)){
        var target = rules[path][params.method.toLowerCase()].split('.');
        var method = target[1];
        var controller = target[0];
    return {
         'controller': controller,
         'method' : method
     }     
     }else{
         return false
     }
 }else {
    return {
         'controller': 'static',
         'method' : 'fetch',
         'params' : path  
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
 var url =  require('url');
 var pathmod = require('path');
 var method = req.method;
 var path = url.parse(req.url).path;
 var ext = pathmod.extname(path);
    
 return {
     path : path,
     method : method,
     ext : ext 
 }
 
}

// execute the function nedded 

function exec(executers,res,req){
    console.log("executing \n ",executers,"\n");
    var controllers = require('./controllers.js');
    var controller = executers['controller'];
    var method = executers['method'];
    return controllers[controller][method](res,executers.params,req);
}

//take the request and give the response 
function route (req , res){
    var info = parser(req);
    var executers = toWhere(info);
    if(executers){
        res.writeHead(200,{
        'Content-type':'text/html'
        });
        exec(executers,res,req);
    }else {
        res.writeHead(404,{
        'Content-type':'text/html'
        });
        res.end("Not found");

    }
}
module.exports.route = route ;