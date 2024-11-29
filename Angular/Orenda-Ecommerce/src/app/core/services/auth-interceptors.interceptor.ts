import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getCookie } from '../../helpers/helpers';

@Injectable()
export class authInterceptorsInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //const token = localStorage.getItem('access_token');
    const access_token = getCookie('access_token');
    if (access_token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
