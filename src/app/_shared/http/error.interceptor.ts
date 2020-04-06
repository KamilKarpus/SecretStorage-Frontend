import { Observable, throwError, empty } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler,HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/_services/user/user.service';
import { RefreshTokenModel } from 'src/app/_models/user/RefreshToken.model';
import { responseWithRefreshTokenModel } from 'src/app/_models/response/responseWithRefreshToken.model';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public userService: UserService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401) {
          
          this.userService.refreshToken(new RefreshTokenModel(localStorage.getItem('refreshToken')))
          .subscribe(data=>{
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('refreshToken', data.refreshToken); 
            return next.handle(req);
          })
          
          // return empty();
        } 
        else {
          return throwError(err);
        }

        
      })
    );
  }

}