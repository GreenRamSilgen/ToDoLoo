import {
    UIController
} from './uiControl'
import {
    listController,
    storageController
} from './listlogic'

//TODO: MAKE ADD ITEM BUTTON FUNCTIONAL FOR EACH LIST
//TODO: UI AND LOGIC NEED TO BE UPDATED AT SAME TIME





let MainController = (function (UICtrl, LogicCtrl, StoreCtrl) {
    let DOMStrings = UICtrl.getDOMStrings();



    //!NEW LIST MAKER
    //popup the menu when user clicks New List Button
    let newToDoBtn = UICtrl.getNewTodoButton();
    newToDoBtn.addEventListener('click', UICtrl.newListToggle);

    //ONSubmit with info create new ToDoList
    let userIn = document.querySelector("#userInput");
    userIn.onsubmit = function (e) {
        e.preventDefault();
        //addBookToLibrary(new Book(userIn.title.value, userIn.author.value, userIn.pages.value, userIn.read.checked));

        //in logic side add a new empty list to the bigList array
        let id = LogicCtrl.addEmptyTodo(userIn.title.value);
        //in the UI side update visual
        let newCard = UICtrl.renderEmptyList(userIn.title.value, id);
        UICtrl.newListToggle();

        // * ADD FUNCTIONALITY TO CARD'S CLOSE BUTTON
        newCard.firstChild.lastChild.addEventListener('click', () => {
            LogicCtrl.removeBigList(id);
            UICtrl.removeBigList(newCard);
        })

        //!TASK ADDER for List

        //add eventlistener for each list's add button
        newCard.lastChild.lastChild.addEventListener('click', () => {
            let input = newCard.lastChild.firstChild.value;
            console.log(newCard.lastChild.firstChild.value);

            //TODO IMPLEMENT TASK UI AND LOGIC ON ADD
            let itemId = LogicCtrl.addTask({
                id,
                input
            });
            let cBody = newCard.firstChild.nextSibling;
            let newItem = UICtrl.addTask({
                cBody,
                input,
                itemId
            });
            newItem.removeItem.addEventListener('click', () => {
                UICtrl.removeTask(newItem.item);
                LogicCtrl.removeTask({
                    id,
                    itemId
                });
            })
            input = "";
        });
    }

    //just close if they press x
    let pressX = UICtrl.getPopUpCloser();
    pressX.addEventListener('click', UICtrl.newListToggle);



    /**
     * Save current todo list and tasks for each in local storage
     * when the user closes tab/window.
     * 
     * !LOCAL STORAGE ON CLOSE
     */
    window.addEventListener('beforeunload', () => {
        let list = UICtrl.getCurrentLists();
        StoreCtrl.storeList({
            name: DOMStrings.todo,
            list: list.bigList
        });
        StoreCtrl.storeList({
            name: DOMStrings.todoNames,
            list: list.bigListNames
        });
    });


    //!INITIALIZE
    function init() {
        console.log("INIT");
        //check local storage for old lists.
        let bigList = JSON.parse(StoreCtrl.getStoredList(DOMStrings.todo));
        let bigListNames = JSON.parse(StoreCtrl.getStoredList(DOMStrings.todoNames));

        //if there are elements load otherwise do nothing.
        if (bigListNames.length !== 0) {
            for (let i = 0; i < bigListNames.length; i++) {
                let id = LogicCtrl.addEmptyTodo(bigListNames[i]);
                let newCard = UICtrl.renderEmptyList(bigListNames[i], id);
                
                //ADD EVENTS FOR NEWLY CREATED CARD
                newCard.firstChild.lastChild.addEventListener('click', () => {
                    LogicCtrl.removeBigList(id);
                    UICtrl.removeBigList(newCard);
                })
                newCard.lastChild.lastChild.addEventListener('click', () => {
                    let input = newCard.lastChild.firstChild.value;
        
                    //TODO IMPLEMENT TASK UI AND LOGIC ON ADD
                    let itemId = LogicCtrl.addTask({
                        id,
                        input,
                        state:false,
                    });
                    let cBody = newCard.firstChild.nextSibling;
                    let newItem = UICtrl.addTask({
                        cBody,
                        input,
                        itemId
                    });
                    newItem.removeItem.addEventListener('click', () => {
                        UICtrl.removeTask(newItem.item);
                        LogicCtrl.removeTask({
                            id,
                            itemId
                        });
                    })
                    input = "";
                });

                //ADD STORED TASKS
                for(let j = 0; j < bigList[i].length; j++){
                    let itemId = LogicCtrl.addTask({
                        id:i,
                        input:bigList[i][j].itemMsg,
                        state:bigList[i][j].checkbox,
                    });
                    let cBody = newCard.firstChild.nextSibling;
                    let newItem = UICtrl.addTask({
                        cBody,
                        input:bigList[i][j].itemMsg,
                        itemId
                    });
                    newItem.removeItem.addEventListener('click', () => {
                        UICtrl.removeTask(newItem.item);
                        LogicCtrl.removeTask({
                            id,
                            itemId
                        });
                    })
                }
            }
        } else {
            console.log("LOCAL STORAGE IS EMPTY");
        }
        //display the lists with UIController

        //add dragula to the generated UI.
    }
    return {
        init
    }
})(UIController, listController, storageController)


//Run initializer once page has loaded
document.addEventListener('DOMContentLoaded', function () {
    MainController.init();
}, false);