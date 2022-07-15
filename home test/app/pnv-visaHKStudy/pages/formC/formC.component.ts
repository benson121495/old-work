import { pnvVisaHkStudyService } from 'src/app/pnv-visaHkStudy/pnv-VisaHkStudy.service';
import { pnvVisaHkStudy } from 'src/app/pnv-visaHkStudy/pnv-VisaHkStudy.model';
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
  selector: 'pnvVisaHkStudyC-form',
  templateUrl: './formC.component.html',
  styleUrls: ['./formC.component.css']
})
export class pnvVisaHkStudyCFormComponent implements OnInit, AfterViewInit, OnDestroy {

  // ?CAPTCHA //
  @ViewChild(CaptchaComponent) captchaComponent: CaptchaComponent;
  // ?Structural Address /////
  @ViewChild(StructuralAddressListComponent) structAddressComponent: StructuralAddressListComponent;

  stepNumber = 1;
  menuList: any[];
  pnvVisaHkStudyModel: pnvVisaHkStudy;
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
    private pnvVisaHkStudyService: pnvVisaHkStudyService,
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

    this.pnvVisaHkStudyModel = this.pnvVisaHkStudyService.PnvVisaHkStudyModel;
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
      chinName: new FormControl(this.pnvVisaHkStudyModel.chinName),
      maidenSurName: new FormControl(this.pnvVisaHkStudyModel.maidenSurName),   
      engSurName: new FormControl(this.pnvVisaHkStudyModel.engSurName),
      engGivenName: new FormControl(this.pnvVisaHkStudyModel.engGivenName),
      alias: new FormControl(this.pnvVisaHkStudyModel.alias),
      male: [this.pnvVisaHkStudyModel.male],
      female: [this.pnvVisaHkStudyModel.female],
      dobDay: new FormControl(this.pnvVisaHkStudyModel.dobDay),
      dobMonth: new FormControl(this.pnvVisaHkStudyModel.dobMonth),
      dobYear: new FormControl(this.pnvVisaHkStudyModel.dobYear),
      placeOfBirth: new FormControl(this.pnvVisaHkStudyModel.placeOfBirth),
      nationality: new FormControl(this.pnvVisaHkStudyModel.nationality),
      travelDocDay: new FormControl(this.pnvVisaHkStudyModel.travelDocDay),
      travelDocMonth: new FormControl(this.pnvVisaHkStudyModel.travelDocMonth),
      travelDocYear: new FormControl(this.pnvVisaHkStudyModel.travelDocYear),
      travelDocIssuePlace: new FormControl(this.pnvVisaHkStudyModel.travelDocIssuePlace),
      travelDocNo: new FormControl(this.pnvVisaHkStudyModel.travelDocNo),
      contactTelNo: new FormControl(this.pnvVisaHkStudyModel.phoneNo),
      faxNo: new FormControl(this.pnvVisaHkStudyModel.faxNo),
      phoneExt: new FormControl(this.pnvVisaHkStudyModel.phoneExt),
      email: new FormControl(this.pnvVisaHkStudyModel.email),
      address1: new FormControl(this.pnvVisaHkStudyModel.address1),
      address2: new FormControl(this.pnvVisaHkStudyModel.address2),
      address3: new FormControl(this.pnvVisaHkStudyModel.address3),
      hkIdValue1: new FormControl(this.pnvVisaHkStudyModel.hkIdValue1),
      hkIdValue2: new FormControl(this.pnvVisaHkStudyModel.hkIdValue2),
      roomFlat: new FormControl(this.pnvVisaHkStudyModel.roomFlat),
      floor: new FormControl(this.pnvVisaHkStudyModel.floor),
      block: new FormControl(this.pnvVisaHkStudyModel.block),
      building: new FormControl(this.pnvVisaHkStudyModel.building),
      estate: new FormControl(this.pnvVisaHkStudyModel.estate),
      street: new FormControl(this.pnvVisaHkStudyModel.street),
      countryOfDomicile: new FormControl(this.pnvVisaHkStudyModel.countryOfDomicile),
      lengthOfResidence: new FormControl(this.pnvVisaHkStudyModel.lengthOfResidence),
      countryWithPermStatus: new FormControl(this.pnvVisaHkStudyModel.countryWithPermStatus),
      occupation: new FormControl(this.pnvVisaHkStudyModel.occupation),
      income: new FormControl(this.pnvVisaHkStudyModel.income),
      relationship: new FormControl(this.pnvVisaHkStudyModel.relationship),
      proposedDuration: new FormControl(this.pnvVisaHkStudyModel.proposedDuration),
      proposedEntryDay: new FormControl(this.pnvVisaHkStudyModel.proposedEntryDay),
      proposedEntryMonth: new FormControl(this.pnvVisaHkStudyModel.proposedEntryMonth),
      proposedEntryYear: new FormControl(this.pnvVisaHkStudyModel.proposedEntryYear),
      name: new FormControl(this.pnvVisaHkStudyModel.name), 
      sponsorName: new FormControl(this.pnvVisaHkStudyModel.name),
      permitRefNo: new FormControl(this.pnvVisaHkStudyModel.permitRefNo),
      others: new FormControl(this.pnvVisaHkStudyModel.others),
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
      this.pnvVisaHkStudyService.PnvVisaHkStudyModel.dobYear = year
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

