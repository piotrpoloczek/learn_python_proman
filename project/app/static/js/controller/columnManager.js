import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import { columnsHandler } from "../data/columnsHandler.js";
import { boardsManager } from "./boardsManager.js";


export let columnManager = {
    loadColumns: async function(boardId) {
        const columns = await columnsHandler.getColumnsByBoardId(boardId);

        for(let column of columns) {
            console.log(column)
            await columnManager.loadColumn(column, boardId);
        }

        // // addNewColumnButton
        const columnBuilder = htmlFactory(htmlTemplates.addColumn);
        const content = columnBuilder();
        domManager.addChild(`#div-cards[data-board-id="${boardId}"]`, content);
    },
    loadColumn: async function(column, boardId) {
        const columnBuilder = htmlFactory(htmlTemplates.column);
        const content = columnBuilder(column);
        domManager.addChild(`#div-cards[data-board-id="${boardId}"]`, content);
        console.log("columnId: " + column.id)
        await cardsManager.loadCards(column.id)
        domManager.addEventListener(
            `div.div-button[data-column-id="${column.id}"]`,
            "click",
            deleteColumnButton
        )
        domManager.addEventListener(
            `[data-column-id="${column.id}"].column-header-title--editable`,
            "keypress",
            updataColumnTilte)
    }
}

async function deleteColumnButton(clickEvent) {
    // var columnId = clickEvent.curentTarget.dataset.columnId
    let columnId = await clickEvent.currentTarget.dataset.columnId
    columnsHandler.deleteColumn(columnId) 
}

async function updataColumnTilte(event) {
    let columnElement = await event.currentTarget
    let columnId = columnElement.dataset.columnId

        if (event.keyCode === 13) {
    // Zapobiegnięcie domyślnej akcji (np. przeładowania strony)
            event.preventDefault();

    // Odbieranie focusu z pola edycji tytułu
            let newColumnTitle = columnElement.innerText;
            await columnsHandler.updataColumn(columnId,newColumnTitle)
            columnElement.setAttribute("contenteditable", "false");
        }

}
