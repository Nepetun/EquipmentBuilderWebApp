import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler
  ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    return next.handle(req).pipe(
        catchError(error => {
            // tutaj definiujemy poszczególne errory - interceptor przechwyutuje je i pokazuje odpowiedni komunikat
            if (error.status === 401) {
                return throwError(error.statusText);
            }
            // sprawdzamy czy error jest typu HttpErrorResponse - część errorów z serwera
            if (error instanceof HttpErrorResponse) {
                // Application-Error = ta nazwa musi zgadza sie z nazwą z Extension z Helpera z APi = error 500
                const applicationError = error.headers.get('Application-Error');
                if (applicationError) {
                    return throwError(applicationError);
                }
                // module states error
                const serverError = error.error;

                // errory walidacyjne
                let modalStateErrors = '';
                if (serverError.errors && typeof serverError.errors === 'object') {
                    // tworzenie stringu oddzielonego enterami z informacjami o errorach walidacyjnych
                    for (const key in serverError.errors) {
                        if (serverError.errors[key]) {
                            modalStateErrors += serverError.errors[key] + '\n';
                        }
                    }
                }
                return throwError(modalStateErrors || serverError || 'Server Error' );
            }
        })
    );
  }
}

// ze względu na koniecznośc dodania ErrorInceptora musimy stworzyc provider ktory póxniej dodamy do appmodule
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
