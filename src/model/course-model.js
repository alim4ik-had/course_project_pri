import Observable from "../framework/observable.js";
import {courses} from "../mock/courses.js";
import {generateID} from "../utils.js";

export default class CourseModel extends Observable{

    #finalCourseList = courses;
    #courseList = courses;
    #foundCourseList = null

    get courseList(){
        return this.#courseList;
    }
    set courseList(courseList){
        this.#courseList = courseList;
    }

    filterCourses(isFavoriteChecked, checkedStatuses){
        let favoriteList = this.#filterByFavorite(isFavoriteChecked);
        if(checkedStatuses.length > 0)
            this.courseList = favoriteList.filter(course => checkedStatuses.some(status => course.status === status.slug));
        else
            this.courseList = favoriteList;


        if(this.#foundCourseList?.length > 0){
            this.courseList = this.courseList.filter(course =>
                this.#foundCourseList.some(foundCourse => course.id === foundCourse.id));
        }
        else if(this.#foundCourseList?.length === 0){
            this.courseList = this.#foundCourseList;
        }
        this._notify()
    }

    searchCourse(text){
        if(!text){
            this.#foundCourseList = null
        }else{
            this.#foundCourseList = this.#finalCourseList.filter(course =>
                course.title.toLowerCase().includes(text) || course.description.toLowerCase().includes(text));
        }
    }

    createCourse(title, description, tasksTitle){
        if(!description)
            description = 'Описание отсутствует';
        const tasks = []
        let taskId = 1;
        for(let task of tasksTitle){
            tasks.push({
                id: taskId,
                title: task,
                isComplete: false
            });
            taskId++;
        }
        const course = {
            id: generateID(),
            title: title,
            description: description,
            tasks: tasks,
            isFavorite: false,
            status: "no-started"
        }

        this.#finalCourseList.push(course);

    }

    changeFavorite(idCourse){
        const course = this.courseList.find(course => course.id === parseInt(idCourse));
        course.isFavorite = !course.isFavorite;
    }

    updateTaskStatus(course, taskId){
        const task = course.tasks.find(task => task.id === parseInt(taskId));
        task.isComplete = !task.isComplete;
        this.#updateCourseStatus(course);
    }

    getCourseProgress(course){
        const taskCount = course.tasks.length;
        const completedTaskCount = course.tasks.filter(task => task.isComplete).length;
        return Math.round((completedTaskCount/taskCount)*100);
    }

    deleteCourse(courseId){
        this.#finalCourseList = this.#finalCourseList.filter(course => course.id !== parseInt(courseId));
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
        return this.#finalCourseList.find(course => course.id === parseInt(id));
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