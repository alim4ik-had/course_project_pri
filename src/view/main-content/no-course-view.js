import AbstractView from "../../framework/view/abstract-view.js";

function createNoCourseView(){
    return `<div class="empty-courses-state">
                <div class="empty-courses-icon">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <h3>Курсы не найдены</h3>
                <p>
                    Возможно, вы выбрали неправльный фильтр или еще не добавили курсы.
                    Создать курс можно нажав на кнопку ниже!
                </p>
                <button class="btn btn-primary" id="emptyStateAddBtn">
                    <i class="fas fa-plus"></i> Создать курс
                </button>
            </div>`
}

export default class NoCourseView extends AbstractView{
    #onClick = null;
    constructor(onClick) {
        super();
        this.#onClick = onClick;
        this.element.querySelector('button').addEventListener('click', this.#handleAddCourse.bind(this));
    }
    get template(){
        return createNoCourseView();
    }
    #handleAddCourse = (e) => {
        e.preventDefault();
        this.#onClick();
    }
}