import dragula from 'dragula'
let UIController = (function () {
    let drake = dragula();
    let DOMStrings = {
        todo:'bigList',
        todoNames: 'bigListNames',
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


    function makeDiv(className) {
        let newDiv = document.createElement('div');
        newDiv.setAttribute('class', className);
        return newDiv;
    }

    function makeBtn(className) {
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
        getBigListCloseButtons: function () {
            return rmvListBtn;
        },
        getDOMStrings: function () {
            return DOMStrings;
        },
        /**
         * GOES THROUGH THE DOM IN CURRENT STATE THEN,
         * 
         * Returns An Object that has {bigList, bigListNames};
         * *bigList: Holds array of objects at each index. {checkbox,itemMsg}
         *        *checkbox: if the item was checked off or not.
         *        *itemMsg: the description of the item
         * 
         * *bigListNames: Array that holds the title of each bigList in the DOM
         */
        getCurrentLists:function(){
            let bigListNames = [];
            let bigList = [];
            let list = document.querySelectorAll(`.${DOMStrings.cardHolder}`);
            let listNum = 0;

            list.forEach((todo) =>{ //loops through each todo list
                bigList.push([]);

                //contains all task items of this todo list
                let bodyItems = todo.firstChild.nextSibling.childNodes;

                //Store title of current List
                bigListNames.push(todo.firstChild.firstChild.textContent);


                bodyItems.forEach((item)=>{ //loops through the current list's items
                    //add each item's checked state and message to the current bigList index
                    bigList[listNum].push({checkbox:item.childNodes[0].checked,itemMsg:item.childNodes[1].textContent}); 
                });
                listNum++;
            });
            return {bigList,bigListNames};
        },
        removeBigList: function (stuff) {
            stuff.remove();
        },
        renderEmptyList: function (name) {
            let cardHolder = makeDiv(DOMStrings.cardHolder);


            //**create card's header
            let cardHeader = makeDiv(DOMStrings.cardHead);
            let cardHeadTitle = makeDiv(DOMStrings.cardHeadTitle);
            cardHeadTitle.textContent = name;
            let cardHeadClose = makeBtn(DOMStrings.cardHeadClose);
            cardHeadClose.textContent = "+";
            cardHeader.appendChild(cardHeadTitle);
            cardHeader.appendChild(cardHeadClose);

            //**create card's body
            let cardBody = makeDiv(DOMStrings.cardBody);


            //**create card's footer
            let cardFooter = makeDiv(DOMStrings.cardFooter);
            let cardFooterAddBtn = makeBtn(DOMStrings.cardFooterAddBtn);
            let cardFooterInput = document.createElement("input");
            cardFooterInput.setAttribute("class", DOMStrings.cardFooterInput);
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

            //Add the Body to dragula for drag funcionality
            drake.containers.push(cardBody);
            return cardHolder;
        },
        //TASKS
        addTask:function({cBody,input, checkBox}){
            let item = makeDiv(DOMStrings.item);

            //make checkbox
            let checkbox = document.createElement("input");
            checkbox.setAttribute("class", DOMStrings.itemCheck);
            checkbox.setAttribute("type","checkbox");
            if(checkBox === true){
                checkbox.checked = true;
            }

            //make content
            let content = makeDiv(DOMStrings.itemContent);
            content.textContent = input;
            let removeItemBtn = makeBtn(DOMStrings.itemRemove);
            removeItemBtn.textContent = "+";
            
            //append to item
            item.appendChild(checkbox);
            item.appendChild(content);
            item.appendChild(removeItemBtn);

            //append to actual card body
            cBody.appendChild(item);

            return {item,removeItemBtn};
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

export{
    UIController
}