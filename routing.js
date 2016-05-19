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
    }
    
}



module.exports.rules = rules ;