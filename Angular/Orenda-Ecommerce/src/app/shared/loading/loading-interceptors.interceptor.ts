import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { getCookie } from '../../helpers/helpers';
import { StateLoadingService } from './state-loading.service';

@Injectable()
export class loadingInterceptorsInterceptor implements HttpInterceptor {
  constructor(private loadingService: StateLoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.show();
    return next.handle(req).pipe(finalize(() => this.loadingService.hide()));
  }
}
