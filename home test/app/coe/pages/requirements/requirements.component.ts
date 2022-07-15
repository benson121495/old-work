import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CommonService } from 'src/app/common.service';
import { environment } from 'src/environments/environment';
import { CoeService } from 'src/app/coe/coe.service'
import { Coe } from 'src/app/coe/coe.model';
import { SideNavItem } from 'src/app/shared/layout/sidenav/sideNavItem.model';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.css']
})
export class CoeRequirementsComponent implements OnInit, OnDestroy {
  title: string;
  announcementMsg: any;
  coeModel: Coe;
  sideNavItem: SideNavItem[] = [
    {
      url: 'helpdesk',
      name: 'helpDesk',
      label: 'rm_common_help_title',
      window: true
    }, {
      name: 'info',
      label: 'birthsearch.tagLabel.otherservice.msg',
      desc: 'birthsearch.tagLabel.otherservice.msg2',
    }
  ]
  constructor(
    public activatedRoute: ActivatedRoute,
    public translateservice: TranslateService,
    public commonService: CommonService,
    public coeService: CoeService,
    public router: Router
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getTitle();
    // this.getAnnouncement();
    setTimeout(() => {
      this.commonService.setShowLoading(false);
    }, 0);
    this.coeModel = Coe.newInstance();
  }


  private getTitle() {
    this.translateservice.get('birthsearch.common.appNameFor568And569').subscribe((res: string) => {
      this.title = res;

    });

    this.translateservice.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateservice.get('birthsearch.common.appNameFor568And569').subscribe((res: string) => {
        this.title = res;

      });
    });
  }


  private getAnnouncement() {
    setTimeout(() => {
      this.commonService.setShowLoading(true);
    }, 1);
    this.commonService.getAnnouncementDetails('123').subscribe((response) => {
      this.announcementMsg = response;
      setTimeout(() => {
        this.commonService.setShowLoading(false);
      }, 1);
    }, (err) => {
      setTimeout(() => {
        this.commonService.setShowLoading(false);
      }, 1);
      console.log('Error in getting announcement details');
    });
  }
  navigateToUrl(endPoint, path) {
    window.open(environment.fEBaseUrl + 'static/' + path + '/search-birth/' + this.translateservice.currentLang + '/' + endPoint,
      '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=5000,left=500,width=4000,height=4000');
  }

  next(){
    this.coeModel.appId = '123';
    this.coeService.setCoeModel(this.coeModel);
    this.router.navigate(['../form'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy() {
    // setTimeout(() => {
    //   this.commonService.setShowLoading(true);
    // }, 0);
  }

}
