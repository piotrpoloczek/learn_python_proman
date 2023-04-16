import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsHandler} from "../data/cardsHandler.js";
import { boardsManager } from "./boardsManager.js";


export let cardsManager = {
    loadCards: async function (columnId) {
        const cards = await cardsHandler.getCardsByColumnId(columnId)
        console.log(cards);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`div#cards[data-column-id="${columnId}"]`, content);
            // add event listener to every button
            domManager.addEventListener(
                `button#delete-button`,
                "click",
                deleteCardButton
            );

            // TODO add event listener in order to rename
        }
    },
    createCard: async function () {
        console.log("print something modal works")
        let titleField = document.querySelector("input#title-card");
        console.log(titleField);
        let title = titleField.value;
        console.log("text from field: " + title);
        let columnId = document.querySelector('.col-sm-4[data-column-id]').getAttribute('data-column-id');
        console.log("patrz tuuuu" + columnId)
        cardsHandler.createNewCard(title, columnId);
    },
};

async function deleteCardButton() {
    var cardId = document.querySelector('.col-sm-3[data-card-id]').getAttribute('data-card-id');
    console.log("delete card: "+ cardId)
    cardsHandler.deleteCard(cardId)

    domManager.emptyElement('#root');
    await boardsManager.loadBoards(null)
}
