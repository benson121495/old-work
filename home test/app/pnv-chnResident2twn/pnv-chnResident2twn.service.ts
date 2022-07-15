import { PnvChnResident2Twn } from './pnv-chnResident2twn.model';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class PnvChnResident2TwnService {
  private baseurl = environment.apiUrl;
  value: any;
  private pnvChnResident2TwnModel: PnvChnResident2Twn;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With,Content-Type,Accept',
      'Accept-Language': 'en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7,zh-CN;q=0.6'
    })
  };

  getSharedValue(): any {
    return this.value;
  }
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.pnvChnResident2TwnModel = new PnvChnResident2Twn();
    this.baseurl = environment.apiUrl;
  }
  // tslint:disable-next-line:member-ordering
  officeList: any[];
  // tslint:disable-next-line:member-ordering
  priceResult: any[];

  get PnvChnResident2TwnModel(): PnvChnResident2Twn {
    return this.pnvChnResident2TwnModel;
  }

  setPnvChnResident2TwnModel(pnvChnResident2TwnModel: PnvChnResident2Twn) {
    this.pnvChnResident2TwnModel = pnvChnResident2TwnModel;
  }

  get OfficeListOnAppId(): any[] {
    return this.officeList;
  }

  setOfficeListOnAppId(officeList: any) {
    this.officeList = officeList;
  }

  get priceResultOnAppId(): any[] {
    return this.priceResult;
  }

  setPriceResultOnAppId(priceResult: any) {
    this.priceResult = priceResult;
  }

  saveData(PnvChnResident2TwnModel, partURL, language): Observable<any> {
    return this.http.post<any>(this.baseurl + partURL + '?lang=' + language, JSON.stringify(PnvChnResident2TwnModel), this.httpOptions);
  }

  saveARN(PnvChnResident2TwnModel, partURL, language): Observable<any> {
    return this.http.post<any>(this.baseurl + partURL + '?lang=' + language, JSON.stringify(PnvChnResident2TwnModel), this.httpOptions);
  }

  getPriceLists(appIdList, partURL, language): Observable<any> {
    return this.http.post<any>(this.baseurl + partURL + '?lang=' + language, appIdList);
  }

  getPdfImage(pnvChnResident2TwnModel, pdfName, ern): Observable<any> {
    return this.http.post<any>(this.baseurl + 'getwebform?pdfType=' + pdfName + '&ern=' + ern, pnvChnResident2TwnModel);
  }

  getTransaction(url) {
    return this.http.get<any>(this.baseurl + url, { observe: 'response' });
  }

  getAvailability(url, payLoad) {
    return this.http.post<any>(this.baseurl + url, payLoad, { observe: 'response' });
  }

  proceedPayment(url, payLoad) {
    return this.http.post<any>(this.baseurl + url, payLoad, { observe: 'response' });
  }

  updatePayment(url, payLoad) {
    return this.http.post<any>(this.baseurl + url, payLoad, { observe: 'response' });
  }

}
