import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.statusText === 'Unknown Error') {
          return of(null);
          // No internet connection or backend is down.,
        }

        if (err.status === 500) {
          return of(null);
          // Internal server error,
        }

        if (
          !request.url.includes('auth') &&
          (err.status === 401 || err.status === 403)
        ) {
          // Unauthenticated or unauthorized
        }

        return throwError(() => err);
      })
    );
  }
}
