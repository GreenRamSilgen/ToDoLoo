let storageController = (function(){
    return{
        getStoredList: function(name){
            return window.localStorage.getItem(name);
        },
        storeList:function({name,list}){
            window.localStorage.setItem(name,JSON.stringify(list));
        }
    }
})();


export{
    storageController
}