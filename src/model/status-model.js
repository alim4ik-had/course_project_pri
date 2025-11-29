import {status} from "../mock/status.js";


export default class StatusModel{

    #statusList = status.filter(status => status.slug !== "favorite");
    #favoriteStatus = status.find(status => status.slug === "favorite");

    get statusList(){
        return this.#statusList;
    }
    get favoriteStatus(){
        return this.#favoriteStatus;
    }
    set statusList(statusList){
        this.#statusList = statusList;
    }
}