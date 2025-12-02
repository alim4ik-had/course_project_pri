
export default class StatusModel{

    #statusList = [];
    #favoriteStatus = []
    #statusApiService = null;
    constructor(apiService) {
        this.#statusApiService = apiService;
    }

    get statusList(){
        return this.#statusList;
    }
    get favoriteStatus(){
        return this.#favoriteStatus;
    }
    set statusList(statusList){
        this.#statusList = statusList;
    }
    async init(){
        try {
            const statuses = await this.#statusApiService.courses;
            this.#statusList = statuses.filter(status => status.slug !== "favorite");
            this.#favoriteStatus = statuses.find(status => status.slug === "favorite");
        }catch (e) {
            this.#statusList = [];
            this.#favoriteStatus = [];
            console.error('Ошибка при получении статусов из сервера: ', e);
        }
    }
}