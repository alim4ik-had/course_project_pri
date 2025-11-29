import ModalWindowCourseView from "../view/modal-window-course-edit/modal-window-course-view.js";
import {render, RenderPosition} from "../framework/render.js";
import TaskItemView from "../view/modal-window-course-edit/task-item-view.js";

export default class WindowCoursePresenter{

    #course = null;
    #windowView = null;
    #windowContainer = null;
    #courseModel = null;
    #sidebar = null;
    constructor(container, courseModel, sidebar) {
        this.#windowContainer = container;
        this.#courseModel = courseModel;
        this.#sidebar = sidebar;
    }

    initWindow(course){
        this.#course = course;
        this.#windowView = new ModalWindowCourseView(this.#prepareData(course), this.#closeWindow.bind(this), this.#deleteCourse.bind(this));
        render(this.#windowView, this.#windowContainer, RenderPosition.BEFOREEND);
        this.#renderTasks(course, this.#windowView.taskListContainer)
    }

    #prepareData(course){
        const taskCount = course.tasks.length;
        const completedTaskCount = course.tasks.filter(task => task.isComplete).length;
        const progress = this.#courseModel.getCourseProgress(course);
        return {
            isActive: true,
            title: course.title,
            description: course.description,
            taskCount: taskCount,
            completedTaskCount: completedTaskCount,
            progress: progress,
        }
    }
    #renderTasks(course, container){
        course.tasks.forEach(task => {
            render(new TaskItemView(task, this.#changeTaskStatus.bind(this)), container, RenderPosition.BEFOREEND);
        })
    }
    #closeWindow(){
        this.#windowView.removeElement();

    }

    #changeTaskStatus(taskId){
        this.#courseModel.updateTaskStatus(this.#course, taskId);
        this.#sidebar.reloadAfterChangeCourse();
        this.#windowView.changeCourseProgress(this.#courseModel.getCourseProgress(this.#course));
    }
    #deleteCourse(){
        this.#courseModel.deleteCourse(this.#course.id);
        this.#sidebar.reloadAfterChangeCourse();
        this.#closeWindow();
    }
}