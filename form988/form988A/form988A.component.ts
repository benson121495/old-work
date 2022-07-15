import { environment } from 'src/environments/environment';
import { ValidationUtils } from 'src/app/utils/validation-utils';
import { DateValidationUtils } from 'src/app/utils/date-validation-utils';
import { CommonService } from 'src/app/common.service';
import { Component, OnInit, AfterViewInit, ViewChild, SimpleChanges, OnDestroy } from '@angular/core';
import { CaptchaComponent } from 'angular-captcha';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl, AbstractControl, ValidationErrors, ValidatorFn, FormBuilder } from '@angular/forms';
// tslint:disable-next-line: max-line-length
// import { StructuralAddressListComponent } from 'src/app/shared/structural-address/structural-address-list/structural-address-list.component';
// import { HospitalOptionListComponent } from 'src/app/shared/hospital-option/hospital-option-list/hospital-option-list.component';
// import { ChineseCharacterValidationUtils } from 'src/app/utils/chinese-character-validation-utils';
import { FdhService } from 'src/app/pages/fdh.service';
import { FdhFullModel} from '../../models/fdhFullModel.model';
import { FdhForm988A } from 'src/app/models/fdhForm988A.model';
import { Es2Address } from "../../../../../../angular/es2-common/projects/es2-common/src/lib/adi-address/model/es2addr.model";
import { AppAddressListComponent } from 'src/app/shared/application-address/app-address-list/app-address-list.component';


@Component({
  selector: ' form988A',
  templateUrl: './form988A.component.html',
  styleUrls: ['./form988A.component.css']
})
export class Form988AComponent implements OnInit, AfterViewInit, OnDestroy {

  // ?CAPTCHA //
  @ViewChild(CaptchaComponent) captchaComponent: CaptchaComponent;
  // ?Structural Address /////
  // @ViewChild(StructuralAddressListComponent) structAddressComponent: StructuralAddressListComponent;
  // ?Hospital List /////
  // @ViewChild(HospitalOptionListComponent) HospitalOptionComponent: HospitalOptionListComponent;
  // ?ADI /////
  @ViewChild(AppAddressListComponent) addressComponent: AppAddressListComponent;

  env = environment;

  stepNumber = 2;
  menuList: any[];
  fdhForm988AModel: FdhForm988A;
  fdhFullModel: FdhFullModel;

  fillForm: FormGroup;
  submitted = false;

  emailVal: string ;
  verificationCode: string ;

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
  // chineseValidationUtils: ChineseCharacterValidationUtils;
  checking = false;

  captchaBypass: boolean = this.env.captchaBypassFlag;
  errorCode: boolean = this.env.showErrorCode;


  constructor(
    private router: Router,
    private fdhesService: FdhService,
    private formBuilder: FormBuilder,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute) {
      
      this.validationUtils = new ValidationUtils();
      this.browserLang = this.translateservice.currentLang;
      // this.chineseValidationUtils = new ChineseCharacterValidationUtils();
	  
     }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.yearsList = DateValidationUtils.getAllYears();
    this.monthList = DateValidationUtils.getMonthList();
    this.dobDayList = DateValidationUtils.getDefaultDayList();
    this.fromDayList = DateValidationUtils.getDefaultDayList();
    this.toDayList = DateValidationUtils.getDefaultDayList();
    this.regDayList = DateValidationUtils.getDefaultDayList();
	// this.countList = ["0", "1", "2", "3", "4", "5"];
  this.fdhFullModel = this.fdhesService.FdhFullModel;
    this.fdhForm988AModel = this.fdhesService.FdhFullModel.fdhForm988A;
	
	this.workCount = 0;
  if(!this.fdhForm988AModel){
    this.fdhForm988AModel = FdhForm988A.newInstance();
    this.fdhFullModel.fdhForm988A = this.fdhForm988AModel;
  }
    this.translateservice.onLangChange.subscribe((event: LangChangeEvent) => {
      this.browserLang = event.lang;
    });
    if(!this.fdhForm988AModel.presentAddress){
      this.fdhForm988AModel.presentAddress = new Es2Address();
      //ADI address
      this.fdhForm988AModel.presentAddress.addrFmt = 'O';
    }
    if(!this.fdhForm988AModel.domicileAddress){
      this.fdhForm988AModel.domicileAddress = new Es2Address();
      //ADI address
      this.fdhForm988AModel.domicileAddress.addrFmt = 'O';
    }
    if(!this.fdhForm988AModel.employerAddress){
      this.fdhForm988AModel.employerAddress = new Es2Address();
      //ADI address
      this.fdhForm988AModel.employerAddress.addrFmt = 'O';
    }

