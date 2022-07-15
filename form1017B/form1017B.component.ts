import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CaptchaComponent } from 'angular-captcha';
import { AssgService } from 'src/app/assg/assg.service';
import { Form1017B } from 'src/app/assg/form1017B.model';
import { CommonService } from 'src/app/common.service';
import { AppAddressListComponent } from 'src/app/shared/application-address/app-address-list/app-address-list.component';
import { HospitalOptionListComponent } from 'src/app/shared/hospital-option/hospital-option-list/hospital-option-list.component';
// tslint:disable-next-line: max-line-length
import { StructuralAddressListComponent } from 'src/app/shared/structural-address/structural-address-list/structural-address-list.component';
import { ChineseCharacterValidationUtils } from 'src/app/utils/chinese-character-validation-utils';
import { DateValidationUtils } from 'src/app/utils/date-validation-utils';
import { ValidationUtils } from 'src/app/utils/validation-utils';
import { environment } from 'src/environments/environment';
import { Assg } from '../../assg.model';
import { Form1017FullModel} from '../../form1017Full.model';
import { Form1017A } from '../../form1017A.model';



@Component({
  selector: 'assg-form1017B',
  templateUrl: './form1017B.component.html',
  styleUrls: ['./form1017B.component.css']
})
export class AssgForm1017BComponent implements OnInit, AfterViewInit, OnDestroy {

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
  assgForm1017BModel: Form1017B;
  assgModel : Assg;
  assgForm1017AModel : Form1017A ;
  assgFullModel : Form1017FullModel;

  fillForm: FormGroup;
  submitted = false;
  captchaBypass: boolean = environment.captchaBypassFlag;
  captchaReloadingCheck = false;
  captchStyle: string;

  /*  emailVal: string ;
   verificationCode: string ; */

  errorCode: boolean = environment.showErrorCode;
  validationUtils: ValidationUtils;
  dateUtils: DateValidationUtils;
  browserLang: string;
  gregorianList: any[];
  LunarPopUp: boolean;

  yearsList: any[];
  monthList: any[];
  dobDayList: any[];

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

  selectedvalue = 1;
  
  // Amend flag from review page
  amend = false;
  amendSn = -1;

