import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";


export let columnManager = {
    loadColumn: async function(boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        console.log(cards);
        for(let card of cards) {
            console.log(card.status_id);
            const columnBuilder = htmlFactory(htmlTemplates.column);
            const content = columnBuilder(card);
            domManager.addChild(`#div-cards[data-board-id="${boardId}"]`, content);
        }
    }
}