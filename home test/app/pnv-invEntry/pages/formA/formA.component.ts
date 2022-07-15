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
  selector: 'pnv-invEntry-formA',
  templateUrl: './formA.component.html',
  styleUrls: ['./formA.component.css']
})
export class PnvInvEntryAFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
      /**part1 */
      applicantChiName: new FormControl(this.pnvInvEntryModel.applicantChiName),
      applicantChiMaidenSurname: new FormControl(this.pnvInvEntryModel.applicantChiMaidenSurname),
      applicantEngSurName: new FormControl(this.pnvInvEntryModel.applicantEngSurName),
      applicantEngGivenName: new FormControl(this.pnvInvEntryModel.applicantEngGivenName),
      applicantAlias: new FormControl(this.pnvInvEntryModel.applicantAlias),
      applicantSex: new FormControl(this.pnvInvEntryModel.applicantSex),
      applicantDobDay: new FormControl(this.pnvInvEntryModel.applicantDobDay),
      applicantDobMonth: new FormControl(this.pnvInvEntryModel.applicantDobMonth),
      applicantDobYear: new FormControl(this.pnvInvEntryModel.applicantDobYear),
      applicantPlaceOfBirth: new FormControl(this.pnvInvEntryModel.applicantPlaceOfBirth),
      applicantNationality: new FormControl(this.pnvInvEntryModel.applicantNationality),
      applicantMaritalStatus: new FormControl(this.pnvInvEntryModel.applicantMaritalStatus),
      applicantHkidNo1: new FormControl(this.pnvInvEntryModel.applicantHkidNo1),
      applicantHkidNo2: new FormControl(this.pnvInvEntryModel.applicantHkidNo2),
      applicantTravelDocType: new FormControl(this.pnvInvEntryModel.applicantTravelDocType),
      applicantTravelDocValue: new FormControl(this.pnvInvEntryModel.applicantTravelDocValue),
      applicantDoiDay: new FormControl(this.pnvInvEntryModel.applicantDoiDay),
      applicantDoiMonth: new FormControl(this.pnvInvEntryModel.applicantDoiMonth),
      applicantDoiYear: new FormControl(this.pnvInvEntryModel.applicantDoiYear),
      applicantDoeDay: new FormControl(this.pnvInvEntryModel.applicantDoeDay),
      applicantDoeMonth: new FormControl(this.pnvInvEntryModel.applicantDoeMonth),
      applicantDoeYear: new FormControl(this.pnvInvEntryModel.applicantDoeYear),
      applicantTravelDocIssuePlace: new FormControl(this.pnvInvEntryModel.applicantTravelDocIssuePlace),
      applicantEMail: new FormControl(this.pnvInvEntryModel.applicantEMail),
      applicantPhoneNo: new FormControl(this.pnvInvEntryModel.applicantPhoneNo),
      applicantFaxNo: new FormControl(this.pnvInvEntryModel.applicantFaxNo),
      applicantCountry: new FormControl(this.pnvInvEntryModel.applicantCountry),
      applicantAcquiredPermanentResidence: new FormControl(this.pnvInvEntryModel.applicantAcquiredPermanentResidence),
      applicantLengthOfYears: new FormControl(this.pnvInvEntryModel.applicantLengthOfYears),
      applicantLengthOfMonths: new FormControl(this.pnvInvEntryModel.applicantLengthOfMonths),
      applicantCurrentStaying: new FormControl(this.pnvInvEntryModel.applicantCurrentStaying),
      applicantPDDay: new FormControl(this.pnvInvEntryModel.applicantPDDay),
      applicantPDMonth: new FormControl(this.pnvInvEntryModel.applicantPDMonth),
      applicantPDYear: new FormControl(this.pnvInvEntryModel.applicantPDYear),
      applicantStatus: new FormControl(this.pnvInvEntryModel.applicantStatus),
      applicantStatusOthers: new FormControl(this.pnvInvEntryModel.applicantStatusOthers),
      presentAddress1: new FormControl(this.pnvInvEntryModel.presentAddress1),
      presentAddress2: new FormControl(this.pnvInvEntryModel.presentAddress2),
      presentAddress3: new FormControl(this.pnvInvEntryModel.presentAddress3),
      presentAddress4: new FormControl(this.pnvInvEntryModel.presentAddress4),
      permanentAddress1: new FormControl(this.pnvInvEntryModel.permanentAddress1),
      permanentAddress2: new FormControl(this.pnvInvEntryModel.permanentAddress2),
      permanentAddress3: new FormControl(this.pnvInvEntryModel.permanentAddress3),
      permanentAddress4: new FormControl(this.pnvInvEntryModel.permanentAddress4),

      /**part2 */
      applicantProposedDateOfEntryDay: new FormControl(this.pnvInvEntryModel.applicantProposedDateOfEntryDay),
      applicantProposedDateOfEntryMonth: new FormControl(this.pnvInvEntryModel.applicantProposedDateOfEntryMonth),
      applicantProposedDateOfEntryYear: new FormControl(this.pnvInvEntryModel.applicantProposedDateOfEntryYear),
      applicantProposedDuration: new FormControl(this.pnvInvEntryModel.applicantProposedDuration),
      
      /**part3 */
      dependantsNo: new FormControl(this.pnvInvEntryModel.dependantsNo),
      dependantEngSurName: new FormControl(this.pnvInvEntryModel.dependantEngSurName),
      dependantEngGivenName: new FormControl(this.pnvInvEntryModel.dependantEngGivenName),
      dependantChiName: new FormControl(this.pnvInvEntryModel.dependantChiName),
      dependantAlias: new FormControl(this.pnvInvEntryModel.dependantAlias),
      dependantSex: new FormControl(this.pnvInvEntryModel.dependantSex),
      dependantDobDay: new FormControl(this.pnvInvEntryModel.dependantDobDay),
      dependantDobMonth: new FormControl(this.pnvInvEntryModel.dependantDobMonth),
      dependantDobYear: new FormControl(this.pnvInvEntryModel.dependantDobYear),
      dependantPlaceOfBirth: new FormControl(this.pnvInvEntryModel.dependantPlaceOfBirth),
      dependantNationality: new FormControl(this.pnvInvEntryModel.dependantNationality),
      dependantRelationship: new FormControl(this.pnvInvEntryModel.dependantRelationship),
      dependantMaritalStatus: new FormControl(this.pnvInvEntryModel.dependantMaritalStatus),
      dependantTravelDocType: new FormControl(this.pnvInvEntryModel.dependantTravelDocType),
      dependantTravelDocValue: new FormControl(this.pnvInvEntryModel.dependantTravelDocValue),
      dependantMainlandidNo: new FormControl(this.pnvInvEntryModel.dependantMainlandidNo),
      dependantCurrentStaying: new FormControl(this.pnvInvEntryModel.dependantCurrentStaying),
      dependantPDDay: new FormControl(this.pnvInvEntryModel.dependantPDDay),
      dependantPDMonth: new FormControl(this.pnvInvEntryModel.dependantPDMonth),
      dependantPDYear: new FormControl(this.pnvInvEntryModel.dependantPDYear),
      dependantStatus: new FormControl(this.pnvInvEntryModel.dependantStatus),
      dependantStatusOthers: new FormControl(this.pnvInvEntryModel.dependantStatusOthers),
      dependantHkidNo1: new FormControl(this.pnvInvEntryModel.dependantHkidNo1),
      dependantHkidNo2: new FormControl(this.pnvInvEntryModel.dependantHkidNo2),
      dependantCountry: new FormControl(this.pnvInvEntryModel.dependantCountry),
      dependentAcquiredPermanentResidence: new FormControl(this.pnvInvEntryModel.dependentAcquiredPermanentResidence),
      
      /**part4 */
      nameOfSchool1: new FormControl(this.pnvInvEntryModel.nameOfSchool1),
      majorSubject1: new FormControl(this.pnvInvEntryModel.majorSubject1),
      degree1: new FormControl(this.pnvInvEntryModel.degree1),
      fromMonth1: new FormControl(this.pnvInvEntryModel.fromMonth1),
      fromYear1: new FormControl(this.pnvInvEntryModel.fromYear1),
      toMonth1: new FormControl(this.pnvInvEntryModel.toMonth1),
      toYear1: new FormControl(this.pnvInvEntryModel.toYear1),
      nameOfSchool2: new FormControl(this.pnvInvEntryModel.nameOfSchool2),
      majorSubject2: new FormControl(this.pnvInvEntryModel.majorSubject2),
      degree2: new FormControl(this.pnvInvEntryModel.degree2),
      fromMonth2: new FormControl(this.pnvInvEntryModel.fromMonth2),
      fromYear2: new FormControl(this.pnvInvEntryModel.fromYear2),
      toMonth2: new FormControl(this.pnvInvEntryModel.toMonth2),
      toYear2: new FormControl(this.pnvInvEntryModel.toYear2),
      nameOfSchool3: new FormControl(this.pnvInvEntryModel.nameOfSchool3),
      majorSubject3: new FormControl(this.pnvInvEntryModel.majorSubject3),
      degree3: new FormControl(this.pnvInvEntryModel.degree3),
      fromMonth3: new FormControl(this.pnvInvEntryModel.fromMonth3),
      fromYear3: new FormControl(this.pnvInvEntryModel.fromYear3),
      toMonth3: new FormControl(this.pnvInvEntryModel.toMonth3),
      toYear3: new FormControl(this.pnvInvEntryModel.toYear3),
      nameOfSchool4: new FormControl(this.pnvInvEntryModel.nameOfSchool4),
      majorSubject4: new FormControl(this.pnvInvEntryModel.majorSubject4),
      degree4: new FormControl(this.pnvInvEntryModel.degree4),
      fromMonth4: new FormControl(this.pnvInvEntryModel.fromMonth4),
      fromYear4: new FormControl(this.pnvInvEntryModel.fromYear4),
      toMonth4: new FormControl(this.pnvInvEntryModel.toMonth4),
      toYear4: new FormControl(this.pnvInvEntryModel.toYear4),
      professional1: new FormControl(this.pnvInvEntryModel.professional1),
      issuingAuthority1: new FormControl(this.pnvInvEntryModel.issuingAuthority1),
      applicantProfessionalDay1: new FormControl(this.pnvInvEntryModel.applicantProfessionalDay1),
      applicantProfessionalMonth1: new FormControl(this.pnvInvEntryModel.applicantProfessionalMonth1),
      applicantProfessionalYear1: new FormControl(this.pnvInvEntryModel.applicantProfessionalYear1),
      professional2: new FormControl(this.pnvInvEntryModel.professional2),
      issuingAuthority2: new FormControl(this.pnvInvEntryModel.issuingAuthority2),
      applicantProfessionalDay2: new FormControl(this.pnvInvEntryModel.applicantProfessionalDay2),
      applicantProfessionalMonth2: new FormControl(this.pnvInvEntryModel.applicantProfessionalMonth2),
      applicantProfessionalYear2: new FormControl(this.pnvInvEntryModel.applicantProfessionalYear2),
      professional3: new FormControl(this.pnvInvEntryModel.professional3),
      issuingAuthority3: new FormControl(this.pnvInvEntryModel.issuingAuthority3),
      applicantProfessionalDay3: new FormControl(this.pnvInvEntryModel.applicantProfessionalDay3),
      applicantProfessionalMonth3: new FormControl(this.pnvInvEntryModel.applicantProfessionalMonth3),
      applicantProfessionalYear3: new FormControl(this.pnvInvEntryModel.applicantProfessionalYear3),
      professional4: new FormControl(this.pnvInvEntryModel.professional4),
      issuingAuthority4: new FormControl(this.pnvInvEntryModel.issuingAuthority4),
      applicantProfessionalDay4: new FormControl(this.pnvInvEntryModel.applicantProfessionalDay4),
      applicantProfessionalMonth4: new FormControl(this.pnvInvEntryModel.applicantProfessionalMonth4),
      applicantProfessionalYear4: new FormControl(this.pnvInvEntryModel.applicantProfessionalYear4),
      
      /**part5 */
      nameAndAddressOfCompany1: new FormControl(this.pnvInvEntryModel.nameAndAddressOfCompany1),
      position1: new FormControl(this.pnvInvEntryModel.position1),
      natureOfDuties1: new FormControl(this.pnvInvEntryModel.natureOfDuties1),
      employmentFromMonth1: new FormControl(this.pnvInvEntryModel.employmentFromMonth1),
      employmentFromYear1: new FormControl(this.pnvInvEntryModel.employmentFromYear1),
      employmentToMonth1: new FormControl(this.pnvInvEntryModel.employmentToMonth1),
      employmentToYear1: new FormControl(this.pnvInvEntryModel.employmentToYear1),
      nameAndAddressOfCompany2: new FormControl(this.pnvInvEntryModel.nameAndAddressOfCompany2),
      position2: new FormControl(this.pnvInvEntryModel.position2),
      natureOfDuties2: new FormControl(this.pnvInvEntryModel.natureOfDuties2),
      employmentFromMonth2: new FormControl(this.pnvInvEntryModel.employmentFromMonth2),
      employmentFromYear2: new FormControl(this.pnvInvEntryModel.employmentFromYear2),
      employmentToMonth2: new FormControl(this.pnvInvEntryModel.employmentToMonth2),
      employmentToYear2: new FormControl(this.pnvInvEntryModel.employmentToYear2),
      nameAndAddressOfCompany3: new FormControl(this.pnvInvEntryModel.nameAndAddressOfCompany3),
      position3: new FormControl(this.pnvInvEntryModel.position3),
      natureOfDuties3: new FormControl(this.pnvInvEntryModel.natureOfDuties3),
      employmentFromMonth3: new FormControl(this.pnvInvEntryModel.employmentFromMonth3),
      employmentFromYear3: new FormControl(this.pnvInvEntryModel.employmentFromYear3),
      employmentToMonth3: new FormControl(this.pnvInvEntryModel.employmentToMonth3),
      employmentToYear3: new FormControl(this.pnvInvEntryModel.employmentToYear3),
      nameAndAddressOfCompany4: new FormControl(this.pnvInvEntryModel.nameAndAddressOfCompany4),
      position4: new FormControl(this.pnvInvEntryModel.position4),
      natureOfDuties4: new FormControl(this.pnvInvEntryModel.natureOfDuties4),
      employmentFromMonth4: new FormControl(this.pnvInvEntryModel.employmentFromMonth4),
      employmentFromYear4: new FormControl(this.pnvInvEntryModel.employmentFromYear4),
      employmentToMonth4: new FormControl(this.pnvInvEntryModel.employmentToMonth4),
      employmentToYear4: new FormControl(this.pnvInvEntryModel.employmentToYear4),

      /**part6 */
      governmentBackedProgramme: new FormControl(this.pnvInvEntryModel.governmentBackedProgramme),
      nameOfSupporingOrganisation: new FormControl(this.pnvInvEntryModel.nameOfSupporingOrganisation),
      nameOfProgramme: new FormControl(this.pnvInvEntryModel.nameOfProgramme),
      nameOfCompany: new FormControl(this.pnvInvEntryModel.nameOfCompany),
      companyEstablismentDateDay: new FormControl(this.pnvInvEntryModel.companyEstablismentDateDay),
      companyEstablismentDateMonth: new FormControl(this.pnvInvEntryModel.companyEstablismentDateMonth),
      companyEstablismentDateYear: new FormControl(this.pnvInvEntryModel.companyEstablismentDateYear), 
      companyType: new FormControl(this.pnvInvEntryModel.companyType),
      nameOfParentCompany: new FormControl(this.pnvInvEntryModel.nameOfParentCompany),
      capital: new FormControl(this.pnvInvEntryModel.capital),
      authorisedCapital: new FormControl(this.pnvInvEntryModel.authorisedCapital),
      paidUpCapital: new FormControl(this.pnvInvEntryModel.paidUpCapital),
      shareholders: new FormControl(this.pnvInvEntryModel.shareholders),
      directorNo: new FormControl(this.pnvInvEntryModel.directorNo),
      directorName: new FormControl(this.pnvInvEntryModel.directorName),
      directorHkid1: new FormControl(this.pnvInvEntryModel.directorHkid1),
      directorHkid2: new FormControl(this.pnvInvEntryModel.directorHkid2),
      isOfficeExist: new FormControl(this.pnvInvEntryModel.isOfficeExist),
      areaSize: new FormControl(this.pnvInvEntryModel.areaSize),
      monthlyRent: new FormControl(this.pnvInvEntryModel.monthlyRent),
      purchasePrice: new FormControl(this.pnvInvEntryModel.purchasePrice),
      addressRoom: new FormControl(this.pnvInvEntryModel.addressRoom),
      addressFloor: new FormControl(this.pnvInvEntryModel.addressFloor),
      addressBlock: new FormControl(this.pnvInvEntryModel.addressBlock),
      addressBuilding: new FormControl(this.pnvInvEntryModel.addressBuilding),
      addressEstate: new FormControl(this.pnvInvEntryModel.addressEstate),
      addressStreet: new FormControl(this.pnvInvEntryModel.addressStreet),
      addressDistrict: new FormControl(this.pnvInvEntryModel.addressDistrict),
      industry: new FormControl(this.pnvInvEntryModel.industry),
      service: new FormControl(this.pnvInvEntryModel.service),
      trading: new FormControl(this.pnvInvEntryModel.trading),
      othersPleaseState: new FormControl(this.pnvInvEntryModel.othersPleaseState),
      modeOfOperation: new FormControl(this.pnvInvEntryModel.modeOfOperation),
      companyCurrentAccount: new FormControl(this.pnvInvEntryModel.companyCurrentAccount),
      companySavingsAccount: new FormControl(this.pnvInvEntryModel.companySavingsAccount),
      companyTimeDepositAccount: new FormControl(this.pnvInvEntryModel.companyTimeDepositAccount),
      companyBankFinancing: new FormControl(this.pnvInvEntryModel.companyBankFinancing),
      companyProfitsTax: new FormControl(this.pnvInvEntryModel.companyProfitsTax),
      applicantCurrentAccount: new FormControl(this.pnvInvEntryModel.applicantCurrentAccount),
      applicantSavingsAccount: new FormControl(this.pnvInvEntryModel.applicantSavingsAccount),
      applicantTimeDepositAccount: new FormControl(this.pnvInvEntryModel.applicantTimeDepositAccount),
      applicantOverdraft: new FormControl(this.pnvInvEntryModel.applicantOverdraft),
      existingStaffInHkNo: new FormControl(this.pnvInvEntryModel.existingStaffInHkNo),
      existingStaffoutsideHkNo: new FormControl(this.pnvInvEntryModel.existingStaffoutsideHkNo),
      staffAndPostInHkInComingYear: new FormControl(this.pnvInvEntryModel.staffAndPostInHkInComingYear),
      businessConnectionsHk: new FormControl(this.pnvInvEntryModel.businessConnectionsHk),
      businessConnectionsOverseas: new FormControl(this.pnvInvEntryModel.businessConnectionsOverseas),
      cooperationWithLocalManufacturers: new FormControl(this.pnvInvEntryModel.cooperationWithLocalManufacturers),
      turnoverAsAtLastMonth: new FormControl(this.pnvInvEntryModel.turnoverAsAtLastMonth),
      estimatedTurnoverInTheComingYear: new FormControl(this.pnvInvEntryModel.estimatedTurnoverInTheComingYear),
      commencementOfBusinessDateDay: new FormControl(this.pnvInvEntryModel.commencementOfBusinessDateDay),
      commencementOfBusinessDateMonth: new FormControl(this.pnvInvEntryModel.commencementOfBusinessDateMonth),
      commencementOfBusinessDateYear: new FormControl(this.pnvInvEntryModel.commencementOfBusinessDateYear),
      amountOfCapitalInvestedInHk: new FormControl(this.pnvInvEntryModel.amountOfCapitalInvestedInHk),
      postsCreatedNo: new FormControl(this.pnvInvEntryModel.postsCreatedNo),
      createdPostTitle: new FormControl(this.pnvInvEntryModel.createdPostTitle),
      createdMonthlySalary: new FormControl(this.pnvInvEntryModel.createdMonthlySalary),
      createdPostsNo: new FormControl(this.pnvInvEntryModel.createdPostsNo),
      estimatedAmountOfCapitalInHkInTheComing2Years: new FormControl(this.pnvInvEntryModel.estimatedAmountOfCapitalInHkInTheComing2Years),
      estimatedPostNoInTheComing2Years: new FormControl(this.pnvInvEntryModel.estimatedPostNoInTheComing2Years),
      estimatedPostTitle: new FormControl(this.pnvInvEntryModel.estimatedPostTitle),
      estimatedMonthlySalary: new FormControl(this.pnvInvEntryModel.estimatedMonthlySalary),
      estimatedPostNoWithPostTitleInTheComing2Years: new FormControl(this.pnvInvEntryModel.estimatedPostNoWithPostTitleInTheComing2Years),
      introduction: new FormControl(this.pnvInvEntryModel.introduction),
      otherContribution: new FormControl(this.pnvInvEntryModel.otherContribution)
      });
  }
  validateNoOfCopy(){}
  private handleCalendarType() {}
  validateHospital() {}
}
