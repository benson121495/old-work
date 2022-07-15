import { SlsService } from 'src/app/pnv-sls/sls.service';
import { Sls } from 'src/app/pnv-sls/sls.model';
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
  selector: ' sls-formA',
  templateUrl: './formA.component.html',
  styleUrls: ['./formA.component.css']
})
export class SlsFormAComponent implements OnInit, AfterViewInit, OnDestroy {

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
  slsModel: Sls;
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
    private slsService: SlsService,
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

    this.slsModel = this.slsService. SlsModel;
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
      //const isdisable = (this.SlsModel.entry) ? false : true;
      this.fillForm = this.formBuilder.group({
        
        chiName: new FormControl(this.slsModel.chiName),
        maidenSurName: new FormControl(this.slsModel.maidenSurName),
        engSurName: new FormControl(this.slsModel.engSurName),
        engGivenName: new FormControl(this.slsModel.engGivenName),
        alias: new FormControl(this.slsModel.alias),
        sex: new FormControl(this.slsModel.sex),
        dobDay:new FormControl((this.slsModel.dobDay) ? this.slsModel.dobDay : ''),
        dobMonth: new FormControl((this.slsModel.dobMonth) ? this.slsModel.dobMonth : ''),
        dobYear: new FormControl((this.slsModel.dobYear) ? this.slsModel.dobYear : ''),
        placeOfBirth: new FormControl(this.slsModel.placeOfBirth),
        nationality: new FormControl(this.slsModel.nationality),
        maritalStatus: new FormControl(this.slsModel.maritalStatus),
        hkIdValue1: new FormControl(this.slsModel.hkIdValue1),
        hkIdValue2: new FormControl(this.slsModel.hkIdValue2),
        mainlandIdNo: new FormControl(this.slsModel.mainlandIdNo), 
        travelDocType: new FormControl(this.slsModel.travelDocType),
        travelDocValue: new FormControl(this.slsModel.travelDocValue),
        placeOfIssue: new FormControl(this.slsModel.placeOfIssue),
        travelDocIssueDay: new FormControl(this.slsModel.travelDocIssueDay),
        travelDocIssueMonth: new FormControl(this.slsModel.travelDocIssueMonth),
        travelDocIssueYear: new FormControl(this.slsModel.travelDocIssueYear),
        travelDocExpDay: new FormControl(this.slsModel.travelDocExpDay),
        travelDocExpMonth: new FormControl(this.slsModel.travelDocExpMonth),
        travelDocExpYear: new FormControl(this.slsModel.travelDocExpYear),
        presentAddress: new FormControl(this.slsModel.presentAddress),
        permanentAddress: new FormControl(this.slsModel.permanentAddress),
        email: new FormControl(this.slsModel.email),
        phoneNo: new FormControl(this.slsModel.phoneNo),
        faxNo: new FormControl(this.slsModel.faxNo),
        domicileCountry: new FormControl(this.slsModel.domicileCountry),
        hasPermanentResidence: new FormControl(this.slsModel.hasPermanentResidence),
        residenceYear: new FormControl(this.slsModel.residenceYear),
        residenceMonth: new FormControl(this.slsModel.residenceMonth),
        
        proposedEntryDay: new FormControl(this.slsModel.proposedEntryDay),
        proposedEntryMonth: new FormControl(this.slsModel.proposedEntryMonth),  
        proposedEntryYear: new FormControl(this.slsModel.proposedEntryYear), 
        proposedDurationYear: new FormControl(this.slsModel.proposedDurationYear),
        proposedDurationMonth: new FormControl(this.slsModel.proposedDurationMonth),
        
        schoolName: new FormControl(this.slsModel.schoolName),
        major: new FormControl(this.slsModel.major),
        qualification: new FormControl(this.slsModel.qualification),
        periodOfStudyFromMonth: new FormControl(this.slsModel.periodOfStudyFromMonth),
        periodOfStudyFromYear: new FormControl(this.slsModel.periodOfStudyFromYear),
        periodOfStudyToMonth: new FormControl(this.slsModel.periodOfStudyToMonth),
        periodOfStudyToYear: new FormControl(this.slsModel.periodOfStudyToYear),
        tech: new FormControl(this.slsModel.tech),
        profIssueOrg: new FormControl(this.slsModel.profIssueOrg),
        profIssueDay: new FormControl(this.slsModel.profIssueDay),
        profIssueMonth: new FormControl(this.slsModel.profIssueMonth),
        profIssueYear: new FormControl(this.slsModel.profIssueYear),
        companyName: new FormControl(this.slsModel.companyName),
        companyAddress: new FormControl(this.slsModel.companyAddress),
        position: new FormControl(this.slsModel.position),
        duty: new FormControl(this.slsModel.duty),
        employmentFromMonth: new FormControl(this.slsModel.employmentFromMonth),
        employmentFromYear: new FormControl(this.slsModel.employmentFromYear),
        employmentToMonth: new FormControl(this.slsModel.employmentToMonth),
        employmentToYear: new FormControl(this.slsModel.employmentToYear)

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


