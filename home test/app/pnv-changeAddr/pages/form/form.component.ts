import { pnvChangeAddrService } from 'src/app/pnv-changeAddr/pnv-changeAddr.service';
import { pnvChangeAddr } from 'src/app/pnv-changeAddr/pnv-changeAddr.model';
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
  selector: 'pnvChangeAddr-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class pnvChangeAddrFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
  pnvChangeAddrModel: pnvChangeAddr;
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
    private pnvChangeAddrService: pnvChangeAddrService,
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

    this.pnvChangeAddrModel = this.pnvChangeAddrService.PnvChangeAddrModel;
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

      roomFlat: new FormControl(this.pnvChangeAddrModel.roomFlat),
      floor: new FormControl(this.pnvChangeAddrModel.floor),
      block: new FormControl(this.pnvChangeAddrModel.block),
      building: new FormControl(this.pnvChangeAddrModel.building),
      estate: new FormControl(this.pnvChangeAddrModel.estate),
      street: new FormControl(this.pnvChangeAddrModel.street),
      district: new FormControl(this.pnvChangeAddrModel.district),
      sizeOfFlat: new FormControl(this.pnvChangeAddrModel.sizeOfFlat),
      noOfAdults: new FormControl(this.pnvChangeAddrModel.noOfAdults),
      noOfMinors: new FormControl(this.pnvChangeAddrModel.noOfMinors),
      noOfMinorsBelowFive: new FormControl(this.pnvChangeAddrModel.noOfMinorsBelowFive),
      noOfExpectBaby: new FormControl(this.pnvChangeAddrModel.noOfExpectBaby),
      noOfConstantCare: new FormControl(this.pnvChangeAddrModel.noOfConstantCare),
      noOfCurrentHelper: new FormControl(this.pnvChangeAddrModel.noOfCurrentHelper),
      shareRoomNoOfChild: new FormControl(this.pnvChangeAddrModel.shareRoomNoOfChild),
      servantRoomSize: new FormControl(this.pnvChangeAddrModel.servantRoomSize),
      childAge: new FormControl(this.pnvChangeAddrModel.childAge),
      sqFtMetres: new FormControl(this.pnvChangeAddrModel.sqFtMetres),
      others: new FormControl(this.pnvChangeAddrModel.others),
      othersDuties: new FormControl(this.pnvChangeAddrModel.othersDuties),
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

    this.pnvChangeAddrModel.sizeOfFlat = '';
    this.pnvChangeAddrModel.roomFlat = '';
    this.pnvChangeAddrModel.floor = '';
    this.pnvChangeAddrModel.block = '';
    this.pnvChangeAddrModel.building = '';
    this.pnvChangeAddrModel.estate = '';
    this.pnvChangeAddrModel.street = '';
    this.pnvChangeAddrModel.district = '';
    this.pnvChangeAddrModel.sizeOfFlat = '';
    this.pnvChangeAddrModel.noOfAdults = '';
    this.pnvChangeAddrModel.noOfMinors = '';
    this.pnvChangeAddrModel.noOfMinorsBelowFive = '';
    this.pnvChangeAddrModel.noOfExpectBaby = '';
    this.pnvChangeAddrModel.noOfConstantCare = '';
    this.pnvChangeAddrModel.noOfCurrentHelper = '';
    this.pnvChangeAddrModel.shareRoomNoOfChild = '';
    this.pnvChangeAddrModel.servantRoomSize = '';
    this.pnvChangeAddrModel.childAge = '';
    this.pnvChangeAddrModel.sqFtMetres = '';
    this.pnvChangeAddrModel.others = '';
    this.pnvChangeAddrModel.othersDuties = '';


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


  navigateToUrl(endPoint, path) {
    window.open(environment.fEBaseUrl + 'static/' + path + '/search-birth/' + this.translateservice.currentLang + '/' + endPoint,
      '_blank', 'toolbar=no,scrollbars=yes,resizable=yes,top=5000,left=500,width=4000,height=4000');
  }

  /* End of Class */
}

