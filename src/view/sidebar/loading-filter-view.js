import AbstractView from "../../framework/view/abstract-view.js";

function createLoadingFilterView(){
    return `<div>
                Загрузка фильтров...
            </div>`
}

export default class LoadingFilterView extends AbstractView{
    get template(){
        return createLoadingFilterView();
    }
}