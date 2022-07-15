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
  selector: ' sls-formB',
  templateUrl: './formB.component.html',
  styleUrls: ['./formB.component.css']
})
export class SlsFormBComponent implements OnInit, AfterViewInit, OnDestroy {

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
      //const isdisable = (this.slsModel.entry) ? false : true;
      this.fillForm = this.formBuilder.group({
        
        appCompanyName: new FormControl(this.slsModel.appCompanyName),
        contactPerson: new FormControl(this.slsModel.contactPerson),
        appCompanyEmail: new FormControl(this.slsModel.appCompanyEmail),
        website: new FormControl(this.slsModel.website),
        appCompanyRoomValue: new FormControl(this.slsModel.appCompanyRoomValue),
        appCompanyFloorValue: new FormControl(this.slsModel.appCompanyFloorValue),
        appCompanyBlockValue: new FormControl(this.slsModel.appCompanyBlockValue),
        appCompanyBuildingValue: new FormControl(this.slsModel.appCompanyBuildingValue),
        appCompanyEstateValue: new FormControl(this.slsModel.appCompanyEstateValue),
        appCompanyStreetValue: new FormControl(this.slsModel.appCompanyStreetValue),
        appCompanyDistrict: new FormControl(this.slsModel.appCompanyDistrict),
        correspondenceAddressRoomValue: new FormControl(this.slsModel.correspondenceAddressRoomValue),
        correspondenceAddressFloorValue: new FormControl(this.slsModel.correspondenceAddressFloorValue),
        correspondenceAddressBlockValue: new FormControl(this.slsModel.correspondenceAddressBlockValue),
        correspondenceAddressBuildingValue: new FormControl(this.slsModel.correspondenceAddressBuildingValue),
        correspondenceAddressEstateValue: new FormControl(this.slsModel.correspondenceAddressEstateValue),
        correspondenceAddressStreetValue: new FormControl(this.slsModel.correspondenceAddressStreetValue),
        correspondenceAddressDistrict: new FormControl(this.slsModel.correspondenceAddressDistrict),
        appCompanyPhoneNo: new FormControl(this.slsModel.appCompanyPhoneNo),
        appCompanyPhoneExt: new FormControl(this.slsModel.appCompanyPhoneExt),
        appCompanyFaxNo: new FormControl(this.slsModel.appCompanyFaxNo),
        regNo: new FormControl(this.slsModel.regNo),
        commencementDay: new FormControl(this.slsModel.commencementDay),
        commencementMonth: new FormControl(this.slsModel.commencementMonth),
        commencementYear: new FormControl(this.slsModel.commencementYear),
        nature: new FormControl(this.slsModel.nature),
        ifSubsidiary: new FormControl(this.slsModel.ifSubsidiary),
        parentCompanyName: new FormControl(this.slsModel.parentCompanyName),
        parentCompanyAddress1: new FormControl(this.slsModel.parentCompanyAddress1),
        parentCompanyAddress2: new FormControl(this.slsModel.parentCompanyAddress2),
        parentCompanyAddress3: new FormControl(this.slsModel.parentCompanyAddress3),
        
        staffingPositionAtDay: new FormControl(this.slsModel.staffingPositionAtDay),
        staffingPositionAtMonth: new FormControl(this.slsModel.staffingPositionAtMonth),
        staffingPositionAtYear: new FormControl(this.slsModel.staffingPositionAtYear),
        noOfStaff: new FormControl(this.slsModel.noOfStaff),
        
        employeeChiName: new FormControl(this.slsModel.employeeChiName),
        employeeEngName: new FormControl(this.slsModel.employeeEngName),
        postTitle: new FormControl(this.slsModel.postTitle),
        salary: new FormControl(this.slsModel.salary),
        fringeBenefit: new FormControl(this.slsModel.fringeBenefit),
        jobDuty: new FormControl(this.slsModel.jobDuty),
        workingAddress: new FormControl(this.slsModel.workingAddress),
        newAddressRoomValue: new FormControl(this.slsModel.newAddressRoomValue),
        newAddressFloorValue: new FormControl(this.slsModel.newAddressFloorValue),
        newAddressBlockValue: new FormControl(this.slsModel.newAddressBlockValue),
        newAddressBuildingValue: new FormControl(this.slsModel.newAddressBuildingValue),
        newAddressEstateValue: new FormControl(this.slsModel.newAddressEstateValue),
        newAddressStreetValue: new FormControl(this.slsModel.newAddressStreetValue),
        newAddressDistrict: new FormControl(this.slsModel.newAddressDistrict),
        
        
        refNo: new FormControl(this.slsModel.refNo),
        approvalDay: new FormControl(this.slsModel.approvalDay),
        approvalMonth: new FormControl(this.slsModel.approvalMonth),
        approvalYear: new FormControl(this.slsModel.approvalYear),
      

      
  
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



