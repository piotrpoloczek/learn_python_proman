import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";


export let cardsManager = {
    loadCards: async function (columnId) {
        const cards = await dataHandler.getCardsByColumnId(columnId)
        console.log(cards);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`div#cards[data-column-id="${columnId}"]`, content);

            // domManager.addEventListener(
            //     `[data-card-id="${card.id}"]`,
            //     "click",
            //     deleteButtonHandler
            // );
        }
    },
};

function deleteButtonHandler(clickEvent) {
}