    this.emailVal = this.fdhForm988AModel.emailKey;
	this.verificationCode = this.fdhForm988AModel.verCode;
    // this.translateservice.get(['COMMON.CAPTCHA-LANG']).subscribe((res: string[]) => {
    //   this.captchStyle = res['COMMON.CAPTCHA-LANG'];
    // });
    // this.translateservice.onLangChange.subscribe((event: LangChangeEvent) => {
    //   this.browserLang = event.lang;
    //   this.translateservice.get(['COMMON.CAPTCHA-LANG']).subscribe((res: string[]) => {
    //     this.captchStyle = res['COMMON.CAPTCHA-LANG'];
    //   });
    // });
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
        lastestApplicationRefNo: new FormControl(this.fdhForm988AModel.lastestApplicationRefNo),
        isInHk: new FormControl(this.fdhForm988AModel.isInHk),
        appType: new FormControl(this.fdhForm988AModel.appType),
        chiName: new FormControl(this.fdhForm988AModel.chiName),
        maidenSurName: new FormControl(this.fdhForm988AModel.maidenSurName),
        engSurName: new FormControl(this.fdhForm988AModel.engSurName),
        engGivenName: new FormControl(this.fdhForm988AModel.engGivenName),
        alias: new FormControl(this.fdhForm988AModel.alias),
        sex: new FormControl(this.fdhForm988AModel.sex),
        dobDay:new FormControl((this.fdhForm988AModel.dobDay) ? this.fdhForm988AModel.dobDay : ''),
        dobMonth: new FormControl((this.fdhForm988AModel.dobMonth) ? this.fdhForm988AModel.dobMonth : ''),
        dobYear: new FormControl((this.fdhForm988AModel.dobYear) ? this.fdhForm988AModel.dobYear : ''),
        placeOfBirth: new FormControl(this.fdhForm988AModel.placeOfBirth),
        nationality: new FormControl(this.fdhForm988AModel.nationality),
        maritalStatus: new FormControl(this.fdhForm988AModel.maritalStatus),
        hkIdValue1: new FormControl(this.fdhForm988AModel.hkIdValue1),
        hkIdValue2: new FormControl(this.fdhForm988AModel.hkIdValue2),
        hkid: new FormControl(this.fdhForm988AModel.hkid), 
        occupation: new FormControl(this.fdhForm988AModel.occupation), 
        travelDocType: new FormControl(this.fdhForm988AModel.travelDocType),
        travelDocValue: new FormControl(this.fdhForm988AModel.travelDocValue),
        placeOfIssue: new FormControl(this.fdhForm988AModel.placeOfIssue),
        travelDocIssueDay: new FormControl(this.fdhForm988AModel.travelDocIssueDay),
        travelDocIssueMonth: new FormControl(this.fdhForm988AModel.travelDocIssueMonth),
        travelDocIssueYear: new FormControl(this.fdhForm988AModel.travelDocIssueYear),
        travelDocExpDay: new FormControl(this.fdhForm988AModel.travelDocExpDay),
        travelDocExpMonth: new FormControl(this.fdhForm988AModel.travelDocExpMonth),
        travelDocExpYear: new FormControl(this.fdhForm988AModel.travelDocExpYear),
        email: new FormControl(this.fdhForm988AModel.email),
        phoneNo: new FormControl(this.fdhForm988AModel.phoneNo),
        phoneExt: new FormControl(this.fdhForm988AModel.phoneExt),
        faxNo: new FormControl(this.fdhForm988AModel.faxNo),
        employerName: new FormControl(this.fdhForm988AModel.employerName),
        permitRemainDay: new FormControl(this.fdhForm988AModel.permitRemainDay),
        permitRemainMonth: new FormControl(this.fdhForm988AModel.permitRemainMonth),
        permitRemainYear: new FormControl(this.fdhForm988AModel.permitRemainYear),        
        statusInHK: new FormControl(this.fdhForm988AModel.statusInHK),

