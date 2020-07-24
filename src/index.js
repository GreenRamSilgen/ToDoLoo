import dragula from 'dragula'
import {
    listController
} from './listlogic'

//TODO: MAKE ADD ITEM BUTTON FUNCTIONAL FOR EACH LIST
//TODO: UI AND LOGIC NEED TO BE UPDATED AT SAME TIME
let drake = dragula();
document.querySelectorAll(".b-card__body").forEach((block) => {
    drake.containers.push(block);
});

// drake.containers.push(document.querySelector("#container1"));
// drake.containers.push(document.querySelector("#container2"));
// drake.containers.push(document.querySelector("#container3"));


// drake.containers.push(document.querySelector("#left"));
// drake.containers.push(document.querySelector("#center"));
// drake.containers.push(document.querySelector("#right"));

let UIController = (function () {
    let DOMStrings = {

        newList: 'newList',
        newListModal: '.bg-modal',
        newListSubmit: 'modalSubmit',
        closePop: '.close',

        board: 'board',

        //CardDom
        dataGroup: 'data-group',
        cardHolder: 'b-card',
        cardHead: 'b-card__head',
        cardHeadTitle: 'b-card__head--title',
        cardHeadClose: 'b-card__head--closebtn',
        cardBody: 'b-card__body',
        //body
        itemId:"data-item",
        item: "item",
        itemCheck: "item__checkbox",
        itemContent: "item__content",
        itemRemove: "item__removeBtn",
        //body
        cardFooter: 'b-card__foot',
        cardFooterInput: 'b-card__foot--input',
        cardFooterAddBtn: 'b-card__foot--btn',
    }
    //!GET BOARD
    let board = document.getElementById(DOMStrings.board);

    //!creating new list elements
    let newListModal = document.querySelector(DOMStrings.newListModal);
    let makeNewTodo = document.getElementById(DOMStrings.newList);
    let closeBtn = document.querySelector(DOMStrings.closePop);
    let newListSubmit = document.getElementById(DOMStrings.newListSubmit);
    let popped = false;
    //!Remove big list
    let rmvListBtn = document.querySelectorAll("." + DOMStrings.cardHeadClose);

    function findBigListX() {
        rmvListBtn = document.querySelectorAll("." + DOMStrings.cardHeadClose);
    }

    function makeDiv(className, id) {
        let newDiv = document.createElement('div');
        newDiv.setAttribute('class', className);
        newDiv.setAttribute(DOMStrings.dataGroup, id);
        return newDiv;
    }

    function makeBtn(className, id) {
        let newBtn = document.createElement('button');
        newBtn.setAttribute('class', className);
        newBtn.setAttribute(DOMStrings.dataGroup, id);
        return newBtn;
    }
    return {
        getNewTodoButton: function () {
            return makeNewTodo;
        },
        getNewTodoSubmit: function () {
            return newListSubmit;
        },
        getPopUpCloser: function () {
            return closeBtn;
        },
        getBigListCloseButtons: function () {
            return rmvListBtn;
        },
        getDOMStrings: function () {
            return DOMStrings;
        },
        //BIG LIST
        findBigListX,
        removeBigList: function (stuff) {
            stuff.remove();
        },
        renderEmptyList: function (name, id) {
            console.log(name + " id" + id);
            let cardHolder = makeDiv(DOMStrings.cardHolder, id);


            //create card's header
            let cardHeader = makeDiv(DOMStrings.cardHead, id);
            let cardHeadTitle = makeDiv(DOMStrings.cardHeadTitle, id);
            cardHeadTitle.textContent = name;
            let cardHeadClose = makeBtn(DOMStrings.cardHeadClose, id);
            cardHeadClose.textContent = "X";
            cardHeader.appendChild(cardHeadTitle);
            cardHeader.appendChild(cardHeadClose);

            //create card's body
            let cardBody = makeDiv(DOMStrings.cardBody, id);


            //create card's footer
            let cardFooter = makeDiv(DOMStrings.cardFooter, id);
            let cardFooterAddBtn = makeBtn(DOMStrings.cardFooterAddBtn, id);
            let cardFooterInput = document.createElement("input");
            cardFooterInput.setAttribute("class", DOMStrings.cardFooterInput);
            cardFooter.setAttribute("data-group",id);
            cardFooter.setAttribute("placeholder", "New Task")
            cardFooterAddBtn.textContent = "+ Add Item";
            cardFooter.appendChild(cardFooterInput);
            cardFooter.appendChild(cardFooterAddBtn);

            //add it all to the card holder
            cardHolder.appendChild(cardHeader);
            cardHolder.appendChild(cardBody);
            cardHolder.appendChild(cardFooter);

            //add card holder to the body.
            board.appendChild(cardHolder);

            //TODO: Potentially Relocate dragula container
            //dragula test
            drake.containers.push(cardBody);
            return cardHolder;
        },
        //TASKS
        addTask:function({cBody,input, itemId}){
            let item = makeDiv(DOMStrings.item);
            item.setAttribute(DOMStrings.itemId, itemId);
            let checkbox = document.createElement("input");
            checkbox.setAttribute("class", DOMStrings.itemCheck);
            checkbox.setAttribute("type","checkbox");
            
            //set content
            let content = makeDiv(DOMStrings.itemContent);
            content.textContent = input.value;
            let removeItem = makeBtn(DOMStrings.itemRemove);
            removeItem.textContent = "X";
            //append to item
            item.appendChild(checkbox);
            item.appendChild(content);
            item.appendChild(removeItem);

            //append to actual card body
            cBody.appendChild(item);

            return {item,removeItem};
        },
        removeTask:function(item){
            item.remove();
        },
        //MODAL TOGGLE
        newListToggle: function () {
            if (popped == true) {
                newListModal.style.display = 'none';
                popped = false;
            } else {
                newListModal.style.display = 'flex';
                popped = true;
            }
        },
    }
})();


let MainController = (function (UICtrl, LogicCtrl) {
    let DOMStrings = UICtrl.getDOMStrings();



    //!NEW LIST MAKER
    //popup the menu when pressed
    let newToDoBtn = UICtrl.getNewTodoButton();
    newToDoBtn.addEventListener('click', UICtrl.newListToggle);

    //do something if they press submit
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
        newCard.lastChild.lastChild.addEventListener('click',()=>{
            let input = newCard.lastChild.firstChild;
            console.log(newCard.lastChild.firstChild.value);
            
            //TODO IMPLEMENT TASK UI AND LOGIC ON ADD
            let itemId = LogicCtrl.addTask({id,input});
            let  cBody = newCard.firstChild.nextSibling;
            let newItem = UICtrl.addTask({cBody, input, itemId});
            newItem.removeItem.addEventListener('click',()=>{
                UICtrl.removeTask(newItem.item);
                LogicCtrl.removeTask({id,itemId});
            })
            input.value = "";
        });
    }

    //just close if they press x
    let pressX = UICtrl.getPopUpCloser();
    pressX.addEventListener('click', UICtrl.newListToggle);



    function init() {
        console.log("INIT");
        //check local storage for old lists.

        //if old lists exist get them

        //display the lists with UIController

        //add dragula to the generated UI.
    }
    return {
        init
    }
})(UIController, listController)


//Run initializer once page has loaded
document.addEventListener('DOMContentLoaded', function () {
    MainController.init();
}, false);