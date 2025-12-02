import ModalWindowAddView from "../view/modal-window-course-create/modal-window-add-view.js";
import AddFormView from "../view/modal-window-course-create/add-form-view.js";
import {render, RenderPosition} from "../framework/render.js";
import AddTaskItemView from "../view/modal-window-course-create/add-task-item-view.js";
import ValidationErrorView from "../view/modal-window-course-create/validation-error-view.js";
import {ErrorMessage} from "../const.js";

export default class AddWindowPresenter{

    #windowView =null;
    #windowBody = null;
    #validErrorContainer = null;
    #windowContainer = null;
    #formAdd = null;
    #taskElementList = null;
    #courseModel = null;

    constructor(container, courseModel) {
        this.#windowContainer = container;
        this.#courseModel = courseModel;
    }

    initWindow(){
        this.#taskElementList = []
        this.#windowView = new ModalWindowAddView(true);
        this.#windowBody = this.#windowView.modalBody;
        this.#validErrorContainer = this.#windowView.validErrorContainer;
        this.#formAdd = new AddFormView(this.#closeWindow.bind(this), this.#addTaskElement.bind(this), this.#saveCourse.bind(this));

        render(this.#windowView, this.#windowContainer, RenderPosition.BEFOREEND);
        render(this.#formAdd, this.#windowBody, RenderPosition.BEFOREEND);

    }

    #closeWindow(){
        this.#windowView.removeElement();
    }
    #addTaskElement(){
        const taskContainer = this.#formAdd.tasksContainer;
        const taskElement = new AddTaskItemView(this.#deleteTaskElement.bind(this));
        render(taskElement, taskContainer, RenderPosition.BEFOREEND);
        this.#taskElementList.push(taskElement);
    }
    #deleteTaskElement(){
        this.#taskElementList = this.#taskElementList.filter(task => !task.isRemoved());
    }

    async #saveCourse(){
        const title = this.#formAdd.title;
        const description = this.#formAdd.description;
        const tasks = new Set();

        while(this.#taskElementList.length > 0){
            let taskValue = this.#taskElementList[0].taskValue
            if(taskValue){
                tasks.add(taskValue);
            }
            this.#taskElementList.shift();
        }
        if(this.#isErrorValid(title, tasks))
            return;

        await this.#courseModel.createCourse(title, description, tasks);
        this.#closeWindow();

    }

    #isErrorValid(title, tasks){
        this.#validErrorContainer.innerHTML = '';
        if(!title){
            render(new ValidationErrorView(ErrorMessage.TITLE_ERROR), this.#validErrorContainer, RenderPosition.AFTERBEGIN)
            this.#validErrorContainer.style.display = 'block';
            return true;
        }
        else if(!tasks.size){
            render(new ValidationErrorView(ErrorMessage.TASK_ERROR), this.#validErrorContainer, RenderPosition.AFTERBEGIN)
            this.#validErrorContainer.style.display = 'block';
            return true;
        }
        this.#validErrorContainer.style.display = 'none';
        return false;
    }
}