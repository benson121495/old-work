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
  templateUrl: './formB.component.html',
  styleUrls: ['./formB.component.css']
})
export class PnvChangeEmpDHBFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
      /**part1 */
      sponsorName: new FormControl(this.pnvChangeEmpDHModel.sponsorName),
      sponsorDobday: new FormControl(this.pnvChangeEmpDHModel.sponsorDobday),
      sponsorDobmonth: new FormControl(this.pnvChangeEmpDHModel.sponsorDobmonth),
      sponsorDobyear: new FormControl(this.pnvChangeEmpDHModel.sponsorDobyear),
      sponsorPob: new FormControl(this.pnvChangeEmpDHModel.sponsorPob),
      sponsorMaritalStatus: new FormControl(this.pnvChangeEmpDHModel.sponsorMaritalStatus),
      sponsorOccupation: new FormControl(this.pnvChangeEmpDHModel.sponsorOccupation),
      sponsorPresentCountry: new FormControl(this.pnvChangeEmpDHModel.sponsorPresentCountry),
      sponsorResidentialAddress1: new FormControl(this.pnvChangeEmpDHModel.sponsorResidentialAddress1),
      sponsorResidentialAddress2: new FormControl(this.pnvChangeEmpDHModel.sponsorResidentialAddress2),
      sponsorResidentialAddress3: new FormControl(this.pnvChangeEmpDHModel.sponsorResidentialAddress3),
      sponsorResidentialAddress4: new FormControl(this.pnvChangeEmpDHModel.sponsorResidentialAddress4),
      sponsorFatherName: new FormControl(this.pnvChangeEmpDHModel.sponsorFatherName),
      sponsorFatherDobday: new FormControl(this.pnvChangeEmpDHModel.sponsorFatherDobday),
      sponsorFatherDobmonth: new FormControl(this.pnvChangeEmpDHModel.sponsorFatherDobmonth),
      sponsorFatherDobyear: new FormControl(this.pnvChangeEmpDHModel.sponsorFatherDobyear),
      sponsorFatherPob: new FormControl(this.pnvChangeEmpDHModel.sponsorFatherPob),
      sponsorFatherMaritalStatus: new FormControl(this.pnvChangeEmpDHModel.sponsorFatherMaritalStatus),
      sponsorFatherOccupation: new FormControl(this.pnvChangeEmpDHModel.sponsorFatherOccupation),
      sponsorFatherPresentCountry: new FormControl(this.pnvChangeEmpDHModel.sponsorFatherPresentCountry),
      sponsorFatherResidentialAddress1: new FormControl(this.pnvChangeEmpDHModel.sponsorFatherResidentialAddress1),
      sponsorFatherResidentialAddress2: new FormControl(this.pnvChangeEmpDHModel.sponsorFatherResidentialAddress2),
      sponsorFatherResidentialAddress3: new FormControl(this.pnvChangeEmpDHModel.sponsorFatherResidentialAddress3),
      sponsorFatherResidentialAddress4: new FormControl(this.pnvChangeEmpDHModel.sponsorFatherResidentialAddress4),
      sponsorMotherName: new FormControl(this.pnvChangeEmpDHModel.sponsorMotherName),
      sponsorMotherDobday: new FormControl(this.pnvChangeEmpDHModel.sponsorMotherDobday),
      sponsorMotherDobmonth: new FormControl(this.pnvChangeEmpDHModel.sponsorMotherDobmonth),
      sponsorMotherDobyear: new FormControl(this.pnvChangeEmpDHModel.sponsorMotherDobyear),
      sponsorMotherPob: new FormControl(this.pnvChangeEmpDHModel.sponsorMotherPob),
      sponsorMotherMaritalStatus: new FormControl(this.pnvChangeEmpDHModel.sponsorMotherMaritalStatus),
      sponsorMotherOccupation: new FormControl(this.pnvChangeEmpDHModel.sponsorMotherOccupation),
      sponsorMotherPresentCountry: new FormControl(this.pnvChangeEmpDHModel.sponsorMotherPresentCountry),
      sponsorMotherResidentialAddress1: new FormControl(this.pnvChangeEmpDHModel.sponsorMotherResidentialAddress1),
      sponsorMotherResidentialAddress2: new FormControl(this.pnvChangeEmpDHModel.sponsorMotherResidentialAddress2),
      sponsorMotherResidentialAddress3: new FormControl(this.pnvChangeEmpDHModel.sponsorMotherResidentialAddress3),
      sponsorMotherResidentialAddress4: new FormControl(this.pnvChangeEmpDHModel.sponsorMotherResidentialAddress4),
      sponsorSpouseName: new FormControl(this.pnvChangeEmpDHModel.sponsorSpouseName),
      sponsorSpouseDobday: new FormControl(this.pnvChangeEmpDHModel.sponsorSpouseDobday),
      sponsorSpouseDobmonth: new FormControl(this.pnvChangeEmpDHModel.sponsorSpouseDobmonth),
      sponsorSpouseDobyear: new FormControl(this.pnvChangeEmpDHModel.sponsorSpouseDobyear),
      sponsorSpousePob: new FormControl(this.pnvChangeEmpDHModel.sponsorSpousePob),
      sponsorSpouseMaritalStatus: new FormControl(this.pnvChangeEmpDHModel.sponsorSpouseMaritalStatus),
      sponsorSpouseOccupation: new FormControl(this.pnvChangeEmpDHModel.sponsorSpouseOccupation),
      sponsorSpousePresentCountry: new FormControl(this.pnvChangeEmpDHModel.sponsorSpousePresentCountry),
      sponsorSpouseResidentialAddress1: new FormControl(this.pnvChangeEmpDHModel.sponsorSpouseResidentialAddress1),
      sponsorSpouseResidentialAddress2: new FormControl(this.pnvChangeEmpDHModel.sponsorSpouseResidentialAddress2),
      sponsorSpouseResidentialAddress3: new FormControl(this.pnvChangeEmpDHModel.sponsorSpouseResidentialAddress3),
      sponsorSpouseResidentialAddress4: new FormControl(this.pnvChangeEmpDHModel.sponsorSpouseResidentialAddress4),
      sponsorChildrenName: new FormControl(this.pnvChangeEmpDHModel.sponsorChildrenName),
      sponsorChildrenDobday: new FormControl(this.pnvChangeEmpDHModel.sponsorChildrenDobday),
      sponsorChildrenDobmonth: new FormControl(this.pnvChangeEmpDHModel.sponsorChildrenDobmonth),
      sponsorChildrenDobyear: new FormControl(this.pnvChangeEmpDHModel.sponsorChildrenDobyear),
      sponsorChildrenPob: new FormControl(this.pnvChangeEmpDHModel.sponsorChildrenPob),
      sponsorChildrenMaritalStatus: new FormControl(this.pnvChangeEmpDHModel.sponsorChildrenMaritalStatus),
      sponsorChildrenOccupation: new FormControl(this.pnvChangeEmpDHModel.sponsorChildrenOccupation),
      sponsorChildrenPresentCountry: new FormControl(this.pnvChangeEmpDHModel.sponsorChildrenPresentCountry),
      sponsorChildrenResidentialAddress1: new FormControl(this.pnvChangeEmpDHModel.sponsorChildrenResidentialAddress1),
      sponsorChildrenResidentialAddress2: new FormControl(this.pnvChangeEmpDHModel.sponsorChildrenResidentialAddress2),
      sponsorChildrenResidentialAddress3: new FormControl(this.pnvChangeEmpDHModel.sponsorChildrenResidentialAddress3),
      sponsorChildrenResidentialAddress4: new FormControl(this.pnvChangeEmpDHModel.sponsorChildrenResidentialAddress4),
      sponsorSiblingsName: new FormControl(this.pnvChangeEmpDHModel.sponsorSiblingsName),
      sponsorSiblingsDobday: new FormControl(this.pnvChangeEmpDHModel.sponsorSiblingsDobday),
      sponsorSiblingsDobmonth: new FormControl(this.pnvChangeEmpDHModel.sponsorSiblingsDobmonth),
      sponsorSiblingsDobyear: new FormControl(this.pnvChangeEmpDHModel.sponsorSiblingsDobyear),
      sponsorSiblingsPob: new FormControl(this.pnvChangeEmpDHModel.sponsorSiblingsPob),
      sponsorSiblingsMaritalStatus: new FormControl(this.pnvChangeEmpDHModel.sponsorSiblingsMaritalStatus),
      sponsorSiblingsOccupation: new FormControl(this.pnvChangeEmpDHModel.sponsorSiblingsOccupation),
      sponsorSiblingsPresentCountry: new FormControl(this.pnvChangeEmpDHModel.sponsorSiblingsPresentCountry),
      sponsorSiblingsResidentialAddress1: new FormControl(this.pnvChangeEmpDHModel.sponsorSiblingsResidentialAddress1),
      sponsorSiblingsResidentialAddress2: new FormControl(this.pnvChangeEmpDHModel.sponsorSiblingsResidentialAddress2),
      sponsorSiblingsResidentialAddress3: new FormControl(this.pnvChangeEmpDHModel.sponsorSiblingsResidentialAddress3),
      sponsorSiblingsResidentialAddress4: new FormControl(this.pnvChangeEmpDHModel.sponsorSiblingsResidentialAddress4)
            

      });
  }
  validateNoOfCopy(){}
  private handleCalendarType() {}
  validateHospital() {}
}
