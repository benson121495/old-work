import { PnvInvEntryService } from 'src/app/pnv-invEntry/pnv-invEntry.service';
import { PnvInvEntry } from 'src/app/pnv-invEntry/pnv-invEntry.model';
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
  selector: 'pnv-invEntry-formB',
  templateUrl: './formB.component.html',
  styleUrls: ['./formB.component.css']
})
export class PnvInvEntryBFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
  pnvInvEntryModel: PnvInvEntry;
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
    private pnvInvEntryService: PnvInvEntryService,
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

    this.pnvInvEntryModel = this.pnvInvEntryService.PnvInvEntryModel;
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
        /**
         *       XX: new FormControl(this.pnvInvModel.XX)
         */
      /**part1 */
      BapplicantChiName: new FormControl(this.pnvInvEntryModel.BapplicantChiName),
      applicantEngName: new FormControl(this.pnvInvEntryModel.applicantEngName),

      /**part2 */
      selection: new FormControl(this.pnvInvEntryModel.selection),
      nameOfTheCompany: new FormControl(this.pnvInvEntryModel.nameOfTheCompany),
      businessRegistrationCertificateNo: new FormControl(this.pnvInvEntryModel.businessRegistrationCertificateNo),
      contactTelephoneNo: new FormControl(this.pnvInvEntryModel.contactTelephoneNo),
      ext: new FormControl(this.pnvInvEntryModel.ext),
      companyAddress: new FormControl(this.pnvInvEntryModel.companyAddress),
      faxNo: new FormControl(this.pnvInvEntryModel.faxNo),
      authorisedPerson: new FormControl(this.pnvInvEntryModel.authorisedPerson),
      postTitle: new FormControl(this.pnvInvEntryModel.postTitle),
      email: new FormControl(this.pnvInvEntryModel.email),
      website: new FormControl(this.pnvInvEntryModel.website),
      companyAddressRoom: new FormControl(this.pnvInvEntryModel.companyAddressRoom),
      companyAddressFloor: new FormControl(this.pnvInvEntryModel.companyAddressFloor),
      companyAddressBlock: new FormControl(this.pnvInvEntryModel.companyAddressBlock),
      companyAddressBuilding: new FormControl(this.pnvInvEntryModel.companyAddressBuilding),
      companyAddressEstate: new FormControl(this.pnvInvEntryModel.companyAddressEstate),
      companyAddressStreet: new FormControl(this.pnvInvEntryModel.companyAddressStreet),
      companyAddressDistrict: new FormControl(this.pnvInvEntryModel.companyAddressDistrict),
      nameChinese: new FormControl(this.pnvInvEntryModel.nameChinese),
      SurnameEnglish: new FormControl(this.pnvInvEntryModel.SurnameEnglish),
      GivenNamesEnglish: new FormControl(this.pnvInvEntryModel.GivenNamesEnglish),
      sex: new FormControl(this.pnvInvEntryModel.sex),
      day: new FormControl(this.pnvInvEntryModel.day),
      month: new FormControl(this.pnvInvEntryModel.month),
      year: new FormControl(this.pnvInvEntryModel.year),
      HkidNo1: new FormControl(this.pnvInvEntryModel.HkidNo1),
      HkidNo2: new FormControl(this.pnvInvEntryModel.HkidNo2),
      nationality: new FormControl(this.pnvInvEntryModel.nationality),
      individualEmail: new FormControl(this.pnvInvEntryModel.individualEmail),
      occupation: new FormControl(this.pnvInvEntryModel.occupation),
      individualFaxNo: new FormControl(this.pnvInvEntryModel.individualFaxNo),
      relationshipApplicant: new FormControl(this.pnvInvEntryModel.relationshipApplicant),
      individualContactTelephoneNo: new FormControl(this.pnvInvEntryModel.individualContactTelephoneNo),
      correspondenceAddressRoom: new FormControl(this.pnvInvEntryModel.correspondenceAddressRoom),
      correspondenceAddressFloor: new FormControl(this.pnvInvEntryModel.correspondenceAddressFloor),
      correspondenceAddressBlock: new FormControl(this.pnvInvEntryModel.correspondenceAddressBlock),
      correspondenceAddressBuilding: new FormControl(this.pnvInvEntryModel.correspondenceAddressBuilding),
      correspondenceAddressEstate: new FormControl(this.pnvInvEntryModel.correspondenceAddressEstate),
      correspondenceAddressStreet: new FormControl(this.pnvInvEntryModel.correspondenceAddressStreet),
      correspondenceAddressDistrict: new FormControl(this.pnvInvEntryModel.correspondenceAddressDistrict)


      });
  }
  validateNoOfCopy(){}
  private handleCalendarType() {}
  validateHospital() {}
}
