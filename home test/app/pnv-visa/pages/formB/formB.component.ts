import { VisaService } from 'src/app/pnv-visa/visa.service';
import { Visa } from 'src/app/pnv-visa/visa.model';
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
  selector: ' visa-formB',
  templateUrl: './formB.component.html',
  styleUrls: ['./formB.component.css']
})
export class VisaFormBComponent implements OnInit, AfterViewInit, OnDestroy {

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
  visaModel: Visa;
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
    private visaService: VisaService,
    private formBuilder: FormBuilder,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute) {
      
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

    this.visaModel = this.visaService. VisaModel;
    this.translateservice.onLangChange.subscribe((event: LangChangeEvent) => {
      this.browserLang = event.lang;
    });

    /**
     * Form group values for validations
     * */
    this.intializeForm();
    //this.validateNoOfCopy();
    //this.handleCalendarType();

    // enable on onchange place of birth 
    //this.validateHospital();
  }

    private intializeForm() {
      //const isdisable = (this.visaModel.entry) ? false : true;
      this.fillForm = this.formBuilder.group({
        appType: new FormControl(this.visaModel.appType),
        appCompanyName: new FormControl(this.visaModel.appCompanyName),
        regNo: new FormControl(this.visaModel.regNo),
        appCompanyPhoneNo: new FormControl(this.visaModel.appCompanyPhoneNo),
        appCompanyPhoneExt: new FormControl(this.visaModel.appCompanyPhoneExt),
        appCompanyRoomValue: new FormControl(this.visaModel.appCompanyRoomValue),
        appCompanyFloorValue: new FormControl(this.visaModel.appCompanyFloorValue),
        appCompanyBlockValue: new FormControl(this.visaModel.appCompanyBlockValue),
        appCompanyBuildingValue: new FormControl(this.visaModel.appCompanyBuildingValue),
        appCompanyEstateValue: new FormControl(this.visaModel.appCompanyEstateValue),
        appCompanyStreetValue: new FormControl(this.visaModel.appCompanyStreetValue),
        appCompanyDistrict: new FormControl(this.visaModel.appCompanyDistrict),
        appCompanyFaxNo: new FormControl(this.visaModel.appCompanyFaxNo),
        contactPerson: new FormControl(this.visaModel.contactPerson),
        post: new FormControl(this.visaModel.post),
        appCompanyEmail: new FormControl(this.visaModel.appCompanyEmail),
        appCompanyWebsite: new FormControl(this.visaModel.appCompanyWebsite),
        appIndivChiName: new FormControl(this.visaModel.appIndivChiName),
        appIndivHkIdValue1: new FormControl(this.visaModel.appIndivHkIdValue1),
        appIndivHkIdValue2: new FormControl(this.visaModel.appIndivHkIdValue2),
        appIndiveEngSurName: new FormControl(this.visaModel.appIndiveEngSurName),
        appIndivEngGivenName: new FormControl(this.visaModel.appIndivEngGivenName),
        appIndivDobDay: new FormControl(this.visaModel.appIndivDobDay),
        appIndivDobMonth: new FormControl(this.visaModel.appIndivDobMonth),
        appIndivDobYear: new FormControl(this.visaModel.appIndivDobYear),
        appIndivSex: new FormControl(this.visaModel.appIndivSex),
        appIndivNationality: new FormControl(this.visaModel.appIndivNationality),
        appIndivOccupation: new FormControl(this.visaModel.appIndivOccupation),
        appIndivIncome: new FormControl(this.visaModel.appIndivIncome),
        appIndivPhoneNo: new FormControl(this.visaModel.appIndivPhoneNo),
        appIndivAddressRoomValue: new FormControl(this.visaModel.appIndivAddressRoomValue),
        appIndivAddressFloorValue: new FormControl(this.visaModel.appIndivAddressFloorValue),
        appIndivAddressBlockValue: new FormControl(this.visaModel.appIndivAddressBlockValue),
        appIndivAddressBuildingValue: new FormControl(this.visaModel.appIndivAddressBuildingValue),
        appIndivAddressEstateValue: new FormControl(this.visaModel.appIndivAddressEstateValue),
        appIndivAddressStreetValue: new FormControl(this.visaModel.appIndivAddressStreetValue),
        appIndivAddressDistrict: new FormControl(this.visaModel.appIndivAddressDistrict),
        appIndivFaxNo: new FormControl(this.visaModel.appIndivFaxNo),
        appIndivEmail: new FormControl(this.visaModel.appIndivEmail),
        applicantRelationship: new FormControl(this.visaModel.applicantRelationship),
        visitorChiName: new FormControl(this.visaModel.visitorChiName),
        visitorEngName: new FormControl(this.visaModel.visitorEngName),

  
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

  ngOnDestroy(){

  }

 

}



