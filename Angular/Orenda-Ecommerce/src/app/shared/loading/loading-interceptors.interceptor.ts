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
    // return next.handle(req).pipe(
    //   tap(
    //     // Khi yêu cầu thành công
    //     () => {},
    //     // Khi yêu cầu gặp lỗi
    //     () => {},
    //     // Khi yêu cầu hoàn tất (dù thành công hay thất bại)
    //     () => {
    //       // Ẩn loading
    //       this.loadingService.hide();
    //     }
    //   )
    // );
  }
}
