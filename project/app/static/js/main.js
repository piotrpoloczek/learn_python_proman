import {boardsManager} from "./controller/boardsManager.js";
import { dataHandler } from "./data/dataHandler.js";


function init() {

    let userName = document.getElementById("user_name");
    console.log("userName: " + userName);
    
    if (userName) {
        let userId = userName.dataset.userId;
        console.log("userId: " + userId);
        console.log("show all boards, private and public");
        console.log(userName.innerText);
        boardsManager.loadBoards(userId);
    } else {
        // shows only public boards
        boardsManager.loadBoards();
    }
    // try {
    //     let userName = document.getElementById("user_name");
    //     console.log(userName.innerText);
    // } catch(error) {

    //     //console.log(error);
    // }
    
    //boardsManager.loadBoards();

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
