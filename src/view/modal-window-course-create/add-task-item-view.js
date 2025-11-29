import AbstractView from "../../framework/view/abstract-view.js";

function createAddTaskItemView(){
    return `<div class="task-item">
                <input type="text" class="form-control task-input" placeholder="Введите задачу">
                <div class="task-actions">
                    <button type="button" class="remove-task-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>`
}

export default class AddTaskItemView extends AbstractView{
    #onClickDelete = null;

    constructor(onClickDelete) {
        super();
        this.#onClickDelete = onClickDelete;
        this.element.querySelector(".remove-task-btn").addEventListener('click', this.#handleDeleteTaskBtn.bind(this));
    }

    get template(){
        return createAddTaskItemView();
    }
    get taskValue(){
        return this.element.children[0].value.trim();
    }

    #handleDeleteTaskBtn(e){
        e.preventDefault();
        this.removeElement();
        this.#onClickDelete();
    }
}