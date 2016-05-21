const rules = {
    "/":{
        get:"pages.home",
    },
    "/authed":{
        get:"pages.authed" 
    },
    '/users':{
        get:'users.index'
    },
    '/users/new':{
        get:'users.create',
        post: 'users.store'
    },
    '/users/{name}':{
        get:'users.show',
        delete:'users.delete'
    },
    '/users/edit/{name}':{
        get:'users.edit',
        post:'users.update'

    },
    '/login':{
        get:'sessions.create',
        post:'sessions.store'
    },
    '/sessions/destroy/{name}':{
        get:'sessions.destroy'
    },
    '/sessions/clear':{
        get: 'sessions.clear'
    }
}



module.exports.rules = rules ;