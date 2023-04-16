import { boardsHandler } from "../data/boardsHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import { columnManager } from "./columnManager.js";
import { dragManager } from "./dragManager.js";


export let boardsManager = {
    loadBoards: async function (userId) {
        console.log("get user id from flask: " + userId);
        const boards = await boardsHandler.getBoards();
        for (let board of boards) {
            console.log("board type: " + board.type + ", board userId: " + board.user_id);
            if (board.type == 1 || board.user_id == userId) {
                const boardBuilder = htmlFactory(htmlTemplates.board);
                const content = boardBuilder(board);
                domManager.addChild("#root", content);
                domManager.addEventListener(
                    `button[data-board-id="${board.id}"]`,
                    //`.toggle-board-button[data-board-id="${board.id}"]`,
                    "click",
                    showHideButtonHandler
                );
                domManager.addEventListener(
                    `h5#board-header[data-board-id="${board.id}"]`,
                    //`.toggle-board-button[data-board-id="${board.id}"]`,
                    "input",
                    changeText
                );
            }; 
        }
    },
    createBoard: async function () {
        console.log("print something modal works")
        let titleField = document.querySelector("input#title-board");
        console.log(titleField);
        let title = titleField.value;
        console.log("text from field: " + title);
        boardsHandler.createNewBoard(title);

        // TODO add user id and use it in refreshing page by AJAX
        domManager.emptyElement('#root');
        await boardsManager.loadBoards(null);
    },
};

async function showHideButtonHandler(clickEvent) {
    const boardId = await clickEvent.currentTarget.dataset.boardId;
    const currentTargetElement = await clickEvent.currentTarget;
    const boardElement = document.querySelector(`#div-cards[data-board-id="${boardId}"]`)

    if (currentTargetElement.classList.contains("open")){
        domManager.changeBetweenCSSClasses(currentTargetElement, "open", "closed");
        domManager.changeBetweenCSSClasses(boardElement, "height-500", "height-0");
        boardElement.innerHTML = "";
    } else {
        domManager.changeBetweenCSSClasses(currentTargetElement, "closed", "open");
        domManager.changeBetweenCSSClasses(boardElement, "height-0", "height-500");
        await columnManager.loadColumn(boardId);
        dragManager.initDragManager();
    }   
}

async function changeText(changeEvent) {
    const elementHTML = await changeEvent.currentTarget;
    console.log(elementHTML)
}