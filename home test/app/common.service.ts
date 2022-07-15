import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { SurgeControlModel } from './models/surge-control-model';
import { catchError } from 'rxjs/operators';
import { ValidationUtils } from './utils/validation-utils';
import { FormGroup, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SideNavItem } from './shared/layout/sidenav/sideNavItem.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private baseurl = environment.apiUrl;
  private surgeurl = environment.surgeAPI;
  public showLoading = true;
  public showModal: boolean;
  public showErrorModal: boolean;
  public errorMessage: string;
  public showInfoModal: boolean;
  public infoMessage: string;
  private surgeControl: SurgeControlModel;
  public isEmailFieldEnabled = true;

  public officeLocation: any = {};
  public showOfficeLocationMap = false;

  public postUrl: string;
  sideNavItem: SideNavItem[] = [
    {
      url: 'faq',
      name: 'FAQ',
      label: 'SIDENAV.FAQ',
      window: true
    }, {
      name: 'info',
      label: 'common.info.title',
      children: [{
        url: 'https://bdm_birthsearch_detailed_instruction.html',
        name: 'detailAppInstruction',
        label: 'birthsearch.tagLabel.detailAppInstruction'
      }, {
        url:'https://www.immd.gov.hk/eng/contactus/birth.html',
        name: 'office',
        label: 'birthsearch.tagLabel.officeAddressAndWorkingHours' 
      },{
        url:'https://www.immd.gov.hk/eng/services/fee-tables/index.html#17',
        name: 'feeTable',
        label: 'birthsearch.tagLabel.feeTable'
      },{
        url:'https://www.immd.gov.hk/eng/about-us/pledge.html#d&4_3',
        name: 'standardProcessingTime',
        label: 'birthsearch.tagLabel.standardProcessingTime'
      }
    ],
    }, {
      url: 'helpdesk',
      name: 'helpDesk',
      label: 'SIDENAV.HELP-DESK'
    }
  ]

  officeList: any[];

  additionalFileList: any[];

  startService = false;

  private validateCaptchaURL = environment.validateCaptchaURL;
  browserLang: string;
  private addressLanguage: any;

  private history = [];

  fdhType: any;

  fileUploadError: any = '';
  fileUploadErrorMessages: string[];

  appid: any = '';

  ern: any = '';
  termsAndConditionShow = true;
  regDetailsPage = false;
  eligibilityCriteriaPage = false;
  enquiryStartPage = false;
  birthRegistrationQuotaError = false;

  appointmentChangeValidate: any;
  remainderEmailAknowledged: any;
  cancelappointment: any;
  emailComparer: string;

  token: any;
  applicationId: any;
  ticketReleased: boolean;
  illustratePage: boolean;
  logoCheckLang: string;
  PAYMENT_STATUS_ENQUIERY_APP_ID = '695';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With,Content-Type,Accept',
      'Accept-Language': 'en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7,zh-CN;q=0.6'
    })
  };

  httpOptionsCommonService = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  errorPushMessage = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit() { }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '/index';
  }

  get OfficeListOnAppId(): any[] {
    return this.officeList;
  }

  setOfficeListOnAppId(officeList: any) {
    this.officeList = officeList;
  }

  /* Abishek - Adding additional query param as Timestamp, so that url caching can be prevented */
  getErnByAppId(appId: string): Observable<any> {
    return this.http.get<any>(
      this.baseurl +
      'common/getern?appId=' +
      appId +
      '&Time=' +
      new Date().getTime(),
      this.httpOptions
    );
  }

  setadditionalFileList(additionalFileList: any) {
    this.additionalFileList = additionalFileList;
  }

  get getaddtionalFileList(): any {
    return this.additionalFileList;
  }
  uploadfile(uploadvalue, ern): Observable<any> {
    // let baseurl = "http://localhost:8081/";
    return this.http
      .post<any>(
        this.baseurl + 'common/upload?ern=' + ern,
        uploadvalue,
        this.httpOptions
      )
      .pipe();
  }

  getHospitals(language: string): Observable<any> {
    return this.http.get<any>(
      this.baseurl + 'common/getHospitals?lang=' + language,
      this.httpOptions
    );
  }

  getOffices(appId: string, language: string): Observable<any> {
    if (!language) {
      language = this.translateService.currentLang;
    }
    return this.http.get<any>(
      this.baseurl +
      'common/getApplicationsOffices?appId=' +
      appId +
      '&lang=' +
      language +
      '&Time=' +
      new Date().getTime(),
      this.httpOptions
    );
  }

  deletefile(deletevalue, ern, filetype): Observable<any> {
    return this.http
      .post<any>(
        this.baseurl + 'common/deletefile?ern=' + ern + '&type=' + filetype,
        deletevalue,
        this.httpOptions
      )
      .pipe();
  }

  // surge Control API's

  renewSurge(ticketid): Observable<any> {
    return this.http
      .post<any>(this.surgeurl + 'renewTicket', ticketid, this.httpOptions)
      .pipe();
  }
  removeSurge(ticketid): Observable<any> {
    return this.http
      .post<any>(this.surgeurl + 'releaseTicket', ticketid, this.httpOptions)
      .pipe();
  }

  tifftopdf(tiffname, ern, fileType): Observable<any> {
    return this.http.post<any>(this.baseurl + 'common/tiffToPdf?ern=' + ern + '&fileType=' + fileType, tiffname, this.httpOptions).pipe();
  }

  get ticketSave(): SurgeControlModel {
    return this.surgeControl;
  }

  setTicketSave(surgeControl: SurgeControlModel) {
    this.surgeControl = surgeControl;
  }

  get fileUploadErrorMessage(): string {
    return this.fileUploadError;
  }

  setFileUploadErrorMessage(fileUploadError: string) {
    this.fileUploadError = fileUploadError;
  }

  get ErrorMessages(): string[] {
    return this.fileUploadErrorMessages;
  }

  setErrorMessages(fileUploadErrorMessages: string[]) {
    this.fileUploadErrorMessages = fileUploadErrorMessages;
  }

  public get addressLang(): any {
    return this.addressLanguage;
  }
  public set addressLang(value: any) {
    this.addressLanguage = value;
  }

  // -----------------------------

  setfdhtype(fdhType: string) {
    this.fdhType = fdhType;
  }

  get fdhtype(): string {
    return this.fdhType;
  }

  public setShowLoading(showLoading: boolean) {
    this.showLoading = showLoading;
  }

  public getShowLoading(): boolean {
    return this.showLoading;
  }

  public setShowModal(showModal: boolean) {
    this.showModal = showModal;
  }

  public getShowModal(): boolean {
    return this.showModal;
  }

  public showLocationMap(officeLocation: any) {
    this.getOfficeLocations(officeLocation.officeCode);
  }

  // ?To get the office location details - Abishek  */
  public getOfficeLocations(officeCode: any) {
    setTimeout(() => {
      this.setShowLoading(true);
    }, 0);
    document.body.style.overflow = 'hidden';
    this.getOfficeLocationObject(officeCode).subscribe(
      res => {
        setTimeout(() => {
          this.setShowLoading(false);
        }, 0);
        this.officeLocation = res.result;
        this.showOfficeLocationMap = true;
        console.log(res.result);
      },
      err => {
        setTimeout(() => {
          this.setShowLoading(false);
        }, 0);
        this.errorPopUp('Error fetching Office location map details');
      }
    );
  }

  getOfficeLocationObject(officeCode: string) {
    return this.http.get<any>(
      this.baseurl +
      'common/getOfficeLocation?officeCode=' +
      officeCode +
      '&lang=' +
      this.browserLang +
      '&Time=' +
      new Date().getTime(),
      this.httpOptions
    );
  }

  handleObservableError(error: any): Observable<any> {
    console.error('The Error is', error.toString());
    return Observable.throw('Server error');
  }
  /**
   * Method to show error while getting bad response from web service
   */
  public errorPopUp(message: string) {
    // this.configureToaster();
    // this.toasterService.warning(message);

    this.showErrorModal = true;
    this.errorMessage = message;
  }

  public infoPopUp(message: string) {
    // this.configureToaster();
    // this.toasterService.warning(message);

    this.showInfoModal = true;
    this.infoMessage = message;
  }

  public print(document: Document, language: string) {
    let printContents, popupWin, ifenglish, es2;
    if (language) {
      if (language == 'zh-CN') {
        ifenglish = '../assets/image/immdlogo_sc.gif';
        es2 = '电子服务2';
      } else if (language == 'zh-HK') {
        ifenglish = '../assets/image/immdlogo_tc.gif';
        es2 = '電子服務2';
      } else {
        ifenglish = '../assets/image/immdlogo.gif';
        es2 = 'e-service2';
      }
    } else {
      ifenglish = '../assets/image/immdlogo.gif';
      es2 = 'e-service2';
    }
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=1000,width=1000');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>${es2}</title>
          <style>
              body {
                font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
                font-size: 14px;
                line-height: 1.42857143;
              }
              .table-width-100 {
                width: 100%;
              }
              div.panel {
                border : solid 1px;
                border-color : #ddd;
                border-radius : 8px;

              }
              div.panel-heading {
                border-bottom : solid 1px;
                border-color : #ddd;
                padding : 13px;
              }
              div.panel-body {
                padding : 13px;
              }
              .line-hide {
                display: none;
              }
              div.button-wrapper p, .alert-success, .alert-danger {
                display: none;
              }
              h3 {
                margin : 0px;
              }
              .text-right {
                  text-align: right;
              }
              .footer{
                margin-top: 20px;
                width: 100%;
              }
              .header{
                margin-bottom: 20px;
                text-align: center;
              }
          </style>
        </head>
        <body onload="window.print();window.close()">

         <div class="header">
               <img alt="" src="${ifenglish}">
          </div>

        <div>${printContents}</div>

        <div class="footer">
            <table style="width: 100%;">
              <tr>
                <td>
                    <!-- <img alt="Level Double-A conformance, W3C WAI Web Content Accessibility Guidelines 2.0" src="../assets/image/wcag2aa.gif"> -->
                </td>
                <td class="text-right">
                    <img src="../assets/image/brandhk.gif" class="brandhk" alt="Brand Hong Kong">
                </td>
              </tr>
            </table>
          </div>

        </body>
      </html>`);
    popupWin.document.close();
  }

  public saveAsPdf(document: Document, fileName: string) {
    const data: HTMLElement = document.getElementById('print-section');
    const HTML_Width = data.offsetWidth;
    const HTML_Height = data.offsetHeight;
    const top_left_margin = 15;
    const PDF_Width = HTML_Width + top_left_margin * 2;
    const PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
    const canvas_image_width = HTML_Width;
    const canvas_image_height = HTML_Height;
    const totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas(data, { allowTaint: true }).then(function (canvas) {
      const img = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(img, 'JPEG', 20, 50);
      for (let i = 1; i < totalPDFPages; i++) {
        pdf.addPage(PDF_Width, PDF_Height);
        pdf.addImage(img, 'JPEG', 20, -(PDF_Height * i) + top_left_margin * 4);
      }
      pdf.save(fileName + '.pdf');
    });
  }

  getCheckDigit(hkid1: string, hkid2: string): any {
    return this.http.get<any>(
      this.baseurl + 'common/getCheckDigit?hkid1=' + hkid1 + '&hkid2=' + hkid2,
      this.httpOptions
    );
  }

  // getCheckDigitforROM(mhkid1: string, mhkid2: string,fhkid1: string, fhkid2: string): any {
  //   return this.http.get<any>(this.baseurl + 'suppl-reg-marriage/getCheckDigitForROM?mhkid1='+mhkid1+'&mhkid2='+mhkid2+"&fhkid1="+fhkid1+'&fhkid2='+fhkid2, this.httpOptions);
  // }

  validateCaptchaServerSide(capCode, capId) {
    capCode = capCode.toString().toUpperCase();
    const postData = {
      captchaCode: capCode,
      captchaId: capId
    };
    return this.http
      .post<any>(this.validateCaptchaURL, postData, this.httpOptions)
      .pipe();
  }


  getLabelParameters(parameter: string) {
    let keyValueObj: { [key: string]: string } = { DEFAULT_KEY: 'EMPTY' };
    if (!ValidationUtils.isEmptyString(parameter)) {
      let keyValuePair: string;
      if (parameter.indexOf('&') > 0) {
        const parameterArray: string[] = parameter.split('&');
        let i = 0;
        for (; i < parameterArray.length; i++) {
          keyValueObj = this.getKeyValueParameters(
            parameterArray[i],
            keyValueObj
          );
        }
        return keyValuePair;
      } else {
        keyValueObj = this.getKeyValueParameters(parameter, keyValueObj);
      }
      return keyValueObj;
    }
    return keyValueObj;
  }

  getKeyValueParameters(parameterString: string, keyValueObj) {
    if (parameterString.indexOf('=') > 0) {
      const parameterStringArray: string[] = parameterString.split('=');
      let j = 0;
      for (; j + 1 < parameterStringArray.length; j++) {
        const key = parameterStringArray[j];
        const value = parameterStringArray[j + 1];
        keyValueObj['' + key] = value;
      }
      j++; // increment key & value position too
    }
    return keyValueObj;
  }
  saveARN(ern, appid, officeValue, arnType): Observable<any> {
    return this.http.get<any>(
      this.baseurl +
      'common/saveArnAfterPayment?ern=' +
      ern +
      '&appid=' +
      appid +
      '&officeValue=' +
      officeValue +
      '&arnType=' +
      arnType,
      this.httpOptions
    );
  }

  addWebFormImage(webvalue, ern, pdfType): Observable<any> {
    return this.http
      .post<any>(
        this.baseurl + 'getwebform?pdfType=' + pdfType + '&ern=' + ern,
        webvalue,
        this.httpOptions
      )
      .pipe();
  }

  addMultiWebFormImage(
    webvalue,
    ern,
    pdfType,
    pages,
    discardPages
  ): Observable<any> {
    return this.http
      .post<any>(
        this.baseurl +
        'common/multipleTiff?pdfType=' +
        pdfType +
        '&ern=' +
        ern +
        '&pages=' +
        pages +
        '&discardPages=' +
        discardPages,
        webvalue,
        this.httpOptions
      )
      .pipe();
  }
  /**To print the error forms - Abishek */
  public formErrorLog(formGroup: FormGroup) {
    let control: AbstractControl = null;

    Object.keys(formGroup.controls).forEach(name => {
      control = formGroup.controls[name];
    });
  }

  isTraditionalChineseandEnglish(name: string) {
    return this.http.post<any>(
      this.baseurl + 'common/isTraditionalChineseandEnglish',
      name,
      this.httpOptions
    );
  }

  isTraditionalChineseEngPunctuation(data: string) {
    return this.http.get<any>(
      this.baseurl + 'common/isTraditionalChineseEngPunctuation?data=' + data,
      this.httpOptions
    );
  }

  /* Method to handle 'Please input the Chinese name in Traditional Chinese.' */
  tradChineseOnly(data: string) {
    return this.http.post<any>(
      this.baseurl + 'common/traditionalChineseOnly',
      data,
      this.httpOptions
    );
  }

  tradChineseAndEnglish(data: string) {
    return this.http.post<any>(
      this.baseurl + 'common/isTraditionalChineseEnglishAndPuncuation',
      data,
      this.httpOptions
    );
  }

  traditionalChineseAlphaNumeric(data: string) {
    return this.http.post<any>(
      this.baseurl + 'common/traditionalChineseAlphaNumeric',
      data,
      this.httpOptions
    );
  }

  /* Method to handle simplified and valid names */
  tradEnglishNameCheck(data: string) {
    return this.http.post<any>(
      this.baseurl + 'common/nameCheckBDM',
      data,
      this.httpOptions
    );
  }

  getModulePath() {
    const modulePath = this.router.url.split('/')[1];
    localStorage.setItem('module', modulePath);
  }

  clearModulePath() {
    localStorage.setItem('module', '');
  }

  /* To pass the ERN for Payment */
  setErn(ern: string) {
    localStorage.setItem('ERN', '');
    localStorage.setItem('ERN', ern);
  }
  setPayTrn(trn: string) {
    localStorage.setItem('PAY-TRN', '');
    localStorage.setItem('PAY-TRN', trn);
  }

  getErn() {
    return localStorage.getItem('ERN');
  }

  scrollUpToFirstError() {
    setTimeout(() => {
      if (document.getElementsByClassName('errorMsg')) {
        const elements = document.getElementsByClassName('errorMsg');
        const requiredElement = elements[0];
        if (requiredElement !== undefined && requiredElement !== null) {
          requiredElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'start'
          });
        }
      }
    }, 0);
  }

  focusToNextTextbox(inputValue: string) {
    if (inputValue.length == 8) {
      document.getElementById('hkId4').focus();
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  // Split the HKid into alphabets and digit
  splitHKId(HkId: string) {
    return HkId.match(/[a-z]+|[^a-z]+/gi);
  }

  /* Method to handle session */
  getTicketId(ticketId) {
    const payload = { ticketId: ticketId };
    return this.http.post<any>(
      this.surgeurl + '/getTicket',
      JSON.stringify(payload),
      this.httpOptions
    );
  }

  renewTicketId(ticketId) {
    const payload = { ticketId: ticketId };
    return this.http.post<any>(
      this.surgeurl + '/renewTicket',
      JSON.stringify(payload),
      this.httpOptions
    );
  }

  releaseTicketId(ticketId) {
    const payload = { ticketId: ticketId };
    return this.http.post<any>(
      this.surgeurl + '/releaseTicket',
      JSON.stringify(payload),
      this.httpOptions
    );
  }

  newTrn(appId: string): Observable<any> {
    return this.http.get<any>(
      this.baseurl + 'common/getTrn?appId=' + appId,
      this.httpOptions
    );
  }

  getGregorianForLunarDate(
    partURL,
    day,
    month,
    year,
    language
  ): Observable<any> {
    return this.http.get<any>(
      this.baseurl +
      partURL +
      '?day=' +
      day +
      '&month=' +
      month +
      '&year=' +
      year +
      '&lang=' +
      language
    );
  }

  public setErrorStatusMsg(message: string) {
    this.errorPushMessage = [];
    this.errorPushMessage.push(message);
  }

  public getErrorStatusMsg() {
    return this.errorPushMessage;
  }

  get cancelExtensionStayEmailReminderAppointment() {
    return this.cancelappointment;
  }

  get fillDate() {
    const ar = new Array(31);
    ar.fill(0);
    const dateList = new Array();
    ar.forEach((c, i) => {
      dateList.push(i + 1);
    });
    return dateList;
  }

  get fillMonth() {
    const ar = new Array(12);
    ar.fill(0);
    const monthList = new Array();
    ar.forEach((c, i) => {
      monthList.push(i + 1);
    });
    return monthList;
  }

  get fillYear() {
    const dt = new Date();
    const current_year = dt.getFullYear();
    const year_start = 1880;
    const diff = new Array(current_year - year_start);
    diff.fill(0);
    const yearList = new Array();
    diff.forEach((c, i) => {
      yearList.push(i + 1880);
    });
    yearList.sort((a, b) => b - a);
    return yearList;
  }

  /**
   * Abishek - To return the month in full form for Lunar pop up modal.
   */
  public getMonthFull(): string[] {
    this.browserLang = this.translateService.currentLang;

    let monthCal: string[];
    if (this.browserLang === 'zh-CN' || this.browserLang === 'zh-HK') {
      monthCal = [
        '',
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ];
    } else {
      monthCal = [
        '',
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
    }

    return monthCal;
  }
  /* End of class */

  goToSection(id) {
    setTimeout(() => {
      if (document.getElementById(id)) {
        const requiredElement = document.getElementById(id);
        if (requiredElement !== undefined && requiredElement !== null) {
          requiredElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'start'
          });
        }
      }
    }, 0);
  }

  getAnnouncementDetails(appId: string): Observable<any> {
    return this.http.get<any>(this.baseurl + 'announcement/getAnnouncements?appId=' + appId, this.httpOptions);
  }

  public getPaymentStatusEnquieryUrl(lang: string): string {
    const langNCountry = lang.split('-');
    const language = langNCountry[0];
    const country = langNCountry[1];
    return environment.egisEntryUrl + '?applicationId='
      + this.PAYMENT_STATUS_ENQUIERY_APP_ID
      + '&language=' + language + '&country=' + country;
  }

  urlLangSwitchUpdate(event) {
    const LANG_REGEX = /(zh-HK)|(en-US)|(zh-CN)/;
    if (!this.router.url.includes(this.translateService.currentLang)) {
      const url = event.url.replace(LANG_REGEX, this.translateService.currentLang);
      this.router.navigateByUrl(url);
    }
  }

  allowEnglishTraditionalOnly(name: string) {
    return this.http.post<any>(this.baseurl + 'common/allowEnglishTraditionalOnly', name, this.httpOptions);
  }
}
