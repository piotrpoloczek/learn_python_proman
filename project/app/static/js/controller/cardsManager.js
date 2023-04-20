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
            domManager.addEventListener(
                `[data-card-id="${card.id}"].card-header-title--editable`,
                "keypress",
                updataCardTilte
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
    let cardResponse = await cardsHandler.createNewCard(cardTitle, columnId)

    let cardPromise = await cardResponse;
    console.log(cardPromise)
    let cardId = cardPromise[0][0].id;
    let card = await cardsHandler.getCard(cardId)
    console.log(columnId + " fadfasdfasdfasd " + card + " dfadsf " + cardPromise)
    cardsManager.loadCard(columnId, card);
}

async function updataCardTilte(event) {
    let cardElement = await event.currentTarget
    let cardId = cardElement.dataset.columnId

        if (event.keyCode === 13) {
    // Zapobiegnięcie domyślnej akcji (np. przeładowania strony)
            event.preventDefault();

    // Odbieranie focusu z pola edycji tytułu
            let newCardTitle = cardElement.innerText;
            await cardsHandler.updataCard(cardId,newCardTitle)
            cardElement.setAttribute("contenteditable", "false");
        }
}

