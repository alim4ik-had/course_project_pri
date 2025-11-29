import AbstractView from "./view/abstract-view.js";

export const RenderPosition = {
    BEFOREBEGIN: 'beforebegin',
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
    AFTEREND: 'afterend',
};

export function createElement(template) {
    const container = document.createElement("div");
    container.innerHTML = template;
    return container.firstChild;
}

export function render(component, container, position = RenderPosition.BEFOREBEGIN) {
    if(!component instanceof AbstractView) {
        throw new Error('Can render only components');
    }
    if(component == null){
        throw new Error('Can not render null component');
    }
    container.insertAdjacentElement(position, component.element);
}