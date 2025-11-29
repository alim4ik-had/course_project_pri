import AbstractView from "../../framework/view/abstract-view.js";

function createTaskItemView(task){
    return `<div class="task-item">
                <input type="checkbox" class="task-checkbox" ${task.isComplete? "checked" : ''} data-task-id="${task.id}">
                <span class="task-text">${task.title}</span>
            </div>`
}

export default class TaskItemView extends AbstractView{

    #task = null;
    #onChange = null;
    constructor(task, onChange) {
        super();
        this.#task = task;
        this.#onChange = onChange;
        this.element.addEventListener('change', this.#handleChange.bind(this));
    }
    get template(){
        return createTaskItemView(this.#task);
    }

    #handleChange = (e) => {
        e.preventDefault();
        this.#onChange(e.target.dataset.taskId);
    }
}