import Observable from "../framework/observable.js";
import {UpdateType, UserActions} from "../const.js";

export default class CourseModel extends Observable{

    #courseApiService = null;
    #finalCourseList = [];
    #courseList = [];
    #foundCourseList = null
    #isFavoriteChecked = false;
    #checkedStatuses = [];

    constructor(apiService) {
        super();
        this.#courseApiService = apiService;
    }

    get courseList(){
        return this.#courseList;
    }
    set courseList(courseList){
        this.#courseList = courseList;
    }

    async init(){
        try {
            this.#finalCourseList = await this.#courseApiService.courses;
        }catch (e) {
            this.#finalCourseList = [];
        }
        this.#courseList = this.#finalCourseList;
        this._notify(UpdateType.INIT)
    }

    updateFilterParams(isFavoriteChecked, checkedStatuses){
        this.#isFavoriteChecked = isFavoriteChecked;
        this.#checkedStatuses = checkedStatuses;
        this._notify(UpdateType.MINOR);
    }
    filterCourses(){
        let favoriteList = this.#filterByFavorite(this.#isFavoriteChecked);
        if(this.#checkedStatuses.length > 0)
            this.courseList = favoriteList.filter(course => this.#checkedStatuses.some(status => course.status === status.slug));
        else
            this.courseList = favoriteList;


        if(this.#foundCourseList?.length > 0){
            this.courseList = this.courseList.filter(course =>
                this.#foundCourseList.some(foundCourse => course.id === foundCourse.id));
        }
        else if(this.#foundCourseList?.length === 0){
            this.courseList = this.#foundCourseList;
        }
    }

    searchCourse(text){
        if(!text){
            this.#foundCourseList = null
        }else{
            this.#foundCourseList = this.#finalCourseList.filter(course =>
                course.title.toLowerCase().includes(text) || course.description.toLowerCase().includes(text));
        }
        this._notify(UpdateType.MINOR);
    }

    async createCourse(title, description, tasksTitle){
        if(!description)
            description = '';
        const tasks = []
        let taskId = 1;
        for(let task of tasksTitle){
            tasks.push({
                id: taskId.toString(),
                title: task,
                isComplete: false
            });
            taskId++;
        }
        // id для course будет присваиваться на стороне сервера
        const course = {
            title: title,
            description: description,
            tasks: tasks,
            isFavorite: false,
            status: "no-started",
        }
        try{
            const createdCourse = await this.#courseApiService.addCourse(course);
            this.#finalCourseList.push(createdCourse);
            this._notify(UserActions.ADD_COURSE, createdCourse);
        }catch (e){
            console.error('Ошибка при добавлении курса на сервер: ', e);
        }


    }

    async changeFavorite(idCourse){
        const course = this.courseList.find(course => course.id === idCourse);
        try{
            course.isFavorite = !course.isFavorite;
            const updatedCourse = await this.#courseApiService.updateCourse(course);
            this._notify(UserActions.UPDATE_COURSE, updatedCourse);
        }catch (e){
            course.isFavorite = !course.isFavorite;
            console.error('Ошибка при добавлении курса в избранное: ', e);
        }

    }

    async updateTaskStatus(course, taskId){
        const task = course.tasks.find(task => task.id === taskId);
        const oldStatus = course.status;
        try{
            task.isComplete = !task.isComplete;
            this.#updateCourseStatus(course);
            const updatedCourse = await this.#courseApiService.updateCourse(course);
            this._notify(UserActions.UPDATE_COURSE, updatedCourse);
        }catch (e){
            task.isComplete = !task.isComplete;
            course.status = oldStatus;
            console.error(`Ошибка при изменении статуса задачи ${task.id}: `, e);
        }
    }

    getCourseProgress(course){
        const taskCount = course.tasks.length;
        const completedTaskCount = course.tasks.filter(task => task.isComplete).length;
        return Math.round((completedTaskCount/taskCount)*100);
    }

    async deleteCourses(courseId){
        try{
            await this.#courseApiService.deleteCourse(courseId);
            this.#finalCourseList = this.#finalCourseList.filter(course => course.id !== courseId);
            this._notify(UserActions.DELETE_COURSE, {courseId: courseId});
        }catch (e){
            console.error(`Ошибка при удалении курса : `, e);
        }
    }

    #filterByFavorite(isChecked){
        if(isChecked){
            return this.#finalCourseList.filter(course => course.isFavorite);
        }
        else{
            return this.#finalCourseList;
        }
    }

    findById(id){
        return this.#finalCourseList.find(course => course.id === id);
    }

    #updateCourseStatus(course){
        const progress = this.getCourseProgress(course);

        switch (true){
            case (progress === 0):
                course.status = "no-started";
                break;
            case (progress > 0 && progress < 100):
                course.status = "in-progress";
                break;
            default:
                course.status = "completed";
                break;
        }
    }
}