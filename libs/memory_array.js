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
    },
    each: function(func){
        for(key in this){
            if(typeof this[key] != 'function')
                func(key , this[key]);
        }
    },
    all:function(){
        var arr ={} 
       for(key in this){
           if(typeof this[key] != 'function')
               arr[key] = this[key];
        } 
        return arr;
    }
}

exports.MemoryArr = MemoryArr;