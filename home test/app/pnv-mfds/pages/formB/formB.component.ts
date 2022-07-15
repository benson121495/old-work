import { PnvMfdsService } from 'src/app/pnv-mfds/pnv-mfds.service';
import { PnvMfds } from 'src/app/pnv-mfds/pnv-mfds.model';
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
  selector: 'pnv-mfds-form',
  templateUrl: './formB.component.html',
  styleUrls: ['./formB.component.css']
})
export class PnvMfdsBFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
  pnvMfdsModel: PnvMfds;
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
    private pnvMfdsService: PnvMfdsService,
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

    this.pnvMfdsModel = this.pnvMfdsService.PnvMfdsModel;
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
      bapplicantChiName: new FormControl(this.pnvMfdsModel.bapplicantChiName),
      bapplicantEngSurname: new FormControl(this.pnvMfdsModel.bapplicantEngSurname),
      bapplicantEngGivenNames: new FormControl(this.pnvMfdsModel.bapplicantEngGivenNames),
      bapplicantSex: new FormControl(this.pnvMfdsModel.bapplicantSex),
      bapplicantDobday: new FormControl(this.pnvMfdsModel.bapplicantDobday),
      bapplicantDobmonth: new FormControl(this.pnvMfdsModel.bapplicantDobmonth),
      bapplicantDobyear: new FormControl(this.pnvMfdsModel.bapplicantDobyear),
      bapplicantCurrentAddress1: new FormControl(this.pnvMfdsModel.bapplicantCurrentAddress1),
      bapplicantCurrentAddress2: new FormControl(this.pnvMfdsModel.bapplicantCurrentAddress2),
      bapplicantCurrentAddress3: new FormControl(this.pnvMfdsModel.bapplicantCurrentAddress3),
      bapplicantCurrentAddress4: new FormControl(this.pnvMfdsModel.bapplicantCurrentAddress4),
      bapplicantPosition: new FormControl(this.pnvMfdsModel.bapplicantPosition),
      bapplicantStayLengthOfYear: new FormControl(this.pnvMfdsModel.bapplicantStayLengthOfYear),
      bapplicantStayLengthOfMonth: new FormControl(this.pnvMfdsModel.bapplicantStayLengthOfMonth),
      bapplicantStayLengthOfDay: new FormControl(this.pnvMfdsModel.bapplicantStayLengthOfDay),
      bapplicantStayPurpose: new FormControl(this.pnvMfdsModel.bapplicantStayPurpose),
      bapplicantAddressAfterArrivingRoom: new FormControl(this.pnvMfdsModel.bapplicantAddressAfterArrivingRoom),
      bapplicantAddressAfterArrivingFloor: new FormControl(this.pnvMfdsModel.bapplicantAddressAfterArrivingFloor),
      bapplicantAddressAfterArrivingBlock: new FormControl(this.pnvMfdsModel.bapplicantAddressAfterArrivingBlock),
      bapplicantAddressAfterArrivingBuilding: new FormControl(this.pnvMfdsModel.bapplicantAddressAfterArrivingBuilding),
      bapplicantAddressAfterArrivingEstate: new FormControl(this.pnvMfdsModel.bapplicantAddressAfterArrivingEstate),
      bapplicantAddressAfterArrivingStreet: new FormControl(this.pnvMfdsModel.bapplicantAddressAfterArrivingStreet),
      bapplicantAddressAfterArrivingDistrict: new FormControl(this.pnvMfdsModel.bapplicantAddressAfterArrivingDistrict),
      bapplicantRelationship: new FormControl(this.pnvMfdsModel.bapplicantRelationship),
      bapplicantLengthOfYear: new FormControl(this.pnvMfdsModel.bapplicantLengthOfYear),
      bapplicantLengthOfMonth: new FormControl(this.pnvMfdsModel.bapplicantLengthOfMonth),
      bapplicantRelativeName: new FormControl(this.pnvMfdsModel.bapplicantRelativeName),
      bapplicantRelativeAddressRoom: new FormControl(this.pnvMfdsModel.bapplicantRelativeAddressRoom),
      bapplicantRelativeAddressFloor: new FormControl(this.pnvMfdsModel.bapplicantRelativeAddressFloor),
      bapplicantRelativeAddressBlock: new FormControl(this.pnvMfdsModel.bapplicantRelativeAddressBlock),
      bapplicantRelativeAddressBuilding: new FormControl(this.pnvMfdsModel.bapplicantRelativeAddressBuilding),
      bapplicantRelativeAddressEstate: new FormControl(this.pnvMfdsModel.bapplicantRelativeAddressEstate),
      bapplicantRelativeAddressStreet: new FormControl(this.pnvMfdsModel.bapplicantRelativeAddressStreet),
      bapplicantRelativeAddressDistrict: new FormControl(this.pnvMfdsModel.bapplicantRelativeAddressDistrict),
      bapplicantRelativeRelation: new FormControl(this.pnvMfdsModel.bapplicantRelativeRelation),
          

      /**part2 */
      sponsorChiName: new FormControl(this.pnvMfdsModel.sponsorChiName),
      sponsorEngSurname: new FormControl(this.pnvMfdsModel.sponsorEngSurname),
      sponsorEngGivenNames: new FormControl(this.pnvMfdsModel.sponsorEngGivenNames),
      sponsorSex: new FormControl(this.pnvMfdsModel.sponsorSex),
      sponsorDobday: new FormControl(this.pnvMfdsModel.sponsorDobday),
      sponsorDobmonth: new FormControl(this.pnvMfdsModel.sponsorDobmonth),
      sponsorDobyear: new FormControl(this.pnvMfdsModel.sponsorDobyear),
      sponsorDop: new FormControl(this.pnvMfdsModel.sponsorDop),
      sponsorNationality: new FormControl(this.pnvMfdsModel.sponsorNationality),
      sponsorPassportNo: new FormControl(this.pnvMfdsModel.sponsorPassportNo),
      sponsorDurationYear: new FormControl(this.pnvMfdsModel.sponsorDurationYear),
      sponsorPosition: new FormControl(this.pnvMfdsModel.sponsorPosition),
      sponsorAddressRoom: new FormControl(this.pnvMfdsModel.sponsorAddressRoom),
      sponsorAddressFloor: new FormControl(this.pnvMfdsModel.sponsorAddressFloor),
      sponsorAddressBlock: new FormControl(this.pnvMfdsModel.sponsorAddressBlock),
      sponsorAddressBuilding: new FormControl(this.pnvMfdsModel.sponsorAddressBuilding),
      sponsorAddressEstate: new FormControl(this.pnvMfdsModel.sponsorAddressEstate),
      sponsorAddressStreet: new FormControl(this.pnvMfdsModel.sponsorAddressStreet),
      sponsorAddressDistrict: new FormControl(this.pnvMfdsModel.sponsorAddressDistrict),
      sponsorTel: new FormControl(this.pnvMfdsModel.sponsorTel),
      sponsorOfficeAddressRoom: new FormControl(this.pnvMfdsModel.sponsorOfficeAddressRoom),
      sponsorOfficeAddressFloor: new FormControl(this.pnvMfdsModel.sponsorOfficeAddressFloor),
      sponsorOfficeAddressBlock: new FormControl(this.pnvMfdsModel.sponsorOfficeAddressBlock),
      sponsorOfficeAddressBuilding: new FormControl(this.pnvMfdsModel.sponsorOfficeAddressBuilding),
      sponsorOfficeAddressEstate: new FormControl(this.pnvMfdsModel.sponsorOfficeAddressEstate),
      sponsorOfficeAddressStreet: new FormControl(this.pnvMfdsModel.sponsorOfficeAddressStreet),
      sponsorOfficeAddressDistrict: new FormControl(this.pnvMfdsModel.sponsorOfficeAddressDistrict),
      sponsorOfficeTel: new FormControl(this.pnvMfdsModel.sponsorOfficeTel),
      sponsorOfficeExt: new FormControl(this.pnvMfdsModel.sponsorOfficeExt),
      

      });
  }
  validateNoOfCopy(){}
  private handleCalendarType() {}
  validateHospital() {}
}
