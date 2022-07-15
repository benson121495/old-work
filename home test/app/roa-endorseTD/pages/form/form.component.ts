import { EndorseTDService } from 'src/app/roa-endorseTD/endorseTD.service';
import { EndorseTD } from 'src/app/roa-endorseTD/endorseTD.model';
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
  selector: ' endorseTD-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class EndorseTDFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
  endorseTDModel: EndorseTD;
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
    private endorseTDService: EndorseTDService,
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

    this.endorseTDModel = this.endorseTDService. EndorseTDModel;
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
      //const isdisable = (this.endorseTDModel.entry) ? false : true;
      this.fillForm = this.formBuilder.group({
        
        chiName: new FormControl(this.endorseTDModel.chiName),
        engSurName: new FormControl(this.endorseTDModel.engSurName),
        engGivenName: new FormControl(this.endorseTDModel.engGivenName),
        chiNameAlias: new FormControl(this.endorseTDModel.chiNameAlias),
        engSurNameAlias: new FormControl(this.endorseTDModel.engSurNameAlias),
        engGivenNameAlias: new FormControl(this.endorseTDModel.engGivenNameAlias),
        
        //sexType: new FormControl(this.endorseTDModel.engSurName),
        
        male: [this.endorseTDModel.male],
        female: [this.endorseTDModel.female],
        dobDay: new FormControl(this.endorseTDModel.dobDay),
        dobMonth: new FormControl(this.endorseTDModel.dobMonth),
        dobYear: new FormControl(this.endorseTDModel.dobYear),
        nationality: new FormControl(this.endorseTDModel.nationality),              
        phoneNo: new FormControl(this.endorseTDModel.phoneNo),
        phoneExt: new FormControl(this.endorseTDModel.phoneExt),

       
        travelDocValue: new FormControl(this.endorseTDModel.travelDocValue),
        dateOfIssue: new FormControl(this.endorseTDModel.dateOfIssue),
        issueDay: new FormControl(this.endorseTDModel.issueDay),
        issueMonth: new FormControl(this.endorseTDModel.issueMonth),
        issueYear: new FormControl(this.endorseTDModel.issueYear),
        placeOfIssue: new FormControl(this.endorseTDModel.placeOfIssue),

        eligibility: [this.endorseTDModel.eligibility],
        rightToLand: [this.endorseTDModel.rightToLand],

        address1: new FormControl(this.endorseTDModel.address1),
        address2: new FormControl(this.endorseTDModel.address2),
        address3: new FormControl(this.endorseTDModel.address3),
        address4: new FormControl(this.endorseTDModel.address4)
  
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


