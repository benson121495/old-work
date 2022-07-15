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
  selector: ' fdhes-formB',
  templateUrl: './formB.component.html',
  styleUrls: ['./formB.component.css']
})
export class FdhesFormBComponent implements OnInit, AfterViewInit, OnDestroy {

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

    this.fdhesModel = this.fdhesService.FdhesModel;
	this.emailVal = this.fdhesModel.emailKey;
	this.verificationCode = this.fdhesModel.verCode;

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
        
        employerChiName: new FormControl(this.fdhesModel.employerChiName),
        employerEngSurName: new FormControl(this.fdhesModel.employerEngSurName),
        employerEngGivenName: new FormControl(this.fdhesModel.employerEngGivenName),
        employerSex: new FormControl(this.fdhesModel.employerSex),
        employerDobDay: new FormControl(this.fdhesModel.employerDobDay),
        employerDobMonth: new FormControl(this.fdhesModel.employerDobMonth),
        employerDobYear: new FormControl(this.fdhesModel.employerDobYear),
        employerHkIdValue1: new FormControl(this.fdhesModel.employerHkIdValue1),
        employerHkIdValue2: new FormControl(this.fdhesModel.employerHkIdValue2),
        employerNationality: new FormControl(this.fdhesModel.employerNationality),
        employerOccupation: new FormControl(this.fdhesModel.employerOccupation),
        hasHkId: new FormControl(this.fdhesModel.hasHkId),
        employerTravelDocType: new FormControl(this.fdhesModel.employerTravelDocType),
        employerTravelDocValue: new FormControl(this.fdhesModel.employerTravelDocValue),
        employerResidentialRoomValue: new FormControl(this.fdhesModel.employerResidentialRoomValue),
        employerResidentialFloorValue: new FormControl(this.fdhesModel.employerResidentialFloorValue),
        employerResidentialBlockValue: new FormControl(this.fdhesModel.employerResidentialBlockValue),
        employerResidentialBuildingValue: new FormControl(this.fdhesModel.employerResidentialBuildingValue),
        employerResidentialEstateValue: new FormControl(this.fdhesModel.employerResidentialEstateValue),
        employerResidentialStreetValue: new FormControl(this.fdhesModel.employerResidentialStreetValue),
        employerResidentialDistrict: new FormControl(this.fdhesModel.employerResidentialDistrict),
        employerCorrespondenceRoomValue: new FormControl(this.fdhesModel.employerCorrespondenceRoomValue),
        employerCorrespondenceFloorValue: new FormControl(this.fdhesModel.employerCorrespondenceFloorValue),
        employerCorrespondenceBlockValue: new FormControl(this.fdhesModel.employerCorrespondenceBlockValue),
        employerCorrespondenceBuildingValue: new FormControl(this.fdhesModel.employerCorrespondenceBuildingValue),
        employerCorrespondenceEstateValue: new FormControl(this.fdhesModel.employerCorrespondenceEstateValue),
        employerCorrespondenceStreetValue: new FormControl(this.fdhesModel.employerCorrespondenceStreetValue),
        employerCorrespondenceDistrict: new FormControl(this.fdhesModel.employerCorrespondenceDistrict),
        employerPhoneNo: new FormControl(this.fdhesModel.employerPhoneNo),
        employerPhoneExt: new FormControl(this.fdhesModel.employerPhoneExt),
        homeTelNo: new FormControl(this.fdhesModel.homeTelNo),
        employerFaxNo: new FormControl(this.fdhesModel.employerFaxNo),
        employerEmail: new FormControl(this.fdhesModel.employerEmail),
        helperName: new FormControl(this.fdhesModel.helperName),
        fileRefNo: new FormControl(this.fdhesModel.fileRefNo),
        relatioshipWithHelper: new FormControl(this.fdhesModel.relatioshipWithHelper),
        empType: new FormControl(this.fdhesModel.empType),
        replacedHelperName: new FormControl(this.fdhesModel.replacedHelperName),
        replacedHelperHkIdValue1: new FormControl(this.fdhesModel.replacedHelperHkIdValue1),
        replacedHelperHkIdValue2: new FormControl(this.fdhesModel.replacedHelperHkIdValue2),
        terminationDay: new FormControl(this.fdhesModel.terminationDay),
        terminationMonth: new FormControl(this.fdhesModel.terminationMonth),
        terminatioYear: new FormControl(this.fdhesModel.terminatioYear),
        reasonForAddirional: new FormControl(this.fdhesModel.reasonForAddirional),
        livingArrg: new FormControl(this.fdhesModel.livingArrg),
        deploymentDetail: new FormControl(this.fdhesModel.deploymentDetail),
        arrangementAfterApproved: new FormControl(this.fdhesModel.arrangementAfterApproved),
        deferReason: new FormControl(this.fdhesModel.deferReason),
        ifIncomeLessThan15000: new FormControl(this.fdhesModel.ifIncomeLessThan15000),
        avgMonthlyIncome: new FormControl(this.fdhesModel.avgMonthlyIncome),
        noOfBedroom: new FormControl(this.fdhesModel.noOfBedroom),
        ifSeparate: new FormControl(this.fdhesModel.ifSeparate),
        memberParticulars: new FormControl(this.fdhesModel.memberParticulars),
        memberName: new FormControl(this.fdhesModel.memberName),
        memberDobYear: new FormControl(this.fdhesModel.memberDobYear),
        relationshipWithEmployer: new FormControl(this.fdhesModel.relationshipWithEmployer),
        memberHkIdValue1: new FormControl(this.fdhesModel.memberHkIdValue1),
        memberHkIdValue2: new FormControl(this.fdhesModel.memberHkIdValue2),
        currentHelperName: new FormControl(this.fdhesModel.currentHelperName),
        currentHelperHkIdValue1: new FormControl(this.fdhesModel.currentHelperHkIdValue1),
        currentHelperHkIdValue2: new FormControl(this.fdhesModel.currentHelperHkIdValue2),
        permitRemainDay: new FormControl(this.fdhesModel.permitRemainDay),
        permitRemainMonth: new FormControl(this.fdhesModel.permitRemainMonth),
        permitRemainYear: new FormControl(this.fdhesModel.permitRemainYear),
        employedBy: new FormControl(this.fdhesModel.employedBy),
 
  
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

  doSubmit() {
    // this.setToModel();
    this.router.navigate(['../declarationB'], {relativeTo: this.activatedRoute});
  }


}


