import { pnvQmasVisitService } from 'src/app/pnv-qmasVisit/pnv-qmasVisit.service';
import { pnvQmasVisit } from 'src/app/pnv-qmasVisit/pnv-qmasVisit.model';
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
  selector: 'pnvQmasVisit-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class pnvQmasVisitFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
  pnvQmasVisitsModel: pnvQmasVisit;
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
    private pnvQmasVisitsService: pnvQmasVisitService,
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

    this.pnvQmasVisitsModel = this.pnvQmasVisitsService.PnvQmasVisitModel;
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
      chinName: new FormControl(this.pnvQmasVisitsModel.chinName),
      maidenSurName: new FormControl(this.pnvQmasVisitsModel.maidenSurName),   
      engSurName: new FormControl(this.pnvQmasVisitsModel.engSurName),
      engGivenName: new FormControl(this.pnvQmasVisitsModel.engGivenName),
      alias: new FormControl(this.pnvQmasVisitsModel.alias),
      male: [this.pnvQmasVisitsModel.male],
      female: [this.pnvQmasVisitsModel.female],
      dobDay: new FormControl(this.pnvQmasVisitsModel.dobDay),
      dobMonth: new FormControl(this.pnvQmasVisitsModel.dobMonth),
      dobYear: new FormControl(this.pnvQmasVisitsModel.dobYear),
      placeOfBirth: new FormControl(this.pnvQmasVisitsModel.placeOfBirth),
      nationality: new FormControl(this.pnvQmasVisitsModel.nationality),
      travelDocDay: new FormControl(this.pnvQmasVisitsModel.travelDocDay),
      travelDocMonth: new FormControl(this.pnvQmasVisitsModel.travelDocMonth),
      travelDocYear: new FormControl(this.pnvQmasVisitsModel.travelDocYear),
      travelDocIssuePlace: new FormControl(this.pnvQmasVisitsModel.travelDocIssuePlace),
      travelDocNo: new FormControl(this.pnvQmasVisitsModel.travelDocNo),
      durationOfEmployMonth: new FormControl(this.pnvQmasVisitsModel.durationOfEmployMonth),
      durationOfEmployYear: new FormControl(this.pnvQmasVisitsModel.durationOfEmployYear),
      contactTelNo: new FormControl(this.pnvQmasVisitsModel.phoneNo),
      faxNo: new FormControl(this.pnvQmasVisitsModel.faxNo),
      phoneExt: new FormControl(this.pnvQmasVisitsModel.phoneExt),
      email: new FormControl(this.pnvQmasVisitsModel.email),
      address1: new FormControl(this.pnvQmasVisitsModel.address1),
      address2: new FormControl(this.pnvQmasVisitsModel.address2),
      address3: new FormControl(this.pnvQmasVisitsModel.address3),
      hkIdValue1: new FormControl(this.pnvQmasVisitsModel.hkIdValue1),
      hkIdValue2: new FormControl(this.pnvQmasVisitsModel.hkIdValue2),
      roomFlat: new FormControl(this.pnvQmasVisitsModel.roomFlat),
      floor: new FormControl(this.pnvQmasVisitsModel.floor),
      block: new FormControl(this.pnvQmasVisitsModel.block),
      building: new FormControl(this.pnvQmasVisitsModel.building),
      estate: new FormControl(this.pnvQmasVisitsModel.estate),
      street: new FormControl(this.pnvQmasVisitsModel.street),
      countryOfDomicile: new FormControl(this.pnvQmasVisitsModel.countryOfDomicile),
      lengthOfResidence: new FormControl(this.pnvQmasVisitsModel.lengthOfResidence),
      countryWithPermStatus: new FormControl(this.pnvQmasVisitsModel.countryWithPermStatus),
      occupation: new FormControl(this.pnvQmasVisitsModel.occupation),
      income: new FormControl(this.pnvQmasVisitsModel.income),
      itineraryInfo: new FormControl(this.pnvQmasVisitsModel.itineraryInfo),
      visitCompanyInfo: new FormControl(this.pnvQmasVisitsModel.visitCompanyInfo),
      compRoomFlat: new FormControl(this.pnvQmasVisitsModel.roomFlat),
      compFloor: new FormControl(this.pnvQmasVisitsModel.floor),
      compBlock: new FormControl(this.pnvQmasVisitsModel.block),
      compBuilding: new FormControl(this.pnvQmasVisitsModel.building),
      compEstate: new FormControl(this.pnvQmasVisitsModel.estate),
      compStreet: new FormControl(this.pnvQmasVisitsModel.street),
      companyPersonName: new FormControl(this.pnvQmasVisitsModel.companyPersonName),
      companyPersonPost: new FormControl(this.pnvQmasVisitsModel.companyPersonPost),
      officeTelNo: new FormControl(this.pnvQmasVisitsModel.phoneNo),
      businessActivity: new FormControl(this.pnvQmasVisitsModel.businessActivity),
      familyName: new FormControl(this.pnvQmasVisitsModel.familyName),
      personContactNo: new FormControl(this.pnvQmasVisitsModel.phoneNo),
      personRelationship: new FormControl(this.pnvQmasVisitsModel.personRelationship),
      noInfoReason: new FormControl(this.pnvQmasVisitsModel.noInfoReason),
      employCompanyInfo: new FormControl(this.pnvQmasVisitsModel.employCompanyInfo),
      purpose: new FormControl(this.pnvQmasVisitsModel.purpose),
      proposedDuration: new FormControl(this.pnvQmasVisitsModel.proposedDuration),
      proposedEntryDay: new FormControl(this.pnvQmasVisitsModel.proposedEntryDay),
      proposedEntryMonth: new FormControl(this.pnvQmasVisitsModel.proposedEntryMonth),
      proposedEntryYear: new FormControl(this.pnvQmasVisitsModel.proposedEntryYear),
      flightInfo: new FormControl(this.pnvQmasVisitsModel.flightInfo), 
      reasonForTransit: new FormControl(this.pnvQmasVisitsModel.reasonForTransit),
      nextDestination: new FormControl(this.pnvQmasVisitsModel.nextDestination), 
      name: new FormControl(this.pnvQmasVisitsModel.name), 
      sponsorName: new FormControl(this.pnvQmasVisitsModel.name), 
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
      this.pnvQmasVisitsService.PnvQmasVisitModel.dobYear = year
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
    this.pnvQmasVisitsModel.chinName = '';
    this.pnvQmasVisitsModel.maidenSurName = '';
    this.pnvQmasVisitsModel.engSurName = '';
    this.pnvQmasVisitsModel.engGivenName = '';
    this.pnvQmasVisitsModel.alias = '';
    this.pnvQmasVisitsModel.male = '';
    this.pnvQmasVisitsModel.female = '';
    this.pnvQmasVisitsModel.dobDay = '';
    this.pnvQmasVisitsModel.dobMonth = '';
    this.pnvQmasVisitsModel.dobYear = '';
    this.pnvQmasVisitsModel.nationality = '';
    this.pnvQmasVisitsModel.placeOfBirth = '';
    this.pnvQmasVisitsModel.travelDocDay = '';
    this.pnvQmasVisitsModel.travelDocMonth = '';
    this.pnvQmasVisitsModel.travelDocYear = '';
    this.pnvQmasVisitsModel.travelDocNo = '';
    this.pnvQmasVisitsModel.travelDocIssuePlace = '';
    this.pnvQmasVisitsModel.phoneNo = '';
    this.pnvQmasVisitsModel.faxNo = '';
    this.pnvQmasVisitsModel.phoneExt = '';
    this.pnvQmasVisitsModel.email = '';
    this.pnvQmasVisitsModel.address1= '';
    this.pnvQmasVisitsModel.address2= '';
    this.pnvQmasVisitsModel.address3= '';
    this.pnvQmasVisitsModel.roomFlat= '';
    this.pnvQmasVisitsModel.floor= '';
    this.pnvQmasVisitsModel.block= '';
    this.pnvQmasVisitsModel.building= '';
    this.pnvQmasVisitsModel.estate= '';
    this.pnvQmasVisitsModel.street= '';
    this.pnvQmasVisitsModel.countryOfDomicile= '';
    this.pnvQmasVisitsModel.hkIdValue1 = '';
    this.pnvQmasVisitsModel.hkIdValue2 = '';
    this.pnvQmasVisitsModel.lengthOfResidence = '';
    this.pnvQmasVisitsModel.countryWithPermStatus = '';
    this.pnvQmasVisitsModel.income = '';
    this.pnvQmasVisitsModel.occupation = '';
    this.pnvQmasVisitsModel.post = '';
    this.pnvQmasVisitsModel.employCompanyInfo = '';
    this.pnvQmasVisitsModel.purpose = '';
    this.pnvQmasVisitsModel.proposedEntryDay = '';
    this.pnvQmasVisitsModel.proposedEntryMonth = '';
    this.pnvQmasVisitsModel.proposedEntryYear = '';
    this.pnvQmasVisitsModel.proposedDuration = '';
    this.pnvQmasVisitsModel.itineraryInfo = '';
    this.pnvQmasVisitsModel.flightInfo = '';
    this.pnvQmasVisitsModel.visitCompanyInfo = '';
    this.pnvQmasVisitsModel.compRoomFlat = '';
    this.pnvQmasVisitsModel.compFloor = '';
    this.pnvQmasVisitsModel.compBlock = '';
    this.pnvQmasVisitsModel.compBuilding = '';
    this.pnvQmasVisitsModel.compEstate = '';
    this.pnvQmasVisitsModel.compStreet = '';
    this.pnvQmasVisitsModel.companyPersonName = '';
    this.pnvQmasVisitsModel.companyPersonPost = '';
    this.pnvQmasVisitsModel.businessActivity = '';
    this.pnvQmasVisitsModel.familyName = '';
    this.pnvQmasVisitsModel.personRelationship = '';
    this.pnvQmasVisitsModel.noInfoReason = '';
    this.pnvQmasVisitsModel.durationOfEmployMonth = '';
    this.pnvQmasVisitsModel.durationOfEmployYear = '';
    this.pnvQmasVisitsModel.reasonForTransit = '';
    this.pnvQmasVisitsModel.nextDestination = '';
    this.pnvQmasVisitsModel.name = '';
    this.pnvQmasVisitsModel.sponsorName = '';
  

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

