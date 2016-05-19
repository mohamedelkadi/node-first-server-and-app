const loader = require('./libs/files_loader.js');
const DB = require('./libs/database.js').get_db; 
const View = require('./libs/view.js');
const Template = require('./libs/template_engine.js'); 
const logger = require('./libs/logger.js').logger;
const Promise = require('promise');
/* Pages controller */

const pages = {
    /*
    name :home
    params:res
    description:show home page conten
    author:mohammed 
    */

    home : function(res){
         //var page = Template.render('home');
         var part = Template.partial('home').render();
        res.end(part);
        
    }
}

/*Users controller */

const users = {
    /*
    name :index
    params:res
    description:show list all users page contents
    author:mohammed 
    */
    index : function(res){
        DB().users.find(function(err,data){
            if(err) res.end("database error");
            var out = Template.partial('users',data).render();
            res.end(out);
            return;
        });
    },
    /*
    name :create
    params:res
    description:show add new user form 
    author:mohammed 
    */
    create : function(res){
        var data = View.render('new_user');
        res.end(data);
    },
    /*
    name :show
    params:res,params
    description:show one user information  
    author:mohammed 
    */
    show : function(res,params){
        var promiseByData = users.find(params);
        promiseByData.then(
            function resolve(data){
                var out = Template.partial('users',data).render();
                res.end(out);
            }
        );
        
    },
    /*
    name :delte
    params:res,params
    description:delete one user from database 
    author:mohammed 
    */
    delete: function(res,params){
        DB().users.remove(params,function(err){
            logger(this).error(err).log();
        });
    },
    /*
    name :update
    params:res,params
    description:update one user information  
    author:mohammed 
    */
    update : function(res,params){
        var user = DB().users.find(params,function(err,data){
        var out = Template.partial('users',data).render();
        res.end(out);
        });
    },
    /*
    name :store
    params:res
    description:store user info in the database 
    author:mohammed 
    */
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
      DB().users.insert(body,function(err){
          console.log(err);
      });
  });
    },
  find : function(params){
      return new Promise(function(resolve,reject){
        var user = DB().users.find(params,function(err,data){
            if(err) reject(err);
            else resolve(data);
      });
        
  });
  }
}
/*Static controller*/

const static = {
    /*
    name :fetch
    params:res
    description:get the static file and fetch it 
    author:mohammed 
    */
    fetch: function(res,file){
      var data = loader.load(file);
      try {
         res.end(data);
      }catch(e){
        res.end(data.toString());

          }
    }
}
module.exports.pages = pages; 
module.exports.static = static;
module.exports.users = users;