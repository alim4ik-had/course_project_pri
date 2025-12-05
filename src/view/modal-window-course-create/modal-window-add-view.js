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
    #boundFuncKey = null;
    #boundFuncClick = null;

    constructor(isActive, keyDown) {
        super();
        this.#isActive = isActive;
        this.#keyDown = keyDown;
        this.#boundFuncKey =  this.#handleKeyDown.bind(this);
        this.#boundFuncClick =  this.#handleCloseClick.bind(this);
        document.addEventListener('keydown', this.#boundFuncKey);
        document.addEventListener('click', this.#boundFuncClick);
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
        document.removeEventListener('keydown', this.#boundFuncKey);
        document.removeEventListener('click', this.#boundFuncClick);
    }
    #handleKeyDown = (e) => {
        e.preventDefault();
        if(e.key === 'Escape' && !this.isRemoved()){
            document.removeEventListener('keydown', this.#boundFuncKey);
            document.removeEventListener('click', this.#boundFuncClick);
            this.#keyDown();
        }
    }
    #handleCloseClick = (e) => {
        e.preventDefault();
        if(e.target === this.element){
            console.log("fff")
            document.removeEventListener('click', this.#boundFuncClick);
            document.removeEventListener('keydown', this.#boundFuncKey);
            this.#keyDown();
        }
    }
}