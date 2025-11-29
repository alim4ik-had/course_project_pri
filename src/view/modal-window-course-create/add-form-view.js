import AbstractView from "../../framework/view/abstract-view.js";

function createAddFormView(){
    return `<form id="addCourseForm">
                <div class="form-group">
                    <label for="courseTitle" class="form-label">Название курса</label>
                    <input type="text" id="courseTitle" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="courseDescription" class="form-label">Описание курса</label>
                    <textarea id="courseDescription" class="form-control" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Задачи курса</label>
                    <div class="tasks-list" id="tasksList">
                        
                    </div>
                    <button type="button" class="btn btn-outline" id="addTaskBtn">
                        <i class="fas fa-plus"></i> Добавить задачу
                    </button>
                </div>
                <div class="form-group" style="text-align: right; margin-top: 30px;">
                    <button type="button" class="btn btn-outline" id="cancelAddCourse">Отмена</button>
                    <button type="submit" class="btn btn-primary" id="saveCourse">Сохранить курс</button>
                </div>
            </form>`
}

export default class AddFormView extends AbstractView{

    #onCancelAdd = null;
    #onClickAddTask = null;
    #onSaveCourse = null;

    constructor(onCancelAdd, onClickAddTask, onSaveCourse) {
        super();
        this.element.querySelector("#cancelAddCourse").addEventListener("click", this.#handleCancelAdd.bind(this))
        this.element.querySelector("#addTaskBtn").addEventListener("click", this.#handleAddTaskBtn.bind(this))
        this.element.querySelector("#saveCourse").addEventListener("click", this.#handleSaveCourse.bind(this))
        this.#onCancelAdd = onCancelAdd;
        this.#onClickAddTask = onClickAddTask;
        this.#onSaveCourse = onSaveCourse;
    }
    get template(){
        return createAddFormView();
    }
    get tasksContainer(){
        return this.element.querySelector("#tasksList");
    }
    get title(){
        return this.element.querySelector("#courseTitle").value;
    }
    get description(){
        return this.element.querySelector("#courseDescription").value;
    }

    #handleCancelAdd = (e) => {
        e.preventDefault();
        this.#onCancelAdd();
    }
    #handleAddTaskBtn = (e) => {
        e.preventDefault();
        this.#onClickAddTask();
    }
    #handleSaveCourse = (e) => {
        e.preventDefault();
        this.#onSaveCourse();
    }

}