  constructor(
    private router: Router,
    private assgService: AssgService,
    private formBuilder: FormBuilder,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute) {
    this.assgFullModel = this.assgService.AssgFormFullModel;
    this.assgForm1017BModel = this.assgFullModel.formId1017B;
    if(!this.assgForm1017BModel){
      this.assgForm1017BModel = new Form1017B();
    }
    this.validationUtils = new ValidationUtils();
    this.browserLang = this.translateservice.currentLang;
    this.chineseValidationUtils = new ChineseCharacterValidationUtils();

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.amend = params['amend'];
        this.amendSn = Number(params['sn']);
    });

    window.scrollTo(0, 0);
    this.yearsList = DateValidationUtils.getAllYears();
    this.monthList = DateValidationUtils.getMonthList();
    this.dobDayList = DateValidationUtils.getDefaultDayList();

    this.assgForm1017AModel = this.assgService.AssgForm1017AModel;
    this.assgForm1017BModel.ern = this.assgForm1017AModel.ern;
    this.assgModel = this.assgService.AssgModel;

    this.translateservice.get(['COMMON.CAPTCHA-LANG']).subscribe((res: string[]) => {
      this.captchStyle = res['COMMON.CAPTCHA-LANG'];
    });
    this.translateservice.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateservice.get(['COMMON.CAPTCHA-LANG']).subscribe((res: string[]) => {
        this.captchStyle = res['COMMON.CAPTCHA-LANG'];
      });
      this.browserLang = event.lang;
    });
    this.createInputDetailsForm();
    if(!this.amend) {
      this.selectedvalue = this.assgForm1017BModel.residenceApplicationCount;
      for (let i = 1; i < this.assgForm1017BModel.residenceApplicationCount; i++) {
        this.assgForm1017BModel.applicantList.push(this.createItem(i));
      }
    }
    console.log(this.fillForm);
  }

  private createInputDetailsForm() {
    this.fillForm = this.formBuilder.group({
      applicationCount: this.amend ? 1 : new FormControl(this.assgForm1017BModel.residenceApplicationCount),
      applicantList: this.formBuilder.array([this.createItem(this.amend ? this.amendSn : 0)]),

      captchaCode: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
    },
      {
        validator: []
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

  ngOnDestroy() {

  }
 

  get applicantList(): FormArray {
    return this.fillForm.get('applicantList') as FormArray;
  }

  addApplicantList() {
    this.submitted = false; // ! not to show the error when clicked continue and then adding a new applicant.
    this.applicantList.push(this.createItem(this.assgForm1017BModel.residenceApplicationCount + 1));
  }
  get farray1() {
    return this.fillForm.controls.applicantList;
  }

  get farray() {
    return this.fillForm.controls.applicantList['controls'];
  }

  get f() {
    return this.fillForm.controls;
  }

  get g() {
    return this.fillForm;
  }

  deleteApplicantList(idx: number) {
    this.applicantList.removeAt(idx);
  }

  addApplicant(event) {
    if (this.selectedvalue < event.target.value) {
      const toadd = event.target.value - this.selectedvalue;
      for (let i = 0; i < toadd; i++) {
        this.addApplicantList();
      }
    } else {
      const todelete = this.selectedvalue - event.target.value;
      for (let i = 0; i < todelete; i++) {
        this.deleteApplicantList(this.selectedvalue - i - 1);
      }
    }
    this.selectedvalue = event.target.value;
  }

  public clickStart() {
    this.submitted = true;
    this.setToModel();
  }


  createItem(i): FormGroup {
    return this.formBuilder.group({
      chiName: new FormControl(
        (this.assgForm1017BModel.applicantList[i] === undefined) ? '' : this.assgForm1017BModel.applicantList[i].chiName,
        { validators: [Validators.required] }),

      engSurName: new FormControl(
        (this.assgForm1017BModel.applicantList[i] === undefined) ? '' : this.assgForm1017BModel.applicantList[i].engSurName,
        { validators: [Validators.required] }),

      engGivenName: new FormControl(
        (this.assgForm1017BModel.applicantList[i] === undefined) ? '' : this.assgForm1017BModel.applicantList[i].engGivenName,
        { validators: [Validators.required] }),

      alias: new FormControl(
        (this.assgForm1017BModel.applicantList[i] === undefined) ? '' : this.assgForm1017BModel.applicantList[i].alias),


      male: new FormControl(
        (this.assgForm1017BModel.applicantList[i] === undefined) ? false : this.assgForm1017BModel.applicantList[i].male),
        
      female: new FormControl(
          (this.assgForm1017BModel.applicantList[i] === undefined) ? false : this.assgForm1017BModel.applicantList[i].female),

      dobDay: new FormControl(
        (this.assgForm1017BModel.applicantList[i] === undefined) ? '' : this.assgForm1017BModel.applicantList[i].dobDay,
        { validators: [Validators.required]}),

      dobMonth: new FormControl(
        (this.assgForm1017BModel.applicantList[i] === undefined) ? '' : this.assgForm1017BModel.applicantList[i].dobMonth,
        { validators: [Validators.required] }),

      dobYear: new FormControl(
        (this.assgForm1017BModel.applicantList[i] === undefined) ? '' : this.assgForm1017BModel.applicantList[i].dobYear,
        { validators: [Validators.required]}),

      placeOfBirth: new FormControl(
        (this.assgForm1017BModel.applicantList[i] === undefined) ? '' : this.assgForm1017BModel.applicantList[i].placeOfBirth,
        { validators: [Validators.required] }),

      nationality: new FormControl(
        (this.assgForm1017BModel.applicantList[i] === undefined) ? '' : this.assgForm1017BModel.applicantList[i].nationality,
        { validators: [Validators.required] }),

      relationShip: new FormControl(
        (this.assgForm1017BModel.applicantList[i] === undefined) ? '' : this.assgForm1017BModel.applicantList[i].relationShip),

      maritalStatus: new FormControl(
        (this.assgForm1017BModel.applicantList[i] === undefined) ? '' : this.assgForm1017BModel.applicantList[i].maritalStatus),

      travelDocType: new FormControl(
        (this.assgForm1017BModel.applicantList[i] === undefined) ? '' : this.assgForm1017BModel.applicantList[i].travelDocType,
        { validators: [Validators.required] }),

      travelDocValue: new FormControl(
        (this.assgForm1017BModel.applicantList[i] === undefined) ? '' : this.assgForm1017BModel.applicantList[i].travelDocValue,
        { validators: [Validators.required] })
    }, {


      validator: [
         DateValidationUtils.validateDropDownDatesPast('dobDay', 'dobMonth', 'dobYear', 'invalidDob'),
         DateValidationUtils.validateDropDownDatesNull('dobDay', 'dobMonth', 'dobYear', 'emptyDob'),
        DateValidationUtils.validateDobMonthNull('dobDay', 'dobMonth', 'dobYear', 'emptyMonthDob'),
        //   DateValidationUtils.validateDropDownDatesNull('limitDay', 'limitMonth', 'limitYear', 'emptyStay'),
        // DateValidationUtils.validateDropDownDatesAllAnyNull('limitDay', 'limitMonth', 'limitYear', 'invalidStay'),
        //     DateValidationUtils.validateDropDownDatesNull('expiryDay', 'expiryMonth', 'expiryYear', 'emptyExpiry'),
        // DateValidationUtils.validateDropDownDatesAllAnyNull('expiryDay', 'expiryMonth', 'expiryYear', 'invalidExpiry')
      ]

    });
  }

  private setToModel() {
    this.assgForm1017BModel.residenceApplicationCount = this.fillForm.controls.applicationCount.value;
    if(this.amend) {
      this.assgForm1017BModel.applicantList[this.amendSn] = this.fillForm.controls.applicantList.value[0];
    } else {
      this.assgForm1017BModel.applicantList = this.fillForm.controls.applicantList.value;
    }
    this.assgForm1017BModel.ern = this.assgService.AssgForm1017AModel.ern;
    //this.assgModel.form1017B = this.assgForm1017BModel;
    // for(let i = 0 ; i < this.assgForm1017BModel.residenceApplicationCount ; i++){
    //   this.assgForm1017BModel.applicantList[i] = this.assgForm1017BModel.applicantList[i];
    //  }
    //this.assgFullModel.formId1017A = this.assgService.AssgForm1017AModel ; 
    this.assgFullModel.formId1017B = this.assgForm1017BModel;
    this.assgService.setAssgForm1017BModel(this.assgForm1017BModel);

  }

  doSave() {
    this.assgService.saveData(this.assgFullModel,'pnv/assg/saveForm' , this.browserLang).subscribe(
      (response)=>{
       
        setTimeout(() => {
          this.commonService.setShowLoading(false);
        } , 0);
        this.assgService.setAssgFormFullModel(JSON.parse(JSON.stringify(response)));

        if(this.amend){
          this.router.navigate(["../declaration"], { relativeTo: this.activatedRoute, queryParams: { amend:true, sn:this.amendSn} });
        } else {
          this.router.navigate(['../declaration-form1017-applicant'], { relativeTo: this.activatedRoute });
        }

      }
    )
  }

  backClicked(){
    this.router.navigate(['../form1017'], { relativeTo: this.activatedRoute });
  }

  doReset() {
    this.fillForm.reset();
  }

  doSubmit() {
    // this.setToModel();
    this.submitted = true;
    if (this.fillForm.invalid) {
      if (!this.captchaBypass) {
        this.captchaReloadingCheck = true;
        this.captchaComponent.reloadImage();
      } else {
        this.commonService.scrollUpToFirstError();
        return;
      }
      this.commonService.formErrorLog(this.fillForm);
      return;
    } else {
      this.setToModel();
      if (this.captchaBypass) {
        this.doSave();
      } else {
        this.validatecaptchaAndSubmit();
      }
    }

  }
  
  captchaFocus() {
    if (this.captchaReloadingCheck) {
      this.commonService.scrollUpToFirstError();
      this.captchaReloadingCheck = false;
    }
  }

  private validatecaptchaAndSubmit(): void {
    // submit the request data with captchaCode and captchaId
    setTimeout(() => {
      this.commonService.setShowLoading(true);
    }, 0);

    this.commonService.validateCaptchaServerSide(this.captchaComponent.captchaCode, this.captchaComponent.captchaId)
      .subscribe(
        (result) => {

          setTimeout(() => {
            this.commonService.setShowLoading(false);
          }, 0);
          console.log('captcha result ', result.success);
          if (result.success) {
            // Captcha validated succesfully
            this.fillForm.get('captchaCode').setErrors(null);
            this.doSave();
          } else {
            this.fillForm.get('captchaCode').setErrors({ 'captchaError': true });
            this.captchaComponent.reloadImage();
          }

        }, (err) => {
          setTimeout(() => {
            this.commonService.setShowLoading(false);
          }, 0);
          console.log(err);
          this.captchaComponent.reloadImage();
        });
  }

  
  cutValues(key: any, field: string) {
    this.fillForm.get(field).setValue(new ValidationUtils().nameMaskOnInput(key));
  }
  
  getFormControls(i) {
    return this.fillForm.controls.applicantList['controls'][i].controls;
  }
}