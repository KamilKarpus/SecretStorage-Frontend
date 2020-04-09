import { resourceModel } from './resource.model';

export class getCollectionsByIdModel {

    id: string;
    name: string;
    resources: resourceModel[];

    constructor(id: string, name: string, resources: resourceModel[]){
        this.id = id;
        this.name = name; 
        this.resources = resources;
    }
}