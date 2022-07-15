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
  templateUrl: './formA.component.html',
  styleUrls: ['./formA.component.css']
})
export class PnvMfdsAFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
      applicantChiName: new FormControl(this.pnvMfdsModel.applicantChiName),
      applicantEngSurname: new FormControl(this.pnvMfdsModel.applicantEngSurname),
      applicantEngGivenNames: new FormControl(this.pnvMfdsModel.applicantEngGivenNames),
      applicantChiAlias: new FormControl(this.pnvMfdsModel.applicantChiAlias),
      applicantEngAliasSurname: new FormControl(this.pnvMfdsModel.applicantEngAliasSurname),
      applicantEngAliasGivenNames: new FormControl(this.pnvMfdsModel.applicantEngAliasGivenNames),
      sex: new FormControl(this.pnvMfdsModel.sex),
      applicantBodday: new FormControl(this.pnvMfdsModel.applicantBodday),
      applicantBodmonth: new FormControl(this.pnvMfdsModel.applicantBodmonth),
      applicantBodyear: new FormControl(this.pnvMfdsModel.applicantBodyear),
      applicantBop: new FormControl(this.pnvMfdsModel.applicantBop),
      cardNo: new FormControl(this.pnvMfdsModel.cardNo),
      applicantIop: new FormControl(this.pnvMfdsModel.applicantIop),
      applicantIodday: new FormControl(this.pnvMfdsModel.applicantIodday),
      applicantIodmonth: new FormControl(this.pnvMfdsModel.applicantIodmonth),
      applicantIodyear: new FormControl(this.pnvMfdsModel.applicantIodyear),
      applicantEodday: new FormControl(this.pnvMfdsModel.applicantEodday),
      applicantEodmonth: new FormControl(this.pnvMfdsModel.applicantEodmonth),
      applicantEodyear: new FormControl(this.pnvMfdsModel.applicantEodyear),
      applicantAddress1: new FormControl(this.pnvMfdsModel.applicantAddress1),
      applicantAddress2: new FormControl(this.pnvMfdsModel.applicantAddress2),
      applicantAddress3: new FormControl(this.pnvMfdsModel.applicantAddress3),
      applicantAddress4: new FormControl(this.pnvMfdsModel.applicantAddress4),
      applicantAppliedNo: new FormControl(this.pnvMfdsModel.applicantAppliedNo),
            

      /**part2 */
      boatNo: new FormControl(this.pnvMfdsModel.boatNo),
      fileNo: new FormControl(this.pnvMfdsModel.fileNo),
      sponsor1ChiName: new FormControl(this.pnvMfdsModel.sponsor1ChiName),
      sponsor1EngName: new FormControl(this.pnvMfdsModel.sponsor1EngName),
      sponsor1Bodday: new FormControl(this.pnvMfdsModel.sponsor1Bodday),
      sponsor1Bodmonth: new FormControl(this.pnvMfdsModel.sponsor1Bodmonth),
      sponsor1Bodyear: new FormControl(this.pnvMfdsModel.sponsor1Bodyear),
      sponsor1HkidNo1: new FormControl(this.pnvMfdsModel.sponsor1HkidNo1),
      sponsor1HkidNo2: new FormControl(this.pnvMfdsModel.sponsor1HkidNo2),
      sponsor1AddressRoom: new FormControl(this.pnvMfdsModel.sponsor1AddressRoom),
      sponsor1AddressFloor: new FormControl(this.pnvMfdsModel.sponsor1AddressFloor),
      sponsor1AddressBlock: new FormControl(this.pnvMfdsModel.sponsor1AddressBlock),
      sponsor1AddressBuilding: new FormControl(this.pnvMfdsModel.sponsor1AddressBuilding),
      sponsor1AddressEstate: new FormControl(this.pnvMfdsModel.sponsor1AddressEstate),
      sponsor1AddressStreet: new FormControl(this.pnvMfdsModel.sponsor1AddressStreet),
      sponsor1AddressDistrict: new FormControl(this.pnvMfdsModel.sponsor1AddressDistrict),
      sponsor1HomeTel: new FormControl(this.pnvMfdsModel.sponsor1HomeTel),
      sponsor1ContactAddressRoom: new FormControl(this.pnvMfdsModel.sponsor1ContactAddressRoom),
      sponsor1ContactAddressFloor: new FormControl(this.pnvMfdsModel.sponsor1ContactAddressFloor),
      sponsor1ContactAddressBlock: new FormControl(this.pnvMfdsModel.sponsor1ContactAddressBlock),
      sponsor1ContactAddressBuilding: new FormControl(this.pnvMfdsModel.sponsor1ContactAddressBuilding),
      sponsor1ContactAddressEstate: new FormControl(this.pnvMfdsModel.sponsor1ContactAddressEstate),
      sponsor1ContactAddressStreet: new FormControl(this.pnvMfdsModel.sponsor1ContactAddressStreet),
      sponsor1ContactAddressDistrict: new FormControl(this.pnvMfdsModel.sponsor1ContactAddressDistrict),
      sponsor1Tel: new FormControl(this.pnvMfdsModel.sponsor1Tel),
      sponsor2ChiName: new FormControl(this.pnvMfdsModel.sponsor2ChiName),
      sponsor2EngName: new FormControl(this.pnvMfdsModel.sponsor2EngName),
      sponsor2Bodday: new FormControl(this.pnvMfdsModel.sponsor2Bodday),
      sponsor2Bodmonth: new FormControl(this.pnvMfdsModel.sponsor2Bodmonth),
      sponsor2Bodyear: new FormControl(this.pnvMfdsModel.sponsor2Bodyear),
      sponsor2HkidNo1: new FormControl(this.pnvMfdsModel.sponsor2HkidNo1),
      sponsor2HkidNo2: new FormControl(this.pnvMfdsModel.sponsor2HkidNo2),
      sponsor2AddressRoom: new FormControl(this.pnvMfdsModel.sponsor2AddressRoom),
      sponsor2AddressFloor: new FormControl(this.pnvMfdsModel.sponsor2AddressFloor),
      sponsor2AddressBlock: new FormControl(this.pnvMfdsModel.sponsor2AddressBlock),
      sponsor2AddressBuilding: new FormControl(this.pnvMfdsModel.sponsor2AddressBuilding),
      sponsor2AddressEstate: new FormControl(this.pnvMfdsModel.sponsor2AddressEstate),
      sponsor2AddressStreet: new FormControl(this.pnvMfdsModel.sponsor2AddressStreet),
      sponsor2AddressDistrict: new FormControl(this.pnvMfdsModel.sponsor2AddressDistrict),
      sponsor2HomeTel: new FormControl(this.pnvMfdsModel.sponsor2HomeTel),
      sponsor2ContactAddressRoom: new FormControl(this.pnvMfdsModel.sponsor2ContactAddressRoom),
      sponsor2ContactAddressFloor: new FormControl(this.pnvMfdsModel.sponsor2ContactAddressFloor),
      sponsor2ContactAddressBlock: new FormControl(this.pnvMfdsModel.sponsor2ContactAddressBlock),
      sponsor2ContactAddressBuilding: new FormControl(this.pnvMfdsModel.sponsor2ContactAddressBuilding),
      sponsor2ContactAddressEstate: new FormControl(this.pnvMfdsModel.sponsor2ContactAddressEstate),
      sponsor2ContactAddressStreet: new FormControl(this.pnvMfdsModel.sponsor2ContactAddressStreet),
      sponsor2ContactAddressDistrict: new FormControl(this.pnvMfdsModel.sponsor2ContactAddressDistrict),
      sponsor2Tel: new FormControl(this.pnvMfdsModel.sponsor2Tel),
      sponsorType: new FormControl(this.pnvMfdsModel.sponsorType),
      companyChiName: new FormControl(this.pnvMfdsModel.companyChiName),
      companyEngName: new FormControl(this.pnvMfdsModel.companyEngName),
      registeredNo: new FormControl(this.pnvMfdsModel.registeredNo),
      companyAddressRoom: new FormControl(this.pnvMfdsModel.companyAddressRoom),
      companyAddressFloor: new FormControl(this.pnvMfdsModel.companyAddressFloor),
      companyAddressBlock: new FormControl(this.pnvMfdsModel.companyAddressBlock),
      companyAddressBuilding: new FormControl(this.pnvMfdsModel.companyAddressBuilding),
      companyAddressEstate: new FormControl(this.pnvMfdsModel.companyAddressEstate),
      companyAddressStreet: new FormControl(this.pnvMfdsModel.companyAddressStreet),
      companyAddressDistrict: new FormControl(this.pnvMfdsModel.companyAddressDistrict),
      authorisedPersonChiName: new FormControl(this.pnvMfdsModel.authorisedPersonChiName),
      authorisedPersonEngName: new FormControl(this.pnvMfdsModel.authorisedPersonEngName),
      authorisedPersonBodday: new FormControl(this.pnvMfdsModel.authorisedPersonBodday),
      authorisedPersonBodmonth: new FormControl(this.pnvMfdsModel.authorisedPersonBodmonth),
      authorisedPersonBodyear: new FormControl(this.pnvMfdsModel.authorisedPersonBodyear),
      authorisedPersonHkid1: new FormControl(this.pnvMfdsModel.authorisedPersonHkid1),
      authorisedPersonHkid2: new FormControl(this.pnvMfdsModel.authorisedPersonHkid2),
      authorisedPersonPosition: new FormControl(this.pnvMfdsModel.authorisedPersonPosition),
      authorisedPersonTel: new FormControl(this.pnvMfdsModel.authorisedPersonTel),
            

      });
  }
  validateNoOfCopy(){}
  private handleCalendarType() {}
  validateHospital() {}
}
