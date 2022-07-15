import { PnvStatusMainlandOfficialService } from 'src/app/pnv-statusMainlandOfficial/pnv-statusMainlandOfficial.service';
import { PnvStatusMainlandOfficial } from 'src/app/pnv-statusMainlandOfficial/pnv-statusMainlandOfficial.model';
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
  selector: 'pnv-statusMainlandOfficial-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class PnvStatusMainlandOfficialFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
  pnvStatusMainlandOfficialModel: PnvStatusMainlandOfficial;
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
    private pnvStatusMainlandOfficialService: PnvStatusMainlandOfficialService,
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

    this.pnvStatusMainlandOfficialModel = this.pnvStatusMainlandOfficialService.PnvStatusMainlandOfficialModel;
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
      sponsorType: new FormControl(this.pnvStatusMainlandOfficialModel.sponsorType),
      companyChiName: new FormControl(this.pnvStatusMainlandOfficialModel.companyChiName),
      companyEngName: new FormControl(this.pnvStatusMainlandOfficialModel.companyEngName),
      businessRegistrationCertificateNo: new FormControl(this.pnvStatusMainlandOfficialModel.businessRegistrationCertificateNo),
      companyEmail: new FormControl(this.pnvStatusMainlandOfficialModel.companyEmail),
      companyAddressRoom: new FormControl(this.pnvStatusMainlandOfficialModel.companyAddressRoom),
      companyAddressFloor: new FormControl(this.pnvStatusMainlandOfficialModel.companyAddressFloor),
      companyAddressBlock: new FormControl(this.pnvStatusMainlandOfficialModel.companyAddressBlock),
      companyAddressBuilding: new FormControl(this.pnvStatusMainlandOfficialModel.companyAddressBuilding),
      companyAddressEstate: new FormControl(this.pnvStatusMainlandOfficialModel.companyAddressEstate),
      companyAddressStreet: new FormControl(this.pnvStatusMainlandOfficialModel.companyAddressStreet),
      companyAddressDistrict: new FormControl(this.pnvStatusMainlandOfficialModel.companyAddressDistrict),
      companyAuthorisedperson: new FormControl(this.pnvStatusMainlandOfficialModel.companyAuthorisedperson),
      companyDesignation: new FormControl(this.pnvStatusMainlandOfficialModel.companyDesignation),
      companyTel: new FormControl(this.pnvStatusMainlandOfficialModel.companyTel),
      companyExt: new FormControl(this.pnvStatusMainlandOfficialModel.companyExt),
      companyFax: new FormControl(this.pnvStatusMainlandOfficialModel.companyFax),
      individualChiName: new FormControl(this.pnvStatusMainlandOfficialModel.individualChiName),
      individualEngSurname: new FormControl(this.pnvStatusMainlandOfficialModel.applicantEngSurname),
      individualEngGivenNames: new FormControl(this.pnvStatusMainlandOfficialModel.individualEngGivenNames),
      individualSex: new FormControl(this.pnvStatusMainlandOfficialModel.individualSex),
      individualDobday: new FormControl(this.pnvStatusMainlandOfficialModel.individualDobday),
      individualDobmonth: new FormControl(this.pnvStatusMainlandOfficialModel.individualDobmonth),
      individualDobyear: new FormControl(this.pnvStatusMainlandOfficialModel.individualDobyear),
      individualHkIdno1: new FormControl(this.pnvStatusMainlandOfficialModel.individualHkIdno1),
      individualHkIdno2: new FormControl(this.pnvStatusMainlandOfficialModel.individualHkIdno2),
      individualNationality: new FormControl(this.pnvStatusMainlandOfficialModel.individualNationality),
      individualRelationship: new FormControl(this.pnvStatusMainlandOfficialModel.individualRelationship),
      individualOccupation: new FormControl(this.pnvStatusMainlandOfficialModel.individualOccupation),
      individualSponsorCurrentLimitStay: new FormControl(this.pnvStatusMainlandOfficialModel.individualSponsorCurrentLimitStay),
      individualEmail: new FormControl(this.pnvStatusMainlandOfficialModel.individualEmail),
      individualAddressRoom: new FormControl(this.pnvStatusMainlandOfficialModel.individualAddressRoom),
      individualAddressFloor: new FormControl(this.pnvStatusMainlandOfficialModel.individualAddressFloor),
      individualAddressBlock: new FormControl(this.pnvStatusMainlandOfficialModel.individualAddressBlock),
      individualAddressBuilding: new FormControl(this.pnvStatusMainlandOfficialModel.individualAddressBuilding),
      individualAddressEstate: new FormControl(this.pnvStatusMainlandOfficialModel.individualAddressEstate),
      individualAddressStreet: new FormControl(this.pnvStatusMainlandOfficialModel.individualAddressStreet),
      individualAddressDistrict: new FormControl(this.pnvStatusMainlandOfficialModel.individualAddressDistrict),
      individualTel: new FormControl(this.pnvStatusMainlandOfficialModel.individualTel),
      individualExt: new FormControl(this.pnvStatusMainlandOfficialModel.individualExt),
      individualFax: new FormControl(this.pnvStatusMainlandOfficialModel.individualFax),
      individualMonthlyIncome: new FormControl(this.pnvStatusMainlandOfficialModel.individualMonthlyIncome),
      individualTotalAssetValue: new FormControl(this.pnvStatusMainlandOfficialModel.individualTotalAssetValue),
      
      /**part2 */
      applicantChiName: new FormControl(this.pnvStatusMainlandOfficialModel.applicantChiName),
      applicantEngSurname: new FormControl(this.pnvStatusMainlandOfficialModel.applicantEngSurname),
      applicantEngGivenNames: new FormControl(this.pnvStatusMainlandOfficialModel.applicantEngGivenNames),
      applicantSex: new FormControl(this.pnvStatusMainlandOfficialModel.applicantSex),
      applicantDobday: new FormControl(this.pnvStatusMainlandOfficialModel.applicantDobday),
      applicantDobmonth: new FormControl(this.pnvStatusMainlandOfficialModel.applicantDobmonth),
      applicantDobyear: new FormControl(this.pnvStatusMainlandOfficialModel.applicantDobyear),
      applicantPurposeOfComingToHk: new FormControl(this.pnvStatusMainlandOfficialModel.applicantPurposeOfComingToHk),
      applicantOthers: new FormControl(this.pnvStatusMainlandOfficialModel.applicantOthers)
      
            
      });
  }
  validateNoOfCopy(){}
  private handleCalendarType() {}
  validateHospital() {}
}
