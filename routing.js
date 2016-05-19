const rules = {
    "/":{
        get:"pages.home",
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
        post:'users.update',
        delete:'users.delete'
    }
    
}



module.exports.rules = rules ;