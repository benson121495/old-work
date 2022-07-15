import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignPadService {

  constructor() { }

  private signatureDataJpeg: string;
  private signatureDataPng: string;
  public showSignPad = false;

  public setSignatureDataJpeg(jpegBase64: string){
    this.signatureDataJpeg = jpegBase64;
  }

  public getSignatureDataJpeg(): string{
    return this.signatureDataJpeg;
  }

  public setSignatureDataPng(pngBase64: string){
    this.signatureDataPng = pngBase64;
  }

  public getSignatureDataPng(): string{
    return this.signatureDataPng;
  }
}
