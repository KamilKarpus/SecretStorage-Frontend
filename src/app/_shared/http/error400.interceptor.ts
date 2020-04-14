import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable, empty } from "rxjs";
import { finalize, catchError } from "rxjs/operators";
import { LoaderService } from '../../_services/loader/loader.service';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class Error400Interceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err:HttpErrorResponse) => {
                if(err.status==400){
                    console.log("400");
                    console.log(err);
                    //this.toastr.warning(err.error.errors[0])
                    var message = ""

                    return empty();
                }
            })
        )
    }
}