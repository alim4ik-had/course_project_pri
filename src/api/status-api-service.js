import ApiService from "../framework/view/api-service.js";


export default class StatusApiService extends ApiService {

    get courses(){
        return this._load('status')
            .then(ApiService.parseResponse);
    }
}