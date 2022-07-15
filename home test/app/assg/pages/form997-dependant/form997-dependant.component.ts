import { Assg } from 'src/app/assg/assg.model';
import { ValidationUtils } from 'src/app/utils/validation-utils';
import { DateValidationUtils } from 'src/app/utils/date-validation-utils';
import { CommonService } from 'src/app/common.service';
import { Component, OnInit, AfterViewInit, ViewChild, SimpleChanges, OnDestroy } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl, AbstractControl, ValidationErrors, ValidatorFn, FormBuilder } from '@angular/forms';

@Component({
  selector: 'assg-form-997-dependant',
  templateUrl: './form997-dependant.component.html',
  styleUrls: ['./form997-dependant.component.css']
})
export class AssgForm997DependantComponent implements OnInit {
  assgModel: Assg
  stepNumber = 1;
  fillForm: FormGroup;
  validationUtils: ValidationUtils;
  dayList: any[];
  monthList: any[];
  yearsList: any[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    setTimeout(() => {
      this.commonService.setShowLoading(false);
    }, 0);
    this.assgModel = Assg.newInstance()
    this.validationUtils = new ValidationUtils()
    this.dayList = DateValidationUtils.getDefaultDayList();
    this.monthList = DateValidationUtils.getMonthList();
    this.yearsList = DateValidationUtils.getAllYears();

    this.intializeForm();
  }
  
