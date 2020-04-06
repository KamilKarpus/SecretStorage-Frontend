import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin } from 'src/app/_models/user/UserLogin.model';
import { ResponseWithToken } from 'src/app/_models/response/responseWithToken.model';
import { UserRegister } from 'src/app/_models/user/UserRegister.model';
import { ResponseWithID } from 'src/app/_models/response/responseWithId.model';
import { throwError } from 'rxjs';
import { catchError,  } from 'rxjs/operators';
import { RefreshTokenModel } from 'src/app/_models/user/RefreshToken.model';
import { responseWithRefreshTokenModel } from 'src/app/_models/response/responseWithRefreshToken.model';

const baseURL = "api/users";

@Injectable({
  providedIn: 'root',
})
export class UserService {
    
  constructor(private http: HttpClient) { }

  public registerUser(user: UserRegister):Observable<ResponseWithID> {
    var url = environment.baseBackendUrl + baseURL +"/register";
    return this.http.post<ResponseWithID>(url,user).pipe(catchError(this.errorHandler));
  }
  
  public loginUser(user: UserLogin ){
    var url = environment.baseBackendUrl + baseURL + "/connect/token";
    return this.http.post<ResponseWithToken>(url, user).pipe(catchError(this.errorHandler));
  }

  public refreshToken(tokenModel: RefreshTokenModel):Observable<responseWithRefreshTokenModel>{
    var url = environment.baseBackendUrl + baseURL + "/connect/token/refresh";
    return this.http.post<responseWithRefreshTokenModel>(url,tokenModel);
  }

  errorHandler(error: HttpErrorResponse){
      return throwError(error.error)
  }

}
