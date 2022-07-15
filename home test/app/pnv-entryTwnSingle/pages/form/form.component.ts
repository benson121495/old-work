import { PnvEntryTwnSingleService } from 'src/app/pnv-entryTwnSingle/pnv-entryTwnSingle.service';
import { PnvEntryTwnSingle } from 'src/app/pnv-entryTwnSingle/pnv-entryTwnSingle.model';
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
  selector: 'pnv-entryTwnSingle-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class PnvEntryTwnSingleFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
  pnvEntryTwnSingleModel: PnvEntryTwnSingle;
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
    private pnvEntryTwnSingleService: PnvEntryTwnSingleService,
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

    this.pnvEntryTwnSingleModel = this.pnvEntryTwnSingleService.PnvEntryTwnSingleModel;
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
      airlineReferenceNo: new FormControl(this.pnvEntryTwnSingleModel.airlineReferenceNo),

      /**part2 */
      chiName: new FormControl(this.pnvEntryTwnSingleModel.chiName),
      maidenSurname: new FormControl(this.pnvEntryTwnSingleModel.maidenSurname),
      engSurname: new FormControl(this.pnvEntryTwnSingleModel.engSurname),
      engGivenNames: new FormControl(this.pnvEntryTwnSingleModel.engGivenNames),
      aliasInChi: new FormControl(this.pnvEntryTwnSingleModel.aliasInChi),
      aliasInEngSurname: new FormControl(this.pnvEntryTwnSingleModel.aliasInEngSurname),
      aliasInEngGivenNames: new FormControl(this.pnvEntryTwnSingleModel.aliasInEngGivenNames),
      sex: new FormControl(this.pnvEntryTwnSingleModel.sex),
      dobday: new FormControl(this.pnvEntryTwnSingleModel.dobday),
      dobmonth: new FormControl(this.pnvEntryTwnSingleModel.dobmonth),
      dobyear: new FormControl(this.pnvEntryTwnSingleModel.dobyear),
      pob: new FormControl(this.pnvEntryTwnSingleModel.pob),
      twidno: new FormControl(this.pnvEntryTwnSingleModel.twidno),
      durationInTw: new FormControl(this.pnvEntryTwnSingleModel.durationInTw),
      travelDocType: new FormControl(this.pnvEntryTwnSingleModel.travelDocType),
      travelDocNumber: new FormControl(this.pnvEntryTwnSingleModel.travelDocNumber),
      travelDocPoi: new FormControl(this.pnvEntryTwnSingleModel.travelDocPoi),
      travelDocDoiDay: new FormControl(this.pnvEntryTwnSingleModel.travelDocDoiDay),
      travelDocDoiMonth: new FormControl(this.pnvEntryTwnSingleModel.travelDocDoiMonth),
      travelDocDoiYear: new FormControl(this.pnvEntryTwnSingleModel.travelDocDoiYear),
      travelDocDoeDay: new FormControl(this.pnvEntryTwnSingleModel.travelDocDoeDay),
      travelDocDoeMonth: new FormControl(this.pnvEntryTwnSingleModel.travelDocDoeMonth),
      travelDocDoeYear: new FormControl(this.pnvEntryTwnSingleModel.travelDocDoeYear),
      travelDocDoeReEntryDay: new FormControl(this.pnvEntryTwnSingleModel.travelDocDoeReEntryDay),
      travelDocDoeReEntryMonth: new FormControl(this.pnvEntryTwnSingleModel.travelDocDoeReEntryMonth),
      travelDocDoeReEntryYear: new FormControl(this.pnvEntryTwnSingleModel.travelDocDoeReEntryYear),
      presentAddress1: new FormControl(this.pnvEntryTwnSingleModel.presentAddress1),
      presentAddress2: new FormControl(this.pnvEntryTwnSingleModel.presentAddress2),
      presentAddress3: new FormControl(this.pnvEntryTwnSingleModel.presentAddress3),
      presentAddress4: new FormControl(this.pnvEntryTwnSingleModel.presentAddress4),
      podAddress1: new FormControl(this.pnvEntryTwnSingleModel.podAddress1),
      podAddress2: new FormControl(this.pnvEntryTwnSingleModel.podAddress2),
      podAddress3: new FormControl(this.pnvEntryTwnSingleModel.podAddress3),
      podAddress4: new FormControl(this.pnvEntryTwnSingleModel.podAddress4),
      occupation: new FormControl(this.pnvEntryTwnSingleModel.occupation),
      employerName: new FormControl(this.pnvEntryTwnSingleModel.employerName),
      employerAddress: new FormControl(this.pnvEntryTwnSingleModel.employerAddress),
      maritalStatus: new FormControl(this.pnvEntryTwnSingleModel.maritalStatus),
      spouseChiName: new FormControl(this.pnvEntryTwnSingleModel.spouseChiName),
      spouseEngName: new FormControl(this.pnvEntryTwnSingleModel.spouseEngName),
      spouseOccupation: new FormControl(this.pnvEntryTwnSingleModel.spouseOccupation),
      visitReason: new FormControl(this.pnvEntryTwnSingleModel.visitReason),
      proposedDuration: new FormControl(this.pnvEntryTwnSingleModel.proposedDuration),
      

      /**part3 */
      refereeChiName: new FormControl(this.pnvEntryTwnSingleModel.refereeChiName),
      refereeEngSurname: new FormControl(this.pnvEntryTwnSingleModel.refereeEngSurname),
      refereeEngGivenNames: new FormControl(this.pnvEntryTwnSingleModel.refereeEngGivenNames),
      refereeSex: new FormControl(this.pnvEntryTwnSingleModel.refereeSex),
      refereeDobDay: new FormControl(this.pnvEntryTwnSingleModel.refereeDobDay),
      refereeDobMonth: new FormControl(this.pnvEntryTwnSingleModel.refereeDobMonth),
      refereeDobYear: new FormControl(this.pnvEntryTwnSingleModel.refereeDobYear),
      refereeHkid1: new FormControl(this.pnvEntryTwnSingleModel.refereeHkid1),
      refereeHkid2: new FormControl(this.pnvEntryTwnSingleModel.refereeHkid2),
      refereeContactTelephoneNo: new FormControl(this.pnvEntryTwnSingleModel.refereeContactTelephoneNo),
      refereeEmail: new FormControl(this.pnvEntryTwnSingleModel.refereeEmail),
      refereeResidentialAddressRoom: new FormControl(this.pnvEntryTwnSingleModel.refereeResidentialAddressRoom),
      refereeResidentialAddressFloor: new FormControl(this.pnvEntryTwnSingleModel.refereeResidentialAddressFloor),
      refereeResidentialAddressBlock: new FormControl(this.pnvEntryTwnSingleModel.refereeResidentialAddressBlock),
      refereeResidentialAddressBuilding: new FormControl(this.pnvEntryTwnSingleModel.refereeResidentialAddressBuilding),
      refereeResidentialAddressEstate: new FormControl(this.pnvEntryTwnSingleModel.refereeResidentialAddressEstate),
      refereeResidentialAddressStreet: new FormControl(this.pnvEntryTwnSingleModel.refereeResidentialAddressStreet),
      refereeResidentialAddressDistrict: new FormControl(this.pnvEntryTwnSingleModel.refereeResidentialAddressDistrict),
      refereeOccupation: new FormControl(this.pnvEntryTwnSingleModel.refereeOccupation),
      refereeOfficeTelephoneNo: new FormControl(this.pnvEntryTwnSingleModel.refereeOfficeTelephoneNo),
      refereeExt: new FormControl(this.pnvEntryTwnSingleModel.refereeExt),
      refereeBusinessAddressRoom: new FormControl(this.pnvEntryTwnSingleModel.refereeBusinessAddressRoom),
      refereeBusinessAddressFloor: new FormControl(this.pnvEntryTwnSingleModel.refereeBusinessAddressFloor),
      refereeBusinessAddressBlock: new FormControl(this.pnvEntryTwnSingleModel.refereeBusinessAddressBlock),
      refereeBusinessAddressBuilding: new FormControl(this.pnvEntryTwnSingleModel.refereeBusinessAddressBuilding),
      refereeBusinessAddressEstate: new FormControl(this.pnvEntryTwnSingleModel.refereeBusinessAddressEstate),
      refereeBusinessAddressStreet: new FormControl(this.pnvEntryTwnSingleModel.refereeBusinessAddressStreet),
      refereeBusinessAddressDistrict: new FormControl(this.pnvEntryTwnSingleModel.refereeBusinessAddressDistrict)
      

      });
  }
  validateNoOfCopy(){}
  private handleCalendarType() {}
  validateHospital() {}
}
