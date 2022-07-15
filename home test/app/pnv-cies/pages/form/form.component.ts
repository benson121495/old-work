import { pnvCiesService } from 'src/app/pnv-cies/pnv-cies.service';
import { pnvCies } from 'src/app/pnv-Cies/pnv-Cies.model';
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
  selector: 'pnvCies-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class pnvCiesFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
  pnvCiesModel: pnvCies;
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
    private pnvCiesService: pnvCiesService,
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

    this.pnvCiesModel = this.pnvCiesService.PnvCiesModel;
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
      chinName: new FormControl(this.pnvCiesModel.chineseName),
      maidenSurName: new FormControl(this.pnvCiesModel.maidenSurName),   
      engSurName: new FormControl(this.pnvCiesModel.engSurName),
      engGivenName: new FormControl(this.pnvCiesModel.engGivenName),
      alias: new FormControl(this.pnvCiesModel.alias),
      engSurNameAlias: new FormControl(this.pnvCiesModel.engSurNameAlias),
      engGivenNameAlias: new FormControl(this.pnvCiesModel.engGivenNameAlias, { validators: [ValidationUtils.useEnglishNameCheck] }),
      male: [this.pnvCiesModel.male],
      female: [this.pnvCiesModel.female],
      dobDay: new FormControl(this.pnvCiesModel.dobDay),
      dobMonth: new FormControl(this.pnvCiesModel.dobMonth),
      dobYear: new FormControl(this.pnvCiesModel.dobYear),
      placeOfBirth: new FormControl(this.pnvCiesModel.placeOfBirth),
      nationality: new FormControl(this.pnvCiesModel.nationality),
      travelDocValue: new FormControl(this.pnvCiesModel.travelDocValue),
      travelDocDay: new FormControl(this.pnvCiesModel.travelDocDay),
      travelDocMonth: new FormControl(this.pnvCiesModel.travelDocMonth),
      travelDocYear: new FormControl(this.pnvCiesModel.travelDocYear),
      travelDocIssuePlace: new FormControl(this.pnvCiesModel.travelDocIssuePlace),
      travelDocNo: new FormControl(this.pnvCiesModel.travelDocNo),
      employCompanyInfo: new FormControl(this.pnvCiesModel.addInfo),
      occupation: new FormControl(this.pnvCiesModel.addInfo),
      post: new FormControl(this.pnvCiesModel.addInfo),
      durationOfEmployMonth: new FormControl(this.pnvCiesModel.travelDocMonth),
      durationOfEmployYear: new FormControl(this.pnvCiesModel.travelDocYear),
      contactTelNo: new FormControl(this.pnvCiesModel.contactTelNo),
      faxNo: new FormControl(this.pnvCiesModel.faxNo),
      phoneExt: new FormControl(this.pnvCiesModel.phoneExt),
      email: new FormControl(this.pnvCiesModel.email),
      address1: new FormControl(this.pnvCiesModel.address1),
      address2: new FormControl(this.pnvCiesModel.address2),
      address3: new FormControl(this.pnvCiesModel.address3),
      reasonsProposeV1: new FormControl(this.pnvCiesModel.reasonsProposeV1),
      reasonsProposeV2: new FormControl(this.pnvCiesModel.reasonsProposeV2),
      reasonsProposeV3: new FormControl(this.pnvCiesModel.reasonsProposeV3),
      hkIdValue1: new FormControl(this.pnvCiesModel.hkIdValue1),
      hkIdValue2: new FormControl(this.pnvCiesModel.hkIdValue2),
      fromDay: new FormControl(this.pnvCiesModel.fromDay),
      fromMonth: new FormControl(this.pnvCiesModel.fromMonth),
      fromYear: new FormControl(this.pnvCiesModel.fromYear),
      toDay: new FormControl(this.pnvCiesModel.toDay),
      toMonth: new FormControl(this.pnvCiesModel.toMonth),
      toYear: new FormControl(this.pnvCiesModel.toYear),
      regDay: new FormControl(this.pnvCiesModel.regDay),
      regMonth: new FormControl(this.pnvCiesModel.regMonth),
      regYear: new FormControl(this.pnvCiesModel.regYear),
      addInfo: new FormControl(this.pnvCiesModel.addInfo),
      csOthers: new FormControl(this.pnvCiesModel.csOthers),
      roomFlat: new FormControl(this.pnvCiesModel.roomFlat),
      floor: new FormControl(this.pnvCiesModel.floor),
      block: new FormControl(this.pnvCiesModel.block),
      building: new FormControl(this.pnvCiesModel.building),
      estate: new FormControl(this.pnvCiesModel.estate),
      street: new FormControl(this.pnvCiesModel.street),
      lastArrDay: new FormControl(this.pnvCiesModel.lastArrDay),
      lastArrMonth: new FormControl(this.pnvCiesModel.lastArrMonth),
      lastArrYear: new FormControl(this.pnvCiesModel.lastArrYear),
      lsDay: new FormControl(this.pnvCiesModel.lsDay),
      lsMonth: new FormControl(this.pnvCiesModel.lsMonth),
      lsYear: new FormControl(this.pnvCiesModel.lsYear),
      extLsDay: new FormControl(this.pnvCiesModel.extLsDay),
      extLsMonth: new FormControl(this.pnvCiesModel.extLsMonth),
      extLsYear: new FormControl(this.pnvCiesModel.extLsYear),
      coSchName: new FormControl(this.pnvCiesModel.coSchName),
      sponsorName: new FormControl(this.pnvCiesModel.sponsorName),
      sponsorRelationship: new FormControl(this.pnvCiesModel.sponsorRelationship),
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
      this.pnvCiesService.PnvCiesModel.dobYear = year
    }
    this.router.navigate(['../declaration'], {
      relativeTo: this.activatedRoute
    });

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
    this.pnvCiesModel.chineseName = '';
    this.pnvCiesModel.engGivenName = '';
    this.pnvCiesModel.engSurName = '';
    this.pnvCiesModel.alias = '';
    this.pnvCiesModel.hkIdValue1 = '';
    this.pnvCiesModel.hkIdValue2 = '';
    this.pnvCiesModel.nationality = '';
    this.pnvCiesModel.dobDay = '';
    this.pnvCiesModel.dobMonth = '';
    this.pnvCiesModel.dobYear = '';
    this.pnvCiesModel.fromDay = '';
    this.pnvCiesModel.fromMonth = '';
    this.pnvCiesModel.fromYear = '';
    this.pnvCiesModel.toDay = '';
    this.pnvCiesModel.toMonth = '';
    this.pnvCiesModel.toYear = '';
    this.pnvCiesModel.male = '';
    this.pnvCiesModel.female = '';
    this.pnvCiesModel.placeOfBirth = '';
    this.pnvCiesModel.regDay = '';
    this.pnvCiesModel.regMonth = '';
    this.pnvCiesModel.regYear = '';
    this.pnvCiesModel.dobDay = '';
    this.pnvCiesModel.dobMonth = '';
    this.pnvCiesModel.dobYear = '';
    this.pnvCiesModel.travelDocValue = '';
    this.pnvCiesModel.appAddr1 = '';
    this.pnvCiesModel.appAddr2 = '';
    this.pnvCiesModel.appAddr3 = '';
    this.pnvCiesModel.appAddr4 = '';
    this.pnvCiesModel.appAddr5 = '';
    this.pnvCiesModel.appAddr6 = '';
    this.pnvCiesModel.totalAddress = '';
    this.pnvCiesModel.reasonsProposeV1 = '';
    this.pnvCiesModel.reasonsProposeV2 = '';
    this.pnvCiesModel.reasonsProposeV3 = '';
    this.pnvCiesModel.faxNo = '';
    this.pnvCiesModel.contactTelNo = '';

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

