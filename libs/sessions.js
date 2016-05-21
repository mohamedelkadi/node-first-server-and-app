var MemoryArr = require('./memory_array.js').MemoryArr;
var SESSIONS = Object.create(MemoryArr);
SESSIONS.exists = function(key){
    if(this[key])
        return true;
    else 
        return false;
}

SESSIONS.add = function(key){
    this[key] = Date.now();
}

exports.SESSIONS = SESSIONS;