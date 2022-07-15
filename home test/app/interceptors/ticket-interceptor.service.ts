import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TicketInterceptorService implements HttpInterceptor {
  ticketId: string;
  appId: any;
  systemErrorUrlPath = 'static/systembusy/en-US/system_error.html';
  constructor(
    private router: Router,
    public  commonService: CommonService,
    private translateService: TranslateService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isOnline = window.navigator.onLine;

    if (this.commonService.token) {
      this.ticketId = this.commonService.token;
    }

    if (this.ticketId && null != this.ticketId) {
      request = request.clone({
        setHeaders: {
          'ticketId': this.ticketId
        }
      });
    }
    if (isOnline) {
    return next.handle(request)
      .pipe(tap(
        (response: HttpEvent<any>) => { },
        (error: HttpErrorResponse) => {
          if (error.status === 499) {
            this.router.navigate(['/session-timeout']);
          }
          if (String(error.status).startsWith('5')) {
            window.location.href = this.getSystemErrorLink();
          }
        },
        () => {}
      ));
    } else {
      setTimeout(() => {
        this.commonService.setShowLoading(false);
      }, 100);
      return EMPTY;
    }
  }

  private getSystemErrorLink(): string {
    return environment.fEBaseUrl + 'static/systembusy/' + this.translateService.currentLang + '/system_error.html';
  }
}
