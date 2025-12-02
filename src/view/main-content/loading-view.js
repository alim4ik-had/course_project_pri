import AbstractView from "../../framework/view/abstract-view.js";

function createLoadingView(){
    return `<div class="loading-state" id="loadingState">
                <div class="loading-spinner">
                    <div class="spinner-circle"></div>
                    <div class="spinner-circle"></div>
                    <div class="spinner-circle"></div>
                </div>
                <p class="loading-text">Загружаем курсы...</p>
            </div>`
}

export default class LoadingView extends AbstractView{
    get template(){
        return createLoadingView();
    }
}