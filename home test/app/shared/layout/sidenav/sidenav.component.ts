import { Component, OnInit, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SideNavItem } from './sideNavItem.model';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  private static LANG_REGEX = /(zh-HK)|(en-US)|(zh-CN)/;

  @Input() menuList: any[];
  @Input() stepNumber: number;
  @Input() sideNavItem: SideNavItem[];
  browserLang: string;
  linkLang: string = 'en';
  toggleStatus: boolean;
  lang: any;

  constructor(public translate: TranslateService,
    public commonService: CommonService,
    public router: Router,
    private location: Location) {
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
  navigateTo(newWindow: boolean = false, url: string) {
    newWindow ?
      window.open(url, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=5000,left=500,width=4000,height=4000') :
      window.open(url)
  }
  changeLanguage(lang) {
    this.commonService.logoCheckLang = lang;
    sessionStorage.setItem('locale', this.commonService.logoCheckLang.toLowerCase());
    this.translate.use(lang);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    const url = this.router.url.replace(SidenavComponent.LANG_REGEX, lang);
    this.location.go(url);
  }

  toggleSideNav() {
    this.toggleStatus = !this.toggleStatus;
  }
}
