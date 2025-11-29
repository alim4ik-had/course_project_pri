import AbstractView from "../../framework/view/abstract-view.js";

function createFilterOptionView(filterInfo){
    return `<div class="filter-option">
                <input type="checkbox" id="${filterInfo.slug}" ${filterInfo.isChecked? "checked" : ''}>
                <label for="${filterInfo.slug}">${filterInfo.pluralTitle}</label>
            </div>`
}

export default class FilterOptionView extends AbstractView {

    #filterInfo = {}
    #onChange = null;

    constructor(slug, pluralTitle, isChecked, onChange) {
        super();
        this.#filterInfo.pluralTitle = pluralTitle;
        this.#filterInfo.slug = slug;
        this.#filterInfo.isChecked = isChecked;
        this.#onChange = onChange;
        this.element.addEventListener('change', this.#handleChange.bind(this));
    }

    get template(){
        return createFilterOptionView(this.#filterInfo);
    }

    #handleChange(e){
        e.preventDefault();
        const inputElement = e.target;
        if(inputElement.id !== "favorite"){
            this.#onChange(inputElement.id);
        }
        else
            this.#onChange(null, true);
    }
}