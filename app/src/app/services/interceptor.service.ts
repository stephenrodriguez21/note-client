import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getAuthToken();

        if (token) {
            // If we have a token, we set it to the header
            request = request.clone({
                setHeaders: { 'x-token': `${token}` }
            });
        }

        return next.handle(request).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 403) {
                        if (this.authService.getAuthToken()) {
                            this.authService.logout().subscribe(() => {
                                window.location.reload();
                            })
                        }
                    }
                }
                return throwError(err);
            })
        )
    }
}