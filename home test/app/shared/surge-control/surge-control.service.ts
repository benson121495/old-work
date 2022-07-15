import { Injectable } from '@angular/core';
import surgeInfo from 'src/assets/config/surge-config.json';
import { Observable, Subject } from 'rxjs';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { CommonService } from 'src/app/common.service.js';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SurgeControlService {
  surgePopupDisplay = false;
  idleTime: number;
  source: any;
  refreshTokenInterval: NodeJS.Timer;
  eightMinRefreshTokenInterval: NodeJS.Timer;
  currentUrl: any;
  ticketId: any;
  subject = new Subject<any>();
  surgeInformation: any;
  allowSurge = true;
  overAllTimeOutInterval: NodeJS.Timer;
  overallTimeOutPopup: boolean;
  overallTimeOutReleaseToken: NodeJS.Timer;

  constructor(
    private router: Router,
    private commonService: CommonService) {

  }

  surgeManagement(appId, ticketId) {
    if (appId && ticketId && surgeInfo && surgeInfo[appId]) {
      this.commonService.applicationId = '';
      this.surgeInformation = surgeInfo[appId];
      const surgeStatus = surgeInfo[appId].enableSurge;
      this.ticketId = ticketId;
      if (this.surgeInformation && surgeStatus) {
        let renewTokenTime;
        this.router.events
          .pipe(filter(e => e instanceof NavigationEnd))
          .subscribe((e) => {
            if (e instanceof NavigationEnd) {
              this.currentUrl = e.url;
              if (this.currentUrl.includes('?')) {
                this.currentUrl = this.currentUrl.split('?')[0];
              }
              if (this.currentUrl && this.surgeInformation.formPageUrls.includes(this.currentUrl)) {
                this.refreshToken();
                this.allowSurge = true;
                renewTokenTime = this.surgeInformation.formPageTimeout;
                this.renewToken();
                this.idleTimer(renewTokenTime);
              } else if (this.currentUrl && (this.surgeInformation.releaseTokenUrls.includes(this.currentUrl))) {
                this.releaseTokenWithoutNavigate();
                this.allowSurge = false;
                // Clear all intervals
                if (this.refreshTokenInterval) {
                  clearInterval(this.refreshTokenInterval);
                }
                if (this.eightMinRefreshTokenInterval) {
                  clearInterval(this.eightMinRefreshTokenInterval);
                }
              } else if (this.currentUrl && this.surgeInformation.skipUrls.includes(this.currentUrl)) {
                this.releaseToken();
                this.allowSurge = false;
                // Clear all intervals
                if (this.refreshTokenInterval) {
                  clearInterval(this.refreshTokenInterval);
                }
                if (this.eightMinRefreshTokenInterval) {
                  clearInterval(this.eightMinRefreshTokenInterval);
                }
              } else if (this.currentUrl && this.surgeInformation.noTicketReleaseUrl.includes(this.currentUrl)) {
                this.releaseTokenWithoutNavigate();
              } else {
                this.refreshToken();
                this.allowSurge = true;
                renewTokenTime = this.surgeInformation.normalTimeout;
                this.renewToken();
                this.idleTimer(renewTokenTime);
              }
              this.commonService.urlLangSwitchUpdate(e);
            }
          });
        if (this.surgeInformation.overallTimeout && this.surgeInformation.overallTimeoutTime) {
          this.overallTimeOut(this.surgeInformation.overallTimeoutTime);
        }
      }
    } else {
      console.log('Surge service without appid & ticket id');
      this.router.navigate(['/session-timeout']);
    }
  }

  overallTimeOut(timeVal) {
    this.overAllTimeOutInterval = setTimeout(() => {
      if (!this.overallTimeOutPopup) {
        this.renewToken();
      }
      this.overallTimeOutPopup = true;
      this.overallTimeOutReleaseToken = setTimeout(() => {
        this.overallTimeOutPopup = false;
        this.releaseToken();
      }, surgeInfo.modalTimeOut * 1000);
    }, timeVal * 1000);
  }

  renewToken() { // Renew ticket id in every url change
    this.commonService.renewTicketId(this.ticketId).subscribe((response: any) => {
      const result = response;
    });
  }

  refreshToken() { // Refresh ticket id in every 8 minutes
    if (this.eightMinRefreshTokenInterval) {
      clearInterval(this.eightMinRefreshTokenInterval);
    }
    this.eightMinRefreshTokenInterval = setInterval(() => {
      this.commonService.renewTicketId(this.ticketId).subscribe((response: any) => {
        const result = response;
      });
    }, surgeInfo.defaultTime * 1000);
  }

  releaseTokenWithoutNavigate() { // Release the ticket id without navigate
    if (!this.commonService.ticketReleased) {
      this.commonService.releaseTicketId(this.ticketId).subscribe((response: any) => {
        this.commonService.ticketReleased = true;
        const result = response;
      });
      sessionStorage.removeItem('ticketId');
    }
  }

  releaseToken() { // Release the ticket id
    if (!this.commonService.ticketReleased) {
      this.commonService.releaseTicketId(this.ticketId).subscribe((response: any) => {
        this.commonService.ticketReleased = true;
        const result = response;
      });
      sessionStorage.removeItem('ticketId');
      console.log('Surge service relase function');
      this.router.navigate(['/session-timeout']);
    }
  }

  idleTimer(renewTokenTime) {
    console.log('Renew Token Time = ', renewTokenTime);
    if (this.refreshTokenInterval) {
      clearInterval(this.refreshTokenInterval);
    }
    this.refreshTokenInterval = setInterval(() => {
      this.subject.next({ 'surgePopupDisplay': true });
    }, renewTokenTime * 1000);
  }

  showModal() {
    this.subject.next({ 'surgePopupDisplay': true });
  }

  hideModal() {
    this.subject.next({ 'surgePopupDisplay': false });
  }

  sendModalStatus(surgePopupDisplay: any) {
    this.subject.next({ 'surgePopupDisplay': surgePopupDisplay });
  }

  clearMessages() {
    this.subject.next({ 'surgePopupDisplay': 'stop' });
    if (this.refreshTokenInterval) {
      clearInterval(this.refreshTokenInterval);
    }
  }

  getModalStatus(): Observable<any> {
    return this.subject.asObservable();
  }

}