        permanentAddress: new FormControl(this.fdhForm988AModel.permanentAddress),
        proposedEntryDay: new FormControl(this.fdhForm988AModel.proposedEntryDay),
        proposedEntryMonth: new FormControl(this.fdhForm988AModel.proposedEntryMonth),  
        proposedEntryYear: new FormControl(this.fdhForm988AModel.proposedEntryYear), 
        proposedDuration: new FormControl(this.fdhForm988AModel.proposedDuration),

        employmentPeriodFromMonth: new FormControl(this.fdhForm988AModel.employmentPeriodFromMonth),
        employmentPeriodFromYear: new FormControl(this.fdhForm988AModel.employmentPeriodFromYear),
        employmentPeriodToMonth: new FormControl(this.fdhForm988AModel.employmentPeriodToMonth),
        employmentPeriodToYear: new FormControl(this.fdhForm988AModel.employmentPeriodToYear),
        workingYear: new FormControl(this.fdhForm988AModel.workingYear),
        workingMonth: new FormControl(this.fdhForm988AModel.workingMonth),
        currentStatus: new FormControl(this.fdhForm988AModel.currentStatus),
        others: new FormControl(this.fdhForm988AModel.others),
        permittedRemainDay: new FormControl(this.fdhForm988AModel.permittedRemainDay),
        permittedRemainMonth: new FormControl(this.fdhForm988AModel.permittedRemainMonth),
        permittedRemainYear: new FormControl(this.fdhForm988AModel.permittedRemainYear),
        purposeOfApplication: new FormControl(this.fdhForm988AModel.purposeOfApplication),
        
        presentAddrDisplay: new FormControl(this.fdhForm988AModel.presentAddress.addrDisplay, { validators: [Validators.required, ValidationUtils.validateAddress] }),
        domicileAddrDisplay: new FormControl(this.fdhForm988AModel.domicileAddress.addrDisplay, { validators: [Validators.required, ValidationUtils.validateAddress] }),

