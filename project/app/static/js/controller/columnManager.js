import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import { columnsHandler } from "../data/columnsHandler.js";
import { boardsManager } from "./boardsManager.js";


export let columnManager = {
    loadColumn: async function(boardId) {
        const columns = await columnsHandler.getColumnsByBoardId(boardId);
        console.log(columns);
        let isFirst = true;
        for(let column of columns) {
            const columnBuilder = htmlFactory(htmlTemplates.column);
            const content = columnBuilder(column, isFirst);
            domManager.addChild(`#div-cards[data-board-id="${boardId}"]`, content);
            isFirst = false
            console.log("columnId: " + column.id)
            await cardsManager.loadCards(column.id)
            domManager.addEventListener(
                `button#delete-column`,
                "click",
                deleteColumnButton
            )    
        }
    }
}

async function deleteColumnButton() {
    // var columnId = clickEvent.curentTarget.dataset.columnId
    var columnId = document.querySelector('.col-sm-4[data-column-id]').getAttribute('data-column-id');//zczytuje cały czas columnId = 1
    console.log("delete column: "+ columnId)
    // columnsHandler.deleteColumn(columnId)


    domManager.emptyElement('#root');
    await boardsManager.loadBoards(null)
}
