export let dragManager = {
    initDragManager: function() {
        const draggables = document.querySelectorAll('.card-draggable')
        const containers = document.querySelectorAll('.card-body')

        console.log("dragables: " + draggables);
        console.log(draggables)
        console.log(containers);


        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', () => {
                console.log('drag start')
                draggable.classList.add('dragging')

            })

            draggable.addEventListener('dragend', () =>{
                draggable.classList.remove('.dragging')
                console.log('drag over')
            })
        })

        containers.forEach(container => {
            container.addEventListener('dragover', e => {
                e.preventDefault()
                const afterElement = this.getDragAfterElement(container, e.clientY)
                const draggable = document.querySelector('.dragging')
                if (afterElement == null){
                    container.appendChild(draggable)
                }
                else{
                    container.insertBefore(draggable, afterElement)
                }
            })
        })

        
    },
    getDragAfterElement: function(container, y) {
        const draggableElements = [...container.querySelectorAll('.card-m-2:not(.dragging)')]

        return draggableElements.reduce((closest, child)=> {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2
            console.log(box)
            if (offset < 0 && offset > closest.offset){
                return {offset: offset, element: child}
            }
            else {
                return closest
            }
        }, {offset: Number.NEGATIVE_INFINITY}.element)
    }
}

    