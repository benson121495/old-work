import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { SignPadService } from 'src/app/sign-pad.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.css']
})

export class SignaturePadComponent implements OnInit {

  @ViewChild(SignaturePad) public signaturePad: SignaturePad;
  @ViewChild('signContainer') private signContainer: ElementRef;

  @Output() signed = new EventEmitter<boolean>();

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5
    // 'canvasWidth': 500,
    // 'canvasHeight': 300
  };

  private alertMsg: string;
  private isWidthset = false;
  private signatureFormat: any;
  private formatList: string[] = ["Draw my signature", "Upload an image", "Use a certificate", "Use eID"];

  constructor(public signPadService: SignPadService, public translateService: TranslateService) { 
    this.translateService.get('SIGNPAD.ALERTMSG').subscribe((value: string) => {
      this.alertMsg = value;
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('canvasWidth', 0);
    this.signaturePad.set('canvasHeight', 0);
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    // console.log(this.signaturePad.toDataURL('image/png')); //in base64
    // console.log(this.signaturePad.toDataURL('image/jpeg')); //in base64
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  saveSign(){
    if (this.signaturePad.isEmpty()){
      alert(this.alertMsg);
    } else{
      this.signPadService.showSignPad = false;
      let pngData = this.signaturePad.toDataURL('image/png'); //in base64
      let jpegDate = this.signaturePad.toDataURL('image/jpeg'); //in base64
      this.signPadService.setSignatureDataPng(pngData.split(',')[1]);
      this.signPadService.setSignatureDataJpeg(jpegDate.split(',')[1]);
      this.signed.emit(true);
    }
  }

  undoSign(){
    this.signaturePad.clear();
  }

  cancelSign(){
    this.signaturePad.clear();
    this.signPadService.showSignPad = false;
  }

  refreshCanvas(){
    if (this.signatureFormat == "Draw my signature"){

      this.signaturePad.set('minWidth', 2); // set stroke thickness
      this.signaturePad.set('canvasWidth', this.signContainer.nativeElement.offsetWidth - 30); //30px = padding of the popup box
      this.signaturePad.set('canvasHeight', 300);
      this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    } else{
      this.signaturePad.set('canvasWidth', 0);
      this.signaturePad.set('canvasHeight', 0);
      this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    }
  }
}
