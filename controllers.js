const loader = require('./libs/files_loader.js');
const DB = require('./libs/database.js').get_db; 
const Template = require('./libs/template_engine.js'); 
const logger = require('./libs/logger.js').logger;
const Promise = require('promise');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var SESSIONS = require('./app.js').SESSIONS;
function formData(req){
    var querystring = require('querystring');
    
    var body = "";
    req.on('data', function (chunk) {
        body += chunk;
        });
    req.on('end', function () {
        body = querystring.parse(body);
        eventEmitter.emit("form_data",body);
      });  
};

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
         var data = Template.partial('home').render();
         res(data,200);
        
    },
    authed: function(res){
        var data =[];
        var dateFormat = require('dateformat');  

         var users = SESSIONS.each(function(k,v){
            data.push({
                "user":k,
                 "date":dateFormat(v,'isoDateTime')
            });
        });
         var page = Template.before("<h1>you are in your page</h1>")
         .partial('authed',data)
         .render();
         res(page,200);
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
            if(err) res("database error",500);
            var out = Template
            .partial('users_head')
            .partial('users',data)
            .after('</table>').render();
            res(out,200);
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
        var page = Template.render('new_user');
        res(page,200);
    },
    /*
    name :show
    params:res,params
    description:show one user information  
    author:mohammed 
    */
    show : function(res,params){
        users.find(params)
        .then(
            function(data){
                var out = Template.partial('users',data).render();
                res(out,200);
            }, function(err){
                logger(show).error(err).log();
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
    name :edit
    params:res,params
    description:show edit form with user data
    author:mohammed 
    */
    edit : function(res,params){
        users.find(params).then(
        function(data){
           var page = Template.partial('update_user',data).render();
           res(page,200);
        }
        ,function(err){
            logger(update).error(err).log();
        })
    },
    /*
    name :update
    params:res,params
    description:update one user information  
    author:mohammed 
    */
    update : function(res,params,req){

        formData(req);
        eventEmitter.on('form_data',function(body){
            DB().users.update(params,{"$set":body},function(err){
                if(err)
                    return res(err,500);
                res(false,303,{'Location': '/users'});
            });
        });
        
  },
    /*
    name :store
    params:res
    description:store user info in the database 
    author:mohammed 
    */
    store : function(res,params,req){
    formData(req);
    eventEmitter.on('form_data',function(body){
        DB().users.insert(body,function(err){
            if(err)
                return res(err,500);
            res(false,303,{'Location':'/users'});
        }); 
    })

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
/*Sesstion controller*/
const sessions ={
    create:function(res){
        var page = Template.render('login');
        res(page,200);
    },
    store:function(res,params,req){
        formData(req);
        eventEmitter.on('form_data',function(data){
            logger(sessions.store).trace(JSON.stringify(data)).log();
            if(data['password'])
            DB().users.count(data,function(err,cnt){
                if(cnt > 0)
                {    
                 SESSIONS.add(data.name);
                res(data.name+"loged",200);
                }
                else 
                res("wrong",200);
            });
            else
                res("no password",200);
        })
    },
    destroy:function(){}
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
         res(data);
      }catch(e){
        res(data.toString());

          }
    }
}
module.exports.sessions = sessions;
module.exports.pages = pages; 
module.exports.static = static;
module.exports.users = users;