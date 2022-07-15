import { TrainEntryService } from 'src/app/pnv-trainEntry/trainEntry.service';
import { TrainEntry } from 'src/app/pnv-trainEntry/trainEntry.model';
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
  selector: ' trainEntry-formA',
  templateUrl: './formA.component.html',
  styleUrls: ['./formA.component.css']
})
export class TrainEntryFormAComponent implements OnInit, AfterViewInit, OnDestroy {

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
  trainEntryModel: TrainEntry;
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
    private trainEntryService: TrainEntryService,
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

    this.trainEntryModel = this.trainEntryService. TrainEntryModel;
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
        
        chiName: new FormControl(this.trainEntryModel.chiName),
        maidenSurName: new FormControl(this.trainEntryModel.maidenSurName),
        engSurName: new FormControl(this.trainEntryModel.engSurName),
        engGivenName: new FormControl(this.trainEntryModel.engGivenName),
        alias: new FormControl(this.trainEntryModel.alias),
        sex: new FormControl(this.trainEntryModel.sex),
        dobDay:new FormControl((this.trainEntryModel.dobDay) ? this.trainEntryModel.dobDay : ''),
        dobMonth: new FormControl((this.trainEntryModel.dobMonth) ? this.trainEntryModel.dobMonth : ''),
        dobYear: new FormControl((this.trainEntryModel.dobYear) ? this.trainEntryModel.dobYear : ''),
        placeOfBirth: new FormControl(this.trainEntryModel.placeOfBirth),
        nationality: new FormControl(this.trainEntryModel.nationality),
        maritalStatus: new FormControl(this.trainEntryModel.maritalStatus),
        hkIdValue1: new FormControl(this.trainEntryModel.hkIdValue1),
        hkIdValue2: new FormControl(this.trainEntryModel.hkIdValue2),
        mainlandIdNo: new FormControl(this.trainEntryModel.mainlandIdNo), 
        travelDocType: new FormControl(this.trainEntryModel.travelDocType),
        travelDocValue: new FormControl(this.trainEntryModel.travelDocValue),
        placeOfIssue: new FormControl(this.trainEntryModel.placeOfIssue),
        travelDocIssueDay: new FormControl(this.trainEntryModel.travelDocIssueDay),
        travelDocIssueMonth: new FormControl(this.trainEntryModel.travelDocIssueMonth),
        travelDocIssueYear: new FormControl(this.trainEntryModel.travelDocIssueYear),
        travelDocExpDay: new FormControl(this.trainEntryModel.travelDocExpDay),
        travelDocExpMonth: new FormControl(this.trainEntryModel.travelDocExpMonth),
        travelDocExpYear: new FormControl(this.trainEntryModel.travelDocExpYear),
        email: new FormControl(this.trainEntryModel.email),
        phoneNo: new FormControl(this.trainEntryModel.phoneNo),
        faxNo: new FormControl(this.trainEntryModel.faxNo),
        domicileCountry: new FormControl(this.trainEntryModel.domicileCountry),
        hasPermanentResidence: new FormControl(this.trainEntryModel.hasPermanentResidence),
        residenceYear: new FormControl(this.trainEntryModel.residenceYear),
        residenceMonth: new FormControl(this.trainEntryModel.residenceMonth),
        isStayingHK: new FormControl(this.trainEntryModel.isStayingHK),
        permitRemainDay: new FormControl(this.trainEntryModel.permitRemainDay),
        permitRemainMonth: new FormControl(this.trainEntryModel.permitRemainMonth),
        permitRemainYear: new FormControl(this.trainEntryModel.permitRemainYear),        
        statusInHK: new FormControl(this.trainEntryModel.statusInHK),
        presentAddress: new FormControl(this.trainEntryModel.presentAddress),
        permanentAddress: new FormControl(this.trainEntryModel.permanentAddress),
        proposedEntryDay: new FormControl(this.trainEntryModel.proposedEntryDay),
        proposedEntryMonth: new FormControl(this.trainEntryModel.proposedEntryMonth),  
        proposedEntryYear: new FormControl(this.trainEntryModel.proposedEntryYear), 
        proposedDuration: new FormControl(this.trainEntryModel.proposedDuration),
        
        noOfdependant: new FormControl(this.trainEntryModel.noOfdependant),
        relationship: new FormControl(this.trainEntryModel.relationship),
        dependantMaritalStatus: new FormControl(this.trainEntryModel.dependantMaritalStatus),
        dependantHasPermanentResidence: new FormControl(this.trainEntryModel.dependantHasPermanentResidence),
        dependantIsStayingHK: new FormControl(this.trainEntryModel.dependantIsStayingHK),
        dependantStatus: new FormControl(this.trainEntryModel.dependantStatus),
        dependantDomicileCountry: new FormControl(this.trainEntryModel.dependantDomicileCountry),

        schoolName: new FormControl(this.trainEntryModel.schoolName),
        major: new FormControl(this.trainEntryModel.major),
        qualification: new FormControl(this.trainEntryModel.qualification),
        periodOfStudyFromMonth: new FormControl(this.trainEntryModel.periodOfStudyFromMonth),
        periodOfStudyFromYear: new FormControl(this.trainEntryModel.periodOfStudyFromYear),
        periodOfStudyToMonth: new FormControl(this.trainEntryModel.periodOfStudyToMonth),
        periodOfStudyToYear: new FormControl(this.trainEntryModel.periodOfStudyToYear),
        tech: new FormControl(this.trainEntryModel.tech),
        profIssueOrg: new FormControl(this.trainEntryModel.profIssueOrg),
        profIssueDay: new FormControl(this.trainEntryModel.profIssueDay),
        profIssueMonth: new FormControl(this.trainEntryModel.profIssueMonth),
        profIssueYear: new FormControl(this.trainEntryModel.profIssueYear),
        companyName: new FormControl(this.trainEntryModel.companyName),
        companyAddress: new FormControl(this.trainEntryModel.companyAddress),
        position: new FormControl(this.trainEntryModel.position),
        duty: new FormControl(this.trainEntryModel.duty),
        employmentFromMonth: new FormControl(this.trainEntryModel.employmentFromMonth),
        employmentFromYear: new FormControl(this.trainEntryModel.employmentFromYear),
        employmentToMonth: new FormControl(this.trainEntryModel.employmentToMonth),
        employmentToYear: new FormControl(this.trainEntryModel.employmentToYear)

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


