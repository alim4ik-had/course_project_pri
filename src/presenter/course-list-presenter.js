import {render, RenderPosition} from "../framework/render.js";
import CourseCardView from "../view/main-content/course-card-view.js";
import NoCourseView from "../view/main-content/no-course-view.js";
import {openAddModalWindow} from "../main.js";
import LoadingView from "../view/main-content/loading-view.js";
import {UpdateType, UserActions} from "../const.js";

export default class CourseListPresenter{

    #courseGrid = null;
    #courseModel = null;
    #statusModel = null;
    #courseWindowPresenter = null;
    #loadingView = null;
    #sidebar = null;

    constructor(courseGrid, courseModel, statusModel, courseWindowPresenter, sidebar) {
        this.#courseGrid = courseGrid;
        this.#courseModel = courseModel;
        this.#statusModel = statusModel;
        this.#courseWindowPresenter = courseWindowPresenter;
        this.#loadingView = new LoadingView();
        this.#sidebar = sidebar;
        this.#courseModel.addObserver(this.#handleModelChange.bind(this));
    }

    get courses(){
        return this.#courseModel.courseList;
    }
    get statusList(){
        return this.#statusModel.statusList;
    }

    async initCourseGrid(){
        await this.#initData();
        this.#renderCourseList();
    }

    async #initData(){
        this.#renderLoading();
        await this.#sidebar.initSidebar();
        await this.#courseModel.init();
        this.#removeLoading();
    }
    #renderLoading(){
        render(this.#loadingView, this.#courseGrid, RenderPosition.BEFOREEND);
    }
    #removeLoading(){
        this.#loadingView.removeElement();
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

    async #changeFavorite(idCourse){
        await this.#courseModel.changeFavorite(idCourse);
    }

    #handleModelChange(event, payload){
        switch (event){
            case UserActions.ADD_COURSE:
            case UserActions.DELETE_COURSE:
            case UserActions.UPDATE_COURSE:
            case UpdateType.MINOR:
                this.#clearCourseGrid();
                this.#renderCourseList();
                break;
        }
    }
    #clearCourseGrid(){
        this.#courseGrid.innerHTML = '';
    }

    #openWindow(idCourse){
        const course = this.#courseModel.findById(idCourse);
        this.#courseWindowPresenter.initWindow(course);
    }

}