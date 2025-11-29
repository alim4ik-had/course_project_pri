import {render, RenderPosition} from "../framework/render.js";
import CourseCardView from "../view/main-content/course-card-view.js";
import NoCourseView from "../view/main-content/no-course-view.js";
import {openAddModalWindow} from "../main.js";

export default class CourseListPresenter{

    #courseGrid = null;
    #courseModel = null;
    #statusModel = null;
    #sidebar = null;
    #courseWindowPresenter = null;

    constructor(courseGrid, courseModel, statusModel, sidebar, courseWindowPresenter) {
        this.#courseGrid = courseGrid;
        this.#courseModel = courseModel;
        this.#statusModel = statusModel;
        this.#sidebar = sidebar;
        this.#courseWindowPresenter = courseWindowPresenter;
        this.#courseModel.addObserver(this.#handleModelChange.bind(this));
    }

    get courses(){
        return this.#courseModel.courseList;
    }
    get statusList(){
        return this.#statusModel.statusList;
    }

    initCourseGrid(){
        this.#renderCourseList()
    }

    #renderCourseList(){
        let status = null;
        let taskCount = 0;
        let completedTaskCount = 0;

        if(this.courses.length === 0){
            render(new NoCourseView(openAddModalWindow), this.#courseGrid, RenderPosition.BEFOREEND);
        }

        for(let i = 0; i < this.courses.length; i++){
            status = this.statusList.find(status => status.slug === this.courses[i].status);
            taskCount = this.courses[i].tasks.length;
            completedTaskCount = this.courses[i].tasks.filter(task => task.isComplete).length;
            render(new CourseCardView(status, this.courses[i], taskCount, completedTaskCount,
                this.#changeFavorite.bind(this), this.#openWindow.bind(this)), this.#courseGrid, RenderPosition.BEFOREEND);
        }
    }

    #changeFavorite(idCourse){
        this.#courseModel.changeFavorite(idCourse);
        this.#sidebar.reloadAfterChangeCourse();
    }

    #handleModelChange(){
        this.#clearCourseGrid();
        this.#renderCourseList();
    }
    #clearCourseGrid(){
        this.#courseGrid.innerHTML = '';
    }

    #openWindow(idCourse){
        const course = this.#courseModel.findById(idCourse);
        this.#courseWindowPresenter.initWindow(course);
    }

}