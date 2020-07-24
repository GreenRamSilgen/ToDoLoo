//ToDo Individual item creator
let TodoItem = (checked=false, msg="...") =>{
    return {
        checked,
        msg
    }
}

let storageController = (function(){
    function checkStorageFor(item){
        return (window.localStorage.getItem(item)) ? true : false;
    }
    function storeBigCards(item){
    }
    return{
        checkStorageFor
    }
})();

let listController = (function(storageCtrl){
    let bigList = [];
    let bigListNames = [];
    return{
        addEmptyTodo:function(name){
            bigList.push([]);
            bigListNames.push(name);
            return bigListNames.length-1;
        },
        getBigLists: function(){
            return bigList
        },
        removeBigList:function(id){
            //id is index  in biglist
            console.log(bigListNames);
            bigList.splice(id,1,null);
            bigListNames.splice(id,1,null);
            console.log(bigListNames);
        },
        run:function(){
            console.log(storageCtrl.checkStorageFor("lel"));
        }
    }
})(storageController);


export{
    listController
}