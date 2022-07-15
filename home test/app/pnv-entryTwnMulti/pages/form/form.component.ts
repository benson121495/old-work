import { EntryTwnMultiService } from 'src/app/pnv-entryTwnMulti/entryTwnMulti.service';
import { EntryTwnMulti } from 'src/app/pnv-entryTwnMulti/entryTwnMulti.model';
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
  selector: ' entryTwnMulti-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class EntryTwnMultiFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
  entryTwnMultiModel: EntryTwnMulti;
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
    private entryTwnMultiService: EntryTwnMultiService,
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

    this.entryTwnMultiModel = this.entryTwnMultiService. EntryTwnMultiModel;
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
      //const isdisable = (this.changeEmpModel.entry) ? false : true;
      this.fillForm = this.formBuilder.group({

        permitType: [this.entryTwnMultiModel.permitType],
        oneYr: [this.entryTwnMultiModel.oneYr],
        threeYrs: [this.entryTwnMultiModel.threeYrs],
        appType: [this.entryTwnMultiModel.appType],
        firstApp: [this.entryTwnMultiModel.firstApp],
        renewal: [this.entryTwnMultiModel.renewal],
        reIssue: [this.entryTwnMultiModel.reIssue],
        requestReturn: [this.entryTwnMultiModel.requestReturn],

        airlineRefNo: new FormControl(this.entryTwnMultiModel.airlineRefNo),
        chiName: new FormControl(this.entryTwnMultiModel.chiName),
        maidenSurName: new FormControl(this.entryTwnMultiModel.maidenSurName),
        engSurName: new FormControl(this.entryTwnMultiModel.engSurName),
        engGivenName: new FormControl(this.entryTwnMultiModel.engGivenName),
        chiNameAlias: new FormControl(this.entryTwnMultiModel.chiNameAlias),
        engSurNameAlias: new FormControl(this.entryTwnMultiModel.engSurNameAlias),
        engGivenNameAlias: new FormControl(this.entryTwnMultiModel.engGivenNameAlias),
        male: [this.entryTwnMultiModel.male],
        female: [this.entryTwnMultiModel.female],
        dobDay: new FormControl(this.entryTwnMultiModel.dobDay),
        dobMonth: new FormControl(this.entryTwnMultiModel.dobMonth),
        dobYear: new FormControl(this.entryTwnMultiModel.dobYear),
        placeOfBirth: [this.entryTwnMultiModel.placeOfBirth],
        taiwanIdValue: new FormControl(this.entryTwnMultiModel.taiwanIdValue),
        residenceDuration: new FormControl(this.entryTwnMultiModel.residenceDuration),
        travelDocType: new FormControl(this.entryTwnMultiModel.travelDocType),
        travelDocValue: new FormControl(this.entryTwnMultiModel.travelDocValue),
        travelDocIssuePlace: new FormControl(this.entryTwnMultiModel.travelDocIssuePlace),
        travelDocIssueDate: new FormControl(this.entryTwnMultiModel.travelDocIssueDate),
        travelDocIssueDay: new FormControl(this.entryTwnMultiModel.travelDocIssueDay),
        travelDocIssueMonth: new FormControl(this.entryTwnMultiModel.travelDocIssueMonth),
        travelDocIssueYear: new FormControl(this.entryTwnMultiModel.travelDocIssueYear),
        travelDocExpDate: new FormControl(this.entryTwnMultiModel.travelDocExpDate),
        travelDocExpDay: new FormControl(this.entryTwnMultiModel.travelDocExpDay),
        travelDocExpMonth: new FormControl(this.entryTwnMultiModel.travelDocExpMonth),
        travelDocExpYear: new FormControl(this.entryTwnMultiModel.travelDocExpYear),
        permitExpDate: new FormControl(this.entryTwnMultiModel.permitExpDate),
        permitExpDay: new FormControl(this.entryTwnMultiModel.permitExpDay),
        permitExpMonth: new FormControl(this.entryTwnMultiModel.permitExpMonth),
        permitExpYear: new FormControl(this.entryTwnMultiModel.permitExpYear),
        presentAddress1: new FormControl(this.entryTwnMultiModel.presentAddress1),
        presentAddress2: new FormControl(this.entryTwnMultiModel.presentAddress2),
        presentAddress3: new FormControl(this.entryTwnMultiModel.presentAddress3),
        domicleAddress1: new FormControl(this.entryTwnMultiModel.domicleAddress1),
        domicleAddress2: new FormControl(this.entryTwnMultiModel.domicleAddress2),
        domicleAddress3: new FormControl(this.entryTwnMultiModel.domicleAddress3),
        occupation: new FormControl(this.entryTwnMultiModel.occupation),
        employerName: new FormControl(this.entryTwnMultiModel.employerName),
        employerAddress: new FormControl(this.entryTwnMultiModel.employerAddress),
        maritalStatus: [this.entryTwnMultiModel.maritalStatus],
        spouseChiName: new FormControl(this.entryTwnMultiModel.spouseChiName),
        spouseEngName: new FormControl(this.entryTwnMultiModel.spouseEngName),
        spouseOccupation: new FormControl(this.entryTwnMultiModel.spouseOccupation),
        reasonForVisit: new FormControl(this.entryTwnMultiModel.reasonForVisit),
        proposedDuration: new FormControl(this.entryTwnMultiModel.proposedDuration),       
        
        hkIdValue1: new FormControl(this.entryTwnMultiModel.hkIdValue1),
        hkIdValue2: new FormControl(this.entryTwnMultiModel.hkIdValue2),

        email: new FormControl(this.entryTwnMultiModel.email),
        refereeAddress: new FormControl(this.entryTwnMultiModel.refereeAddress),
        refereeBusinessAddress: new FormControl(this.entryTwnMultiModel.refereeBusinessAddress),
        phoneNo: new FormControl(this.entryTwnMultiModel.phoneNo),
        officePhoneNo: new FormControl(this.entryTwnMultiModel.officePhoneNo),
        phoneExt: new FormControl(this.entryTwnMultiModel.phoneExt)
      

      
  
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


