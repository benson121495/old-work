import { EmpEntryService } from 'src/app/pnv-empEntry/empEntry.service';
import { EmpEntry } from 'src/app/pnv-empEntry/empEntry.model';
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
  selector: ' empEntry-formA',
  templateUrl: './formA.component.html',
  styleUrls: ['./formA.component.css']
})
export class EmpEntryFormAComponent implements OnInit, AfterViewInit, OnDestroy {

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
  empEntryModel: EmpEntry;
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
    private empEntryService: EmpEntryService,
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

    this.empEntryModel = this.empEntryService. EmpEntryModel;
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
        
        chiName: new FormControl(this.empEntryModel.chiName),
        maidenSurName: new FormControl(this.empEntryModel.maidenSurName),
        engSurName: new FormControl(this.empEntryModel.engSurName),
        engGivenName: new FormControl(this.empEntryModel.engGivenName),
        alias: new FormControl(this.empEntryModel.alias),
        sex: new FormControl(this.empEntryModel.sex),
        dobDay:new FormControl((this.empEntryModel.dobDay) ? this.empEntryModel.dobDay : ''),
        dobMonth: new FormControl((this.empEntryModel.dobMonth) ? this.empEntryModel.dobMonth : ''),
        dobYear: new FormControl((this.empEntryModel.dobYear) ? this.empEntryModel.dobYear : ''),
        placeOfBirth: new FormControl(this.empEntryModel.placeOfBirth),
        nationality: new FormControl(this.empEntryModel.nationality),
        maritalStatus: new FormControl(this.empEntryModel.maritalStatus),
        hkIdValue1: new FormControl(this.empEntryModel.hkIdValue1),
        hkIdValue2: new FormControl(this.empEntryModel.hkIdValue2),
        mainlandIdNo: new FormControl(this.empEntryModel.mainlandIdNo), 
        travelDocType: new FormControl(this.empEntryModel.travelDocType),
        travelDocValue: new FormControl(this.empEntryModel.travelDocValue),
        placeOfIssue: new FormControl(this.empEntryModel.placeOfIssue),
        travelDocIssueDay: new FormControl(this.empEntryModel.travelDocIssueDay),
        travelDocIssueMonth: new FormControl(this.empEntryModel.travelDocIssueMonth),
        travelDocIssueYear: new FormControl(this.empEntryModel.travelDocIssueYear),
        travelDocExpDay: new FormControl(this.empEntryModel.travelDocExpDay),
        travelDocExpMonth: new FormControl(this.empEntryModel.travelDocExpMonth),
        travelDocExpYear: new FormControl(this.empEntryModel.travelDocExpYear),
        email: new FormControl(this.empEntryModel.email),
        phoneNo: new FormControl(this.empEntryModel.phoneNo),
        faxNo: new FormControl(this.empEntryModel.faxNo),
        domicileCountry: new FormControl(this.empEntryModel.domicileCountry),
        hasPermanentResidence: new FormControl(this.empEntryModel.hasPermanentResidence),
        residenceYear: new FormControl(this.empEntryModel.residenceYear),
        residenceMonth: new FormControl(this.empEntryModel.residenceMonth),
        hasObtainedDegree: new FormControl(this.empEntryModel.hasObtainedDegree),
        residentialStatus: new FormControl(this.empEntryModel.residentialStatus),
        isStayingHK: new FormControl(this.empEntryModel.isStayingHK),
        permitRemainDay: new FormControl(this.empEntryModel.permitRemainDay),
        permitRemainMonth: new FormControl(this.empEntryModel.permitRemainMonth),
        permitRemainYear: new FormControl(this.empEntryModel.permitRemainYear),        
        statusInHK: new FormControl(this.empEntryModel.statusInHK),
        presentAddress: new FormControl(this.empEntryModel.presentAddress),
        permanentAddress: new FormControl(this.empEntryModel.permanentAddress),
        proposedEntryDay: new FormControl(this.empEntryModel.proposedEntryDay),
        proposedEntryMonth: new FormControl(this.empEntryModel.proposedEntryMonth),  
        proposedEntryYear: new FormControl(this.empEntryModel.proposedEntryYear), 
        proposedDuration: new FormControl(this.empEntryModel.proposedDuration),
        
        noOfdependant: new FormControl(this.empEntryModel.noOfdependant),
        relationship: new FormControl(this.empEntryModel.relationship),
        dependantMaritalStatus: new FormControl(this.empEntryModel.dependantMaritalStatus),
        dependantHasPermanentResidence: new FormControl(this.empEntryModel.dependantHasPermanentResidence),
        dependantIsStayingHK: new FormControl(this.empEntryModel.dependantIsStayingHK),
        dependantStatus: new FormControl(this.empEntryModel.dependantStatus),

        instName: new FormControl(this.empEntryModel.instName),
        periodOfStudyInHKFromMonth: new FormControl(this.empEntryModel.periodOfStudyInHKFromMonth),
        periodOfStudyInHKFromYear: new FormControl(this.empEntryModel.periodOfStudyInHKFromYear),
        periodOfStudyInHKToMonth: new FormControl(this.empEntryModel.periodOfStudyInHKToMonth),
        periodOfStudyInHKToYear: new FormControl(this.empEntryModel.periodOfStudyInHKToYear),
        subject: new FormControl(this.empEntryModel.subject),
        award: new FormControl(this.empEntryModel.award),
        certDay: new FormControl(this.empEntryModel.certDay),
        certMonth: new FormControl(this.empEntryModel.certMonth),
        certYear: new FormControl(this.empEntryModel.certYear),

        schoolName: new FormControl(this.empEntryModel.schoolName),
        major: new FormControl(this.empEntryModel.major),
        qualification: new FormControl(this.empEntryModel.qualification),
        periodOfStudyFromMonth: new FormControl(this.empEntryModel.periodOfStudyFromMonth),
        periodOfStudyFromYear: new FormControl(this.empEntryModel.periodOfStudyFromYear),
        periodOfStudyToMonth: new FormControl(this.empEntryModel.periodOfStudyToMonth),
        periodOfStudyToYear: new FormControl(this.empEntryModel.periodOfStudyToYear),
        tech: new FormControl(this.empEntryModel.tech),
        profIssueOrg: new FormControl(this.empEntryModel.profIssueOrg),
        profIssueDay: new FormControl(this.empEntryModel.profIssueDay),
        profIssueMonth: new FormControl(this.empEntryModel.profIssueMonth),
        profIssueYear: new FormControl(this.empEntryModel.profIssueYear),
        companyName: new FormControl(this.empEntryModel.companyName),
        companyAddress: new FormControl(this.empEntryModel.companyAddress),
        position: new FormControl(this.empEntryModel.position),
        duty: new FormControl(this.empEntryModel.duty),
        employmentFromMonth: new FormControl(this.empEntryModel.employmentFromMonth),
        employmentFromYear: new FormControl(this.empEntryModel.employmentFromYear),
        employmentToMonth: new FormControl(this.empEntryModel.employmentToMonth),
        employmentToYear: new FormControl(this.empEntryModel.employmentToYear)

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


