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

let listController = (function(){
    let bigList = [];
    let bigListNames = [];
    return{
        addEmptyTodo:function(name){
            bigList.push([]);
            bigListNames.push(name);
            return bigListNames.length-1;
        },
        //BIG LIST
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

        //TASKS
        addTask: function({id,input}){
            bigList[id].push(TodoItem(false,input.value));
            return bigList[id].length-1;
        },
        removeTask:function({id,itemId}){
            bigList[id].splice(itemId,1);
        },
    }
})();


export{
    listController,
    storageController
}