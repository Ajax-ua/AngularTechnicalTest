import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (/^https?:\/\//i.test(req.url)) {
      return next.handle(req);
    }

    const baseUrl = /\/$/.test(environment.apiUrl) ?
      environment.apiUrl.substring(0, environment.apiUrl.length - 1) :
      environment.apiUrl;

    const requestUrl = /^\//.test(req.url) ? req.url.substring(1, req.url.length) : req.url;

    const requestWithBaseUrl = req.clone({
      url: baseUrl ? `${baseUrl}/${requestUrl}` : req.url,
    });

    return next.handle(requestWithBaseUrl);
  }
}