  private intializeForm() {
    const isdisable = (this.assgModel.entry) ? false : true;
    this.fillForm = this.formBuilder.group({
      appId: [this.assgModel.appId],
      searchType: [this.assgModel.searchType, Validators.required],

      chinName: new FormControl(this.assgModel.chineseName),
      chiSurName: new FormControl(this.assgModel.chiSurName),
      chiGivenName: new FormControl(this.assgModel.chiGivenName),
      engSurName: new FormControl(this.assgModel.engSurName),
      engGivenName: new FormControl(this.assgModel.engGivenName),

      chiNameAlias: new FormControl(this.assgModel.chiNameAlias),
      engSurNameAlias: new FormControl(this.assgModel.engSurNameAlias),
      engGivenNameAlias: new FormControl(this.assgModel.engGivenNameAlias),

      male: [this.assgModel.male],
      female: [this.assgModel.female],
      dobDay: new FormControl((this.assgModel.dobDay) ? this.assgModel.dobDay : ''),
      dobMonth: new FormControl((this.assgModel.dobMonth) ? this.assgModel.dobMonth : ''),
      dobYear: new FormControl((this.assgModel.dobYear) ? this.assgModel.dobYear : ''),
      placeOfBirth: [this.assgModel.placeOfBirth],
      nationality: new FormControl(this.assgModel.nationality),
      travelDocType: new FormControl(this.assgModel.travelDocType),
      travelDocValue: new FormControl(this.assgModel.travelDocValue),
      travelDocDay: new FormControl((this.assgModel.travelDocDay) ? this.assgModel.travelDocDay : ''),
      travelDocMonth: new FormControl((this.assgModel.travelDocMonth) ? this.assgModel.travelDocMonth : ''),
      travelDocYear: new FormControl((this.assgModel.travelDocYear) ? this.assgModel.travelDocYear : ''),
      travelDocIssuePlace: new FormControl(this.assgModel.travelDocIssuePlace),
      isOtherNationality: [this.assgModel.isOtherNationality],
      isCurrentlyStaying: [this.assgModel.isCurrentlyStaying],
      sponsorStatus: [this.assgModel.sponsorStatus],
      currentStayStatus: [this.assgModel.currentStayStatus],
      otherNationality: new FormControl(this.assgModel.travelDocIssuePlace),
      otherNationalityAcquire: [this.assgModel.otherNationalityAcquire],
      renunciateChinese: [this.assgModel.renunciateChinese],
      placeOfResidence: new FormControl(this.assgModel.addInfo),
      statusAtPlaceOfResidence: new FormControl(this.assgModel.statusAtPlaceOfResidence),
      phoneNo: new FormControl(this.assgModel.phoneNo),
      phoneExt: new FormControl(this.assgModel.phoneExt),
      email: new FormControl(this.assgModel.email),
      address1: new FormControl(this.assgModel.address1),
      address2: new FormControl(this.assgModel.address2),
      address3: new FormControl(this.assgModel.address3),
      address4: new FormControl(this.assgModel.address4),

      calendarTypeGreg: [this.assgModel.calendarTypeGreg],
      calendarTypeLun: [this.assgModel.calendarTypeLun],


      hkIdValue1: new FormControl(this.assgModel.hkIdValue1, { validators: [], updateOn: 'blur' }),
      hkIdValue2: new FormControl(this.assgModel.hkIdValue2, { validators: [], updateOn: 'blur' }),


      fromDay: new FormControl((this.assgModel.fromDay) ? this.assgModel.fromDay : ''),
      fromMonth: new FormControl((this.assgModel.fromMonth) ? this.assgModel.fromMonth : ''),
      fromYear: new FormControl((this.assgModel.fromYear) ? this.assgModel.fromYear : ''),

      toDay: new FormControl((this.assgModel.toDay) ? this.assgModel.toDay : ''),
      toMonth: new FormControl((this.assgModel.toMonth) ? this.assgModel.toMonth : ''),
      toYear: new FormControl((this.assgModel.toYear) ? this.assgModel.toYear : ''),



      chinFatherName: [this.assgModel.chinFatherName],
      engFatherSurName: [this.assgModel.engFatherSurName, ValidationUtils.useEnglishNameCheck],
      chinMotherName: [this.assgModel.chinMotherName],
      engMotherSurName: [this.assgModel.engMotherSurName, ValidationUtils.useEnglishNameCheck],
      midWifeName: [this.assgModel.midWifeName],

      regDay: new FormControl((this.assgModel.regDay) ? this.assgModel.regDay : ''),
      regMonth: new FormControl((this.assgModel.regMonth) ? this.assgModel.regMonth : ''),
      regYear: new FormControl((this.assgModel.regYear) ? this.assgModel.regYear : ''),

      birthRegNum: new FormControl(this.assgModel.birthRegNum),
      addInfo: new FormControl(this.assgModel.addInfo),
      entry: [this.assgModel.entry],
      copies: [{ value: this.assgModel.copies, disabled: isdisable }],

      // ?Applicant details:
      applicantName: new FormControl(this.assgModel.applicantName),
      hkIdValueApp1: new FormControl(this.assgModel.hkIdValueApp1),
      hkIdValueApp2: new FormControl(this.assgModel.hkIdValueApp2),
      phoneVal: new FormControl(this.assgModel.phoneVal),
      extValue: [this.assgModel.extValue],
      emailVal: new FormControl(this.assgModel.emailVal),
      // Lunar Pop up Radio
      lunarRadio: [],
      captchaCode: new FormControl(''),
      addressDisplay: [this.assgModel.totalAddress],
      fullHospital: [],
      totalAddress: ['']

    }, {
      validator: [
        ValidationUtils.nameLengValidator('engSurName', 'engGivenName'),
        ValidationUtils.validateBothBlank('engSurName', 'engGivenName', 'bothBlank'),
        ValidationUtils.validateAnyOneBlank('engGivenName', 'engSurName', 'oneNameBlank'),
        ValidationUtils.aliasNameLengValidator('engSurNameAlias', 'engGivenNameAlias'),
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
        ValidationUtils.validateBothBlank('male', 'female', 'sexCheck'),
        ValidationUtils.pdfEmailValidation('emailVal', 'invalidEmail')
      ]
    });
  }

  public onMonthYearChange(dayField: string, monthField: string, yearField: string) {
    const month = this.fillForm.get(monthField).value;
    const year = this.fillForm.get(yearField).value;

    console.log('month', month, 'year', year);

    let currentSelectedDay = this.fillForm.get(dayField).value;

    let days = this.adjustDays(month, year);

    this.dayList = days != undefined && days.length != this.dayList.length ? days : this.dayList;

    if (this.fillForm.get(dayField).value == '00') {
      this.fillForm.get(dayField).setValue('00');
    } else if (this.dayList.indexOf(currentSelectedDay) < 0) {
      this.fillForm.get(dayField).setValue('');
    }

  }

  private adjustDays(month: string, year: string) {
    console.log('day');
    if (month !== undefined && month != null && month != '' && year != undefined && year != null && year != '') {
      return DateValidationUtils.getDaysList(DateValidationUtils.getNumber(month), DateValidationUtils.getNumber(year));
    }

    return undefined;

  }

  onSubmit() {
    this.router.navigate(['../declaration'], {
      relativeTo: this.activatedRoute
    });
  }

  cancelClicked() {
    this.toReset();
    this.router.navigate(['../flowSelect'], {relativeTo: this.activatedRoute});
  }

  toReset() {
    this.fillForm.reset();
  }
}