        addrDisplay: new FormControl(this.fdhForm988AModel.employerAddress.addrDisplay, { validators: [Validators.required, ValidationUtils.validateAddress] }),
        captchaCode: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
       
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
    }, 100);
  }

  ngOnDestroy(){

  }

  doSubmit() {
    // this.setToModel();
    let year = this.fillForm.get('dobYear').value;
    this.saveToModel();
    this.router.navigate(['../declarationA'], {relativeTo: this.activatedRoute});
  }
 
  public onCountChange() {

    this.workCount = this.fillForm.get('workCount').value;
  }

  toReset(){
    this.fillForm.reset;
  }

  saveToModel(){
    this.fdhForm988AModel.appType = this.fillForm.controls.appType.value;
    this.fdhForm988AModel.chiName = this.fillForm.controls.chiName.value;
    this.fdhForm988AModel.maidenSurName = this.fillForm.controls.maidenSurName.value;
    this.fdhForm988AModel.engSurName = this.fillForm.controls.engSurName.value;
    this.fdhForm988AModel.engGivenName = this.fillForm.controls.engGivenName.value;
    this.fdhForm988AModel.alias = this.fillForm.controls.alias.value;
    this.fdhForm988AModel.sex = this.fillForm.controls.sex.value;
   
    this.fdhForm988AModel.dobDay = this.fillForm.controls.dobDay.value;
    this.fdhForm988AModel.dobMonth = this.fillForm.controls.dobMonth.value;
    this.fdhForm988AModel.dobYear = this.fillForm.controls.dobYear.value;
    this.fdhForm988AModel.placeOfBirth = this.fillForm.controls.placeOfBirth.value;
    this.fdhForm988AModel.nationality = this.fillForm.controls.nationality.value;
    this.fdhForm988AModel.maritalStatus = this.fillForm.controls.maritalStatus.value;
    this.fdhForm988AModel.hkIdValue1 = this.fillForm.controls.hkIdValue1.value;
    this.fdhForm988AModel.hkIdValue2 = this.fillForm.controls.hkIdValue2.value;
    this.fdhForm988AModel.travelDocType = this.fillForm.controls.travelDocType.value;
    this.fdhForm988AModel.travelDocValue = this.fillForm.controls.travelDocValue.value;
    this.fdhForm988AModel.placeOfIssue = this.fillForm.controls.placeOfIssue.value;
    this.fdhForm988AModel.travelDocIssueDay = this.fillForm.controls.travelDocIssueDay.value;
    this.fdhForm988AModel.travelDocIssueMonth = this.fillForm.controls.travelDocIssueMonth.value;
    this.fdhForm988AModel.travelDocIssueYear = this.fillForm.controls.travelDocIssueYear.value;
    this.fdhForm988AModel.travelDocExpDay = this.fillForm.controls.travelDocExpDay.value;
    this.fdhForm988AModel.travelDocExpMonth = this.fillForm.controls.travelDocExpMonth.value;
    this.fdhForm988AModel.travelDocExpYear = this.fillForm.controls.travelDocExpYear.value;
    this.fdhForm988AModel.email = this.fillForm.controls.email.value;
    this.fdhForm988AModel.phoneNo = this.fillForm.controls.phoneNo.value;
    this.fdhForm988AModel.phoneExt = this.fillForm.controls.phoneExt.value;
    this.fdhForm988AModel.faxNo = this.fillForm.controls.faxNo.value;
    this.fdhForm988AModel.employerName = this.fillForm.controls.employerName.value;
    this.fdhForm988AModel.permitRemainDay = this.fillForm.controls.permitRemainDay.value;
    this.fdhForm988AModel.permitRemainMonth = this.fillForm.controls.permitRemainMonth.value;
    this.fdhForm988AModel.permitRemainYear = this.fillForm.controls.permitRemainYear.value;
    this.fdhForm988AModel.permanentAddress = this.fillForm.controls.permanentAddress.value;
    this.fdhForm988AModel.proposedEntryDay = this.fillForm.controls.proposedEntryDay.value;
    this.fdhForm988AModel.proposedEntryMonth = this.fillForm.controls.proposedEntryMonth.value;
    this.fdhForm988AModel.proposedEntryYear = this.fillForm.controls.proposedEntryYear.value;
    this.fdhForm988AModel.proposedDuration = this.fillForm.controls.proposedDuration.value;
    this.fdhForm988AModel.employmentPeriodFromMonth = this.fillForm.controls.employmentPeriodFromMonth.value;
    this.fdhForm988AModel.employmentPeriodFromYear = this.fillForm.controls.employmentPeriodFromYear.value;
    this.fdhForm988AModel.employmentPeriodToMonth = this.fillForm.controls.employmentPeriodToMonth.value;
    this.fdhForm988AModel.employmentPeriodToYear = this.fillForm.controls.employmentPeriodToYear.value;
    this.fdhForm988AModel.workingYear = this.fillForm.controls.workingYear.value;
    this.fdhForm988AModel.workingMonth = this.fillForm.controls.workingMonth.value;
    this.fdhForm988AModel.currentStatus = this.fillForm.controls.currentStatus.value;
    this.fdhForm988AModel.others = this.fillForm.controls.others.value;
    this.fdhForm988AModel.permittedRemainDay = this.fillForm.controls.permittedRemainDay.value;
    this.fdhForm988AModel.permittedRemainMonth = this.fillForm.controls.permittedRemainMonth.value;
    this.fdhForm988AModel.permittedRemainYear = this.fillForm.controls.permittedRemainYear.value;
    this.fdhForm988AModel.purposeOfApplication = this.fillForm.controls.purposeOfApplication.value;


    // wait for entry
    // this.fdhForm988AModel.selectedvalueEmployment = this.fillForm.controls.selectedvalueEmployment.value;
    //       for(let i = 0 ; i <this.selectedvalueEmployment ; i++){
    //         this.fdhForm988AModel.employmentForm[i] = this.employmentForm.controls.employmentitems.value[i];
    //       }

    // wait for Full Model
    // this.fdhFullModel.form988A = this.fdhForm988AModel ; 

  }

}


