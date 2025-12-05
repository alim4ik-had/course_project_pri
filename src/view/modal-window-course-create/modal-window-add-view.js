import AbstractView from "../../framework/view/abstract-view.js";

function createModalWindowAddView(isActive){
    return `<div class="modal-overlay ${isActive? "active" : ''}" id="addCourseModal">
                <div class="modal">
                    <div class="modal-header">
                        <h2 class="modal-title">Добавить новый курс</h2>
                        <button class="close-btn" id="closeAddModal">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="validation-error" id="validationError" style="display: none;">
                        
                    </div>
                    <div class="modal-body">
                        
                    </div>
                </div>
            </div>`
}

export default class ModalWindowAddView extends AbstractView{

    #isActive = false;
    #keyDown = null;

    constructor(isActive, keyDown) {
        super();
        this.#isActive = isActive;
        this.#keyDown = keyDown;
        document.addEventListener('keydown', this.#handleKeyDown.bind(this));
        this.element.querySelector("#closeAddModal").addEventListener("click", this.#handleCloseWindow.bind(this));
    }
    get template(){
        return createModalWindowAddView(this.#isActive);
    }

    get modalBody(){
        return this.element.querySelector('.modal-body');
    }
    get validErrorContainer(){
        return this.element.querySelector('.validation-error');
    }

    #handleCloseWindow = (e) => {
        e.preventDefault();
        this.removeElement();
    }
    #handleKeyDown = (e) => {
        e.preventDefault();
        if(e.key === 'Escape' && !this.isRemoved())
            this.#keyDown();
    }
}