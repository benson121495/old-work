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
import { FdhesService } from 'src/app/fdhes/fdhes.service';
import { Fdhes } from 'src/app/fdhes/fdhes.model';

@Component({
  selector: ' fdhes-formA',
  templateUrl: './formA.component.html',
  styleUrls: ['./formA.component.css']
})
export class FdhesFormAComponent implements OnInit, AfterViewInit, OnDestroy {

  // ?CAPTCHA //
  @ViewChild(CaptchaComponent) captchaComponent: CaptchaComponent;
  // ?Structural Address /////
  @ViewChild(StructuralAddressListComponent) structAddressComponent: StructuralAddressListComponent;
  // ?Hospital List /////
  @ViewChild(HospitalOptionListComponent) HospitalOptionComponent: HospitalOptionListComponent;
  // ?ADI /////
  @ViewChild(AppAddressListComponent) addressComponent: AppAddressListComponent;

  stepNumber = 2;
  menuList: any[];
  fdhesModel: Fdhes;
  fillForm: FormGroup;
  submitted = false;
  captchaBypass: boolean = environment.captchaBypassFlag;

  emailVal: string ;
  verificationCode: string ;

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
  countList: any[];
  dateOfBirth: string;
  workCount: number;

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
    private fdhesService: FdhesService,
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
	this.countList = ["0", "1", "2", "3", "4", "5"];

    this.fdhesModel = this.fdhesService.FdhesModel;
	this.emailVal = this.fdhesModel.emailKey;
	this.verificationCode = this.fdhesModel.verCode;
	this.workCount = 0;

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
        lastestApplicationRefNo: new FormControl(this.fdhesModel.lastestApplicationRefNo),
        isInHk: new FormControl(this.fdhesModel.isInHk),
        appType: new FormControl(this.fdhesModel.appType),
        chiName: new FormControl(this.fdhesModel.chiName),
        maidenSurName: new FormControl(this.fdhesModel.maidenSurName),
        engSurName: new FormControl(this.fdhesModel.engSurName),
        engGivenName: new FormControl(this.fdhesModel.engGivenName),
        alias: new FormControl(this.fdhesModel.alias),
        sex: new FormControl(this.fdhesModel.sex),
        dobDay:new FormControl((this.fdhesModel.dobDay) ? this.fdhesModel.dobDay : ''),
        dobMonth: new FormControl((this.fdhesModel.dobMonth) ? this.fdhesModel.dobMonth : ''),
        dobYear: new FormControl((this.fdhesModel.dobYear) ? this.fdhesModel.dobYear : ''),
        placeOfBirth: new FormControl(this.fdhesModel.placeOfBirth),
        nationality: new FormControl(this.fdhesModel.nationality),
        maritalStatus: new FormControl(this.fdhesModel.maritalStatus),
        hkIdValue1: new FormControl(this.fdhesModel.hkIdValue1),
        hkIdValue2: new FormControl(this.fdhesModel.hkIdValue2),
        hkid: new FormControl(this.fdhesModel.hkid), 
        occupation: new FormControl(this.fdhesModel.occupation), 
        travelDocType: new FormControl(this.fdhesModel.travelDocType),
        travelDocValue: new FormControl(this.fdhesModel.travelDocValue),
        placeOfIssue: new FormControl(this.fdhesModel.placeOfIssue),
        travelDocIssueDay: new FormControl(this.fdhesModel.travelDocIssueDay),
        travelDocIssueMonth: new FormControl(this.fdhesModel.travelDocIssueMonth),
        travelDocIssueYear: new FormControl(this.fdhesModel.travelDocIssueYear),
        travelDocExpDay: new FormControl(this.fdhesModel.travelDocExpDay),
        travelDocExpMonth: new FormControl(this.fdhesModel.travelDocExpMonth),
        travelDocExpYear: new FormControl(this.fdhesModel.travelDocExpYear),
        email: new FormControl(this.fdhesModel.email),
        phoneNo: new FormControl(this.fdhesModel.phoneNo),
        phoneExt: new FormControl(this.fdhesModel.phoneExt),
        faxNo: new FormControl(this.fdhesModel.faxNo),
        employerName: new FormControl(this.fdhesModel.employerName),
        employerAddress: new FormControl(this.fdhesModel.employerAddress),
        permitRemainDay: new FormControl(this.fdhesModel.permitRemainDay),
        permitRemainMonth: new FormControl(this.fdhesModel.permitRemainMonth),
        permitRemainYear: new FormControl(this.fdhesModel.permitRemainYear),        
        statusInHK: new FormControl(this.fdhesModel.statusInHK),
        presentAddress: new FormControl(this.fdhesModel.presentAddress),
        permanentAddress: new FormControl(this.fdhesModel.permanentAddress),
        proposedEntryDay: new FormControl(this.fdhesModel.proposedEntryDay),
        proposedEntryMonth: new FormControl(this.fdhesModel.proposedEntryMonth),  
        proposedEntryYear: new FormControl(this.fdhesModel.proposedEntryYear), 
        proposedDuration: new FormControl(this.fdhesModel.proposedDuration),
        address: new FormControl(this.fdhesModel.address),
		workCount: new FormControl('0'),
        employmentPeriodFromMonth: new FormControl(this.fdhesModel.employmentPeriodFromMonth),
        employmentPeriodFromYear: new FormControl(this.fdhesModel.employmentPeriodFromYear),
        employmentPeriodToMonth: new FormControl(this.fdhesModel.employmentPeriodToMonth),
        employmentPeriodToYear: new FormControl(this.fdhesModel.employmentPeriodToYear),
        workingYear: new FormControl(this.fdhesModel.workingYear),
        workingMonth: new FormControl(this.fdhesModel.workingMonth),
        currentStatus: new FormControl(this.fdhesModel.currentStatus),
        others: new FormControl(this.fdhesModel.others),
        permittedRemainDay: new FormControl(this.fdhesModel.permittedRemainDay),
        permittedRemainMonth: new FormControl(this.fdhesModel.permittedRemainMonth),
        permittedRemainYear: new FormControl(this.fdhesModel.permittedRemainYear),
        purposeOfApplication: new FormControl(this.fdhesModel.purposeOfApplication),

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

  doSubmit() {
    // this.setToModel();
    let year = this.fillForm.get('dobYear').value
    this.router.navigate(['../declarationA'], {relativeTo: this.activatedRoute});
  }
 
  public onCountChange() {

    this.workCount = this.fillForm.get('workCount').value;
  }

}


