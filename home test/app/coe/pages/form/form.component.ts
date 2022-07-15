import { CoeService } from 'src/app/coe/coe.service';
import { Coe } from 'src/app/coe/coe.model';
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
  selector: 'coe-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class CoeFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
  coeModel: Coe;
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
    private coeService: CoeService,
    private formBuilder: FormBuilder,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute
  ) {

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

    this.coeModel = this.coeService.CoeModel;
    this.translateservice.onLangChange.subscribe((event: LangChangeEvent) => {
      this.browserLang = event.lang;
    });
    /**
     * Form group values for validations
     * */
    this.intializeForm();
    this.validateNoOfCopy();
    this.handleCalendarType();

    // enable on onchange place of birth 
    this.validateHospital();
  }

  private intializeForm() {
    const isdisable = (this.coeModel.entry) ? false : true;
    this.fillForm = this.formBuilder.group({
      appId: [this.coeModel.appId],
      searchType: [this.coeModel.searchType, Validators.required],

      chinName: new FormControl(this.coeModel.chineseName,
        { validators: [validateSimplified(this.chineseValidationUtils)], updateOn: 'blur' }),
      chiSurName: new FormControl(this.coeModel.chiSurName,
        { validators: [validateSimplified(this.chineseValidationUtils)], updateOn: 'blur' }),
      chiGivenName: new FormControl(this.coeModel.chiGivenName,
        { validators: [validateSimplified(this.chineseValidationUtils)], updateOn: 'blur' }),
      engSurName: new FormControl(this.coeModel.engSurName, { validators: [Validators.required, ValidationUtils.useEnglishNameCheck] }),
      engGivenName: new FormControl(this.coeModel.engGivenName, { validators: [ValidationUtils.useEnglishNameCheck] }),

      chiNameAlias: new FormControl(this.coeModel.chiNameAlias,
        { validators: [validateSimplified(this.chineseValidationUtils)], updateOn: 'blur' }),
      engSurNameAlias: new FormControl(this.coeModel.engSurNameAlias,
        { validators: [ValidationUtils.useEnglishNameCheck], updateOn: 'blur' }),
      engGivenNameAlias: new FormControl(this.coeModel.engGivenNameAlias, { validators: [ValidationUtils.useEnglishNameCheck] }),

      male: [this.coeModel.male],
      female: [this.coeModel.female],
      dobDay: new FormControl((this.coeModel.dobDay) ? this.coeModel.dobDay : ''),
      dobMonth: new FormControl((this.coeModel.dobMonth) ? this.coeModel.dobMonth : ''),
      dobYear: new FormControl((this.coeModel.dobYear) ? this.coeModel.dobYear : ''),
      placeOfBirth: [this.coeModel.placeOfBirth],
      nationality: new FormControl(this.coeModel.nationality,
        { validators: [validateTraditionalAndEnglish(this.chineseValidationUtils)], updateOn: 'blur' }),
      travelDocValue: new FormControl(this.coeModel.travelDocValue, { validators: [ValidationUtils.hasChinese], updateOn: 'blur' }),
      travelDocDay: new FormControl((this.coeModel.travelDocDay) ? this.coeModel.travelDocDay : ''),
      travelDocMonth: new FormControl((this.coeModel.travelDocMonth) ? this.coeModel.travelDocMonth : ''),
      travelDocYear: new FormControl((this.coeModel.travelDocYear) ? this.coeModel.travelDocYear : ''),
      travelDocIssuePlace: new FormControl(this.coeModel.travelDocIssuePlace,
        { validators: [validateTraditionalAndEnglish(this.chineseValidationUtils)], updateOn: 'blur' }),
      isOtherNationality: [this.coeModel.isOtherNationality],
      otherNationality: new FormControl(this.coeModel.travelDocIssuePlace,
        { validators: [validateTraditionalAndEnglish(this.chineseValidationUtils)], updateOn: 'blur' }),
      otherNationalityAcquire: [this.coeModel.otherNationalityAcquire],
      renunciateChinese: [this.coeModel.renunciateChinese],
      placeOfResidence: new FormControl(this.coeModel.addInfo,
        { validators: [validateTraditionalAndEnglish(this.chineseValidationUtils)], updateOn: 'blur' }),
      statusAtPlaceOfResidence: new FormControl(this.coeModel.statusAtPlaceOfResidence),
      phoneNo: new FormControl(this.coeModel.phoneNo),
      phoneExt: new FormControl(this.coeModel.phoneExt),
      email: new FormControl(this.coeModel.email),
      address1: new FormControl(this.coeModel.address1),
      address2: new FormControl(this.coeModel.address2),
      address3: new FormControl(this.coeModel.address3),
      address4: new FormControl(this.coeModel.address4),

      calendarTypeGreg: [this.coeModel.calendarTypeGreg],
      calendarTypeLun: [this.coeModel.calendarTypeLun],


      hkIdValue1: new FormControl(this.coeModel.hkIdValue1, { validators: [], updateOn: 'blur' }),
      hkIdValue2: new FormControl(this.coeModel.hkIdValue2, { validators: [], updateOn: 'blur' }),


      fromDay: new FormControl((this.coeModel.fromDay) ? this.coeModel.fromDay : ''),
      fromMonth: new FormControl((this.coeModel.fromMonth) ? this.coeModel.fromMonth : ''),
      fromYear: new FormControl((this.coeModel.fromYear) ? this.coeModel.fromYear : ''),

      toDay: new FormControl((this.coeModel.toDay) ? this.coeModel.toDay : ''),
      toMonth: new FormControl((this.coeModel.toMonth) ? this.coeModel.toMonth : ''),
      toYear: new FormControl((this.coeModel.toYear) ? this.coeModel.toYear : ''),



      chinFatherName: [this.coeModel.chinFatherName,
      { validators: [validateSimplified(this.chineseValidationUtils)], updateOn: 'blur' }],
      engFatherSurName: [this.coeModel.engFatherSurName, ValidationUtils.useEnglishNameCheck],
      chinMotherName: [this.coeModel.chinMotherName,
      { validators: [validateSimplified(this.chineseValidationUtils)], updateOn: 'blur' }],
      engMotherSurName: [this.coeModel.engMotherSurName, ValidationUtils.useEnglishNameCheck],
      midWifeName: [this.coeModel.midWifeName],

      regDay: new FormControl((this.coeModel.regDay) ? this.coeModel.regDay : ''),
      regMonth: new FormControl((this.coeModel.regMonth) ? this.coeModel.regMonth : ''),
      regYear: new FormControl((this.coeModel.regYear) ? this.coeModel.regYear : ''),

      birthRegNum: new FormControl(this.coeModel.birthRegNum, { validators: [], updateOn: 'blur' }),
      addInfo: new FormControl(this.coeModel.addInfo,
        { validators: [validateTraditionalAndEnglish(this.chineseValidationUtils)], updateOn: 'blur' }),
      entry: [this.coeModel.entry],
      copies: [{ value: this.coeModel.copies, disabled: isdisable }],

      // ?Applicant details:
      applicantName: new FormControl(this.coeModel.applicantName, { validators: [Validators.required], updateOn: 'blur' }),
      hkIdValueApp1: new FormControl(this.coeModel.hkIdValueApp1, { validators: [], updateOn: 'blur' }),
      hkIdValueApp2: new FormControl(this.coeModel.hkIdValueApp2, { validators: [], updateOn: 'blur' }),
      phoneVal: new FormControl(this.coeModel.phoneVal,
        { validators: [Validators.required, ValidationUtils.phoneCheck], updateOn: 'blur' }),
      extValue: [this.coeModel.extValue],
      emailVal: new FormControl(this.coeModel.emailVal, { validators: [], updateOn: 'blur' }),
      // Lunar Pop up Radio
      lunarRadio: [],
      captchaCode: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
      addressDisplay: [this.coeModel.totalAddress],
      fullHospital: [],
      totalAddress: ['']

    }, {
      validator: [
        ValidationUtils.nameLengValidator('engSurName', 'engGivenName'),
        ValidationUtils.validateBothBlank('engSurName', 'engGivenName', 'bothBlank'),
        ValidationUtils.validateAnyOneBlank('engGivenName', 'engSurName', 'oneNameBlank'),
        ValidationUtils.aliasNameLengValidator('engSurNameAlias', 'engGivenNameAlias'),
        isSameEngGivenName,
        ValidationUtils.chineseEqual('chiNameAlias', 'chiSurName', 'chiGivenName'),
        ValidationUtils.hkIdValid('hkIdValue1', 'hkIdValue2', 'isHKValid'),
        ValidationUtils.hkIdValid('hkIdValueApp1', 'hkIdValueApp2', 'isHKValidApp'),
        DateValidationUtils.validateDropDownDatesPast('dobDay', 'dobMonth', 'dobYear', 'invalidDob'),
        DateValidationUtils.validateDropDownsameformat('fromDay', 'fromMonth', 'fromYear', 'toDay', 'toMonth', 'toYear', 'invalidformat'),
        DateValidationUtils.isDateEqualTodayFuture('dobDay', 'dobMonth', 'dobYear', 'invalidfrom'),
        DateValidationUtils.validateDropDownDatesPast('fromDay', 'fromMonth', 'fromYear', 'invalidperiodfrom'),
        DateValidationUtils.validateDropDownDatesPast('toDay', 'toMonth', 'toYear', 'invalidto'),
        DateValidationUtils.validateDropDownDatesGreater('fromDay', 'fromMonth', 'fromYear', 'toDay', 'toMonth', 'toYear', 'invalidSpan'),
        DateValidationUtils.isDateDiffFiveYrs
          ('fromDay', 'fromMonth', 'fromYear', 'toDay', 'toMonth', 'toYear', 'searchType', 'invaliddatediff'),
        DateValidationUtils.isDateEqualTodayFuture('regDay', 'regMonth', 'regYear', 'invalidregfrom'),
        DateValidationUtils.validateDropDownDatesPast('regDay', 'regMonth', 'regYear', 'invalidregDob'),
        checkDobRadio,
        checkDobText,
        ValidationUtils.isChineseInBetweeen('birthRegNum', 'birthRegHasChinese'),
        getDatebetween,
        regGreaterthanDOB,
        validateLunarDate,
        checkSearchDateSpan,
        isPast1873,
        ValidationUtils.validateBothBlank('male', 'female', 'sexCheck'),
        ValidationUtils.pdfEmailValidation('emailVal', 'invalidEmail'),
        spaceCheck('engSurName', 'engSurNameSC'),
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

  clearTravelDocVal() {
    if (this.coeModel.travelDocValueTemp) {
      this.coeModel.travelDocValueTemp = '';
    }
  }

  clearHkidVal1() {
    if (this.coeModel.hkIdValueApp1Temp) {
      this.coeModel.hkIdValueApp1Temp = '';
    }
  }

  clearHkidVal2() {
    if (this.coeModel.hkIdValueApp2Temp) {
      this.coeModel.hkIdValueApp2Temp = '';
    }
  }

  get f() {
    return this.fillForm.controls;
  }

  get g() {
    return this.fillForm;
  }


  cutValues(key: any, field: string) {
    console.log('name - ', this.fillForm.get(field).value);
    if (field === 'midWifeName' || field === 'applicantName') {
      this.fillForm.get(field).setValue(new ValidationUtils().nameMaskWithCommaAndChinese(key));
    } else if (field === 'engFatherSurName' || field === 'engMotherSurName') {
      this.fillForm.get(field).setValue(new ValidationUtils().nameMaskWithCommaEnglish(key));
    } else {
      this.fillForm.get(field).setValue(new ValidationUtils().nameMaskOnInput(key));
    }
  }

  private addressDisplay() {
    if (this.coeModel.appAddr1 != '' || this.coeModel.appAddr2 != '' || this.coeModel.appAddr3 != '') {
      this.addressComponent.hasAddress = true;
      this.addressComponent.totalAddress = this.coeModel.totalAddress;

    }
  }

  public toReset() {
    this.childVisible = false;
    setTimeout(() => {
      this.submitted = false;
      this.fillForm.reset();
      this.resetModel();
      this.intializeForm();
      this.childVisible = true;
      this.validateNoOfCopy();

      this.handleCalendarType();
      /*** reset model for structural address ***/
      if (this.structAddressComponent != undefined) {
        this.structAddressComponent.reset();
      }
    }, 10);

    setTimeout(() => {
      this.fillForm.addControl('childForm', this.addressComponent.inputFormGroup);
      this.addressComponent.inputFormGroup.setParent(this.fillForm);
    }, 15);
  }

  validateHospital() {
    this.fillForm.get('placeOfBirth').valueChanges.subscribe(
      (POB: string) => {
        if (this.structAddressComponent != undefined && POB != "" && POB != "HNIL") {
          this.structAddressComponent.enableDisableHospitalAddress();
        }
      });
  }

  validateNoOfCopy() {
    const noOfCopy = this.fillForm.get('copies');
    const val = this.fillForm.controls.entry.value;
    if (this.coeModel.entry) {
      this.checking = true;
      noOfCopy.setValidators([Validators.required]);
    } else {
      this.checking = false;
    }

    this.fillForm.get('entry').valueChanges.subscribe(
      (mode: string) => {

        if (mode) {
          // Set the noOfCopy to be mandatory for entry checkbox.
          this.coeModel.entry = 'On';
          this.fillForm.controls['copies'].enable();
          noOfCopy.setValidators([Validators.required]);
          this.checking = true;
        } else {
          // Set the noOfCopy to be not mandatory.
          noOfCopy.clearValidators();
          this.coeModel.entry = '';
          this.coeModel.copies = '';
          this.fillForm.get('copies').setValue('');
          this.fillForm.controls['copies'].disable();
          this.checking = false;
        }
        noOfCopy.updateValueAndValidity();
      });

  }


  /* validateNoOfCopy() {
    const noOfCopy = this.fillForm.get('copies');
    this.fillForm.get('entry').valueChanges.subscribe(
      (mode: string) => {
        if (mode) {
          // Set the noOfCopy to be mandatory for entry checkbox.
          this.coeModel.entry = 'On';
          noOfCopy.setValidators([Validators.required]);
        } else {
          // Set the noOfCopy to be not mandatory.
          noOfCopy.clearValidators();
          this.coeModel.entry = '';
        }
        noOfCopy.updateValueAndValidity();
      });
  } */

  private handleCalendarType() {
    const greg = this.fillForm.get('calendarTypeGreg');
    const lun = this.fillForm.get('calendarTypeLun');

    this.fillForm.get('calendarTypeGreg').valueChanges.subscribe(
      (mode: string) => {
        if (mode) {
          // Set the noOfCopy to be mandatory for entry checkbox.
          this.fillForm.get('calendarTypeLun').setValue(false);
        }
      });

    this.fillForm.get('calendarTypeLun').valueChanges.subscribe(
      (mode: string) => {
        if (mode) {
          // Set the noOfCopy to be mandatory for entry checkbox.
          this.fillForm.get('calendarTypeGreg').setValue(false);
        }
      });

    greg.updateValueAndValidity();
    lun.updateValueAndValidity();
  }


  private setSexValue() {
    const male = this.fillForm.get('male');
    const female = this.fillForm.get('female');

    if (male.value && !female.value) {
      this.coeModel.sexType = 'M';
    } else if (!male.value && female.value) {
      this.coeModel.sexType = 'F';
    } else if (male.value && female.value) {
      this.coeModel.sexType = 'B';
    }

  }

  private setHKIdForTiff() {
    if (this.coeModel.hkIdValue1 !== '' && this.coeModel.hkIdValue1 != null && this.coeModel.hkIdValue1 !== undefined) {
      this.coeModel.hkidValueAlpha = this.commonService.splitHKId(this.coeModel.hkIdValue1)[0];
      this.coeModel.hkidValueDigit = this.commonService.splitHKId(this.coeModel.hkIdValue1)[1];
    } else {
      this.coeModel.hkidValueAlpha = '';
      this.coeModel.hkidValueDigit = '';
    }

    if (this.coeModel.hkIdValueApp1 !== '' && this.coeModel.hkIdValueApp1 !== null && this.coeModel.hkIdValueApp1 !== undefined) {
      this.coeModel.hkidValueAppAlpha = this.commonService.splitHKId(this.coeModel.hkIdValueApp1)[0];
      this.coeModel.hkidValueAppDigit = this.commonService.splitHKId(this.coeModel.hkIdValueApp1)[1];
    } else {
      this.coeModel.hkidValueAppAlpha = '';
      this.coeModel.hkidValueAppDigit = '';
    }
  }

  public onSubmit() {
    this.submitted = true;
    this.commonService.formErrorLog(this.fillForm);

    /*** set submit for structural address ***/
    if (this.structAddressComponent != undefined) {
      this.structAddressComponent.HospitalSubmitted = true;
    }

    if (this.fillForm.invalid) {
      this.commonService.scrollUpToFirstError();
      if (!this.captchaBypass) {
        // this.fillForm.get('captchaCode').setValue('');
        this.captchaComponent.reloadImage();
      }
      return;
    } else {
      // all form fields are valid
      if (this.captchaBypass) {
        this.doSubmit();
      } else {
        this.validatecaptchaAndSubmit();
      }

    }
  }

  doSubmit() {
    // this.setToModel();
    let year = this.fillForm.get('dobYear').value
    console.log(year);

    if (year != 'YYYY' && year != '0000' && year != '') {
      year = new Date().getFullYear() - parseInt(year)
      this.coeService.CoeModel.dobYear = year
      this.router.navigate(['../declaration'], {
        relativeTo: this.activatedRoute
      });
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
          if (result.success) {
            this.fillForm.get('captchaCode').setErrors(null);
            this.doSubmit();

          } else {

            this.fillForm.get('captchaCode').setErrors({ 'captchaError': true });
            this.captchaComponent.reloadImage();
          }

        }, (err) => {
          setTimeout(() => {
            this.commonService.setShowLoading(false);
          }, 0);
          this.captchaComponent.reloadImage();
        });
  }

  particularSearch(status) {
    this.generalSearchOption = false;
    if (status.target.checked) {
      this.particularSearchOption = true;
    }
  }
  generalSearch(status) {
    this.particularSearchOption = false;
    if (status.target.checked) {
      this.generalSearchOption = true;
    }
  }

  /* certifiedCopyChecked(status) {
    if (status.target.checked) {
      this.certifiedCopyOption = true;
    } else {
      this.certifiedCopyOption = false;
    }
  } */



  /* Abishek : To check the date of birth is Lunar and is Leap for mm/dd/yyyy or dd/yyyy or yyyy*/
  public getGregorianDate() {

    const isLunar = this.fillForm.get('calendarTypeLun').value;
    let day = this.fillForm.get('dobDay').value;
    let mnth = this.fillForm.get('dobMonth').value;
    let year = this.fillForm.get('dobYear').value;
    const monthCal = this.commonService.getMonthFull();
    day = (day === '00') ? '' : day;
    mnth = (mnth === '00') ? '' : mnth;
    year = (year === '0000') ? '' : year;

    if (isLunar && year !== '' && day < 31) {

      const lunMonth = (mnth === undefined || mnth === null || mnth === '') ? 0 : mnth;
      this.dateOfBirth = day + ' ' + monthCal[Number(lunMonth)] + ' ' + year;
      this.commonService.getGregorianForLunarDate('common/getLunarLeap', day, mnth, year, this.browserLang).subscribe(
        (response) => {

          this.gregorianList = response.result;
          if (this.gregorianList.length === 1) {
            this.coeModel.gregorianDOB = this.gregorianList[0];

          } else if (this.gregorianList.length > 1) {

            this.fillForm.get('lunarRadio').setValue('');
            const greList1: string[] = this.gregorianList[0].split('-');
            const greList2: string[] = this.gregorianList[1].split('-');
            if (greList1 !== undefined && greList1.length === 3) {
              this.gregDate1 =
                (Number(greList1[0]) === 0 ? '' : Number(greList1[0])) + ' ' + monthCal[Number(greList1[1])] + ' ' + Number(greList1[2]);
            }
            if (greList2 !== undefined && greList2.length === 3) {
              this.gregDate2 =
                (Number(greList2[0]) === 0 ? '' : Number(greList2[0])) + ' ' + monthCal[Number(greList2[1])] + ' ' + Number(greList2[2]);
            }
            this.coeModel.lunarLeap = 'Y';
            if (!this.invalidFeb) {
              this.LunarPopUp = true;
            }
            this.invalidFeb = false;
          }

        }, (err) => {
          this.translateservice.get('COMMON-ERROR.SERVICE-ERROR').subscribe((res: string) => {
            this.commonService.errorPopUp(res);
          });
        }
      );
    }

  }

  /* To set the value of lunar pop up radio to model  */
  okLunarPopup() {
    this.LunarPopUp = false;
    const isLunar = this.fillForm.get('lunarRadio').value;


    if (isLunar === '0') {
      this.coeModel.gregorianDOB = this.gregorianList[0];
    } else if (isLunar === '1') {
      this.coeModel.gregorianDOB = this.gregorianList[1];
    } else if (isLunar === 'U') {
      this.coeModel.gregorianDOB = 'unknown';
    } else {

      this.LunarPopUp = true;
      this.fillForm.get('lunarRadio').setErrors(Validators.required);

    }
  }

  public onMonthYearChange(dayView, monthView, yearView) {

    const month = this.fillForm.get(monthView).value;
    const year = this.fillForm.get(yearView).value;
    const currentSelectedDay = this.fillForm.get(dayView).value;
    const days = this.adjustDobDays(month, year);

    // ! Not to show the pop up when day is greater than 30 and feb is chosen.
    if (month && currentSelectedDay && month === '02' && currentSelectedDay >= 30) {
      this.invalidFeb = true;
    }

    this.dobDayList = days !== undefined && days.length !== this.dobDayList.length ? days : this.dobDayList;
    if (this.dobDayList.indexOf(currentSelectedDay) < 0) {
      if (currentSelectedDay == '00') {
        this.fillForm.get(dayView).setValue('00');
      } else {
        this.fillForm.get(dayView).setValue('');
      }
    }
    this.getGregorianDate();
  }

  /** return days list or undefined if no valid parameters found */
  private adjustDobDays(month: string, year: string) {

    if (month !== undefined && month !== null && month !== '' && year !== undefined && year !== null && year !== '') {
      return DateValidationUtils.getDaysList(DateValidationUtils.getNumber(month), DateValidationUtils.getNumber(year));
    }

    return undefined;

  }

  private setToModel() {
    this.coeModel.searchType = this.fillForm.controls.searchType.value;
    this.coeModel.chineseName = this.fillForm.controls.chinName.value;

    if (this.fillForm.controls.engGivenName.value === '' || this.fillForm.controls.engGivenName.value === null
      || this.fillForm.controls.engGivenName.value === undefined) {
      this.coeModel.engGivenName = this.fillForm.controls.engGivenName.value;
    } else {
      this.coeModel.engGivenName = this.fillForm.controls.engGivenName.value.toUpperCase();
    }

    if (this.fillForm.controls.engSurName.value === '' || this.fillForm.controls.engSurName.value === null
      || this.fillForm.controls.engSurName.value === undefined) {
      this.coeModel.engSurName = this.fillForm.controls.engSurName.value;
    } else {
      this.coeModel.engSurName = this.fillForm.controls.engSurName.value.toUpperCase();
    }

    this.coeModel.chiNameAlias = this.fillForm.controls.chiNameAlias.value;

    if (this.fillForm.controls.engGivenNameAlias.value === '' || this.fillForm.controls.engGivenNameAlias.value === null
      || this.fillForm.controls.engGivenNameAlias.value === undefined) {
      this.coeModel.engGivenNameAlias = this.fillForm.controls.engGivenNameAlias.value;
    } else {
      this.coeModel.engGivenNameAlias = this.fillForm.controls.engGivenNameAlias.value.toUpperCase();
    }

    if (this.fillForm.controls.engSurNameAlias.value === '' || this.fillForm.controls.engSurNameAlias.value === null
      || this.fillForm.controls.engSurNameAlias.value === undefined) {
      this.coeModel.engSurNameAlias = this.fillForm.controls.engSurNameAlias.value;
    } else {
      this.coeModel.engSurNameAlias = this.fillForm.controls.engSurNameAlias.value.toUpperCase();
    }

    this.coeModel.male = this.fillForm.controls.male.value;
    this.coeModel.female = this.fillForm.controls.female.value;
    this.setSexValue();
    if (this.fillForm.controls.hkIdValue1.value === '' || this.fillForm.controls.hkIdValue1.value === null
      || this.fillForm.controls.hkIdValue1.value === undefined) {
      this.coeModel.hkIdValue1 = this.fillForm.controls.hkIdValue1.value;
    } else {
      this.coeModel.hkIdValue1 = this.fillForm.controls.hkIdValue1.value.toUpperCase();
    }

    if (this.fillForm.controls.hkIdValue2.value === '' || this.fillForm.controls.hkIdValue2.value === null
      || this.fillForm.controls.hkIdValue2.value === undefined) {
      this.coeModel.hkIdValue2 = this.fillForm.controls.hkIdValue2.value;
    } else {
      this.coeModel.hkIdValue2 = this.fillForm.controls.hkIdValue2.value.toUpperCase();
    }


    if (this.fillForm.controls.nationality.value === '' || this.fillForm.controls.nationality.value === null
      || this.fillForm.controls.nationality.value === undefined) {
      this.coeModel.nationality = this.fillForm.controls.nationality.value;
    } else {
      this.coeModel.nationality = this.fillForm.controls.nationality.value.toUpperCase();
    }


    this.coeModel.calendarTypeGreg = this.fillForm.controls.calendarTypeGreg.value;
    this.coeModel.calendarTypeLun = this.fillForm.controls.calendarTypeLun.value;

    this.coeModel.dobDay = (this.fillForm.controls.dobDay.value === '') ? null : this.fillForm.controls.dobDay.value;
    this.coeModel.dobMonth = (this.fillForm.controls.dobMonth.value === '') ? null : this.fillForm.controls.dobMonth.value;
    this.coeModel.dobYear = (this.fillForm.controls.dobYear.value === '') ? null : this.fillForm.controls.dobYear.value;

    this.fillForm.controls.fromDay.value === '' ? this.coeModel.fromDay = null :
      this.coeModel.fromDay = this.fillForm.controls.fromDay.value;
    this.fillForm.controls.fromMonth.value === '' ? this.coeModel.fromMonth = null :
      this.coeModel.fromMonth = this.fillForm.controls.fromMonth.value;
    this.fillForm.controls.fromYear.value === '' ? this.coeModel.fromYear = null :
      this.coeModel.fromYear = this.fillForm.controls.fromYear.value;

    this.fillForm.controls.toDay.value === '' ? this.coeModel.toDay = null :
      this.coeModel.toDay = this.fillForm.controls.toDay.value;
    this.fillForm.controls.toMonth.value === '' ? this.coeModel.toMonth = null :
      this.coeModel.toMonth = this.fillForm.controls.toMonth.value;
    this.fillForm.controls.toYear.value === '' ? this.coeModel.toYear = null :
      this.coeModel.toYear = this.fillForm.controls.toYear.value;


    this.coeModel.placeOfBirth = this.fillForm.controls.placeOfBirth.value;
    this.coeModel.chinFatherName = this.fillForm.controls.chinFatherName.value;

    if (this.fillForm.controls.engFatherSurName.value === '' || this.fillForm.controls.engFatherSurName.value === null
      || this.fillForm.controls.engFatherSurName.value === undefined) {
      this.coeModel.engFatherSurName = this.fillForm.controls.engFatherSurName.value;
    } else {
      this.coeModel.engFatherSurName = this.fillForm.controls.engFatherSurName.value.toUpperCase();
    }

    this.coeModel.chinMotherName = this.fillForm.controls.chinMotherName.value;

    if (this.fillForm.controls.engMotherSurName.value === '' || this.fillForm.controls.engMotherSurName.value === null
      || this.fillForm.controls.engMotherSurName.value === undefined) {
      this.coeModel.engMotherSurName = this.fillForm.controls.engMotherSurName.value;
    } else {
      this.coeModel.engMotherSurName = this.fillForm.controls.engMotherSurName.value.toUpperCase();
    }

    if (this.fillForm.controls.midWifeName.value === '' || this.fillForm.controls.midWifeName.value === null
      || this.fillForm.controls.midWifeName.value === undefined) {
      this.coeModel.midWifeName = this.fillForm.controls.midWifeName.value;
    } else {
      this.coeModel.midWifeName = this.fillForm.controls.midWifeName.value.toUpperCase();
    }
    this.fillForm.controls.regDay.value === '' ? this.coeModel.regDay = null :
      this.coeModel.regDay = this.fillForm.controls.regDay.value;

    this.fillForm.controls.regMonth.value === '' ? this.coeModel.regMonth = null :
      this.coeModel.regMonth = this.fillForm.controls.regMonth.value;

    this.fillForm.controls.regYear.value === '' ? this.coeModel.regYear = null :
      this.coeModel.regYear = this.fillForm.controls.regYear.value;


    if (this.fillForm.controls.birthRegNum.value === '' || this.fillForm.controls.birthRegNum.value === null
      || this.fillForm.controls.birthRegNum.value === undefined) {
      this.coeModel.birthRegNum = this.fillForm.controls.birthRegNum.value;
    } else {
      this.coeModel.birthRegNum = this.fillForm.controls.birthRegNum.value.toUpperCase();
    }
    if (this.fillForm.controls.addInfo.value === '' || this.fillForm.controls.addInfo.value === null
      || this.fillForm.controls.addInfo.value === undefined) {
      this.coeModel.addInfo = this.fillForm.controls.addInfo.value;
      this.coeModel.additionalInfoSplit = '';
    } else {
      this.coeModel.addInfo = this.fillForm.controls.addInfo.value.toUpperCase();
      if (this.coeModel.addInfo.length >= 210) {
        this.coeModel.additionalInfoSplit = this.coeModel.addInfo.substr(0, 210);
        console.log('this.coeModel.additionalInfoSplit', this.coeModel.additionalInfoSplit);
        console.log('this.coeModel.additionalInfoSplit.length', this.coeModel.additionalInfoSplit.length)
      } else {
        this.coeModel.additionalInfoSplit = this.coeModel.addInfo;
        console.log('this.coeModel.additionalInfoSplit1', this.coeModel.additionalInfoSplit);
      }
    }


    this.coeModel.copies = this.fillForm.controls.copies.value;



    this.setCalendarType();
    if (this.fillForm.controls.applicantName.value === '' || this.fillForm.controls.applicantName.value === null
      || this.fillForm.controls.applicantName.value === undefined) {
      this.coeModel.applicantName = this.fillForm.controls.applicantName.value;
    } else {
      this.coeModel.applicantName = this.fillForm.controls.applicantName.value.toUpperCase();
    }

    if (this.fillForm.controls.hkIdValueApp1.value === '' || this.fillForm.controls.hkIdValueApp1.value === null
      || this.fillForm.controls.hkIdValueApp1.value === undefined) {
      this.coeModel.hkIdValueApp1 = this.fillForm.controls.hkIdValueApp1.value;
    } else {
      this.coeModel.hkIdValueApp1 = this.fillForm.controls.hkIdValueApp1.value.toUpperCase();
    }

    if (this.fillForm.controls.hkIdValueApp2.value === '' || this.fillForm.controls.hkIdValueApp2.value === null
      || this.fillForm.controls.hkIdValueApp2.value === undefined) {
      this.coeModel.hkIdValueApp2 = this.fillForm.controls.hkIdValueApp2.value;
    } else {
      this.coeModel.hkIdValueApp2 = this.fillForm.controls.hkIdValueApp2.value.toUpperCase();
    }

    if (this.fillForm.controls.travelDocValue.value === '' || this.fillForm.controls.travelDocValue.value === null
      || this.fillForm.controls.travelDocValue.value === undefined) {
      this.coeModel.travelDocValue = this.fillForm.controls.travelDocValue.value;
    } else {
      this.coeModel.travelDocValue = this.fillForm.controls.travelDocValue.value.toUpperCase();
    }
    this.coeModel.phoneVal = this.fillForm.controls.phoneVal.value;
    this.coeModel.extValue = this.fillForm.controls.extValue.value;
    this.coeModel.emailVal = this.fillForm.controls.emailVal.value;
    this.setAddressFromADI();
    this.setHKIdForTiff();
    this.tdHkidModelSet();

    /*** set model for structural address ***/
    if (this.structAddressComponent !== undefined) {
      this.structAddressComponent.setToModel();
      this.coeModel.birthAddress = this.structAddressComponent.structuralAddress;
    } else {
      this.coeModel.birthAddress = '';
    }

    if (this.coeModel.placeOfBirth === 'HNIL') {
      this.coeModel.birthFullAddr = this.coeModel.birthAddress;
    } else if (this.fillForm.controls.fullHospital.value) {
      // ?To conctenate the hospital address with english and chinese
      this.coeModel.birthFullAddr = this.fillForm.controls.fullHospital.value;
      console.log('Full hospital value for TIFF : ', this.fillForm.controls.fullHospital.value);
    }
    this.coeService.setCoeModel(this.coeModel);

  }



  private tdHkidModelSet() {
    if ((this.coeModel.hkIdValueApp1 && this.coeModel.hkIdValueApp2) || this.coeModel.travelDocValue) {
      this.coeModel.hkIdValueApp1Temp = '';
      this.coeModel.hkIdValueApp2Temp = '';
      this.coeModel.travelDocValueTemp = '';
    }
  }

  private setCalendarType() {
    if (this.fillForm.get('calendarTypeGreg').value) {
      this.coeModel.calendarType = 'G';
    } else if (this.fillForm.get('calendarTypeLun').value) {
      this.coeModel.calendarType = 'L';
    } else {
      this.coeModel.calendarType = null;
    }
  }

  private setAddressFromADI() {
    const childValues = this.fillForm.controls.childForm.value;

    const add1Length = childValues.address1.length;
    const add2Length = childValues.address2.length;
    const add3Length = childValues.address3.length;
    const add4Length = childValues.address4.length;
    const add5Length = childValues.address5.length;
    const add6Length = childValues.address6.length;
    if (childValues.address1 !== '' && childValues.address1 != null && childValues.address1 !== undefined) {
      this.coeModel.appAddr1 = childValues.address1.substr(0, add1Length > 35 ? 35 : add1Length).toUpperCase();
    } else {
      this.coeModel.appAddr1 = '';
    }

    if (childValues.address2 !== '' && childValues.address2 != null && childValues.address2 !== undefined) {
      this.coeModel.appAddr2 = childValues.address2.substr(0, add2Length > 35 ? 35 : add2Length).toUpperCase();
    } else {
      this.coeModel.appAddr2 = '';
    }

    if (childValues.address3 !== '' && childValues.address3 != null && childValues.address3 !== undefined) {
      this.coeModel.appAddr3 = childValues.address3.substr(0, add3Length > 35 ? 35 : add3Length).toUpperCase();
    } else {
      this.coeModel.appAddr3 = '';
    }

    if (childValues.address4 !== '' && childValues.address4 != null && childValues.address4 !== undefined) {
      this.coeModel.appAddr4 = childValues.address4.substr(0, add4Length > 35 ? 35 : add4Length).toUpperCase();
    } else {
      this.coeModel.appAddr4 = '';
    }

    if (childValues.address5 !== '' && childValues.address5 != null && childValues.address5 !== undefined) {
      this.coeModel.appAddr5 = childValues.address5.substr(0, add5Length > 35 ? 35 : add5Length).toUpperCase();
    } else {
      this.coeModel.appAddr5 = '';
    }

    if (childValues.address6 !== '' && childValues.address6 != null && childValues.address6 !== undefined) {
      this.coeModel.appAddr6 = childValues.address6.substr(0, add6Length > 35 ? 35 : add6Length).toUpperCase();
    } else {
      this.coeModel.appAddr6 = '';
    }


    if (this.addressComponent.totalAddress) {
      this.coeModel.totalAddress = this.addressComponent.totalAddress;
    }
  }

  checkNameForBDM(key: any, formControlName: string) {
    let fControl: AbstractControl = this.fillForm.get(formControlName);
    let value: string = fControl.value;
    let result: boolean;


    if (fControl.value !== '') {

      this.fillForm.get(formControlName).setValue(new ValidationUtils().nameMaskWithCommaAndChinese(key));
      this.commonService.tradEnglishNameCheck(this.fillForm.get(formControlName).value).subscribe(

        (response) => {


          if (!response.result.isValidEnglish) {
            fControl.setErrors({ appEngCheck: true });
          }

          if (!response.result.isValidChinese) {
            fControl.setErrors({ appChinCheck: true });
          }

        }, (err) => {
          this.translateservice.get('COMMON-ERROR.SERVICE-ERROR').subscribe((res: string) => {
            this.commonService.errorPopUp(res);
          });


        });
    }
  }

  backClicked() {
    this.resetModel();
    this.router.navigate(['../requirements'], { relativeTo: this.activatedRoute });
    this.commonService.termsAndConditionShow = false;
  }


  private resetModel() {
    this.coeModel.searchType = '';
    this.coeModel.chineseName = '';
    this.coeModel.engGivenName = '';
    this.coeModel.engSurName = '';
    this.coeModel.chiNameAlias = '';
    this.coeModel.engGivenNameAlias = '';
    this.coeModel.engSurNameAlias = '';
    this.coeModel.sexType = '';
    this.coeModel.hkIdValue1 = '';
    this.coeModel.hkIdValue2 = '';
    this.coeModel.nationality = '';

    this.coeModel.dobDay = '';
    this.coeModel.dobMonth = '';
    this.coeModel.dobYear = '';

    this.coeModel.fromDay = '';
    this.coeModel.fromMonth = '';
    this.coeModel.fromYear = '';

    this.coeModel.toDay = '';
    this.coeModel.toMonth = '';
    this.coeModel.toYear = '';

    this.coeModel.male = '';
    this.coeModel.female = '';


    this.coeModel.placeOfBirth = '';
    this.coeModel.hospAddress = '';
    this.coeModel.hospitalName = '';
    this.coeModel.streetHospitalValue = '';
    this.coeModel.areaHospital = '';
    this.coeModel.districtValue = '';
    this.coeModel.notHospAddress = '';
    this.coeModel.roomValue = '';
    this.coeModel.floorValue = '';
    this.coeModel.blockValue = '';
    this.coeModel.buildingValue = '';
    this.coeModel.estateValue = '';
    this.coeModel.streetValue = '';
    this.coeModel.areaValue = '';
    this.coeModel.districtHospital = '';
    this.coeModel.otherinfoValue = '';
    this.coeModel.chinFatherName = '';
    this.coeModel.engFatherSurName = '';
    this.coeModel.chinMotherName = '';
    this.coeModel.engMotherSurName = '';
    this.coeModel.midWifeName = '';

    this.coeModel.regDay = '';
    this.coeModel.regMonth = '';
    this.coeModel.regYear = '';

    this.coeModel.birthRegNum = '';
    this.coeModel.addInfo = '';

    this.coeModel.copies = '';

    this.coeModel.dobDay = '';
    this.coeModel.dobMonth = '';
    this.coeModel.dobYear = '';


    this.coeModel.applicantName = '';
    this.coeModel.hkIdValueApp1 = '';
    this.coeModel.hkIdValueApp2 = '';
    this.coeModel.travelDocValue = '';
    this.coeModel.phoneVal = '';
    this.coeModel.extValue = '';
    this.coeModel.emailVal = '';
    this.coeModel.entry = '';

    this.coeModel.calendarTypeGreg = false;
    this.coeModel.calendarTypeLun = false;
    this.coeModel.appAddr1 = '';
    this.coeModel.appAddr2 = '';
    this.coeModel.appAddr3 = '';
    this.coeModel.appAddr4 = '';
    this.coeModel.appAddr5 = '';
    this.coeModel.appAddr6 = '';
    this.coeModel.totalAddress = '';

    this.coeModel.applicationType = '';
    this.coeModel.orgEngVal = '';
    this.coeModel.orgChineseValue = '';
    this.coeModel.hkIdValueApp1Temp = '';
    this.coeModel.hkIdValueApp2Temp = '';
    this.coeModel.travelDocValueTemp = '';
    this.coeModel.officeValue = '';

    // ? To reset the input address which is stored in session
    sessionStorage.removeItem('totalAddress');
  }

  setMaxlength(value) {
    const chineseRegex = /^[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+$/g;
    if (chineseRegex.test(value.charAt(0))) {
      this.maxLength = 177;
    } else {
      this.maxLength = 253;
    }
  }

  ngOnDestroy() {
    setTimeout(() => {
      this.commonService.setShowLoading(true);
    }, 0);
  }

  maskChineseValues(value: any, control: string) {
    this.fillForm.get(control).setValue(this.chineseValidationUtils.maskChineseValues(value));
  }

  navigateToUrl(endPoint, path) {
    window.open(environment.fEBaseUrl + 'static/' + path + '/search-birth/' + this.translateservice.currentLang + '/' + endPoint,
      '_blank', 'toolbar=no,scrollbars=yes,resizable=yes,top=5000,left=500,width=4000,height=4000');
  }

  /* End of Class */
}


function checkDobRadio(form: FormGroup) {
  let typeOfSearch = form.get('searchType').value;
  let dob = form.get('dobYear').value;
  dob = (dob == '0000') ? '' : dob;
  let lunCheck = form.get('calendarTypeGreg').value;
  let gregCheck = form.get('calendarTypeLun').value;

  return (typeOfSearch == 'P' && (!gregCheck && !lunCheck && dob == '')) ? { dobRequiredOnP: true } : null;
}

function spaceCheck(field1: string, errorKey: string): ValidatorFn {
  return (control: FormGroup): ValidationErrors | null => {
    const keyValueObj: { [key: string]: boolean } = { errorKey: false };
    if (control.get(field1).value == ' ') {
      keyValueObj[errorKey] = true;
      return keyValueObj;
    }
    return null;
  };
}

function checkDobText(form: FormGroup) {
  let gregCheck = form.get('calendarTypeGreg').value;
  let lunCheck = form.get('calendarTypeLun').value;
  let dob = form.get('dobYear').value;
  // dob = (dob == '0000') ? '' : dob;
  if ((!gregCheck && !lunCheck) && (dob !== '' && dob !== null)) {
    return { dobRadioRequired: true };
  } else if ((gregCheck || lunCheck) && dob === '0000') {
    return { yearZero: true };
  } else if ((gregCheck || lunCheck) && (dob === '' || dob === null)) {
    return { dobTextRequired: true };
  }
  return null;

}

function checkSearchDateSpan(form: FormGroup) {
  let typeOfSearch = form.get('searchType').value;
  let from = form.get('fromYear').value;
  let to = form.get('toYear').value;
  from = (from == '00') ? '' : from;
  to = (to == '0000') ? '' : to;
  const dates = (from == '' || to == '');
  return (typeOfSearch == 'G' && dates) ? { searchSpanRequired: true } : null;
}


function isSameEngGivenName(form: FormGroup) {
  let englishName = form.get('engGivenName').value;
  let surName = form.get('engSurName').value;
  let englishAliasName = form.get('engGivenNameAlias').value;
  let surNameAlias = form.get('engSurNameAlias').value;

  if (surName == ' ' || englishName == ' ') {
    return null;
  }

  if (englishName) {
    englishName = englishName.toUpperCase();
  }
  if (surName) {
    surName = surName.toUpperCase();
  }
  if (englishAliasName) {
    englishAliasName = englishAliasName.toUpperCase();
  }
  if (surNameAlias) {
    surNameAlias = surNameAlias.toUpperCase();
  }

  const totalName = englishName + surName;
  const totalAlias = englishAliasName + surNameAlias;

  if (!totalName || !totalAlias) {
    return null;
  }

  return (totalName === totalAlias) ? { isEnglishGivenNameSame: true } : null;

}

function differenceOfDates(form: FormGroup) {
  let date1 = form.get('fromYear').value;
  let date2 = form.get('toYear').value;
  date2 = (date2 == '0000') ? '' : date2;
  date1 = (date1 == '0000') ? '' : date1;
  let diff: number = DateValidationUtils.getDiffInDays(date1, date2);
  return diff > 1825 ? { moreThanFiveYears: true } : null;

}

function isDobInBetweenSearch(form: FormGroup) {
  let from: Date = DateValidationUtils.getDateObject(form.get('fromYear').value);
  let to: Date = DateValidationUtils.getDateObject(form.get('toYear').value);
  let dobirth: Date = DateValidationUtils.getDateObject(form.get('dobYear').value);
  let check: boolean;
  if (from != null && to != null && dobirth != null) {
    check = ((dobirth < from) || (dobirth > to));
  }
  return check ? { isDobBetween: true } : null;
}

function isPast1873(form: FormGroup) {
  let from: number = form.get('fromYear').value;

  return (from != 0 && from != null && from < 1873) ? { before1873: true } : null;
}

function validateDocTypeBlank(hk1: string, hk2: string, td: string, errorKey: string): ValidatorFn {
  return (control: FormGroup): ValidationErrors | null => {
    let keyValueObj: { [key: string]: boolean } = { errorKey: false };
    if (control.get(hk1).value == '' && control.get(hk2).value == '' && control.get(td).value == '') {
      keyValueObj[errorKey] = true;
      return keyValueObj;
    }
    return null;
  };
}


function getDatebetween(form: FormGroup) {
  let frommonth: string = form.get('fromMonth').value;
  let fromDay: string = form.get('fromDay').value;
  let fromyear: string = form.get('fromYear').value;
  let toMonth: string = form.get('toMonth').value;
  let toDay: string = form.get('toDay').value;
  let toYear: string = form.get('toYear').value;

  frommonth = (frommonth === '00') ? '' : frommonth;
  fromDay = (fromDay === '00') ? '' : fromDay;
  fromyear = (fromyear === '0000') ? '' : fromyear;

  toMonth = (toMonth === '00') ? '' : toMonth;
  toDay = (toDay === '00') ? '' : toDay;
  toYear = (toYear === '0000') ? '' : toYear;

  if (frommonth == '' && fromDay == '' && fromyear != '' && toMonth == '' && toDay == '' && toYear != '') {
    frommonth = '01'; fromDay = '01'; toMonth = '01'; toDay = '01';
  }
  if (fromDay == '' && frommonth != '' && fromyear != '' && toDay == '' && toMonth != '' && toYear != '') {
    fromDay = '01'; toDay = '01';
  }

  var fdate: any = frommonth + '/' + fromDay + '/' + fromyear;
  var tDate: any = toMonth + '/' + toDay + '/' + toYear;
  if (form.get('dobYear').value != '') {
    var dobDate: any = ((form.get('dobMonth').value == '') ? '01' : form.get('dobMonth').value) + '/' + ((form.get('dobDay').value == '') ? '01' : form.get('dobDay').value) + '/' + form.get('dobYear').value;
  }
  fdate = Date.parse(fdate);
  tDate = Date.parse(tDate);
  dobDate = Date.parse(dobDate);
  var check: boolean;
  check = ((dobDate < fdate) || (dobDate > tDate));
  return check ? { isDobBtwn: true } : null;
}

function regGreaterthanDOB(form: FormGroup) {
  let regMonth = form.get('regMonth').value;
  let regDay = form.get('regDay').value;
  let regYear = form.get('regYear').value;

  let dobMonth = form.get('dobMonth').value;
  let dobDay = form.get('dobDay').value;
  let dobYear = form.get('dobYear').value;

  regMonth = (regMonth === '00') ? '' : regMonth;
  regDay = (regDay === '00') ? '' : regDay;
  regYear = (regYear === '0000') ? '' : regYear;

  dobMonth = (dobMonth === '00') ? '' : dobMonth;
  dobDay = (dobDay === '00') ? '' : dobDay;
  dobYear = (dobYear === '0000') ? '' : dobYear;


  if (regMonth == '' && regDay == '' && regYear != '') {
    regMonth = '01';
    regDay = '01';
  }

  if (dobMonth == '' && dobDay == '' && dobYear != '') {
    dobMonth = '01';
    dobDay = '01';
  }

  if (regMonth != '' && regDay == '' && regYear != '') {
    regDay = '01';
  }

  if (dobMonth != '' && dobDay == '' && dobYear != '') {
    dobDay = '01';
  }

  var regDate: any = regMonth + '/' + regDay + '/' + regYear;
  var dobDate: any = dobMonth + '/' + dobDay + '/' + dobYear;
  regDate = Date.parse(regDate);
  dobDate = Date.parse(dobDate);
  let check: boolean = false;

  if (regMonth != '' && regDay != '' && regYear != '') {
    if (regDate < dobDate) {
      check = true;
    }
  }
  /*if ((regMonth != '' && regDay == '' && regYear != '') && (dobMonth != '' && dobDay == '' && dobYear != '')) {
     var regMonthYr = new Date(Number(regYear), Number(regMonth) - 1);
     var dobMonthYr = new Date(Number(dobYear), Number(dobMonth) - 1);
     if (regMonthYr < dobMonthYr) {
       check = true;
     }
   }*/
  return check ? { isregLessthan: true } : null;
}

function validateLunarDate(form: FormGroup) {

  let bd = form.get('dobDay').value;
  let bm = form.get('dobMonth').value;
  let by = form.get('dobYear').value;
  let isLunar = form.get('calendarTypeLun').value;
  bd = (bd == '00') ? '' : bd;

  if (!isLunar) {
    return null
  } else if (bd != '') {
    return (bd == 31) ? { invalidLunar: true } : null;
  }

}

// ?To verify the simplified chinese check in the control value.
function validateSimplified(chineseValidator: ChineseCharacterValidationUtils): ValidatorFn {
  return (control: AbstractControl) => {
    if (control.value) {
      let simpCheckFlag = false;
      const stringLength = control.value.length;
      for (let i = 0; i < stringLength; i++) {
        simpCheckFlag = chineseValidator.notTraditionalChinese(control.value.charAt(i));
        if (simpCheckFlag) {
          return { 'isTradChinName': true };
        }
      }
    }
    return null;
  };
}

// ?To verify the simplified chinese check in the control value.
function validateTraditionalAndEnglish(chineseValidator: ChineseCharacterValidationUtils): ValidatorFn {
  return (control: AbstractControl) => {
    if (control.value) {
      let simpCheckFlag = false;
      const stringLength = control.value.length;
      for (let i = 0; i < stringLength; i++) {
        simpCheckFlag = chineseValidator.notTraditionalSymbolAndEnglish(control.value.charAt(i));
        if (simpCheckFlag) {
          return { 'tradChinEngCheck': true };
        }
      }
    }
    return null;
  };
}
