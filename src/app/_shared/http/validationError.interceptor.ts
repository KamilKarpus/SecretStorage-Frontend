import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable, empty } from "rxjs";
import { finalize, catchError } from "rxjs/operators";
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
export class ValidationErrorInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err:HttpErrorResponse) => {
           
                    
                    console.log(err.error.errorCode);
                    this.toastr.warning(map.get(err.error.errorCode));
                    

                    return empty();
                  
            })
        )
    }
}