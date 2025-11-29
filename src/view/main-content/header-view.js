import AbstractView from "../../framework/view/abstract-view.js";

function createHeaderView(){
    return `<header>
                <div class="container">
                    <div class="header-content">
                        <div class="logo">
                            <i class="fas fa-graduation-cap"></i>
                            <span>Каталог курсов</span>
                        </div>
                        <button class="btn btn-primary" id="addCourseBtn">
                            <i class="fas fa-plus"></i> Добавить курс
                        </button>
                    </div>
                </div>
            </header>`
}

export default class HeaderView extends AbstractView{

    #onClick = null;

    constructor(onClick) {
        super();
        this.#onClick = onClick;
        this.element.querySelector("#addCourseBtn").addEventListener('click', this.#handleClick)
    }

    get template(){
        return createHeaderView();
    }

    #handleClick = (event) =>{
        event.preventDefault();
        this.#onClick();
    }
}