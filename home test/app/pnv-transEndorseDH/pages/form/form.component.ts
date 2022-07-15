import { TransEndorseDHService } from 'src/app/pnv-transEndorseDH/transEndorseDH.service';
import { TransEndorseDH } from 'src/app/pnv-transEndorseDH/transEndorseDH.model';
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
  selector: ' transEndorseDH-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class TransEndorseDHFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
  transEndorseDHModel: TransEndorseDH;
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
    private transEndorseDHService: TransEndorseDHService,
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

    this.transEndorseDHModel = this.transEndorseDHService. TransEndorseDHModel;
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
      //const isdisable = (this.workHolidayVisaModel.entry) ? false : true;
      this.fillForm = this.formBuilder.group({
        chiName: new FormControl(this.transEndorseDHModel.chiName),
        maidenSurName: new FormControl(this.transEndorseDHModel.maidenSurName),
        engSurName: new FormControl(this.transEndorseDHModel.engSurName),
        engGivenName: new FormControl(this.transEndorseDHModel.engGivenName),
        chiNameAlias: new FormControl(this.transEndorseDHModel.chiNameAlias),
        engSurNameAlias: new FormControl(this.transEndorseDHModel.engSurNameAlias),
        engGivenNameAlias: new FormControl(this.transEndorseDHModel.engGivenNameAlias),
        
        //sexType: new FormControl(this.workHolidayVisaModel.engSurName),
        
        male: [this.transEndorseDHModel.male],
        female: [this.transEndorseDHModel.female],
        dobDay: new FormControl(this.transEndorseDHModel.dobDay),
        dobMonth: new FormControl(this.transEndorseDHModel.dobMonth),
        dobYear: new FormControl(this.transEndorseDHModel.dobYear),
        placeOfBirth: new FormControl(this.transEndorseDHModel.placeOfBirth),
        nationality: new FormControl(this.transEndorseDHModel.nationality),

        hkIdValue1: new FormControl(this.transEndorseDHModel.hkIdValue1),
        hkIdValue2: new FormControl(this.transEndorseDHModel.hkIdValue2),        
        phoneNo: new FormControl(this.transEndorseDHModel.phoneNo),
        phoneExt: new FormControl(this.transEndorseDHModel.phoneExt),
        email: new FormControl(this.transEndorseDHModel.email),
        roomValue: new FormControl(this.transEndorseDHModel.roomValue),
        floorValue: new FormControl(this.transEndorseDHModel.floorValue),
        blockValue: new FormControl(this.transEndorseDHModel.blockValue),
        buildingValue: new FormControl(this.transEndorseDHModel.buildingValue),
        estateValue: new FormControl(this.transEndorseDHModel.estateValue),
        streetValue: new FormControl(this.transEndorseDHModel.streetValue),
        district: new FormControl(this.transEndorseDHModel.district),
        lastArrivalDay: new FormControl(this.transEndorseDHModel.lastArrivalDay),
        lastArrivalMonth: new FormControl(this.transEndorseDHModel.lastArrivalMonth),
        lastArrivalYear: new FormControl(this.transEndorseDHModel.lastArrivalYear),
        permitRemainDay: new FormControl(this.transEndorseDHModel.permitRemainDay),
        permitRemainMonth: new FormControl(this.transEndorseDHModel.permitRemainMonth),
        permitRemainYear: new FormControl(this.transEndorseDHModel.permitRemainYear),
        occupation: new FormControl(this.transEndorseDHModel.occupation),
        company: new FormControl(this.transEndorseDHModel.company),
        pagesFull: [this.transEndorseDHModel.pagesFull],
        loss: [this.transEndorseDHModel.loss],
        others: new FormControl(this.transEndorseDHModel.others),
        travelDocType: new FormControl(this.transEndorseDHModel.travelDocType),
        travelDocValue: new FormControl(this.transEndorseDHModel.travelDocValue),
        dateOfIssue: new FormControl(this.transEndorseDHModel.dateOfIssue),
        issueDay: new FormControl(this.transEndorseDHModel.issueDay),
        issueMonth: new FormControl(this.transEndorseDHModel.issueMonth),
        issueYear: new FormControl(this.transEndorseDHModel.issueYear),
        placeOfIssue: new FormControl(this.transEndorseDHModel.placeOfIssue),

        reasonForTransfer: [this.transEndorseDHModel.reasonForTransfer]

        /*

        travelDocHeld: [this.workHolidayVisaModel.travelDocHeld],
       
        faxNo: new FormControl(this.workHolidayVisaModel.faxNo),
        */
  
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


