import AbstractView from "../../framework/view/abstract-view.js";

function createModalWindowCourseView(courseInfo){
    return `<div class="modal-overlay ${courseInfo.isActive? "active" : ''}" id="viewCourseModal">
                <div class="modal">
                    <div class="modal-header">
                        <h2 class="modal-title" id="viewCourseTitle">${courseInfo.title}</h2>
                        <button class="close-btn" id="closeViewModal">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p id="viewCourseDescription">${courseInfo.description? courseInfo.description : "У данного курса отсутствует описание"}</p>
            
                        <div class="progress-section" style="margin: 20px 0;">
                            <div class="progress-info">
                                <span>Прогресс:</span>
                                <span id="viewCourseProgress">${courseInfo.progress}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" id="viewCourseProgressBar" style="width: ${courseInfo.progress}%;"></div>
                            </div>
                        </div>
            
                        <h3 style="margin: 25px 0 15px;">Задачи курса</h3>
                        <div class="tasks-list" id="viewTasksList">
                            
                        </div>
                        <div class="modal-actions" style="margin-top: 30px; text-align: right;">
                            <button class="btn btn-danger" id="deleteCourseBtn">
                                <i class="fas fa-trash"></i> Удалить курс
                            </button>
                        </div>
                    </div>
                </div>
            </div>`
}

export default class ModalWindowCourseView extends AbstractView{
    #courseInfo = null;
    #onClickClose = null;
    #deleteCourse = null;
    #keyDown = null;
    #boundFunc = null;
    constructor(courseInfo, onClickClose, deleteCourse, keyDown) {
        super();
        this.#courseInfo = courseInfo;
        this.#onClickClose = onClickClose;
        this.#deleteCourse = deleteCourse;
        this.#keyDown = keyDown;
        this.#boundFunc = this.#handleKeyDown.bind(this);
        this.element.querySelector(".close-btn").addEventListener("click", this.#handleCloseWindow.bind(this));
        this.element.querySelector("#deleteCourseBtn").addEventListener('click', this.#handleDeleteCourse.bind(this));
        document.addEventListener('keydown', this.#boundFunc);
    }
    get template(){
        return createModalWindowCourseView(this.#courseInfo);
    }

    get taskListContainer(){
        return this.element.querySelector('.tasks-list');
    }

    changeCourseProgress(progress){
        this.element.querySelector('#viewCourseProgress').textContent = `${progress}%`;
        this.element.querySelector('#viewCourseProgressBar').style.width = `${progress}%`;
    }
    #handleCloseWindow = (e) => {
        e.preventDefault();
        this.#onClickClose();
    }
    #handleDeleteCourse = (e) => {
        e.preventDefault();
        this.#deleteCourse();
    }
    #handleKeyDown = (e) => {
        e.preventDefault();
        document.removeEventListener('keydown', this.#boundFunc);
        console.log("ff")
        if(e.key === 'Escape' && !this.isRemoved())
            this.#keyDown();
    }
}