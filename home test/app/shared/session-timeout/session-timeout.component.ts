import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-session-timeout',
  templateUrl: './session-timeout.component.html',
  styleUrls: ['./session-timeout.component.css']
})
export class SessionTimeoutComponent implements OnInit {
  title: string;
  browserLang: string;

  constructor(
    public translateservice: TranslateService,
    public commonService: CommonService) {
    this.browserLang = this.translateservice.currentLang;
  }

  ngOnInit() {
    this.commonService.showErrorModal = false;
    this.commonService.setShowModal(false);
    this.getTitle();
    setTimeout(() => {
      this.commonService.setShowLoading(false);
    }, 10);
  }


  getTitle() {
    this.translateservice.get('ERROR-APP.SESSION-TIMEOUT').subscribe((res: string) => {
      this.title = res;
    });

    this.translateservice.onLangChange.subscribe((event: LangChangeEvent) => {
      this.browserLang = event.lang;
      this.translateservice.get('ERROR-APP.SESSION-TIMEOUT').subscribe((res: string) => {
        this.title = res;
      });
    });
  }
  closeWindow() {
    window.close();
  }

  openModal() {
    this.commonService.showModal = true;
  }

}
