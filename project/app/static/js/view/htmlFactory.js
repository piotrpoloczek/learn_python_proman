export const htmlTemplates = {
    board: 1,
    card: 2,
    column: 3,
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.column]: columnBuilder,
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
};

function columnBuilder(column, isFirst) {

    const buttonaddCard = isFirst == true ? `<a href="#" class="btn btn-primary m-3" id="new-card" data-toggle="modal" data-target="#addCardModal" type="button" align="right" data-board-id="${column.id}">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                                            <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
                                            <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                                            </svg>
                                            </a></button>` : ``;
    
    return `
                <div class="col-sm-4" data-column-id="${column.id}">
                    <div class="card m-1">
                        <div class="row card-header m-0"> 
                            <div class="col-sm-9">
                                <h5>${column.title} </h5>
                            </div>
                            <div class="col-sm-3 div-button" data-column-id="${column.id}">
                            <button data-toggle="modal" type="button" class="btn btn-primary" >
                            <span class="bi bi-trash"></span></button>
                            </div>
                            <div class="col-sm-3 div-button" data-board-id="${column.id}">
                            ${buttonaddCard} 
                            </div>
                        </div>
                        <div class="card-body" id="cards" data-column-id="${column.id}"></div>
                    </div>
                </div>
            `;
};


function boardBuilder(board) {
    return `
            <div class="card m-3 full-board" data-board-id="${board.id}">
                
                <div class="row card-header m-0">
                    <div class="col-sm-10">
                        <h5 id="board-header" data-board-id="${board.id}">${board.title}</h5>
                    </div>
                    <div class="col" data-board-id="${board.id}">
                        <button class="btn btn-primary closed" type="button" data-board-id="${board.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                            </svg>
                        </button>
                        </div>
                    <div class="col div-button" data-board-id="${board.id}">
                        <button data-toggle="modal" type="button" class="btn btn-primary" >
                        <span class="bi bi-trash"></span></button>
                    </div>
                    <div class="col div-button" data-board-id="${board.id}">
                        <button data-toggle="modal" type="button" class="btn btn-primary" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                        <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
                        <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                        </svg>
                    </div>
                    </div>
                </div>

                <div class="container-fluid testimonial-group"><div class="row" id="div-cards" data-board-id="${board.id}"></div></div>
            </div>
            `;
};

function cardBuilder(card) {
    return `<div class="card m-2 card-draggable" data-card-id="${card.id}" data-card-order="${card.card_order}" draggable="true" style="cursor: move;">
                <div class="row card-header m-0">    
                    <div class="col-sm-9">
                        <h5>${card.title}</h5>
                    </div>
                        <div class="col-sm-3 div-button" data-card-id="${card.id}">
                        <button data-toggle="modal" type="button" class="btn btn-primary" >
                        <span class="bi bi-trash"></span></button>
                        </div>
                    </div>
            </div>`;
};

