const loader = require('./files_loader.js');
const view_dir = '/home/molhm/Lab/code/server/views/';

function render(view){
    return loader.load(  view + '.html',view_dir);
}

exports.render = render;