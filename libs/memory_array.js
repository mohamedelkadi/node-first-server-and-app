var MemoryArr = {
    add:function(key,value){
        this[key] = value;
    },
    remove:function(key){
        delete(this.key)
    },
    clear:function(){
     for(key in this){
         if(typeof this[key] != 'function')
         delete(this[key]);
     }   
    }
    
}

exports.MemoryArr = MemoryArr;