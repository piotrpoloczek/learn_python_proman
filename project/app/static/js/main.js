import {boardsManager} from "./controller/boardsManager.js";
import { dataHandler } from "./data/dataHandler.js";


function init() {
    boardsManager.loadBoards();

    function saveBoard() {
        console.log("print something modal works")
        let titleField = document.querySelector("input#title-text");
        console.log(titleField);
        let title = titleField.value;
        console.log("text from field: " + title);
        dataHandler.createNewBoard(title);
    };

    let saveBoardButton = document.querySelector("button#save-board");
    saveBoardButton.addEventListener("click", saveBoard);


}

init();
