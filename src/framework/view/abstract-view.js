import {createElement} from "../render.js";


export default class AbstractView{
    constructor(){
        if(new.target === AbstractView){
            throw new Error('Can\'t instantiate AbstractComponent, only concrete one.');
        }
    }
    #element = null;

    get element(){
        if(!this.#element){
            this.#element = createElement(this.template);
        }
        return this.#element;

    }

    get template(){
        throw new Error('Write your component template')
    }

    removeElement(){
        this.element.remove();
        this.#element = null;
    }

    isRemoved(){
        return this.#element === null;
    }
}