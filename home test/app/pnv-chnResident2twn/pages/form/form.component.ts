import { PnvChnResident2TwnService } from 'src/app/pnv-chnResident2twn/pnv-chnResident2twn.service';
import { PnvChnResident2Twn } from 'src/app/pnv-chnResident2twn/pnv-chnResident2twn.model';
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
  selector: 'pnv-chnResident2twn-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class PnvChnResident2TwnFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
  pnvChnResident2TwnModel: PnvChnResident2Twn;
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
    private pnvChnResident2TwnService: PnvChnResident2TwnService,
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

    this.pnvChnResident2TwnModel = this.pnvChnResident2TwnService.PnvChnResident2TwnModel;
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
    setTimeout(() => {
     this.commonService.setShowLoading(true);
    }, 0);
  }

  maskChineseValues(value: any, control: string) {
    this.fillForm.get(control).setValue(this.chineseValidationUtils.maskChineseValues(value));
  }

  doSubmit() {
    // this.setToModel();
/**    let year = this.fillForm.get('dobYear').value
    console.log(year);

    if (year != 'YYYY' && year != '0000' && year != '') {
      year = new Date().getFullYear() - parseInt(year)
      this.coeService.CoeModel.dobYear = year
      this.router.navigate(['../declaration'], {
        relativeTo: this.activatedRoute
      });
    }
*/
  }
  private intializeForm() {
    this.fillForm = this.formBuilder.group({
      /**part1 */
      permitType: new FormControl(this.pnvChnResident2TwnModel.permitType),
      applicationType: new FormControl(this.pnvChnResident2TwnModel.applicationType),

      /**part2 */
      chiName: new FormControl(this.pnvChnResident2TwnModel.chiName),
      maidenSurname: new FormControl(this.pnvChnResident2TwnModel.maidenSurname),
      engSurname: new FormControl(this.pnvChnResident2TwnModel.engSurname),
      engGivenNames: new FormControl(this.pnvChnResident2TwnModel.engGivenNames),
      aliasInChi: new FormControl(this.pnvChnResident2TwnModel.aliasInChi),
      aliasInEngSurname: new FormControl(this.pnvChnResident2TwnModel.aliasInEngSurname),
      aliasInEngGivenNames: new FormControl(this.pnvChnResident2TwnModel.aliasInEngGivenNames),
      sex: new FormControl(this.pnvChnResident2TwnModel.sex),
      dobday: new FormControl(this.pnvChnResident2TwnModel.dobday),
      dobmonth: new FormControl(this.pnvChnResident2TwnModel.dobmonth),
      dobyear: new FormControl(this.pnvChnResident2TwnModel.dobyear),
      pob: new FormControl(this.pnvChnResident2TwnModel.pob),
      maritalStatus: new FormControl(this.pnvChnResident2TwnModel.maritalStatus),
      type: new FormControl(this.pnvChnResident2TwnModel.type),
      number: new FormControl(this.pnvChnResident2TwnModel.number),
      poi: new FormControl(this.pnvChnResident2TwnModel.poi),
      doiDay: new FormControl(this.pnvChnResident2TwnModel.doiDay),
      doiMonth: new FormControl(this.pnvChnResident2TwnModel.doiMonth),
      doiYear: new FormControl(this.pnvChnResident2TwnModel.doiYear),
      doeDay: new FormControl(this.pnvChnResident2TwnModel.doeDay),
      doeMonth: new FormControl(this.pnvChnResident2TwnModel.doeMonth),
      doeYear: new FormControl(this.pnvChnResident2TwnModel.doeYear),
      addressRoom: new FormControl(this.pnvChnResident2TwnModel.addressRoom),
      addressFloor: new FormControl(this.pnvChnResident2TwnModel.addressFloor),
      addressBlock: new FormControl(this.pnvChnResident2TwnModel.addressBlock),
      addressBuilding: new FormControl(this.pnvChnResident2TwnModel.addressBuilding),
      addressEstate: new FormControl(this.pnvChnResident2TwnModel.addressEstate),
      addressStreet: new FormControl(this.pnvChnResident2TwnModel.addressStreet),
      addressDistrict: new FormControl(this.pnvChnResident2TwnModel.addressDistrict),
      twIdno: new FormControl(this.pnvChnResident2TwnModel.twIdno),
      hkidno1: new FormControl(this.pnvChnResident2TwnModel.hkidno1),
      hkidno2: new FormControl(this.pnvChnResident2TwnModel.hkidno2),
      occupation: new FormControl(this.pnvChnResident2TwnModel.occupation),
      contactTelephoneNo: new FormControl(this.pnvChnResident2TwnModel.contactTelephoneNo),
      ext: new FormControl(this.pnvChnResident2TwnModel.ext),
      email: new FormControl(this.pnvChnResident2TwnModel.email)

      });
  }
  validateNoOfCopy(){}
  private handleCalendarType() {}
  validateHospital() {}
}
