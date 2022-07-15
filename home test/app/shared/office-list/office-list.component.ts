import { Component, OnInit, Input, OnDestroy, EventEmitter } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CoeService } from 'src/app/coe/coe.service';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.css']
})
export class OfficeListComponent implements OnInit, OnDestroy {

  @Input() formGroupname: string;
  @Input() appId: string;
  private languageSubscriber: EventEmitter<LangChangeEvent>;

  constructor(
    public commonService: CommonService,
    public translateservice: TranslateService,
    public birthService: CoeService
  ) { }

  officeList: any[];
  language: string = '';
  showLocationMap: boolean;
  selectedOfficeList: any[];

  ngOnInit() {

    this.getOfficeList();
    this.languageSubscriber = this.translateservice.onLangChange.subscribe((event: LangChangeEvent) => {
      this.language = event.lang;
      this.getOfficeList();

    });
  }

  getOfficeList() {
    setTimeout(() => {
      this.commonService.setShowLoading(true);
    }, 0);
    this.commonService.getOffices(this.appId, this.language).subscribe((result) => {
      console.log(result);
      result.sort((a, b) => a.regionId < b.regionId ? -1 : 1);
      this.officeList = result;
      this.commonService.setOfficeListOnAppId(this.officeList);
      this.birthService.setOfficeListOnAppId(this.officeList);
      this.commonService.setOfficeListOnAppId(this.officeList);
      setTimeout(() => {
        this.commonService.setShowLoading(false);
      }, 0);


    }, (err) => {
      setTimeout(() => {
        this.commonService.setShowLoading(false);
      }, 0);
      this.commonService.errorPopUp('Error in fetching office list');
    });
  }

  hideLocationMapPopup() {
    this.showLocationMap = false;
  }

  showLocationMapPopup(office) {

    this.selectedOfficeList = office;
    this.showLocationMap = true;
  }

  ngOnDestroy() {
    if (this.languageSubscriber) {
      this.languageSubscriber.unsubscribe();
    }
    setTimeout(() => {
      this.commonService.setShowLoading(true);
    }, 0);
  }
}
