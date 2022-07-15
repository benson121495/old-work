import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  browserLang: string;
  linkLang:string ='en';

  constructor( private translate: TranslateService) { 
    this.browserLang = this.translate.currentLang;
    this.setLangCode(); 
  }

  ngOnInit() {
    this.setLanguage();
  }
  setLanguage() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.browserLang = event.lang;
      this.setLangCode();
    });
  }

  setLangCode() {
    if (this.browserLang === 'en-US') {
      this.linkLang = 'en';
    } else if (this.browserLang === 'zh-HK') {
      this.linkLang = 'tc';
    } else if (this.browserLang === 'zh-CN') {
      this.linkLang = 'sc';
    } else {
      this.linkLang = 'en';
    }
}

}
