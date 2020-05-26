import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const userToken = localStorage.getItem('user_token');

        if (userToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + userToken)
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}