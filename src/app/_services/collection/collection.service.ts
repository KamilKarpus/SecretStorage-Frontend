import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {AddNewCollectionModel} from '../../_models/collection/addNewCollection.model';
import { addNewResourceModel } from 'src/app/_models/collection/addNewResource.model';
import { EditResourceModel } from 'src/app/_models/collection/editResource.model';
const baseURL = "api/";

@Injectable({
  providedIn: 'root',
})



export class CollectionService {

    constructor(private http: HttpClient) { }

    public addNewCollection(organizationId: string, addNewCollection: AddNewCollectionModel){
        var url = environment.baseBackendUrl + baseURL + organizationId + "/collections";
        return this.http.post(url, addNewCollection);
    }
    public getAllCollections<getAllCollectionsModel>(currentPage:number, pageSize: number, organizationId: string){
        var url = environment.baseBackendUrl + baseURL + organizationId + "/collections?PageNumber="+ currentPage +"&PageSize=" + pageSize;
        return this.http.get<getAllCollectionsModel>(url);
    }

    public addNewResource(organizationId: string, collectionId: string, addNewResource: addNewResourceModel){
      var url = environment.baseBackendUrl + baseURL + organizationId + "/collections/" + collectionId + "/resource";
      return this.http.post(url, addNewResource);
    }

    public getCollection<getCollectionById>(organizationId: string, collectionId: string){
      var url = environment.baseBackendUrl + baseURL + organizationId + "/collections/" + collectionId;
      return this.http.get<getCollectionById>(url);
    }

    public getEncryptedValueById<encryptedValueModel>(organizationId: string, collectionId: string, resourceId: string){
      var url = environment.baseBackendUrl + baseURL + organizationId + "/collections/" + collectionId + 
        "/resource/" + resourceId + "/encrypted";
      return this.http.get<encryptedValueModel>(url);
    }

    public getResourceInfo<GetResourceInfoModel>(organizationId: string, collectionId: string, resourceId: string){
      var url = environment.baseBackendUrl + baseURL + organizationId + "/collections/" + collectionId + 
                "/resource/" + resourceId;
      return this.http.get<GetResourceInfoModel>(url);
    }

    public getResourceLogs<GetResourceLogsModel>(resourceId: string, organizationId: string, PageNumber: number, PageSize: number){
      var url = environment.baseBackendUrl + baseURL + organizationId + "/collections/resource/" +
       resourceId + "/logs?PageNumber=" + PageNumber + "&PageSize=" + PageSize;
      return this.http.get<GetResourceLogsModel>(url);
    }

    public editResource(organizationId: string, collectionId: string, resourceId: string, resource: EditResourceModel){
      var url = environment.baseBackendUrl + baseURL + organizationId + "/collections/" + collectionId + 
                "/resource/" + resourceId;
      return this.http.put(url, resource);
    }
    

}