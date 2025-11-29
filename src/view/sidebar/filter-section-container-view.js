import AbstractView from "../../framework/view/abstract-view.js";

function createFilterSectionContainerView(title) {
    return `<div class="filter-section">
                <h3 class="filter-title">
                    <i class="fas fa-${title === "Статус" ? "filter": "star"}"></i> ${title}
                </h3>
                <div class="filter-options">
                    
                </div>
            </div>`
}

export default class FilterSectionContainerView extends AbstractView {

    #filterTitle = "";
    constructor(title) {
        super();
        this.#filterTitle = title;
    }

    get template(){
        return createFilterSectionContainerView(this.#filterTitle);
    }

    get filterOptionsContainer(){
        return this.element.querySelector(".filter-options");
    }
}