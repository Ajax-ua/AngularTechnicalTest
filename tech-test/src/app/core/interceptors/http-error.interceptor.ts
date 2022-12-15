import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { NEVER, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApplicationService } from '../services';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private applicationService: ApplicationService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const skipErrorHandling = req.headers.get('skipErrorHandling');
    if (skipErrorHandling) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        const defaultMessage = 'Something went wrong';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = error.error.message;
        } else {
          // server-side error
          errorMessage = error.message;
        }
        errorMessage = errorMessage || defaultMessage;
        this.applicationService.showErrorToastr(errorMessage);
        return NEVER;
      }),
    );
  }
}
