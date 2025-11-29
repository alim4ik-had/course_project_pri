import AbstractView from "../../framework/view/abstract-view.js";

function createSearchCourseView() {
    return `<div class="search-box">
                <input type="text" id="searchInput" placeholder="Поиск курсов...">
            </div>`
}

export default class SearchCourseView extends AbstractView{

    #onChange = null;

    constructor(onChange) {
        super();
        this.#onChange = onChange;
        this.element.addEventListener('input', this.#handleInputChange.bind(this));
    }
    get template() {
        return createSearchCourseView();
    }

    #handleInputChange(e) {
        e.preventDefault();
        const inputText = e.target.value.trim().toLowerCase();
        this.#onChange(inputText);
    }
}