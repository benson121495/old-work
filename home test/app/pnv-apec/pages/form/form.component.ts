import { pnvApecService } from 'src/app/pnv-apec/pnv-apec.service';
import { pnvApec } from 'src/app/pnv-apec/pnv-apec.model';
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



@Component({
  selector: 'pnvApec-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class pnvApecFormComponent implements OnInit, AfterViewInit, OnDestroy {

  // ?CAPTCHA //
  @ViewChild(CaptchaComponent) captchaComponent: CaptchaComponent;
  // ?Structural Address /////
  @ViewChild(StructuralAddressListComponent) structAddressComponent: StructuralAddressListComponent;
  // ?Hospital List /////
  @ViewChild(HospitalOptionListComponent) HospitalOptionComponent: HospitalOptionListComponent;
  // ?ADI /////
  @ViewChild(AppAddressListComponent) addressComponent: AppAddressListComponent;

  stepNumber = 1;
  menuList: any[];
  pnvApecModel: pnvApec;
  fillForm: FormGroup;
  submitted = false;
  captchaBypass: boolean = environment.captchaBypassFlag;


  errorCode: boolean = environment.showErrorCode;
  validationUtils: ValidationUtils;
  dateUtils: DateValidationUtils;
  browserLang: string;
  gregorianList: any[];
  LunarPopUp: boolean;

  yearsList: any[];
  monthList: any[];
  dobDayList: any[];
  fromDayList: any[];
  toDayList: any[];
  regDayList: any[];
  dateOfBirth: string;

  gregDate1: string;
  gregDate2: string;

  // DB call required parameters

  serverValidationError: string;
  serverValidationErrorCode: string;

  valueLength: string;
  maxLength: number;
  childVisible: boolean = true;
  generalSearchOption: boolean;
  particularSearchOption: boolean;
  certifiedCopyOption: boolean;
  invalidFeb = false;
  chineseValidationUtils: ChineseCharacterValidationUtils;
  checking = false;

  constructor(
    private router: Router,
    private pnvApecService: pnvApecService,
    private formBuilder: FormBuilder,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute
  ) {
    this.validationUtils = new ValidationUtils();
    this.browserLang = this.translateservice.currentLang;
    this.chineseValidationUtils = new ChineseCharacterValidationUtils();
  }

  
  ngOnInit() {
    window.scrollTo(0, 0);
    this.yearsList = DateValidationUtils.getAllYears();
    this.monthList = DateValidationUtils.getMonthList();
    this.dobDayList = DateValidationUtils.getDefaultDayList();
    this.fromDayList = DateValidationUtils.getDefaultDayList();
    this.toDayList = DateValidationUtils.getDefaultDayList();
    this.regDayList = DateValidationUtils.getDefaultDayList();

    this.pnvApecModel = this.pnvApecService.PnvApecModel;
    this.translateservice.onLangChange.subscribe((event: LangChangeEvent) => {
      this.browserLang = event.lang;
    });

    
    /**
     * Form group values for validations
     * */
    this.intializeForm();


  }

  private intializeForm() {
    
    this.fillForm = this.formBuilder.group({
      chinName: new FormControl(this.pnvApecModel.chinName),
      chiSurName: new FormControl(this.pnvApecModel.chiSurName),
      chiGivenName: new FormControl(this.pnvApecModel.chiGivenName),
      engSurName: new FormControl(this.pnvApecModel.engSurName),
      engGivenName: new FormControl(this.pnvApecModel.engGivenName),
      alias: new FormControl(this.pnvApecModel.alias),
      engSurNameAlias: new FormControl(this.pnvApecModel.engSurNameAlias),
      engGivenNameAlias: new FormControl(this.pnvApecModel.engGivenNameAlias),
      male: [this.pnvApecModel.male],
      female: [this.pnvApecModel.female],
      dobDay: new FormControl(this.pnvApecModel.dobDay),
      dobMonth: new FormControl(this.pnvApecModel.dobMonth),
      dobYear: new FormControl(this.pnvApecModel.dobYear),
      nationality: new FormControl(this.pnvApecModel.nationality),
      placeOfBirth: new FormControl(this.pnvApecModel.placeOfBirth),
      passportNo: new FormControl(this.pnvApecModel.passportNo),
      travelDocDay: new FormControl(this.pnvApecModel.travelDocDay),
      travelDocMonth: new FormControl(this.pnvApecModel.travelDocMonth),
      travelDocYear: new FormControl(this.pnvApecModel.travelDocYear),
      travelDocNo: new FormControl(this.pnvApecModel.travelDocNo),
      issuePlace: new FormControl(this.pnvApecModel.issuePlace),
      phoneNo: new FormControl(this.pnvApecModel.phoneNo),
      faxNo: new FormControl(this.pnvApecModel.faxNo),
      phoneExt: new FormControl(this.pnvApecModel.phoneExt),
      email: new FormControl(this.pnvApecModel.email),
      address1: new FormControl(this.pnvApecModel.address1),
      address2: new FormControl(this.pnvApecModel.address2),
      address3: new FormControl(this.pnvApecModel.address3),
      roomFlat: new FormControl(this.pnvApecModel.roomFlat),
      floor: new FormControl(this.pnvApecModel.floor),
      block: new FormControl(this.pnvApecModel.block),
      building: new FormControl(this.pnvApecModel.building),
      estate: new FormControl(this.pnvApecModel.estate),
      street: new FormControl(this.pnvApecModel.street),
      hkIdValue1: new FormControl(this.pnvApecModel.hkIdValue1),
      hkIdValue2: new FormControl(this.pnvApecModel.hkIdValue2),
      nameOfCompany: new FormControl(this.pnvApecModel.nameOfCompany),
      position: new FormControl(this.pnvApecModel.position),
      contactTelNo: new FormControl(this.pnvApecModel.contactTelNo),
      businessType: new FormControl(this.pnvApecModel.businessType),
      noOfTrips: new FormControl(this.pnvApecModel.noOfTrips),
    }, {
      validator: [
      ]
    });
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.addressDisplay();
    // });

    // this.fillForm.addControl('childForm', this.addressComponent.inputFormGroup);
    // this.addressComponent.inputFormGroup.setParent(this.fillForm);

    setTimeout(() => {
      this.commonService.setShowLoading(false);
    }, 1);
  }


  public toReset() {
    this.childVisible = false;
    setTimeout(() => {
      this.submitted = false;
      this.fillForm.reset();
      this.resetModel();
      this.intializeForm();
      this.childVisible = true;
      /*** reset model for structural address ***/
      if (this.structAddressComponent != undefined) {
        this.structAddressComponent.reset();
      }
    }, 10);

    setTimeout(() => {
      this.fillForm.addControl('childForm', this.addressComponent.inputFormGroup);
      this.addressComponent.inputFormGroup.setParent(this.fillForm);
    }, 15);
  }


  public onSubmit() {
    this.submitted = true;
    this.commonService.formErrorLog(this.fillForm);

    /*** set submit for structural address ***/
    if (this.structAddressComponent != undefined) {
      this.structAddressComponent.HospitalSubmitted = true;
    }

    if (this.fillForm.invalid) {
      this.commonService.scrollUpToFirstError();
      if (!this.captchaBypass) {
        // this.fillForm.get('captchaCode').setValue('');
        this.captchaComponent.reloadImage();
      }
      return;
    } else {
      // all form fields are valid
      if (this.captchaBypass) {
        this.doSubmit();
      } else {
        this.validatecaptchaAndSubmit();
      }

    }
  }

  doSubmit() {
    // this.setToModel();
    let year = this.fillForm.get('dobYear').value
    console.log(year);

    if (year != 'YYYY' && year != '0000' && year != '') {
      year = new Date().getFullYear() - parseInt(year)
      this.pnvApecService.PnvApecModel.dobYear = year
      this.router.navigate(['../declaration'], {
        relativeTo: this.activatedRoute
      });
    }

  }

  private validatecaptchaAndSubmit(): void {
    // submit the request data with captchaCode and captchaId
    setTimeout(() => {
      this.commonService.setShowLoading(true);
    }, 0);

    this.commonService.validateCaptchaServerSide(this.captchaComponent.captchaCode, this.captchaComponent.captchaId)
      .subscribe(
        (result) => {

          setTimeout(() => {
            this.commonService.setShowLoading(false);
          }, 0);
          if (result.success) {
            this.fillForm.get('captchaCode').setErrors(null);
            this.doSubmit();

          } else {

            this.fillForm.get('captchaCode').setErrors({ 'captchaError': true });
            this.captchaComponent.reloadImage();
          }

        }, (err) => {
          setTimeout(() => {
            this.commonService.setShowLoading(false);
          }, 0);
          this.captchaComponent.reloadImage();
        });
  }


  backClicked() {
    this.resetModel();
    this.router.navigate(['../requirements'], { relativeTo: this.activatedRoute });
    this.commonService.termsAndConditionShow = false;
  }


  private resetModel() {
    this.pnvApecModel.chinName = '';
    this.pnvApecModel.engSurName = '';
    this.pnvApecModel.engGivenName = '';
    this.pnvApecModel.alias = '';
    this.pnvApecModel.male = '';
    this.pnvApecModel.female = '';
    this.pnvApecModel.dobDay = '';
    this.pnvApecModel.dobMonth = '';
    this.pnvApecModel.dobYear = '';
    this.pnvApecModel.nationality = '';
    this.pnvApecModel.placeOfBirth = '';
    this.pnvApecModel.passportNo = '';
    this.pnvApecModel.travelDocDay = '';
    this.pnvApecModel.travelDocMonth = '';
    this.pnvApecModel.travelDocYear = '';
    this.pnvApecModel.travelDocNo = '';
    this.pnvApecModel.issuePlace = '';
    this.pnvApecModel.phoneNo = '';
    this.pnvApecModel.faxNo = '';
    this.pnvApecModel.phoneExt = '';
    this.pnvApecModel.email = '';
    this.pnvApecModel.address1= '';
    this.pnvApecModel.address2= '';
    this.pnvApecModel.address3= '';
    this.pnvApecModel.roomFlat= '';
    this.pnvApecModel.floor= '';
    this.pnvApecModel.block= '';
    this.pnvApecModel.building= '';
    this.pnvApecModel.estate= '';
    this.pnvApecModel.street= '';
    this.pnvApecModel.hkIdValue1 = '';
    this.pnvApecModel.hkIdValue2 = '';
    this.pnvApecModel.nameOfCompany = '';
    this.pnvApecModel.position = '';
    this.pnvApecModel.contactTelNo = '';
    this.pnvApecModel.businessType = '';
    this.pnvApecModel.noOfTrips = '';
    // ? To reset the input address which is stored in session
    sessionStorage.removeItem('totalAddress');
  }

  setMaxlength(value) {
    const chineseRegex = /^[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+$/g;
    if (chineseRegex.test(value.charAt(0))) {
      this.maxLength = 177;
    } else {
      this.maxLength = 253;
    }
  }

  ngOnDestroy() {
    setTimeout(() => {
      this.commonService.setShowLoading(true);
    }, 0);
  }

  maskChineseValues(value: any, control: string) {
    this.fillForm.get(control).setValue(this.chineseValidationUtils.maskChineseValues(value));
  }

  navigateToUrl(endPoint, path) {
    window.open(environment.fEBaseUrl + 'static/' + path + '/search-birth/' + this.translateservice.currentLang + '/' + endPoint,
      '_blank', 'toolbar=no,scrollbars=yes,resizable=yes,top=5000,left=500,width=4000,height=4000');
  }

  /* End of Class */
}

