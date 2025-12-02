import ApiService from "../framework/view/api-service.js";
import {Method} from "../const.js";


export default class CourseApiService extends ApiService {

    get courses(){
        return this._load('course')
            .then(ApiService.parseResponse);
    }
    async addCourse(course){
        const response = await this._load(
            'course',
            Method.POST,
            JSON.stringify(course),
            new Headers({'Content-Type': 'application/json'})
        );
        return await ApiService.parseResponse(response);
    }
    async updateCourse(course){
        const response = await this._load(
            `course/${course.id}`,
            Method.PUT,
            JSON.stringify(course),
            new Headers({'Content-Type': 'application/json'})
        );
        return await ApiService.parseResponse(response);
    }
    async deleteCourse(courseId){
        await this._load(
            `course/${courseId}`,
            Method.DELETE,
        );
    }
}