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
        //Returns an array of names and array of item objects which have {checked,msg}
        getCurrentLists:function(){
            let bigListNames = [];
            let bigList = [];
            //get all lists
            let list = document.querySelectorAll(`.${DOMStrings.cardHolder}`);
            
            
            let listNum = 0;
            list.forEach((todo) =>{ //loops through each todo list
                bigList.push([]);
                let title = todo.firstChild.firstChild.textContent;
                let body = todo.firstChild.nextSibling;
                let bodyItems = body.childNodes;

                //store name of this list in array
                bigListNames.push(title);


                bodyItems.forEach((item)=>{ //loops through the current list's items
                    let  checkbox = item.childNodes[0].checked;
                    let itemMsg = item.childNodes[1].textContent;

                    bigList[listNum].push({checkbox,itemMsg}); 
                });
                listNum++;
            });
            return {bigList,bigListNames};
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
            cardHeadClose.textContent = "+";
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
            content.textContent = input;
            let removeItem = makeBtn(DOMStrings.itemRemove);
            removeItem.textContent = "+";
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

export{
    UIController
}