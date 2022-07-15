import { TechtasService } from 'src/app/pnv-techtas/techtas.service';
import { Techtas } from 'src/app/pnv-techtas/techtas.model';
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
export class TechtasFormAComponent implements OnInit, AfterViewInit, OnDestroy {

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
  techtasModel: Techtas;
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
    private techtasService: TechtasService,
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

    this.techtasModel = this.techtasService. TechtasModel;
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
      //const isdisable = (this.TechtasModel.entry) ? false : true;
      this.fillForm = this.formBuilder.group({
        
        chiName: new FormControl(this.techtasModel.chiName),
        maidenSurName: new FormControl(this.techtasModel.maidenSurName),
        engSurName: new FormControl(this.techtasModel.engSurName),
        engGivenName: new FormControl(this.techtasModel.engGivenName),
        alias: new FormControl(this.techtasModel.alias),
        sex: new FormControl(this.techtasModel.sex),
        dobDay: new FormControl(this.techtasModel.dobDay),
        dobMonth: new FormControl(this.techtasModel.dobMonth),
        dobYear: new FormControl(this.techtasModel.dobYear),
        placeOfBirth: new FormControl(this.techtasModel.placeOfBirth),
        nationality: new FormControl(this.techtasModel.nationality),
        maritalStatus: new FormControl(this.techtasModel.maritalStatus),
        hkIdValue1: new FormControl(this.techtasModel.hkIdValue1),
        hkIdValue2: new FormControl(this.techtasModel.hkIdValue2),
        mainlandIdNo: new FormControl(this.techtasModel.mainlandIdNo),
        travelDocType: new FormControl(this.techtasModel.travelDocType),
        travelDocValue: new FormControl(this.techtasModel.travelDocValue),
        travelDocIssuePlace: new FormControl(this.techtasModel.travelDocIssuePlace),
        travelDocIssueDay: new FormControl(this.techtasModel.travelDocIssueDay),
        travelDocIssueMonth: new FormControl(this.techtasModel.travelDocIssueMonth),
        travelDocIssueYear: new FormControl(this.techtasModel.travelDocIssueYear),
        travelDocExpDay: new FormControl(this.techtasModel.travelDocExpDay),
        travelDocExpMonth: new FormControl(this.techtasModel.travelDocExpMonth),
        travelDocExpYear: new FormControl(this.techtasModel.travelDocExpYear),
        email: new FormControl(this.techtasModel.email),
        phoneNo: new FormControl(this.techtasModel.phoneNo),
        faxNo: new FormControl(this.techtasModel.faxNo),
        domicileCountry: new FormControl(this.techtasModel.domicileCountry),
        hasPermanentResidence: new FormControl(this.techtasModel.hasPermanentResidence),
        residenceMonth: new FormControl(this.techtasModel.residenceMonth),
        residenceYear: new FormControl(this.techtasModel.residenceYear),
        presentAddress1: new FormControl(this.techtasModel.presentAddress1),
        presentAddress2: new FormControl(this.techtasModel.presentAddress2),
        presentAddress3: new FormControl(this.techtasModel.presentAddress3),
        permanentAddress1: new FormControl(this.techtasModel.permanentAddress1),
        permanentAddress2: new FormControl(this.techtasModel.permanentAddress2),
        permanentAddress3: new FormControl(this.techtasModel.permanentAddress3),
        schoolName: new FormControl(this.techtasModel.schoolName),
        major: new FormControl(this.techtasModel.major),
        degreeObtain: new FormControl(this.techtasModel.degreeObtain),
        peroidOfStudy: new FormControl(this.techtasModel.peroidOfStudy),
        periodOfStudyToMonth: new FormControl(this.techtasModel.periodOfStudyToMonth),
        periodOfStudyToYear: new FormControl(this.techtasModel.periodOfStudyToYear),
        periodOfStudyFromMonth: new FormControl(this.techtasModel.periodOfStudyFromMonth),
        periodOfStudyFromYear: new FormControl(this.techtasModel.periodOfStudyFromYear),
        qualification: new FormControl(this.techtasModel.qualification),
        issueOrg: new FormControl(this.techtasModel.issueOrg),
        qualificationIssueDay: new FormControl(this.techtasModel.qualificationIssueDay),
        qualificationIssueMonth: new FormControl(this.techtasModel.qualificationIssueMonth),
        qualificationIssueYear: new FormControl(this.techtasModel.qualificationIssueYear),
        employmentFromMonth: new FormControl(this.techtasModel.employmentFromMonth),
        employmentFromYear: new FormControl(this.techtasModel.employmentFromYear),
        employmentToMonth: new FormControl(this.techtasModel.employmentToMonth),
        employmentToYear: new FormControl(this.techtasModel.employmentToYear),
        companyName: new FormControl(this.techtasModel.companyName),
        companyAddress: new FormControl(this.techtasModel.companyAddress),
        position: new FormControl(this.techtasModel.position),
        nature: new FormControl(this.techtasModel.nature),
        noOfDependant: new FormControl(this.techtasModel.noOfDependant),
        dependantEngSurName: new FormControl(this.techtasModel.dependantEngSurName),
        dependantEngGivenName: new FormControl(this.techtasModel.dependantEngGivenName),
        dependantChiName: new FormControl(this.techtasModel.dependantChiName),
        dependantAlias: new FormControl(this.techtasModel.dependantAlias),
        dependantSex: new FormControl(this.techtasModel.dependantSex),
        dependantDobDay: new FormControl(this.techtasModel.dependantDobDay),
        dependantDobMonth: new FormControl(this.techtasModel.dependantDobMonth),
        dependantDodYear: new FormControl(this.techtasModel.dependantDodYear),
        dependantPlaceOfBirth: new FormControl(this.techtasModel.dependantPlaceOfBirth),
        dependantNationality: new FormControl(this.techtasModel.dependantNationality),
        dependantRelationship: new FormControl(this.techtasModel.dependantRelationship),
        dependantMaritalStatus: new FormControl(this.techtasModel.dependantMaritalStatus),
        dependantTravelDocType: new FormControl(this.techtasModel.dependantTravelDocType),
        dependantTravelDocValue: new FormControl(this.techtasModel.dependantTravelDocValue),
        dependantHkIdValue1: new FormControl(this.techtasModel.dependantHkIdValue1),
        dependantHkIdValue2: new FormControl(this.techtasModel.dependantHkIdValue2),
        dependantDomicileCountry: new FormControl(this.techtasModel.dependantDomicileCountry),
        dependantHasPermanentResidence: new FormControl(this.techtasModel.dependantHasPermanentResidence),

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


