import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsHandler} from "../data/cardsHandler.js";
import { boardsManager } from "./boardsManager.js";
import { refreshManager } from "./refreshManager.js";


export let cardsManager = {
    loadCards: async function (columnId) {
        const cards = await cardsHandler.getCardsByColumnId(columnId)
        console.log(cards);
        for (let card of cards) {
            this.loadCard(columnId, card);
        }
    },
    loadCard: async function (columnId, card) {
        const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`div#cards[data-column-id="${columnId}"]`, content);
            domManager.addEventListener(
                `div.div-button[data-card-id="${card.id}"]`,
                "click",
                deleteCardButton
            );
            domManager.addEventListener(
                `.add-card-button[data-column-id="${columnId}"]`,
                "click",
                addCardButton
            );

    },
};

async function deleteCardButton(clickEvent) {
    // var cardId = document.querySelector('.card-draggable[data-card-id]').getAttribute('data-card-id');
    let cardId = await clickEvent.currentTarget.dataset.cardId
    console.log("delete card: "+ cardId)
    cardsHandler.deleteCard(cardId)

    // remove element from column in view
    let cardElement = document.querySelector(`.card-draggable[data-card-id="${cardId}"]`)
    cardElement.remove()
}


async function addCardButton(clickEvent) {
    let columnId = await clickEvent.currentTarget.dataset.columnId
    let cardTitle = document.querySelector(`.add-card-imput[data-column-id="${columnId}"]`).value
    let cardId = await cardsHandler.createNewCard(cardTitle, columnId)

    let cardPromise = await cardId;
    console.log(cardPromise) 
}