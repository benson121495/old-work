import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { Location } from '@angular/common';
import { $ } from 'protractor';
// import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private static LANG_REGEX = /(zh-HK)|(en-US)|(zh-CN)/;
  public display: any;
  public lang: any;
  public url: string;

  constructor(
    private router: Router,
    public translate: TranslateService,
    public commonService: CommonService,
    private location: Location

  ) {
    this.url = document.location.href;
  }

  ngOnInit() {
    this.commonService.logoCheckLang = this.translate.currentLang;
  }


  openModal() {
    if (this.url.includes('service-demo')) {
      window.close();
    } else {
      this.commonService.showModal = true;
    }
  }

  changeLanguage(lang) {
    this.commonService.logoCheckLang = lang;
    sessionStorage.setItem('locale', this.commonService.logoCheckLang.toLowerCase());
    this.translate.use(lang);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    const url = this.router.url.replace(HeaderComponent.LANG_REGEX, lang);
    this.location.go(url);
  }
}
