import { PnvTeResidentService } from 'src/app/pnv-teResident/pnv-teResident.service';
import { PnvTeResident } from 'src/app/pnv-teResident/pnv-teResident.model';
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
  selector: 'pnv-teResident-form',
  templateUrl: './formA.component.html',
  styleUrls: ['./formA.component.css']
})
export class PnvTeResidentAFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
  pnvTeResidentModel: PnvTeResident;
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
    private pnvTeResidentService: PnvTeResidentService,
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

    this.pnvTeResidentModel = this.pnvTeResidentService.PnvTeResidentModel;
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
      /**formA part1 */
      documentName: new FormControl(this.pnvTeResidentModel.documentName),
      documentType: new FormControl(this.pnvTeResidentModel.documentType),
      documentDateDay: new FormControl(this.pnvTeResidentModel.documentDateDay),
      documentDateMonth: new FormControl(this.pnvTeResidentModel.documentDateMonth),
      documentDateYear: new FormControl(this.pnvTeResidentModel.documentDateYear),
      documentPlace: new FormControl(this.pnvTeResidentModel.documentPlace),
      documentCircumstance: new FormControl(this.pnvTeResidentModel.documentCircumstance),


      /**formA part2 */
      arrivalDateDay: new FormControl(this.pnvTeResidentModel.arrivalDateDay),
      arrivalDateMonth: new FormControl(this.pnvTeResidentModel.arrivalDateMonth),
      arrivalDateYear: new FormControl(this.pnvTeResidentModel.arrivalDateYear),
      arrivalNumber: new FormControl(this.pnvTeResidentModel.arrivalNumber),
      arrivalLimitOfStayDay: new FormControl(this.pnvTeResidentModel.arrivalLimitOfStayDay),
      arrivalLimitOfStayMonth: new FormControl(this.pnvTeResidentModel.arrivalLimitOfStayMonth),
      arrivalLimitOfStayYear: new FormControl(this.pnvTeResidentModel.arrivalLimitOfStayYear),
      

      /**formA part3 */
      departureDateDay: new FormControl(this.pnvTeResidentModel.departureDateDay),
      departureDateMonth: new FormControl(this.pnvTeResidentModel.departureDateMonth),
      departureDateYear: new FormControl(this.pnvTeResidentModel.departureDateYear),
      departureTime: new FormControl(this.pnvTeResidentModel.departureTime),
      departureDestination: new FormControl(this.pnvTeResidentModel.departureDestination),
      departureNumber: new FormControl(this.pnvTeResidentModel.departureNumber),
      

      });
  }
  validateNoOfCopy(){}
  private handleCalendarType() {}
  validateHospital() {}
}
