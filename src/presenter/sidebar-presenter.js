import SearchCourseView from "../view/sidebar/search-course-view.js";
import FilterSectionContainerView from "../view/sidebar/filter-section-container-view.js";
import {render, RenderPosition} from "../framework/render.js";
import FilterOptionView from "../view/sidebar/filter-option-view.js";

export default class SidebarPresenter{

    #sidebarContainer = null;
    #searchInput = null;
    #filterSection = null;
    #statusModel = null;
    #courseModel = null;

    constructor(sidebarContainer, statusModel, courseModel) {
        this.#sidebarContainer = sidebarContainer;
        this.#searchInput = new SearchCourseView(this.#searchFilter.bind(this));
        this.#statusModel = statusModel;
        this.#courseModel = courseModel;
    }

    get statusList(){
        return this.#statusModel.statusList;
    }
    get checkedStatusList(){
        return this.statusList.filter(status => status.isChecked);
    }
    get favoriteStatus(){
        return this.#statusModel.favoriteStatus;
    }

    initSidebar(){
        this.#renderSearchInput();
        this.#renderStatusFilter()
        this.#renderFavoriteFilter()
    }

    #renderSearchInput(){
        render(this.#searchInput, this.#sidebarContainer, RenderPosition.AFTERBEGIN);
    }

    #renderStatusFilter(){
        this.#filterSection = new FilterSectionContainerView("Статус");
        render(this.#filterSection, this.#sidebarContainer, RenderPosition.BEFOREEND);
        for(let i = 0; i < this.statusList.length; i++){
            this.#renderFilterItem(this.#filterSection.filterOptionsContainer, this.statusList[i].slug,
                this.statusList[i].pluralTitle, this.statusList[i].isChecked, this.#filterCourse.bind(this));
        }
    }

    #renderFilterItem(itemContainer, statusSlug, statusPluralTitle, isChecked, onChange){
        render(new FilterOptionView(statusSlug, statusPluralTitle, isChecked, onChange), itemContainer, RenderPosition.BEFOREEND);
    }

    #renderFavoriteFilter(){
        this.#filterSection = new FilterSectionContainerView("Избранное");
        render(this.#filterSection, this.#sidebarContainer, RenderPosition.BEFOREEND);
        this.#renderFilterItem(this.#filterSection.filterOptionsContainer,this.favoriteStatus.slug,
            this.favoriteStatus.pluralTitle, this.favoriteStatus.isChecked, this.#filterCourse.bind(this));
    }

    #filterCourse(slug = null, isFavoriteChange = false){
        if(isFavoriteChange)
            this.favoriteStatus.isChecked = !this.favoriteStatus.isChecked;
        if(slug){
            const status = this.statusList.find(status => status.slug === slug);
            status.isChecked = !status.isChecked;
        }
        this.#courseModel.filterCourses(this.favoriteStatus.isChecked, this.checkedStatusList);
    }

    #searchFilter(text) {
        this.#courseModel.searchCourse(text);
        this.#filterCourse();
    }

    reloadAfterChangeCourse(){
        this.#filterCourse();
    }
}