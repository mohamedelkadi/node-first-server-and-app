const config = require('../config.js');
var file = require('./files_loader.js');
var path = config.baseDir +'views/'
var header = file.load('header.html',path);
var footer = file.load('footer.html',path);
var partials = [];
var _before ='';
var _after = '';
function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function render(view,data){
  if(view) partial(view,data);
  var content = '';
  for( var part in partials){
      content += partials[part];
  }
  content = _before + content + _after ;
  _before = '';
  _after ='';
  partials = [];
  return header.toString() + content + footer.toString();
}

function partial(view,dataArr){
  var t_content =file.load(view+'.html',path);
  t_content = t_content.toString();
  var content = '';
  var output = '';

  if(!Array.isArray(dataArr)){
      dataArr = [dataArr];
  }    
  dataArr.forEach( function (data,k){
    data = data || [];
    content = t_content;
    for(var key in data){
        content = replaceAll(content,'{{'+key+'}}',data[key]);
  }
   output += content ;
  }
  );
  partials.push(output);
 return this;
}
function before(_html){
    _before = _html 
    return this;
}
function after(_html){
    _after = _html
    return this;

}
exports.render = render;
exports.partial = partial;
exports.before= before;
exports.after= after;


