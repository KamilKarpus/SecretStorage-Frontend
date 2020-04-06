import {organizationModel} from './organization.model';

export class getAllOrganizationsModel {
    public currentPage: number;
    public totalPages: number;
    public pageSize: number;
    public totalCount: number;
    public items: organizationModel[];
    public hasPrevious: boolean;
    public hasNext: boolean;

    constructor(currentPage:number, totalPages: number, pageSize: number, totalCount: number
        ,items: organizationModel[], hasPrevious: boolean, hasNext:boolean){
            this.currentPage= currentPage;
            this.totalPages= totalPages;
            this.pageSize = pageSize;
            this.totalCount = totalCount;

            this.items = items;
            
            this.hasPrevious = hasPrevious;
            this.hasNext = hasNext;
        }
}