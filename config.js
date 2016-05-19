var logger = require('./libs/logger.js').logger;
var parseString = require('xml2js').parseString;
var config = {};
var baseDir = '/home/molhm/Lab/code/server/';
var loaded = false; 

function load(){
 var fs = require('fs');
 var  xml = fs.readFileSync(baseDir + 'config.xml').toString()
parseString(xml , function(e,r){
    if(e)return logger(parseString).error(e);
    config = r;
    loaded = true;
})
}

function getConfig(prob){
    if(loaded){
        if(config.hasOwnProperty(prob))
        return config[prob];
    }

}

load();
exports.config = getConfig;
exports.baseDir = baseDir;