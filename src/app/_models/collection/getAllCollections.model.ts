import {CollectionModel} from './collection.model';

export class getAllCollectionsModel {
    public currentPage: number;
    public totalPages: number;
    public pageSize: number;
    public totalCount: number;
    public items: CollectionModel[];
    public hasPrevious: boolean;
    public hasNext: boolean;

    constructor(currentPage:number, totalPages: number, pageSize: number, totalCount: number
        ,items: CollectionModel[], hasPrevious: boolean, hasNext:boolean){
            this.currentPage= currentPage;
            this.totalPages= totalPages;
            this.pageSize = pageSize;
            this.totalCount = totalCount;
            this.items = items;
            this.hasPrevious = hasPrevious;
            this.hasNext = hasNext;
        }
}