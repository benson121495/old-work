import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from './common.service';
import { Router, ActivatedRoute, Event, NavigationEnd, RoutesRecognized } from '@angular/router';

import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import 'rxjs/Rx';

import surgeInfo from '../assets/config/surge-config.json';
import { environment } from 'src/environments/environment';
import { SurgeControlService } from './shared/surge-control/surge-control.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'eservices2';
  appId: any;
  ticketId: any;
  applicationId: any;
  modalStatusSubscriber: any;
  modalStatus: any;
  isConfirmed: boolean;
  key: string;


  public constructor(
    private translate: TranslateService,
    public commonService: CommonService,
    public surgeControlService: SurgeControlService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private _hotkeysService: HotkeysService
  ) {
    // localStorage.removeItem('appId');
    const modulePath = (this.router.url);
    const url: string = document.location.href;
    if (url.includes('/zh-HK')) {
      this.translate.setDefaultLang('zh-HK');
      this.translate.use('zh-HK');
    } else if (url.includes('/zh-CN')) {
      this.translate.setDefaultLang('zh-CN');
      this.translate.use('zh-CN');
    } else {
      this.translate.setDefaultLang('en-US');
      this.translate.use('en-US');
    }
    if (url.includes('/illustrate-declaration')) {
      this.commonService.illustratePage = true;
    }

    this._hotkeysService.add(new Hotkey(['alt+left', 'alt+right'], (event: KeyboardEvent): boolean => {
      return false;
    }));

  }

  ngOnInit() {
    if (environment && !environment.surgeBypassFlag) {
      this.activeRouter.queryParams
        .skip(1)
        .subscribe(params => {
          this.appId = params.applicationId;
          this.ticketId = params.ticketId;
          if (this.appId && this.ticketId) {
            localStorage.setItem('appId', '123');
            localStorage.setItem('ticketId', this.ticketId);
            this.commonService.token = this.ticketId;
            this.commonService.applicationId = this.appId;
            this.surgeControlService.surgeManagement(this.appId, this.ticketId);
            this.initModalStatusSubscriber();
          } else {
            this.checkSession();
          }
        });
      if (!window.location.href.includes('applicationId') && !window.location.href.includes('ticketId')) {
        this.checkSession();
      }
    } else {
      this.initNavigationInterceptor();
    }
    document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    }, false);
  }
  /**
   *  Check token and appid present in localstorage, if yes, use it, otherwise, redirect to sessiontimeout.
   */
  private checkSession() {
    // check for no surge urls
    if (this.matchNoSurgeUrlPrefix()) {
      return;
    }

    const persistedAppId = localStorage.getItem('appId');
    const persistedTicketId = localStorage.getItem('ticketId');
    console.log('appid= ' + this.appId + ' ticketId= ' + this.ticketId);
    if (!this.commonService.token && persistedAppId && persistedTicketId) {
      this.commonService.token = persistedTicketId;
      this.commonService.applicationId = persistedAppId;
      this.appId = persistedAppId;
      this.ticketId = persistedTicketId;
      this.surgeControlService.surgeManagement(persistedAppId, persistedTicketId);
      this.initModalStatusSubscriber();
      this.router.navigate([this.translate.currentLang]);
    } else {
      if (!this.commonService.token) {
        // this.router.navigate(['/session-timeout']);
      }
    }
  }

  /**
   *  Check if it is no surge url.
   */
  matchNoSurgeUrlPrefix() {
    const noSurgeUrlsPrefixes = surgeInfo['noSurgeUrlPrefixes'];
    for (const noSurgeUrlPrefix of noSurgeUrlsPrefixes) {
      if (window.location.href.includes(noSurgeUrlPrefix)) {
        return true;
      }
    }
    return false;
  }

  public initNavigationInterceptor() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.commonService.urlLangSwitchUpdate(event);
      }
    });
  }

  initModalStatusSubscriber() {
    this.modalStatusSubscriber = this.surgeControlService.getModalStatus().subscribe((data: any) => {
      let surgePopupDisplayType = data.surgePopupDisplay;
      if (typeof surgePopupDisplayType === 'boolean') {
        this.modalStatus = data.surgePopupDisplay; 
      } else {
        this.unsubscribeModalStatus();
      }
      setTimeout(() => {
        if (!this.isConfirmed) {
          this.surgeControlService.hideModal();
          this.surgeControlService.releaseToken();
          this.surgeControlService.clearMessages();
        } else {
          this.isConfirmed = false;
        }
      }, surgeInfo.modalTimeOut * 1000);
    });
  }

  unsubscribeModalStatus() {
    if (this.modalStatusSubscriber) {
      this.modalStatusSubscriber.unsubscribe();
    }
  }

  hideModal(option) {
    this.isConfirmed = false;
    if (option === 'yes') {
      this.isConfirmed = true;
      this.surgeControlService.allowSurge = true;
    } else {
      this.isConfirmed = false;
      this.surgeControlService.allowSurge = false;
      this.surgeControlService.releaseToken();
    }
    this.modalStatus = false;
  }
  overAllTimeOutHideModal() {
    this.surgeControlService.overallTimeOutPopup = false;
  }
  @HostListener('document:keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    if (
      evt.keyCode === 8 || evt.which === 8
    ) {
      let doPrevent = true;
      const types = ['text', 'password', 'file', 'search', 'email', 'number', 'date', 'color', 'datetime', 'datetime-local', 'month', 'range', 'search', 'tel', 'time', 'url', 'week'];
      const target = (<HTMLInputElement>evt.target);

      const disabled = target.disabled || (<HTMLInputElement>event.target).readOnly;
      if (!disabled) {
        if (target.isContentEditable) {
          doPrevent = false;
        } else if (target.nodeName === 'INPUT') {
          let type = target.type;
          if (type) {
            type = type.toLowerCase();
          }
          if (types.indexOf(type) > -1) {
            doPrevent = false;
          }
        } else if (target.nodeName === 'TEXTAREA') {
          doPrevent = false;
        }
      }
      if (doPrevent) {
        evt.preventDefault();
        return false;
      }
    }
  }
}
