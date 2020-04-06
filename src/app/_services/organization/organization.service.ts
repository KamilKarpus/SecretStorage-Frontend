import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseWithID } from 'src/app/_models/response/responseWithId.model';
import { addOrganizationModel } from 'src/app/_models/organization/addOrganization.model';


const baseURL = "api/organization";

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {

  constructor(private http: HttpClient) { }

  public addOrganization(addOrganization: addOrganizationModel):Observable<ResponseWithID> {
    var url = environment.baseBackendUrl + baseURL;
    return this.http.post<ResponseWithID>(url, addOrganization);
  }

  public getAllOrganizations<getAllOrganizationsModel>(currentPage:number, pageSize: number){
    var url = environment.baseBackendUrl + baseURL +"?PageNumber="+currentPage+"&PageSize="+pageSize;
    return this.http.get<getAllOrganizationsModel>(url);
  }

  public deleteOrganization(id: string){
    var url = environment.baseBackendUrl + baseURL+"/"+id;
    return this.http.delete(url);
  }
  
//   public getOneOrganization<getOneOrganizationModel>(id: string){
//     var url = environment.baseBackendUrl + baseURL+"/"+id;
//     return this.http.get<getOneOrganizationModel>(url);
//   }

//   public addUserToOrganization(id: string, userEmail: emailModel){
//     var url = environment.baseBackendUrl + baseURL + "/" + id + "/users";
//     return this.http.post(url, userEmail); 
//   }

//   public changeUserRole(organizationID: string, userID: string, roleID: roleModel){
//     var url = environment.baseBackendUrl + baseURL + "/" + organizationID + "/users/" + userID;
//     console.log(url);
//     return this.http.put(url, roleID);
//   }

//   public deleteUser(organizationId: string, userId: string){
//     var url = environment.baseBackendUrl + baseURL + "/" + organizationId + "/users/" + userId;
//     console.log(url);
//     return this.http.delete(url);
//   }
}
