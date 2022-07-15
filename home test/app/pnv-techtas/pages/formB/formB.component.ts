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
  selector: ' techtas-formB',
  templateUrl: './formB.component.html',
  styleUrls: ['./formB.component.css']
})
export class TechtasFormBComponent implements OnInit, AfterViewInit, OnDestroy {

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
      //const isdisable = (this.techtasModel.entry) ? false : true;
      this.fillForm = this.formBuilder.group({
        
        appCompanyName: new FormControl(this.techtasModel.appCompanyName),
        contactPerson: new FormControl(this.techtasModel.contactPerson),
        appCompanyEmail: new FormControl(this.techtasModel.appCompanyEmail),
        appCompanyWebsite: new FormControl(this.techtasModel.appCompanyWebsite),      
        appCompanyRoomValue: new FormControl(this.techtasModel.appCompanyRoomValue),
        appCompanyFloorValue: new FormControl(this.techtasModel.appCompanyFloorValue),
        appCompanyBlockValue: new FormControl(this.techtasModel.appCompanyBlockValue),
        appCompanyBuildingValue: new FormControl(this.techtasModel.appCompanyBuildingValue),
        appCompanyEstateValue: new FormControl(this.techtasModel.appCompanyEstateValue),
        appCompanyStreetValue: new FormControl(this.techtasModel.appCompanyStreetValue),
        appCompanyDistrict: new FormControl(this.techtasModel.appCompanyDistrict),
        correspondenceAddressRoomValue: new FormControl(this.techtasModel.correspondenceAddressRoomValue),
        correspondenceAddressFloorValue: new FormControl(this.techtasModel.correspondenceAddressFloorValue),
        correspondenceAddressBlockValue: new FormControl(this.techtasModel.correspondenceAddressBlockValue),
        correspondenceAddressBuildingValue: new FormControl(this.techtasModel.correspondenceAddressBuildingValue),
        correspondenceAddressEstateValue: new FormControl(this.techtasModel.correspondenceAddressEstateValue),
        correspondenceAddressStreetValue: new FormControl(this.techtasModel.correspondenceAddressStreetValue),
        correspondenceAddressDistrict: new FormControl(this.techtasModel.correspondenceAddressDistrict),
        appCompanyPhoneNo: new FormControl(this.techtasModel.appCompanyPhoneNo),
        appCompanyPhoneExt: new FormControl(this.techtasModel.appCompanyPhoneExt),
        appCompanyFaxNo: new FormControl(this.techtasModel.appCompanyFaxNo),
        businessRegNo: new FormControl(this.techtasModel.businessRegNo),
        ifSubsidiary: new FormControl(this.techtasModel.ifSubsidiary),
        parentCompanyName: new FormControl(this.techtasModel.parentCompanyName),
        parentCompanyAddress1: new FormControl(this.techtasModel.parentCompanyAddress1),
        parentCompanyAddress2: new FormControl(this.techtasModel.parentCompanyAddress2),
        parentCompanyAddress3: new FormControl(this.techtasModel.parentCompanyAddress3),
        employeeEngSurName: new FormControl(this.techtasModel.employeeEngSurName),
        employeeEngGivenName: new FormControl(this.techtasModel.employeeEngGivenName),
        ifConductResearch: new FormControl(this.techtasModel.ifConductResearch),
        postTitle: new FormControl(this.techtasModel.postTitle),
        areaEngage: new FormControl(this.techtasModel.areaEngage),
        monthlySalary: new FormControl(this.techtasModel.monthlySalary),
        fringeBenefit: new FormControl(this.techtasModel.fringeBenefit),
        fringeBenefitValue: new FormControl(this.techtasModel.fringeBenefitValue),
        packageTotalValue: new FormControl(this.techtasModel.packageTotalValue),
        jobDuty: new FormControl(this.techtasModel.jobDuty),
        employerSkill: new FormControl(this.techtasModel.employerSkill),
        itcRefNo: new FormControl(this.techtasModel.itcRefNo),        
        quotaValidDay: new FormControl(this.techtasModel.quotaValidDay),
        quotaValidMonth: new FormControl(this.techtasModel.quotaValidMonth),
        quotaValidYear: new FormControl(this.techtasModel.quotaValidYear),
        serialNo: new FormControl(this.techtasModel.serialNo)

      
  
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



