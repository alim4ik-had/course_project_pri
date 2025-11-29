import AbstractView from "../../framework/view/abstract-view.js";

function createValidationErrorView(message){
    return `<div class="error-content">
                <i class="fas fa-exclamation-circle"></i>
                <span class="error-message" id="errorMessage">${message}</span>
            </div>`
}

export default class ValidationErrorView extends AbstractView{

    #message = null;
    constructor(message) {
        super();
        this.#message = message;
    }
    get template(){
        return createValidationErrorView(this.#message);
    }
    get errorMessageElement(){
        return this.element.querySelector('#errorMessage');
    }
}