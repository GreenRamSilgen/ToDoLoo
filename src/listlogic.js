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
        run:function(){
            console.log(storageCtrl.checkStorageFor("lel"));
        }
    }
})(storageController);


export{
    listController
}