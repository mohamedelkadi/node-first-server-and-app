var get_db = function(){
    var db = undefined;
function get_db() {

    //    var mongodb = require('mongodb')
    var mongojs = require('mongojs')
    var theDb ='server';
    db = mongojs(theDb, ['users'])

    return db;
}
return get_db
}();


module.exports.get_db = get_db;