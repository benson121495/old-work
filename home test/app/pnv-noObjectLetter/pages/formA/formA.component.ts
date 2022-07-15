import { pnvNoObjectLetterService } from 'src/app/pnv-noObjectLetter/pnv-NoObjectLetter.service';
import { pnvNoObjectLetter } from 'src/app/pnv-noObjectLetter/pnv-NoObjectLetter.model';
import { environment } from 'src/environments/environment';
import { ValidationUtils } from 'src/app/utils/validation-utils';
import { DateValidationUtils } from 'src/app/utils/date-validation-utils';
import { CommonService } from 'src/app/common.service';
import { Component, OnInit, AfterViewInit, ViewChild, SimpleChanges, OnDestroy } from '@angular/core';
import { CaptchaComponent } from 'angular-captcha';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl, AbstractControl, ValidationErrors, ValidatorFn, FormBuilder } from '@angular/forms';
// tslint:disable-next-line: max-line-length
import { StructuralAddressListComponent } from 'src/app/shared/structural-address/structural-address-list/structural-address-list.component';
import { ChineseCharacterValidationUtils } from 'src/app/utils/chinese-character-validation-utils';


@Component({
  selector: 'pnvNoObjectLetterA-form',
  templateUrl: './formA.component.html',
  styleUrls: ['./formA.component.css']
})
export class pnvNoObjectLetterAFormComponent implements OnInit, AfterViewInit, OnDestroy {

  // ?CAPTCHA //
  @ViewChild(CaptchaComponent) captchaComponent: CaptchaComponent;
  // ?Structural Address /////
  @ViewChild(StructuralAddressListComponent) structAddressComponent: StructuralAddressListComponent;

  stepNumber = 1;
  menuList: any[];
  pnvNoObjectLetterModel: pnvNoObjectLetter;
  fillForm: FormGroup;
  submitted = false;
  captchaBypass: boolean = environment.captchaBypassFlag;


  browserLang: string;


  yearsList: any[];
  monthList: any[];
  dobDayList: any[];
  fromDayList: any[];
  toDayList: any[];
  dateOfBirth: string;

  // DB call required parameters

  serverValidationError: string;
  serverValidationErrorCode: string;

  valueLength: string;
  maxLength: number;
  childVisible: boolean = true;
  generalSearchOption: boolean;
  particularSearchOption: boolean;
  certifiedCopyOption: boolean;
  chineseValidationUtils: ChineseCharacterValidationUtils;
  checking = false;

  constructor(
    private router: Router,
    private pnvNoObjectLetterService: pnvNoObjectLetterService,
    private formBuilder: FormBuilder,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute
  ) {

    this.browserLang = this.translateservice.currentLang;
    this.chineseValidationUtils = new ChineseCharacterValidationUtils();
  }

  
  ngOnInit() {
    window.scrollTo(0, 0);
    this.yearsList = DateValidationUtils.getAllYears();
    this.monthList = DateValidationUtils.getMonthList();
    this.dobDayList = DateValidationUtils.getDefaultDayList();

    this.pnvNoObjectLetterModel = this.pnvNoObjectLetterService.PnvNoObjectLetterModel;
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
      chinName: new FormControl(this.pnvNoObjectLetterModel.chinName),
      engName: new FormControl(this.pnvNoObjectLetterModel.engName),
      male: [this.pnvNoObjectLetterModel.male],
      female: [this.pnvNoObjectLetterModel.female],
      dobDay: new FormControl(this.pnvNoObjectLetterModel.dobDay),
      dobMonth: new FormControl(this.pnvNoObjectLetterModel.dobMonth),
      dobYear: new FormControl(this.pnvNoObjectLetterModel.dobYear),
      toDay: new FormControl(this.pnvNoObjectLetterModel.toDay),
      toMonth: new FormControl(this.pnvNoObjectLetterModel.toMonth),
      toYear: new FormControl(this.pnvNoObjectLetterModel.toYear),      
      fromDay: new FormControl(this.pnvNoObjectLetterModel.fromDay),
      fromMonth: new FormControl(this.pnvNoObjectLetterModel.fromMonth),
      fromYear: new FormControl(this.pnvNoObjectLetterModel.fromYear),
      hkIdValue1: new FormControl(this.pnvNoObjectLetterModel.hkIdValue1),
      hkIdValue2: new FormControl(this.pnvNoObjectLetterModel.hkIdValue2),
      institution: new FormControl(this.pnvNoObjectLetterModel.institution),
      programme: new FormControl(this.pnvNoObjectLetterModel.programme),
      company: new FormControl(this.pnvNoObjectLetterModel.company),
      weeksOfWork: new FormControl(this.pnvNoObjectLetterModel.weeksOfWork)
      
    }, {
      validator: [
      ]
    });
  }un

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
      this.pnvNoObjectLetterService.PnvNoObjectLetterModel.dobYear = year
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
    this.pnvNoObjectLetterModel.chinName = '';
    this.pnvNoObjectLetterModel.engName = '';
    this.pnvNoObjectLetterModel.male = '';
    this.pnvNoObjectLetterModel.female = '';
    this.pnvNoObjectLetterModel.dobDay = '';
    this.pnvNoObjectLetterModel.dobMonth = '';
    this.pnvNoObjectLetterModel.dobYear = '';
    this.pnvNoObjectLetterModel.hkIdValue1 = '';
    this.pnvNoObjectLetterModel.hkIdValue2 = '';
    this.pnvNoObjectLetterModel.institution = '';
    this.pnvNoObjectLetterModel.programme = '';
    this.pnvNoObjectLetterModel.toDay = '';
    this.pnvNoObjectLetterModel.toMonth = '';
    this.pnvNoObjectLetterModel.toYear = '';
    this.pnvNoObjectLetterModel.fromDay = '';
    this.pnvNoObjectLetterModel.fromMonth = '';
    this.pnvNoObjectLetterModel.fromYear = '';
    this.pnvNoObjectLetterModel.company = '';

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

