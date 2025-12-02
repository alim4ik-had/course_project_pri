
export default class ApiService {

    constructor(endpoint) {
        this._endpoint = endpoint;
    }

    async _load(url, method = 'GET', body= null, headers = new Headers()) {
        const response = await fetch(`${this._endpoint}/${url}`, {
            method,
            body,
            headers
        });

        try{
            ApiService.checkStatus(response);
            return response;
        }catch(err){
            ApiService.catchError(err);
        }

    }

    static checkStatus(response) {
        if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
    }

    static catchError(err){
        throw err;
    }

    static parseResponse(response) {
        return response.json();
    }
}