import AbstractView from "../../framework/view/abstract-view.js";

function createSidebarView(){
    return `<aside class="sidebar">
            </aside>`
}
export default class SidebarView extends AbstractView{
    get template(){
        return createSidebarView();
    }
}