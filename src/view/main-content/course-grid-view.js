import AbstractView from "../../framework/view/abstract-view.js";

function createCourseGridView() {
    return `<div class="courses-grid" id="coursesContainer">
            </div>`
}

export default class CoursesGridView extends AbstractView {
    get template() {
        return createCourseGridView();
    }
}