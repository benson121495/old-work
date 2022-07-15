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
  selector: 'pnvExtendTechtasB-declaration',
  templateUrl: './declarationB.component.html',
  styleUrls: ['./declarationB.component.css']
})
export class pnvExtendTechtasBDeclarationComponent implements OnInit {
  fillForm: FormGroup;
  stepNumber = 2;
  age:Number;
  selectedValue: string = '';
  constructor(private router: Router,
    private pnvExtendTechtasService: pnvExtendTechtasService,
    private formBuilder: FormBuilder,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    public signPadService: SignPadService,) { }

  ngOnInit() {

    this.fillForm = this.formBuilder.group({
      selectedValue: new FormControl()
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

  public maritalStatus: any[] = [
    { label: 'pnvExtendTechtas.declarationB.notMarried', value: 'notMarried' },
    { label: 'pnvExtendTechtas.declarationB.married', value: 'married' },
    { label: 'pnvExtendTechtas.declarationB.separated', value: 'separated' },
    { label: 'pnvExtendTechtas.declarationB.widowed', value: 'widowed' },
    { label: 'pnvExtendTechtas.declarationB.others', value: 'others' }
  ];

}
