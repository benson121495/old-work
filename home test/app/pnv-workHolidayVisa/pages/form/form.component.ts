import { WorkHolidayVisaService } from 'src/app/pnv-workHolidayVisa/workHolidayVisa.service';
import { WorkHolidayVisa } from 'src/app/pnv-workHolidayVisa/workHolidayVisa.model';
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
  selector: 'workHolidayVisa-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class WorkHolidayVisaFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
  workHolidayVisaModel: WorkHolidayVisa;
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
    private workHolidayVisaService: WorkHolidayVisaService,
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

    this.workHolidayVisaModel = this.workHolidayVisaService.WorkHolidayVisaModel;
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
      //const isdisable = (this.workHolidayVisaModel.entry) ? false : true;
      this.fillForm = this.formBuilder.group({
        chiName: new FormControl(this.workHolidayVisaModel.chiName),
        maidenSurName: new FormControl(this.workHolidayVisaModel.maidenSurName),
        engSurName: new FormControl(this.workHolidayVisaModel.engSurName),
        engGivenName: new FormControl(this.workHolidayVisaModel.engGivenName),
        chiNameAlias: new FormControl(this.workHolidayVisaModel.chiNameAlias),
        engSurNameAlias: new FormControl(this.workHolidayVisaModel.engSurNameAlias),
        engGivenNameAlias: new FormControl(this.workHolidayVisaModel.engGivenNameAlias),
        
        //sexType: new FormControl(this.workHolidayVisaModel.engSurName),
        
        male: [this.workHolidayVisaModel.male],
        female: [this.workHolidayVisaModel.female],
        dobDay: new FormControl(this.workHolidayVisaModel.dobDay),
        dobMonth: new FormControl(this.workHolidayVisaModel.dobMonth),
        dobYear: new FormControl(this.workHolidayVisaModel.dobYear),
        placeOfBirth: [this.workHolidayVisaModel.placeOfBirth],
        nationality: new FormControl(this.workHolidayVisaModel.nationality),

        maritalStatus: [this.workHolidayVisaModel.maritalStatus],
        single: [this.workHolidayVisaModel.single],
        married: [this.workHolidayVisaModel.married],
        separated: [this.workHolidayVisaModel.separated],
        divorced: [this.workHolidayVisaModel.divorced],
        widowed: [this.workHolidayVisaModel.widowed],
        hkIdValue1: new FormControl(this.workHolidayVisaModel.hkIdValue1),
        hkIdValue2: new FormControl(this.workHolidayVisaModel.hkIdValue2),
        occupation: new FormControl(this.workHolidayVisaModel.occupation),

        travelDocHeld: [this.workHolidayVisaModel.travelDocHeld],
        travelDocType: new FormControl(this.workHolidayVisaModel.travelDocType),
        passport: [this.workHolidayVisaModel.passport],
        reEntryPermit: [this.workHolidayVisaModel.reEntryPermit],
        certOfIdentity: [this.workHolidayVisaModel.certOfIdentity],
        affidavit:[this.workHolidayVisaModel.affidavit],
        prcTravelPermit: [this.workHolidayVisaModel.prcTravelPermit],
        exitEntryPermit: [this.workHolidayVisaModel.prcTravelPermit],


        travelDocValue: new FormControl(this.workHolidayVisaModel.travelDocValue),
        travelDocIssuePlace: new FormControl(this.workHolidayVisaModel.travelDocIssuePlace),
        travelDocIssueDay: new FormControl(this.workHolidayVisaModel.travelDocIssueDay),
        travelDocIssueMonth: new FormControl(this.workHolidayVisaModel.travelDocIssueMonth),
        travelDocIssueYear: new FormControl(this.workHolidayVisaModel.travelDocIssueYear),
        travelDocExpDay: new FormControl(this.workHolidayVisaModel.travelDocExpDay),
        travelDocExpMonth: new FormControl(this.workHolidayVisaModel.travelDocExpMonth),
        travelDocExpYear: new FormControl(this.workHolidayVisaModel.travelDocExpYear),        
        
        phoneNo: new FormControl(this.workHolidayVisaModel.phoneNo),
        phoneExt: new FormControl(this.workHolidayVisaModel.phoneExt),
        faxNo: new FormControl(this.workHolidayVisaModel.faxNo),
        email: new FormControl(this.workHolidayVisaModel.email),

        presentAddress1: new FormControl(this.workHolidayVisaModel.presentAddress1),
        presentAddress2: new FormControl(this.workHolidayVisaModel.presentAddress2),
        presentAddress3: new FormControl(this.workHolidayVisaModel.presentAddress3),
        permanentAddress1: new FormControl(this.workHolidayVisaModel.permanentAddress1),
        permanentAddress2: new FormControl(this.workHolidayVisaModel.permanentAddress2),
        permanentAddress3: new FormControl(this.workHolidayVisaModel.permanentAddress3),
        
        educationLv: [this.workHolidayVisaModel.uniOrAbove],
        uniOrAbove: [this.workHolidayVisaModel.uniOrAbove],
        postSec: [this.workHolidayVisaModel.postSec],
        sec: [this.workHolidayVisaModel.sec],
        prim: [this.workHolidayVisaModel.prim],
        belowPrim: [this.workHolidayVisaModel.belowPrim],

  
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


