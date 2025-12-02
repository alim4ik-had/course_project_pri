import ModalWindowCourseView from "../view/modal-window-course-edit/modal-window-course-view.js";
import {render, RenderPosition} from "../framework/render.js";
import TaskItemView from "../view/modal-window-course-edit/task-item-view.js";

export default class WindowCoursePresenter{

    #course = null;
    #windowView = null;
    #windowContainer = null;
    #courseModel = null;
    constructor(container, courseModel) {
        this.#windowContainer = container;
        this.#courseModel = courseModel;
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

    async #changeTaskStatus(taskId){
        await this.#courseModel.updateTaskStatus(this.#course, taskId);
        this.#windowView.changeCourseProgress(this.#courseModel.getCourseProgress(this.#course));
    }
    async #deleteCourse(){
        await this.#courseModel.deleteCourses(this.#course.id);
        this.#closeWindow();
    }
}