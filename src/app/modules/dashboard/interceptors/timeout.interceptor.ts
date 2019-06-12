import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeoutValue = Number(req.headers.get('timeout')) || 10000; //10 Sec

    return next.handle(req).pipe(timeout(timeoutValue),
    catchError((error: HttpErrorResponse) => {
        if (error.status !== 401) {
          // 401 handled in auth.interceptor
          this.toastr.error(error.message);
        }
        return throwError(error);
      }));
  }
}
