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
        delete:'users.delete'
    },
    '/users/edit/{name}':{
        get:'users.edit',
        post:'users.update'

    }
    
}



module.exports.rules = rules ;