import { Observable, throwError, empty } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler,HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/_services/user/user.service';
import { RefreshTokenModel } from 'src/app/_models/user/RefreshToken.model';
import { responseWithRefreshTokenModel } from 'src/app/_models/response/responseWithRefreshToken.model';
import { ToastrService } from 'ngx-toastr';

let map = new Map<number, string>();
map.set(1202, "Nazwa kolekcji jest zajęta!");
map.set(1002, "Użytkownik już posida tę rolę!")
map.set(1003, "Taka organizacja już istnieje!")
map.set(1005, "Aplikacja istnieje!");
map.set(1006, "Nie można znaleźć użytkownika!");
map.set(1007, "Nazwa organizacji jest już zajęta!");
map.set(1008, "Organizacja nie istnieje!");
map.set(1101,"Email jest zajęty!");
map.set(1102, "Nie znaleziono użytkownika!");
map.set(1103, "Błędne hasło!");
map.set(409, "Nazwa jest zajęta!");
map.set(1104, "Nie można odświeżyć wartości tokena!");
map.set(500, "Taki użytkownik nie istnieje!");

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public userService: UserService, private toastr: ToastrService){}


  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
        setHeaders: {
            'Authorization': `Bearer ${token}`
        }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401 || err.status == 405) {
          
          return this.userService.refreshToken(new RefreshTokenModel(localStorage.getItem('refreshToken')))
          .pipe(
            switchMap((data : responseWithRefreshTokenModel) =>{
            localStorage.setItem('token', data.token);
            localStorage.setItem('refreshToken', data.refreshToken); 
            if(err.error!=null){
              this.toastr.warning(map.get(err.error.errorCode));
            }
            return next.handle(this.addToken(req, data.token));
            }))
        } 
        else if(err.error!=null){
          this.toastr.warning(map.get(err.error.errorCode));
          return empty();
        }
        else {
          return throwError(err);
        }

        
      })
    );
  }

}