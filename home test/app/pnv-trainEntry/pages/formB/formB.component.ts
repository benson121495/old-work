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
  selector: ' trainEntry-formB',
  templateUrl: './formB.component.html',
  styleUrls: ['./formB.component.css']
})
export class TrainEntryFormBComponent implements OnInit, AfterViewInit, OnDestroy {

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
        
        sponsorCompanyName: new FormControl(this.trainEntryModel.sponsorCompanyName),
        contactPerson: new FormControl(this.trainEntryModel.contactPerson),
        sponsorCompanyEmail: new FormControl(this.trainEntryModel.sponsorCompanyEmail),
        website: new FormControl(this.trainEntryModel.website),
        sponsorCompanyRoomValue: new FormControl(this.trainEntryModel.sponsorCompanyRoomValue),
        sponsorCompanyFloorValue: new FormControl(this.trainEntryModel.sponsorCompanyFloorValue),
        sponsorCompanyBlockValue: new FormControl(this.trainEntryModel.sponsorCompanyBlockValue),
        sponsorCompanyBuildingValue: new FormControl(this.trainEntryModel.sponsorCompanyBuildingValue),
        sponsorCompanyEstateValue: new FormControl(this.trainEntryModel.sponsorCompanyEstateValue),
        sponsorCompanyStreetValue: new FormControl(this.trainEntryModel.sponsorCompanyStreetValue),
        sponsorCompanyDistrict: new FormControl(this.trainEntryModel.sponsorCompanyDistrict),
        correspondenceAddressRoomValue: new FormControl(this.trainEntryModel.correspondenceAddressRoomValue),
        correspondenceAddressFloorValue: new FormControl(this.trainEntryModel.correspondenceAddressFloorValue),
        correspondenceAddressBlockValue: new FormControl(this.trainEntryModel.correspondenceAddressBlockValue),
        correspondenceAddressBuildingValue: new FormControl(this.trainEntryModel.correspondenceAddressEstateValue),
        correspondenceAddressEstateValue: new FormControl(this.trainEntryModel.correspondenceAddressEstateValue),
        correspondenceAddressStreetValue: new FormControl(this.trainEntryModel.correspondenceAddressStreetValue),
        correspondenceAddressDistrict: new FormControl(this.trainEntryModel.correspondenceAddressDistrict),
        sponsorCompanyPhoneNo: new FormControl(this.trainEntryModel.sponsorCompanyPhoneNo),
        sponsorCompanyPhoneExt: new FormControl(this.trainEntryModel.sponsorCompanyPhoneExt),
        sponsorCompanyFaxNo: new FormControl(this.trainEntryModel.sponsorCompanyFaxNo),
        regNo: new FormControl(this.trainEntryModel.regNo),
        commencementDay: new FormControl(this.trainEntryModel.commencementDay),
        commencementMonth: new FormControl(this.trainEntryModel.commencementMonth),
        commencementYear: new FormControl(this.trainEntryModel.commencementYear),
        nature: new FormControl(this.trainEntryModel.nature),
        ifSubsidiary: new FormControl(this.trainEntryModel.ifSubsidiary),
        parentCompanyName: new FormControl(this.trainEntryModel.parentCompanyName),
        parentCompanyAddress1: new FormControl(this.trainEntryModel.parentCompanyAddress1),
        parentCompanyAddress2: new FormControl(this.trainEntryModel.parentCompanyAddress2),
        parentCompanyAddress3: new FormControl(this.trainEntryModel.parentCompanyAddress3),
        traineeSurName: new FormControl(this.trainEntryModel.traineeSurName),
        traineeGivenName: new FormControl(this.trainEntryModel.traineeGivenName),
        postTitle: new FormControl(this.trainEntryModel.postTitle),
        salary: new FormControl(this.trainEntryModel.salary),
        fringeBenefit: new FormControl(this.trainEntryModel.fringeBenefit),
        fringeBenefitValue: new FormControl(this.trainEntryModel.fringeBenefitValue),
        packageValue: new FormControl(this.trainEntryModel.packageValue),
        trainingDetail: new FormControl(this.trainEntryModel.trainingDetail),
        trainingAddress: new FormControl(this.trainEntryModel.trainingDetail),
        newAddressRoomValue: new FormControl(this.trainEntryModel.newAddressRoomValue),
        newAddressFloorValue: new FormControl(this.trainEntryModel.newAddressFloorValue),
        newAddressBlockValue: new FormControl(this.trainEntryModel.newAddressBlockValue),
        newAddressBuildingValue: new FormControl(this.trainEntryModel.newAddressBuildingValue),
        newAddressEstateValue: new FormControl(this.trainEntryModel.newAddressEstateValue),
        newAddressStreetValue: new FormControl(this.trainEntryModel.newAddressStreetValue),
        newAddressDistrict: new FormControl(this.trainEntryModel.newAddressDistrict),
       
       
        justification: new FormControl(this.trainEntryModel.justification),
        turnoverFromYear1: new FormControl(this.trainEntryModel.turnoverFromYear1),
        turnoverToYear1: new FormControl(this.trainEntryModel.turnoverToYear1),
        turnover1: new FormControl(this.trainEntryModel.turnover1),
        turnoverFromYear2: new FormControl(this.trainEntryModel.turnoverFromYear2),
        turnoverToYear2: new FormControl(this.trainEntryModel.turnoverToYear2),
        turnover2: new FormControl(this.trainEntryModel.turnover2),
        paidUp: new FormControl(this.trainEntryModel.paidUp),
        staffingPositionAtDay: new FormControl(this.trainEntryModel.staffingPositionAtDay),
        staffingPositionAtMonth: new FormControl(this.trainEntryModel.staffingPositionAtMonth),
        staffingPositionAtYear: new FormControl(this.trainEntryModel.staffingPositionAtYear),
        localProf: new FormControl(this.trainEntryModel.localProf),
        nonLocalProf: new FormControl(this.trainEntryModel.nonLocalProf),
        localStaff: new FormControl(this.trainEntryModel.localStaff),
        nonLocalStaff: new FormControl(this.trainEntryModel.nonLocalStaff),
        ifSuccessfulObtain: new FormControl(this.trainEntryModel.ifSuccessfulObtain),
        employRefNo: new FormControl(this.trainEntryModel.employRefNo),
        
    

      
  
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


