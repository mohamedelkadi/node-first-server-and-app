var MemoryArr = require('./memory_array.js').MemoryArr;
var SESSION = Object.create(MemoryArr);
SESSION.exists = function(key){
    if(this[key])
        return true;
    else 
        return false;
}

exports.SESSION = SESSION;