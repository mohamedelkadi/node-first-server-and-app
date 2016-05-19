const loader = require('./libs/files_loader.js');
const  DB = require('./libs/database.js').get_db; 
const View = require('./libs/view.js');
const Template = require('./libs/template_engine.js'); 
/* Pages controller */

const pages = {
    home : function(res){
         //var page = Template.render('home');
         var part = Template.partial('home').render();
        res.end(part);
        
    }
}

/*Users controller */

const users = {
    index : function(res){
        DB().users.find(function(err,data){
            if(err) res.end("database error");
            DB().close();
            var out = Template.partial('users',data).render();
            res.end(out);
            return;
        });
    },
    create : function(res){
        var data = View.render('new_user');
        res.end(data);
    },
    store : function(res,params,req){
    var querystring = require('querystring');

    var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    body = querystring.parse(body);
    res.writeHead(200);
    res.end(JSON.stringify(body));
      DB.users.insert(body,function(err){
          console.log(err);
      });
  });
    }
}

/*Static controller*/

const static = {
    fetch: function(res,file){
      var data = loader.load(file);
      res.end(data);
    }
}
module.exports.pages = pages; 
module.exports.static = static;
module.exports.users = users;