import { pnvExtendTechtasService } from 'src/app/pnv-extendTechtas/pnv-extendTechtas.service';
import { pnvExtendTechtas } from 'src/app/pnv-extendTechtas/pnv-extendTechtas.model';
import { environment } from 'src/environments/environment';
import { ValidationUtils } from 'src/app/utils/validation-utils';
import { DateValidationUtils } from 'src/app/utils/date-validation-utils';
import { CommonService } from 'src/app/common.service';
import { Component, OnInit, AfterViewInit, ViewChild, SimpleChanges, OnDestroy } from '@angular/core';
import { CaptchaComponent } from 'angular-captcha';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl, AbstractControl, ValidationErrors, ValidatorFn, FormBuilder } from '@angular/forms';
import { AppAddressListComponent } from 'src/app/shared/application-address/app-address-list/app-address-list.component';
// tslint:disable-next-line: max-line-length
import { StructuralAddressListComponent } from 'src/app/shared/structural-address/structural-address-list/structural-address-list.component';
import { HospitalOptionListComponent } from 'src/app/shared/hospital-option/hospital-option-list/hospital-option-list.component';
import { ChineseCharacterValidationUtils } from 'src/app/utils/chinese-character-validation-utils';
import { SignPadService } from 'src/app/sign-pad.service';

@Component({
  selector: 'pnvExtendTechtasA-declaration',
  templateUrl: './declarationA.component.html',
  styleUrls: ['./declarationA.component.css']
})
export class pnvExtendTechtasADeclarationComponent implements OnInit {
  fillForm: FormGroup;
  stepNumber = 2;
  age:Number;
  constructor(private router: Router,
    private pnvExtendTechtasService: pnvExtendTechtasService,
    private formBuilder: FormBuilder,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    public signPadService: SignPadService) { }

  ngOnInit() {

    this.fillForm = this.formBuilder.group({
    })
    setTimeout(() => {
      this.commonService.setShowLoading(false);
    }, 1);
  }

  backClicked() {
    this.router.navigate(['../form'], { relativeTo: this.activatedRoute });
  }

  onSubmit(submit: boolean){
    this.router.navigate(['../documents'], { relativeTo: this.activatedRoute });
  }

  signForm(){
    this.signPadService.showSignPad = true;
    console.log("Jpeg Base64: " + this.signPadService.getSignatureDataJpeg());
    console.log("Png Base64: " + this.signPadService.getSignatureDataPng());
  }

  public beenAway: any[] = [
    { label: 'pnvExtendTechtas.declarationA.5a', value: '5a' },
    { label: 'pnvExtendTechtas.declarationA.5b', value: '5b' },
    { label: 'pnvExtendTechtas.declarationA.5c', value: '5c' },
    { label: 'pnvExtendTechtas.declarationA.5d', value: '5d' }
  ];
}
