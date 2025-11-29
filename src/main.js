import {render, RenderPosition} from "./framework/render.js";
import HeaderView from "./view/main-content/header-view.js";
import CoursesGridView from "./view/main-content/course-grid-view.js";
import CourseListPresenter from "./presenter/course-list-presenter.js";
import SidebarPresenter from "./presenter/sidebar-presenter.js";
import SidebarView from "./view/sidebar/sidebar-view.js";
import StatusModel from "./model/status-model.js";
import CourseModel from "./model/course-model.js";
import AddWindowPresenter from "./presenter/add-window-presenter.js";
import WindowCoursePresenter from "./presenter/window-course-presenter.js";

const statusModel = new StatusModel();
const courseModel = new CourseModel();

const body = document.body;
const divContainer = document.querySelector(".main-content");
const mainContainer = document.querySelector(".courses-section");

const sidebar = new SidebarView();
const courseGrid = new CoursesGridView();

const sidebarPresenter = new SidebarPresenter(sidebar.element, statusModel, courseModel);
const courseWindowPresenter = new WindowCoursePresenter(body, courseModel, sidebarPresenter);
const courseListPresenter = new CourseListPresenter(courseGrid.element, courseModel, statusModel, sidebarPresenter, courseWindowPresenter);
const addWindowPresenter = new AddWindowPresenter(body, courseModel, sidebarPresenter);

render(new HeaderView(openAddModalWindow), body, RenderPosition.AFTERBEGIN);
render(sidebar, divContainer, RenderPosition.AFTERBEGIN);

render(courseGrid, mainContainer, RenderPosition.AFTERBEGIN);

sidebarPresenter.initSidebar();
courseListPresenter.initCourseGrid();


export function openAddModalWindow(){
    addWindowPresenter.initWindow();
}
