import { boardsHandler } from "../data/boardsHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import { refreshManager } from "./refreshManager.js";
import { boardsManagerFunc } from "./boardsManagerFunc.js";


export let boardsManager = {
    loadBoards: async function (userId, openBoardId) {
        console.log("get user id from flask: " + userId);
        const boards = await boardsHandler.getBoards();
        for (let board of boards) {
            console.log("board type: " + board.type + ", board userId: " + board.user_id + board.id);
            if (board.type == 1 || board.user_id == userId) {
                const boardBuilder = htmlFactory(htmlTemplates.board);
                const content = boardBuilder(board);
                domManager.addChild("#root", content);
                domManager.addEventListener(
                    `button[data-board-id="${board.id}"]`,
                    //`.toggle-board-button[data-board-id="${board.id}"]`,
                    "click",
                    boardsManagerFunc.showHideButtonHandler
                );
                domManager.addEventListener(
                    `h5#board-header[data-board-id="${board.id}"]`,
                    //`.toggle-board-button[data-board-id="${board.id}"]`,
                    "input",
                    boardsManagerFunc.changeText
                );
                domManager.addEventListener(
                    `div.div-button[data-board-id="${board.id}"]`,
                    "click",
                    boardsManagerFunc.deleteBoardButton
                ) 

                boardsManagerFunc.openStaysOpen(openBoardId, board.id);

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
        const openBoardId = refreshManager.getOpenBoards();
        domManager.emptyElement('#root');
        await boardsManager.loadBoards(null, openBoardId);
    },
};