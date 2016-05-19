var mongojs = require('mongojs');
var config = require('../config.js').config;
var get_db = function(){
  var theDb =config('database');
  var db = mongojs(theDb, ['users']);
    return function(){
        return db ;
    }
    
}();

module.exports.get_db = get_db;