import {domManager} from "../view/domManager.js";
import { columnManager } from "./columnManager.js";
import { dragManager } from "./dragManager.js";
import { boardsHandler } from "../data/boardsHandler.js";
import { boardsManager } from "./boardsManager.js";


export let boardsManagerFunc = {
    showHideButtonHandler: async function(clickEvent) {
        const boardId = await clickEvent.currentTarget.dataset.boardId;
        const currentTargetElement = await clickEvent.currentTarget;
        const boardElement = document.querySelector(`#div-cards[data-board-id="${boardId}"]`)
    
        if (currentTargetElement.classList.contains("open")){
            boardsManagerFunc.hideAllBoard(currentTargetElement, boardElement);
        } else {
            await boardsManagerFunc.showAllBoard(currentTargetElement, boardElement, boardId);
        }   
    },
    changeText: async function(changeEvent) {
        const elementHTML = await changeEvent.currentTarget;
        console.log(elementHTML)
    },
    hideAllBoard: function(currentTargetElement, boardElement) {
        domManager.changeBetweenCSSClasses(currentTargetElement, "open", "closed");
        domManager.changeBetweenCSSClasses(boardElement, "height-500", "height-0");
        boardElement.innerHTML = "";
    },
    showAllBoard: async function(currentTargetElement, boardElement, boardId) {
        domManager.changeBetweenCSSClasses(currentTargetElement, "closed", "open");
        domManager.changeBetweenCSSClasses(boardElement, "height-0", "height-500");
        await columnManager.loadColumn(boardId);
        dragManager.initDragManager();
    },
    openStaysOpen: async function(openBoardId, boardId) {
        const boardElement = document.querySelector(`#div-cards[data-board-id="${boardId}"]`)
        const currentTargetElement = document.querySelector(`button[data-board-id="${boardId}"]`)
    
        if (openBoardId != null) {
            console.log("open boards id: " + openBoardId)
            console.log(openBoardId);
            console.log("board id:       " + boardId)
            if (openBoardId.includes(`${boardId}`)) {
                console.log("yes includes")
                await boardsManagerFunc.showAllBoard(currentTargetElement, boardElement, boardId);
            }
        }
    },
    deleteBoardButton: async function (clickEvent) {
        // var columnId = clickEvent.curentTarget.dataset.columnId
        let boardId = await clickEvent.currentTarget.dataset.boardId
        console.log("delete board: "+ boardId)
        await boardsHandler.deleteBoard(boardId)
    
    
        let boardElement = document.querySelector(`.full-board[data-board-id="${boardId}"]`)
        boardElement.remove()
    
        domManager.emptyElement('#root');
        await boardsManager.loadBoards(null)
    }
}