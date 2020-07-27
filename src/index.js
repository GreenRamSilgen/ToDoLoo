import {
    UIController
} from './uiControl'
import {
    storageController
} from './storeControl'


let MainController = (function (UICtrl, StoreCtrl) {
    let DOMStrings = UICtrl.getDOMStrings();

    //!NEW LIST BUTTON and MODAL
    //Get New List Button and Modal PopUP DOM
    let newToDoBtn = UICtrl.getNewTodoButton();
    let pressX = UICtrl.getPopUpCloser();


    //POPUP MODAL IF USER PRESSES NEW BUTTON
    newToDoBtn.addEventListener('click', UICtrl.newListToggle);    
    
    //CLOSE MODAL IF USER PRESSES X
    pressX.addEventListener('click', UICtrl.newListToggle);


    //Make bigList if user SUBMITS MODAL
    let userIn = document.querySelector("#userInput");
    userIn.onsubmit = function (e) {
        e.preventDefault();

        let newCard = UICtrl.renderEmptyList(userIn.title.value);
        UICtrl.newListToggle();

        giveBigListCloseBtnFunctionality(newCard);
        giveAddItemBtnFuncionality(newCard);
    }


    /**
     * !LOCAL STORAGE ON CLOSE
     * 
     * Save current todo list and tasks for each in local storage
     * when the user closes tab/window.
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
        //CHECK LOCAL STORAGE
        let bigList = JSON.parse(StoreCtrl.getStoredList(DOMStrings.todo));
        let bigListNames = JSON.parse(StoreCtrl.getStoredList(DOMStrings.todoNames));

        //IF LOCAL STORAGE HAD ITEMS GENERATE THEM TO DOM
        if (bigListNames.length !== 0) {
            for (let i = 0; i < bigListNames.length; i++) {
                //Make new BigList card from the stored Array
                let newCard = UICtrl.renderEmptyList(bigListNames[i]);
                
                //ADD EVENTS FOR NEWLY CREATED CARD
                giveBigListCloseBtnFunctionality(newCard);
                giveAddItemBtnFuncionality(newCard);


                //Create all tasks that this Particular bigList has stored and add to DOM
                for(let j = 0; j < bigList[i].length; j++){ 
                    //add task to dom
                    let newItem = UICtrl.addTask({
                        cBody: newCard.firstChild.nextSibling,
                        input: bigList[i][j].itemMsg,
                        checkBox: bigList[i][j].checkbox,
                    });
                    addItemCloseBtnFunctionality(newItem);
                }
            }
        } else {
            console.log("LOCAL STORAGE IS EMPTY");
        }
    }

    /**
     * @param {Card Holder Base Element} card
     * 
     * Give the close button of the bigList functionality.
     * So if you press it it will delete that bigList from DOM.
     */
    function giveBigListCloseBtnFunctionality(card){
        card.firstChild.lastChild.addEventListener('click', () => {
            UICtrl.removeBigList(card);
        });
    }

    /**
     * @param {Card Holder Base Element} card
     * 
     * Give add task button of the given card functionality.
     * If it is pressed a new Item will be generated and added to DOM.
     */
    function giveAddItemBtnFuncionality(card){
        card.lastChild.lastChild.addEventListener('click', () => {
            let newItem = UICtrl.addTask({
                cBody:card.firstChild.nextSibling,
                input:card.lastChild.firstChild.value,
            });
            addItemCloseBtnFunctionality(newItem);
            card.lastChild.firstChild.value = "";
        });
    }

    /**
     * @param {Task Base Element} item
     * 
     * Adds functinality to the close button of the passed task.
     */
    function addItemCloseBtnFunctionality(item){
        item.removeItemBtn.addEventListener('click', () => {
            UICtrl.removeTask(newItem.item);
        });
    }


    return {
        init
    }
})(UIController, storageController)


//Run initializer once page has loaded
document.addEventListener('DOMContentLoaded', function () {
    MainController.init();
}, false);