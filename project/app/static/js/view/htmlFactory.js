export const htmlTemplates = {
    board: 1,
    card: 2,
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,

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

function columnBuilder(board) {
    return `
            <div class="row" data-board-id="${board.id}">
                <div class="col-sm-3">
                    <div class="card m-2">
                        <div class="card-body">
                            <h5 class="card-title">New</h5>
                        </div>
                    </div>
                </div>

                <div class="col-sm-3">
                    <div class="card m-2">
                        <div class="card-body">
                            <h5 class="card-title">In progress</h5>
                        </div>
                    </div>
                </div>

                <div class="col-sm-3">
                    <div class="card m-2">
                        <div class="card-body">
                            <h5 class="card-title">Testing</h5>
                        </div>
                    </div>
                </div>

                <div class="col-sm-3">
                    <div class="card m-2">
                        <div class="card-body">
                            <h5 class="card-title">Done</h5>
                        </div>
                    </div>
                </div>



            </div>
                
            `;
};

function boardBuilder(board) {
    return `
            <div class="card m-3">
                <h5 class="card-header" data-board-id="${board.id}">${board.title}</h5>
                <div class="card-body">
                    <a class="btn btn-primary board-toggle m-2" data-board-id="${board.id}">Show Cards</a>
                </div>

                ` + columnBuilder(board) + `
            </div>
            `;
};

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
};