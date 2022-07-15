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
  selector: ' empEntry-formB',
  templateUrl: './formB.component.html',
  styleUrls: ['./formB.component.css']
})
export class EmpEntryFormBComponent implements OnInit, AfterViewInit, OnDestroy {

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
        
        appCompanyName: new FormControl(this.empEntryModel.appCompanyName),
        contactPerson: new FormControl(this.empEntryModel.contactPerson),
        appCompanyEmail: new FormControl(this.empEntryModel.appCompanyEmail),
        website: new FormControl(this.empEntryModel.website),
        appCompanyRoomValue: new FormControl(this.empEntryModel.appCompanyRoomValue),
        appCompanyFloorValue: new FormControl(this.empEntryModel.appCompanyFloorValue),
        appCompanyBlockValue: new FormControl(this.empEntryModel.appCompanyBlockValue),
        appCompanyBuildingValue: new FormControl(this.empEntryModel.appCompanyBuildingValue),
        appCompanyEstateValue: new FormControl(this.empEntryModel.appCompanyEstateValue),
        appCompanyStreetValue: new FormControl(this.empEntryModel.appCompanyStreetValue),
        appCompanyDistrict: new FormControl(this.empEntryModel.appCompanyDistrict),
        correspondenceAddressRoomValue: new FormControl(this.empEntryModel.correspondenceAddressRoomValue),
        correspondenceAddressFloorValue: new FormControl(this.empEntryModel.correspondenceAddressFloorValue),
        correspondenceAddressBlockValue: new FormControl(this.empEntryModel.correspondenceAddressBlockValue),
        correspondenceAddressBuildingValue: new FormControl(this.empEntryModel.correspondenceAddressBuildingValue),
        correspondenceAddressEstateValue: new FormControl(this.empEntryModel.correspondenceAddressEstateValue),
        correspondenceAddressStreetValue: new FormControl(this.empEntryModel.correspondenceAddressStreetValue),
        correspondenceAddressDistrict: new FormControl(this.empEntryModel.correspondenceAddressDistrict),
        appCompanyPhoneNo: new FormControl(this.empEntryModel.appCompanyPhoneNo),
        appCompanyPhoneExt: new FormControl(this.empEntryModel.appCompanyPhoneExt),
        appCompanyFaxNo: new FormControl(this.empEntryModel.appCompanyFaxNo),
        regNo: new FormControl(this.empEntryModel.regNo),
        commencementDay: new FormControl(this.empEntryModel.commencementDay),
        commencementMonth: new FormControl(this.empEntryModel.commencementMonth),
        commencementYear: new FormControl(this.empEntryModel.commencementYear),
        nature: new FormControl(this.empEntryModel.nature),
        ifSubsidiary: new FormControl(this.empEntryModel.ifSubsidiary),
        parentCompanyName: new FormControl(this.empEntryModel.parentCompanyName),
        parentCompanyAddress1: new FormControl(this.empEntryModel.parentCompanyAddress1),
        parentCompanyAddress2: new FormControl(this.empEntryModel.parentCompanyAddress2),
        parentCompanyAddress3: new FormControl(this.empEntryModel.parentCompanyAddress3),
        employeeName: new FormControl(this.empEntryModel.employeeName),
        employeeSurName: new FormControl(this.empEntryModel.employeeSurName),
        employeeGivenName: new FormControl(this.empEntryModel.employeeGivenName),
        postTitle: new FormControl(this.empEntryModel.postTitle),
        isIntraTransfer: new FormControl(this.empEntryModel.isIntraTransfer),
        salary: new FormControl(this.empEntryModel.salary),
        fringeBenefit: new FormControl(this.empEntryModel.fringeBenefit),
        fringeBenefitValue: new FormControl(this.empEntryModel.fringeBenefitValue),
        packageValue: new FormControl(this.empEntryModel.packageValue),
        jobDuty: new FormControl(this.empEntryModel.jobDuty),
        isExistingPost: new FormControl(this.empEntryModel.isExistingPost),
        currentQualification: new FormControl(this.empEntryModel.currentQualification),
        salaryOffered: new FormControl(this.empEntryModel.salaryOffered),
        justification: new FormControl(this.empEntryModel.justification),
        turnoverFromYear1: new FormControl(this.empEntryModel.turnoverFromYear1),
        turnoverToYear1: new FormControl(this.empEntryModel.turnoverToYear1),
        turnover1: new FormControl(this.empEntryModel.turnover1),
        turnoverFromYear2: new FormControl(this.empEntryModel.turnoverFromYear2),
        turnoverToYear2: new FormControl(this.empEntryModel.turnoverToYear2),
        turnover2: new FormControl(this.empEntryModel.turnover2),
        paidUp: new FormControl(this.empEntryModel.paidUp),
        staffingPositionAtDay: new FormControl(this.empEntryModel.staffingPositionAtDay),
        staffingPositionAtMonth: new FormControl(this.empEntryModel.staffingPositionAtMonth),
        staffingPositionAtYear: new FormControl(this.empEntryModel.staffingPositionAtYear),
        localProf: new FormControl(this.empEntryModel.localProf),
        nonLocalProf: new FormControl(this.empEntryModel.nonLocalProf),
        localStaff: new FormControl(this.empEntryModel.localStaff),
        nonLocalStaff: new FormControl(this.empEntryModel.nonLocalStaff),
        ifSuccessfulObtain: new FormControl(this.empEntryModel.ifSuccessfulObtain),
        employRef: new FormControl(this.empEntryModel.employRef),
        employRefNo: new FormControl(this.empEntryModel.employRefNo),
        anyApplication: new FormControl(this.empEntryModel.anyApplication),
        refNo: new FormControl(this.empEntryModel.refNo),
        appPostTitle: new FormControl(this.empEntryModel.appPostTitle),
        noOfWorker: new FormControl(this.empEntryModel.noOfWorker),
        appDay: new FormControl(this.empEntryModel.appDay),
        appMonth: new FormControl(this.empEntryModel.appMonth),
        appYear: new FormControl(this.empEntryModel.appYear),
        appResult: new FormControl(this.empEntryModel.appResult)
    

      
  
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


