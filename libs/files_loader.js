var fs = require('fs');
const static_dir = '/home/molhm/Lab/code/server/static';
function load(path,dir) {
    var abs_path  = (dir||static_dir) + path;
    try{
        return fs.readFileSync(abs_path);
    }catch(e){
        console.log(e);
        return e;
    }
}

module.exports.load = load;