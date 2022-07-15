import { PnvChangeEmpDHService } from 'src/app/pnv-changeEmpDH/pnv-changeEmpDH.service';
import { PnvChangeEmpDH } from 'src/app/pnv-changeEmpDH/pnv-changeEmpDH.model';
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
  selector: 'pnv-changeEmpDH-form',
  templateUrl: './formA.component.html',
  styleUrls: ['./formA.component.css']
})
export class PnvChangeEmpDHAFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
  pnvChangeEmpDHModel: PnvChangeEmpDH;
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
    private pnvChangeEmpDHService: PnvChangeEmpDHService,
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

    this.pnvChangeEmpDHModel = this.pnvChangeEmpDHService.PnvChangeEmpDHModel;
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
      applicantName: new FormControl(this.pnvChangeEmpDHModel.applicantName),
      applicantMaritalStatus: new FormControl(this.pnvChangeEmpDHModel.applicantMaritalStatus),
      applicantDobday: new FormControl(this.pnvChangeEmpDHModel.applicantDobday),
      applicantDobmonth: new FormControl(this.pnvChangeEmpDHModel.applicantDobmonth),
      applicantDobyear: new FormControl(this.pnvChangeEmpDHModel.applicantDobyear),
      applicantPob: new FormControl(this.pnvChangeEmpDHModel.applicantPob),
      applicantOccupation: new FormControl(this.pnvChangeEmpDHModel.applicantOccupation),
      applicantPresentCountry: new FormControl(this.pnvChangeEmpDHModel.applicantPresentCountry),
      applicantResidentialAddress1: new FormControl(this.pnvChangeEmpDHModel.applicantResidentialAddress1),
      applicantResidentialAddress2: new FormControl(this.pnvChangeEmpDHModel.applicantResidentialAddress2),
      applicantResidentialAddress3: new FormControl(this.pnvChangeEmpDHModel.applicantResidentialAddress3),
      applicantResidentialAddress4: new FormControl(this.pnvChangeEmpDHModel.applicantResidentialAddress4),
      fatherName: new FormControl(this.pnvChangeEmpDHModel.fatherName),
      fatherMaritalStatus: new FormControl(this.pnvChangeEmpDHModel.fatherMaritalStatus),
      fatherDobday: new FormControl(this.pnvChangeEmpDHModel.fatherDobday),
      fatherDobmonth: new FormControl(this.pnvChangeEmpDHModel.fatherDobmonth),
      fatherDobyear: new FormControl(this.pnvChangeEmpDHModel.fatherDobyear),
      fatherPob: new FormControl(this.pnvChangeEmpDHModel.fatherPob),
      fatherOccupation: new FormControl(this.pnvChangeEmpDHModel.fatherOccupation),
      fatherPresentCountry: new FormControl(this.pnvChangeEmpDHModel.fatherPresentCountry),
      fatherResidentialAddress1: new FormControl(this.pnvChangeEmpDHModel.fatherResidentialAddress1),
      fatherResidentialAddress2: new FormControl(this.pnvChangeEmpDHModel.fatherResidentialAddress2),
      fatherResidentialAddress3: new FormControl(this.pnvChangeEmpDHModel.fatherResidentialAddress3),
      fatherResidentialAddress4: new FormControl(this.pnvChangeEmpDHModel.fatherResidentialAddress4),
      motherName: new FormControl(this.pnvChangeEmpDHModel.motherName),
      motherMaritalStatus: new FormControl(this.pnvChangeEmpDHModel.motherMaritalStatus),
      motherDobday: new FormControl(this.pnvChangeEmpDHModel.motherDobday),
      motherDobmonth: new FormControl(this.pnvChangeEmpDHModel.motherDobmonth),
      motherDobyear: new FormControl(this.pnvChangeEmpDHModel.motherDobyear),
      motherPob: new FormControl(this.pnvChangeEmpDHModel.motherPob),
      motherOccupation: new FormControl(this.pnvChangeEmpDHModel.motherOccupation),
      motherPresentCountry: new FormControl(this.pnvChangeEmpDHModel.motherPresentCountry),
      motherResidentialAddress1: new FormControl(this.pnvChangeEmpDHModel.motherResidentialAddress1),
      motherResidentialAddress2: new FormControl(this.pnvChangeEmpDHModel.motherResidentialAddress2),
      motherResidentialAddress3: new FormControl(this.pnvChangeEmpDHModel.motherResidentialAddress3),
      motherResidentialAddress4: new FormControl(this.pnvChangeEmpDHModel.motherResidentialAddress4),
      spouseName: new FormControl(this.pnvChangeEmpDHModel.spouseName),
      spouseMaritalStatus: new FormControl(this.pnvChangeEmpDHModel.spouseMaritalStatus),
      spouseDobday: new FormControl(this.pnvChangeEmpDHModel.spouseDobday),
      spouseDobmonth: new FormControl(this.pnvChangeEmpDHModel.spouseDobmonth),
      spouseDobyear: new FormControl(this.pnvChangeEmpDHModel.spouseDobyear),
      spousePob: new FormControl(this.pnvChangeEmpDHModel.spousePob),
      spouseOccupation: new FormControl(this.pnvChangeEmpDHModel.spouseOccupation),
      spousePresentCountry: new FormControl(this.pnvChangeEmpDHModel.spousePresentCountry),
      spouseResidentialAddress1: new FormControl(this.pnvChangeEmpDHModel.spouseResidentialAddress1),
      spouseResidentialAddress2: new FormControl(this.pnvChangeEmpDHModel.spouseResidentialAddress2),
      spouseResidentialAddress3: new FormControl(this.pnvChangeEmpDHModel.spouseResidentialAddress3),
      spouseResidentialAddress4: new FormControl(this.pnvChangeEmpDHModel.spouseResidentialAddress4),
      childrenName: new FormControl(this.pnvChangeEmpDHModel.childrenName),
      childrenMaritalStatus: new FormControl(this.pnvChangeEmpDHModel.childrenMaritalStatus),
      childrenDobday: new FormControl(this.pnvChangeEmpDHModel.childrenDobday),
      childrenDobmonth: new FormControl(this.pnvChangeEmpDHModel.childrenDobmonth),
      childrenDobyear: new FormControl(this.pnvChangeEmpDHModel.childrenDobyear),
      childrenPob: new FormControl(this.pnvChangeEmpDHModel.childrenPob),
      childrenOccupation: new FormControl(this.pnvChangeEmpDHModel.childrenOccupation),
      childrenPresentCountry: new FormControl(this.pnvChangeEmpDHModel.childrenPresentCountry),
      childrenResidentialAddress1: new FormControl(this.pnvChangeEmpDHModel.childrenResidentialAddress1),
      childrenResidentialAddress2: new FormControl(this.pnvChangeEmpDHModel.childrenResidentialAddress2),
      childrenResidentialAddress3: new FormControl(this.pnvChangeEmpDHModel.childrenResidentialAddress3),
      childrenResidentialAddress4: new FormControl(this.pnvChangeEmpDHModel.childrenResidentialAddress4),
      siblingName: new FormControl(this.pnvChangeEmpDHModel.siblingName),
      siblingMaritalStatus: new FormControl(this.pnvChangeEmpDHModel.siblingMaritalStatus),
      siblingDobday: new FormControl(this.pnvChangeEmpDHModel.siblingDobday),
      siblingDobmonth: new FormControl(this.pnvChangeEmpDHModel.siblingDobmonth),
      siblingDobyear: new FormControl(this.pnvChangeEmpDHModel.siblingDobyear),
      siblingPob: new FormControl(this.pnvChangeEmpDHModel.siblingPob),
      siblingOccupation: new FormControl(this.pnvChangeEmpDHModel.siblingOccupation),
      siblingPresentCountry: new FormControl(this.pnvChangeEmpDHModel.siblingPresentCountry),
      siblingResidentialAddress1: new FormControl(this.pnvChangeEmpDHModel.siblingResidentialAddress1),
      siblingResidentialAddress2: new FormControl(this.pnvChangeEmpDHModel.siblingResidentialAddress2),
      siblingResidentialAddress3: new FormControl(this.pnvChangeEmpDHModel.siblingResidentialAddress3),
      siblingResidentialAddress4: new FormControl(this.pnvChangeEmpDHModel.siblingResidentialAddress4)
      
      

      });
  }
  validateNoOfCopy(){}
  private handleCalendarType() {}
  validateHospital() {}
}
