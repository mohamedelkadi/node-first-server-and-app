const config = require('../config.js');
var file = require('./files_loader.js');
var path = config.baseDir +'views/'
var header = file.load('header.html',path);
var footer = file.load('footer.html',path);
var partials = [];

function render(view,data){
  var content = '';
  for( var part in partials){
      content += partials;
  }
  partials = [];
  return header + content + footer;
}

function partial(view,dataArr){
  var t_content =file.load(view+'.html',path);
  var content = '';
  var output = '';

  if(!Array.isArray(dataArr)){
      dataArr = [dataArr];
  }    
  dataArr.forEach( function (data,k){
    data = data || [];
    content = t_content;
    for(var key in data){
        content = content.replace('{{'+key+'}}',data[key]);
  }
   output += content ;
  }
  );
  partials.push(output);
 return this;
}

exports.render = render;
exports.partial = partial;
