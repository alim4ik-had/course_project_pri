import AbstractView from "../../framework/view/abstract-view.js";

function createCourseCardView(cardInfo){
    let progress = 100;
    if(cardInfo.completedTaskCount !== cardInfo.taskCount)
        progress = Math.round((cardInfo.completedTaskCount/cardInfo.taskCount)*100);
    return `<div class="course-card" data-id="${cardInfo.course.id}">
                <div class="course-header">
                    <h3 class="course-title">${cardInfo.course.title}</h3>
                    <p class="course-description">${cardInfo.course.description? cardInfo.course.description : "Нет описания"}</p>
                    <button id="favoriteBtn" class="favorite-btn ${cardInfo.course.isFavorite ? "active" : ''}" data-id="${cardInfo.course.id}">
                        <i class="fas fa-star"></i>
                    </button>
                </div>
                <div class="course-body">
                    <div class="progress-section">
                        <div class="progress-info">
                            <span>Прогресс:</span>
                            <span>${progress}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                    </div>
                    <div class="course-stats">
                        <span>${cardInfo.taskCount!==0? `${cardInfo.completedTaskCount}/${cardInfo.taskCount}` : "Нет"} задач</span>
                        <span>${cardInfo.status.title}</span>
                    </div>
                </div>
            </div>`
}

export default class CourseCardView extends AbstractView{
    #cardInfo = {}
    #onChangeFavorite = null;
    #openWindow = null;
    constructor(status, course, taskCount, completedTaskCount, onChangeFavorite, openWindow) {
        super();
        this.#cardInfo.status = status;
        this.#cardInfo.course = course;
        this.#cardInfo.taskCount = taskCount;
        this.#cardInfo.completedTaskCount = completedTaskCount;
        this.#onChangeFavorite = onChangeFavorite;
        this.#openWindow = openWindow;
        this.element.querySelector("#favoriteBtn").addEventListener("click", this.#handleChangeFavorite.bind(this));
        this.element.addEventListener("click", this.#handleOpenWindow.bind(this));
    }
    get template(){
        return createCourseCardView(this.#cardInfo);
    }

    #handleChangeFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.#onChangeFavorite(e.currentTarget.dataset.id);
    }

    #handleOpenWindow = (e) => {
        e.preventDefault();
        this.#openWindow(e.currentTarget.dataset.id);
    }
}