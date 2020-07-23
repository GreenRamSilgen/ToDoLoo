import dragula from 'dragula'
import {
    listController
} from './listlogic'

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
        newListModal : '.bg-modal',
        newListSubmit: 'modalSubmit',
        closePop: '.close',

        board: 'board',

        //CardDom
        cardHolder: 'b-card',
        cardHead: 'b-card__head',
        cardHeadTitle: 'b-card__head--title',
        cardHeadClose: 'b-card__head--closebtn',
        cardBody: 'b-card__body',
        cardFooter: 'b-card__foot',
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

    function makeDiv(className){
        let newDiv = document.createElement('div');
        newDiv.setAttribute('class', className);
        return newDiv;
    }
    function makeBtn(className){
        let newBtn = document.createElement('button');
        newBtn.setAttribute('class', className);
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
        getDOMStrings: function () {
            return DOMStrings;
        },
        renderEmptyList: function (name, id) {
            console.log(name + " id" + id);
            let cardHolder = makeDiv(DOMStrings.cardHolder);
            cardHolder.setAttribute("data-group",id);


            //create card's header
            let cardHeader = makeDiv(DOMStrings.cardHead);
            let cardHeadTitle = makeDiv(DOMStrings.cardHeadTitle);
            cardHeadTitle.textContent = name;
            let cardHeadClose = makeBtn(DOMStrings.cardHeadClose);
            cardHeadClose.textContent = "X";
            cardHeader.appendChild(cardHeadTitle);
            cardHeader.appendChild(cardHeadClose);

            //create card's body
            let cardBody = makeDiv(DOMStrings.cardBody);


            //create card's footer
            let cardFooter = makeDiv(DOMStrings.cardFooter);
            let cardFooterAddBtn = makeBtn(DOMStrings.cardFooterAddBtn);
            cardFooterAddBtn.textContent = "+ Add Item";
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
    //add eventlistener for each list's add button


    //!NEW LIST MAKER
    //popup menu when pressed
    let newToDoBtn = UICtrl.getNewTodoButton();
    newToDoBtn.addEventListener('click', UICtrl.newListToggle);
    //do something if they press submit
    let userIn = document.querySelector("#userInput");
    userIn.onsubmit = function (e) {
        e.preventDefault();
        //addBookToLibrary(new Book(userIn.title.value, userIn.author.value, userIn.pages.value, userIn.read.checked));
        
        //in logic side add a new empty list to the bigList array
        let id = LogicCtrl.addEmptyTodo(userIn.title.value);
        UICtrl.renderEmptyList(userIn.title.value, id);
        UICtrl.newListToggle();
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