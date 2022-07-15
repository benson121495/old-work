import { Component, OnInit, Sanitizer, SecurityContext } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { forEach } from '@angular/router/src/utils/collection';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  collapseOA = false;
  id = '';
  title: string;

  browserLang: string;

  tdNumberofQuestions:any = [];

  public collapseAAB: any;

  constructor(
    private commonService: CommonService,private translateservice: TranslateService,private _sanitizer: DomSanitizer) { 
   // this.dashboardService.showHideMiniSideNav = false;
  }

  getFAQAnswer(answer){
    return this._sanitizer.bypassSecurityTrustHtml("<p>"+answer+"</p>");
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.commonService.setShowLoading(false);
    }, 1);
    this.tdNumberofQuestions = this.generateNumberOfQuestions(21);
    this.getTitle();
}

private getTitle() {
  this.translateservice.get('FAQS.FAQ-TITLE').subscribe((res: string) => {
    this.title = res;
  });
  this.translateservice.onLangChange.subscribe((event: LangChangeEvent) => {
    this.browserLang = event.lang;
    this.translateservice.get('FAQS.FAQ-TITLE').subscribe((res: string) => {
      this.title = res;
    });
  });
}


  generateNumberOfQuestions(numberOfQuestions){
    // tslint:disable-next-line: prefer-const
    var newArray = []
    for(var i=1; i <=numberOfQuestions; i++){
        newArray.push(i);
    }
    return newArray;
  }

  collapseOASection(){
     if(this.collapseOA) {
         this.collapseOA = false;
     } else{
         this.collapseAll();
         this.collapseOA = true;
     }
 }
 

 collapseAll(){
    this.collapseOA = false;
 }

 show(divId){
     if(this.id == divId)
         this.id = '';
     else
        this.id = divId;
 }

 goToSection(divId){
  this.commonService.goToSection(divId);
}

}
