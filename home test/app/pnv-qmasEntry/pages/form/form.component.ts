import { PnvQmasEntryService } from 'src/app/pnv-qmasEntry/pnv-qmasEntry.service';
import { PnvQmasEntry } from 'src/app/pnv-qmasEntry/pnv-qmasEntry.model';
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
  selector: 'pnv-qmasEntry-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class PnvQmasEntryFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
  pnvQmasEntryModel: PnvQmasEntry;
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
    private pnvQmasEntryService: PnvQmasEntryService,
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

    this.pnvQmasEntryModel = this.pnvQmasEntryService.PnvQmasEntryModel;
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
      applicantChiName: new FormControl(this.pnvQmasEntryModel.applicantChiName),
      applicantMaidenSurname: new FormControl(this.pnvQmasEntryModel.applicantMaidenSurname),
      applicantEngSurname: new FormControl(this.pnvQmasEntryModel.applicantEngSurname),
      applicantEngGivenNames: new FormControl(this.pnvQmasEntryModel.applicantEngGivenNames),
      applicantOtherNames: new FormControl(this.pnvQmasEntryModel.applicantOtherNames),
      applicantSex: new FormControl(this.pnvQmasEntryModel.applicantSex),
      applicantDobday: new FormControl(this.pnvQmasEntryModel.applicantDobday),
      applicantDobmonth: new FormControl(this.pnvQmasEntryModel.applicantDobmonth),
      applicantDobyear: new FormControl(this.pnvQmasEntryModel.applicantDobyear),
      applicantPob: new FormControl(this.pnvQmasEntryModel.applicantPob),
      applicantMaritalStatus: new FormControl(this.pnvQmasEntryModel.applicantMaritalStatus),
      applicantNationailty: new FormControl(this.pnvQmasEntryModel.applicantNationailty),
      applicantTravelDocType: new FormControl(this.pnvQmasEntryModel.applicantTravelDocType),
      applicantTravelDocNo: new FormControl(this.pnvQmasEntryModel.applicantTravelDocNo),
      applicantPoi: new FormControl(this.pnvQmasEntryModel.applicantPoi),
      applicantDoiday: new FormControl(this.pnvQmasEntryModel.applicantDoiday),
      applicantDoimonth: new FormControl(this.pnvQmasEntryModel.applicantDoimonth),
      applicantDoiyear: new FormControl(this.pnvQmasEntryModel.applicantDoiyear),
      applicantDoeday: new FormControl(this.pnvQmasEntryModel.applicantDoeday),
      applicantDoemonth: new FormControl(this.pnvQmasEntryModel.applicantDoemonth),
      applicantDoeyear: new FormControl(this.pnvQmasEntryModel.applicantDoeyear),
      applicantMainlandIdno: new FormControl(this.pnvQmasEntryModel.applicantMainlandIdno),
      applicantMainlandIdPoi: new FormControl(this.pnvQmasEntryModel.applicantMainlandIdPoi),
      applicantMainlandIdDoiday: new FormControl(this.pnvQmasEntryModel.applicantMainlandIdDoiday),
      applicantMainlandIdDoimonth: new FormControl(this.pnvQmasEntryModel.applicantMainlandIdDoimonth),
      applicantMainlandIdDoiyear: new FormControl(this.pnvQmasEntryModel.applicantMainlandIdDoiyear),
      applicantTel: new FormControl(this.pnvQmasEntryModel.applicantTel),
      applicantFax: new FormControl(this.pnvQmasEntryModel.applicantFax),
      applicantEmail: new FormControl(this.pnvQmasEntryModel.applicantEmail),
      applicantPresentAddress1: new FormControl(this.pnvQmasEntryModel.applicantPresentAddress1),
      applicantPresentAddress2: new FormControl(this.pnvQmasEntryModel.applicantPresentAddress2),
      applicantPresentAddress3: new FormControl(this.pnvQmasEntryModel.applicantPresentAddress3),
      applicantPresentAddress4: new FormControl(this.pnvQmasEntryModel.applicantPresentAddress4),
      applicantPermanentAddress1: new FormControl(this.pnvQmasEntryModel.applicantPermanentAddress1),
      applicantPermanentAddress2: new FormControl(this.pnvQmasEntryModel.applicantPermanentAddress2),
      applicantPermanentAddress3: new FormControl(this.pnvQmasEntryModel.applicantPermanentAddress3),
      applicantPermanentAddress4: new FormControl(this.pnvQmasEntryModel.applicantPermanentAddress4),
      applicantCountryTerritory: new FormControl(this.pnvQmasEntryModel.applicantCountryTerritory),
      applicantAcquiredPermanentResidence: new FormControl(this.pnvQmasEntryModel.applicantAcquiredPermanentResidence),
            

      /**part2 */
      fatherName: new FormControl(this.pnvQmasEntryModel.fatherName),
      fatherSex: new FormControl(this.pnvQmasEntryModel.fatherSex),
      fatherDobday: new FormControl(this.pnvQmasEntryModel.fatherDobday),
      fatherDobmonth: new FormControl(this.pnvQmasEntryModel.fatherDobmonth),
      fatherDobyear: new FormControl(this.pnvQmasEntryModel.fatherDobyear),
      fatherPob: new FormControl(this.pnvQmasEntryModel.fatherPob),
      fatherMaritalStatus: new FormControl(this.pnvQmasEntryModel.fatherMaritalStatus),
      fatherOccupation: new FormControl(this.pnvQmasEntryModel.fatherOccupation),
      fatherPresentCountry: new FormControl(this.pnvQmasEntryModel.fatherPresentCountry),
      fatherHkidno1: new FormControl(this.pnvQmasEntryModel.fatherHkidno1),
      fatherHkidno2: new FormControl(this.pnvQmasEntryModel.fatherHkidno2),
      motherName: new FormControl(this.pnvQmasEntryModel.motherName),
      motherSex: new FormControl(this.pnvQmasEntryModel.motherSex),
      motherDobday: new FormControl(this.pnvQmasEntryModel.motherDobday),
      motherDobmonth: new FormControl(this.pnvQmasEntryModel.motherDobmonth),
      motherDobyear: new FormControl(this.pnvQmasEntryModel.motherDobyear),
      motherPob: new FormControl(this.pnvQmasEntryModel.motherPob),
      motherMaritalStatus: new FormControl(this.pnvQmasEntryModel.motherMaritalStatus),
      motherOccupation: new FormControl(this.pnvQmasEntryModel.motherOccupation),
      motherPresentCountry: new FormControl(this.pnvQmasEntryModel.motherPresentCountry),
      motherHkidno1: new FormControl(this.pnvQmasEntryModel.motherHkidno1),
      motherHkidno2: new FormControl(this.pnvQmasEntryModel.motherHkidno2),
      spouseName: new FormControl(this.pnvQmasEntryModel.spouseName),
      spouseSex: new FormControl(this.pnvQmasEntryModel.spouseSex),
      spouseDobday: new FormControl(this.pnvQmasEntryModel.spouseDobday),
      spouseDobmonth: new FormControl(this.pnvQmasEntryModel.spouseDobmonth),
      spouseDobyear: new FormControl(this.pnvQmasEntryModel.spouseDobyear),
      spousePob: new FormControl(this.pnvQmasEntryModel.spousePob),
      spouseMaritalStatus: new FormControl(this.pnvQmasEntryModel.spouseMaritalStatus),
      spouseOccupation: new FormControl(this.pnvQmasEntryModel.spouseOccupation),
      spousePresentCountry: new FormControl(this.pnvQmasEntryModel.spousePresentCountry),
      spouseHkidno1: new FormControl(this.pnvQmasEntryModel.spouseHkidno1),
      spouseHkidno2: new FormControl(this.pnvQmasEntryModel.spouseHkidno2),
      spouseAccompanyToHk: new FormControl(this.pnvQmasEntryModel.spouseAccompanyToHk),
      childrenName: new FormControl(this.pnvQmasEntryModel.childrenName),
      childrenSex: new FormControl(this.pnvQmasEntryModel.childrenSex),
      childrenDobday: new FormControl(this.pnvQmasEntryModel.childrenDobday),
      childrenDobmonth: new FormControl(this.pnvQmasEntryModel.childrenDobmonth),
      childrenDobyear: new FormControl(this.pnvQmasEntryModel.childrenDobyear),
      childrenPob: new FormControl(this.pnvQmasEntryModel.childrenPob),
      childrenMaritalStatus: new FormControl(this.pnvQmasEntryModel.childrenMaritalStatus),
      childrenOccupation: new FormControl(this.pnvQmasEntryModel.childrenOccupation),
      childrenPresentCountry: new FormControl(this.pnvQmasEntryModel.childrenPresentCountry),
      childrenHkidno1: new FormControl(this.pnvQmasEntryModel.childrenHkidno1),
      childrenHkidno2: new FormControl(this.pnvQmasEntryModel.childrenHkidno2),
      childrenAccompanyToHk: new FormControl(this.pnvQmasEntryModel.childrenAccompanyToHk),
      brothersAndSistersName: new FormControl(this.pnvQmasEntryModel.brothersAndSistersName),
      brothersAndSistersSex: new FormControl(this.pnvQmasEntryModel.brothersAndSistersSex),
      brothersAndSistersDobday: new FormControl(this.pnvQmasEntryModel.brothersAndSistersDobday),
      brothersAndSistersDobmonth: new FormControl(this.pnvQmasEntryModel.brothersAndSistersDobmonth),
      brothersAndSistersDobyear: new FormControl(this.pnvQmasEntryModel.brothersAndSistersDobyear),
      brothersAndSistersPob: new FormControl(this.pnvQmasEntryModel.brothersAndSistersPob),
      brothersAndSistersMaritalStatus: new FormControl(this.pnvQmasEntryModel.brothersAndSistersMaritalStatus),
      brothersAndSistersOccupation: new FormControl(this.pnvQmasEntryModel.brothersAndSistersOccupation),
      brothersAndSistersPresentCountry: new FormControl(this.pnvQmasEntryModel.brothersAndSistersPresentCountry),
      brothersAndSistersHkidno1: new FormControl(this.pnvQmasEntryModel.brothersAndSistersHkidno1),
      brothersAndSistersHkidno2: new FormControl(this.pnvQmasEntryModel.brothersAndSistersHkidno2),
            

      /**part3 */
      aged18: new FormControl(this.pnvQmasEntryModel.aged18),
      capableOnOwnFinancial: new FormControl(this.pnvQmasEntryModel.capableOnOwnFinancial),
      assetsDescription1: new FormControl(this.pnvQmasEntryModel.assetsDescription1),
      assetsAmount1: new FormControl(this.pnvQmasEntryModel.assetsAmount1),
      assetsDescription2: new FormControl(this.pnvQmasEntryModel.assetsDescription2),
      assetsAmount2: new FormControl(this.pnvQmasEntryModel.assetsAmount2),
      subtotalA: new FormControl(this.pnvQmasEntryModel.subtotalA),
      liabilitiesDescription1: new FormControl(this.pnvQmasEntryModel.liabilitiesDescription1),
      liabilitiesAmount1: new FormControl(this.pnvQmasEntryModel.liabilitiesAmount1),
      liabilitiesDescription2: new FormControl(this.pnvQmasEntryModel.liabilitiesDescription2),
      liabilitiesAmount2: new FormControl(this.pnvQmasEntryModel.liabilitiesAmount2),
      subtotalB: new FormControl(this.pnvQmasEntryModel.subtotalB),
      personalNetWorth: new FormControl(this.pnvQmasEntryModel.personalNetWorth),
      convictCrime: new FormControl(this.pnvQmasEntryModel.convictCrime),
      crimeHistory: new FormControl(this.pnvQmasEntryModel.crimeHistory),
      refuseEntry: new FormControl(this.pnvQmasEntryModel.refuseEntry),
      refuseEntryHistory: new FormControl(this.pnvQmasEntryModel.refuseEntryHistory),
      refuseVisa: new FormControl(this.pnvQmasEntryModel.refuseVisa),
      refuseVisaHistory: new FormControl(this.pnvQmasEntryModel.refuseVisaHistory),
      breachImmigrationLaw: new FormControl(this.pnvQmasEntryModel.breachImmigrationLaw),
      breachImmigrationLawHistory: new FormControl(this.pnvQmasEntryModel.breachImmigrationLawHistory),
      applyVisaInADifferentName: new FormControl(this.pnvQmasEntryModel.applyVisaInADifferentName),
      applyVisaInADifferentNameHistory: new FormControl(this.pnvQmasEntryModel.applyVisaInADifferentNameHistory),
      writtenAndSpokenProficient: new FormControl(this.pnvQmasEntryModel.writtenAndSpokenProficient),
      writtenAndSpokenProficientDetails: new FormControl(this.pnvQmasEntryModel.writtenAndSpokenProficientDetails),
      minimumEducationLevel: new FormControl(this.pnvQmasEntryModel.minimumEducationLevel),
      

      /**part4 */
      pointsBasedTest: new FormControl(this.pnvQmasEntryModel.pointsBasedTest),


      /**part5 */
      age: new FormControl(this.pnvQmasEntryModel.age),
      academicProfessionalQualifications: new FormControl(this.pnvQmasEntryModel.academicProfessionalQualifications),
      additionalPointsByRenownedInstitutionRecognized: new FormControl(this.pnvQmasEntryModel.additionalPointsByRenownedInstitutionRecognized),
      stateInstitutionName: new FormControl(this.pnvQmasEntryModel.stateInstitutionName),
      workExperience: new FormControl(this.pnvQmasEntryModel.workExperience),
      twoYearsInternationalWorkExperience: new FormControl(this.pnvQmasEntryModel.twoYearsInternationalWorkExperience),
      talentList: new FormControl(this.pnvQmasEntryModel.talentList),
      additionalPointsUnderTalentList: new FormControl(this.pnvQmasEntryModel.additionalPointsUnderTalentList),
      languageProficiency: new FormControl(this.pnvQmasEntryModel.languageProficiency),
      familyBackground: new FormControl(this.pnvQmasEntryModel.familyBackground),
      oneImmediateFamilyMemberIsAHkPermanentResident: new FormControl(this.pnvQmasEntryModel.oneImmediateFamilyMemberIsAHkPermanentResident),
      accompanyingMarriedSpouseIsEducated: new FormControl(this.pnvQmasEntryModel.accompanyingMarriedSpouseIsEducated),
      accompanyingUnmarriedDependentChildUnderage18: new FormControl(this.pnvQmasEntryModel.accompanyingUnmarriedDependentChildUnderage18),
      totalPointsClaimed225: new FormControl(this.pnvQmasEntryModel.totalPointsClaimed225),
      

      /**part6 */
      achievement: new FormControl(this.pnvQmasEntryModel.achievement),
      achievementProofs: new FormControl(this.pnvQmasEntryModel.achievementProofs),
      othersIntellectualPropertyRights: new FormControl(this.pnvQmasEntryModel.othersIntellectualPropertyRights),
      othersProofs: new FormControl(this.pnvQmasEntryModel.othersProofs),
      accompanyMarriedSpouseEducated: new FormControl(this.pnvQmasEntryModel.accompanyMarriedSpouseEducated),
      

      /**part7 */
      degree1: new FormControl(this.pnvQmasEntryModel.degree1),
      major1: new FormControl(this.pnvQmasEntryModel.major1),
      institution1: new FormControl(this.pnvQmasEntryModel.institution1),
      studyType1: new FormControl(this.pnvQmasEntryModel.studyType1),
      city1: new FormControl(this.pnvQmasEntryModel.city1),
      academicPeriodOfStudyFromMonth1: new FormControl(this.pnvQmasEntryModel.academicPeriodOfStudyFromMonth1),
      academicPeriodOfStudyFromYear1: new FormControl(this.pnvQmasEntryModel.academicPeriodOfStudyFromYear1),
      academicPeriodOfStudyToMonth1: new FormControl(this.pnvQmasEntryModel.academicPeriodOfStudyToMonth1),
      academicPeriodOfStudyToYear1: new FormControl(this.pnvQmasEntryModel.academicPeriodOfStudyToYear1),
      yearObtained1: new FormControl(this.pnvQmasEntryModel.yearObtained1),
      academicIfItHasMetSpecification1: new FormControl(this.pnvQmasEntryModel.academicIfItHasMetSpecification1),
      degree2: new FormControl(this.pnvQmasEntryModel.degree2),
      major2: new FormControl(this.pnvQmasEntryModel.major2),
      institution2: new FormControl(this.pnvQmasEntryModel.institution2),
      studyType2: new FormControl(this.pnvQmasEntryModel.studyType2),
      city2: new FormControl(this.pnvQmasEntryModel.city2),
      academicPeriodOfStudyFromMonth2: new FormControl(this.pnvQmasEntryModel.academicPeriodOfStudyFromMonth2),
      academicPeriodOfStudyFromYear2: new FormControl(this.pnvQmasEntryModel.academicPeriodOfStudyFromYear2),
      academicPeriodOfStudyToMonth2: new FormControl(this.pnvQmasEntryModel.academicPeriodOfStudyToMonth2),
      academicPeriodOfStudyToYear2: new FormControl(this.pnvQmasEntryModel.academicPeriodOfStudyToYear2),
      yearObtained2: new FormControl(this.pnvQmasEntryModel.yearObtained2),
      academicIfItHasMetSpecification2: new FormControl(this.pnvQmasEntryModel.academicIfItHasMetSpecification2),
      

      /**part8 */
      workExperienceEmployerName1: new FormControl(this.pnvQmasEntryModel.workExperienceEmployerName1),
      workExperienceEmployerCity1: new FormControl(this.pnvQmasEntryModel.workExperienceEmployerCity1),
      workExperienceEmployerNature1: new FormControl(this.pnvQmasEntryModel.workExperienceEmployerNature1),
      workExperiencePosition1: new FormControl(this.pnvQmasEntryModel.workExperiencePosition1),
      workExperienceOccupationalLevel1: new FormControl(this.pnvQmasEntryModel.workExperienceOccupationalLevel1),
      workExperienceNatureDuties1: new FormControl(this.pnvQmasEntryModel.workExperienceNatureDuties1),
      workExperienceFromMonth1: new FormControl(this.pnvQmasEntryModel.workExperienceFromMonth1),
      workExperienceFromYear1: new FormControl(this.pnvQmasEntryModel.workExperienceFromYear1),
      workExperienceToMonth1: new FormControl(this.pnvQmasEntryModel.workExperienceToMonth1),
      workExperienceToYear1: new FormControl(this.pnvQmasEntryModel.workExperienceToYear1),
      workExperienceDuration1: new FormControl(this.pnvQmasEntryModel.workExperienceDuration1),
      workExperienceIfItHasMetSpecification1: new FormControl(this.pnvQmasEntryModel.workExperienceIfItHasMetSpecification1),
      workExperienceEmployerName2: new FormControl(this.pnvQmasEntryModel.workExperienceEmployerName2),
      workExperienceEmployerCity2: new FormControl(this.pnvQmasEntryModel.workExperienceEmployerCity2),
      workExperienceEmployerNature2: new FormControl(this.pnvQmasEntryModel.workExperienceEmployerNature2),
      workExperiencePosition2: new FormControl(this.pnvQmasEntryModel.workExperiencePosition2),
      workExperienceOccupationalLevel2: new FormControl(this.pnvQmasEntryModel.workExperienceOccupationalLevel2),
      workExperienceNatureDuties2: new FormControl(this.pnvQmasEntryModel.workExperienceNatureDuties2),
      workExperienceFromMonth2: new FormControl(this.pnvQmasEntryModel.workExperienceFromMonth2),
      workExperienceFromYear2: new FormControl(this.pnvQmasEntryModel.workExperienceFromYear2),
      workExperienceToMonth2: new FormControl(this.pnvQmasEntryModel.workExperienceToMonth2),
      workExperienceToYear2: new FormControl(this.pnvQmasEntryModel.workExperienceToYear2),
      workExperienceDuration2: new FormControl(this.pnvQmasEntryModel.workExperienceDuration2),
      workExperienceIfItHasMetSpecification2: new FormControl(this.pnvQmasEntryModel.workExperienceIfItHasMetSpecification2),
      totalNumberOfYearsOfWorkExperience: new FormControl(this.pnvQmasEntryModel.totalNumberOfYearsOfWorkExperience),
      

      /**part9 */
      careerAcademicAccomplishmentsFuturePlan: new FormControl(this.pnvQmasEntryModel.careerAcademicAccomplishmentsFuturePlan),


      /**part10 */
      countryTerritory1: new FormControl(this.pnvQmasEntryModel.countryTerritory1),
      duration1: new FormControl(this.pnvQmasEntryModel.duration1),
      countryFromMonth1: new FormControl(this.pnvQmasEntryModel.countryFromMonth1),
      countryFromYear1: new FormControl(this.pnvQmasEntryModel.countryFromYear1),
      countryToMonth1: new FormControl(this.pnvQmasEntryModel.countryToMonth1),
      countryToYear1: new FormControl(this.pnvQmasEntryModel.countryToYear1),
      countryTerritory2: new FormControl(this.pnvQmasEntryModel.countryTerritory2),
      duration2: new FormControl(this.pnvQmasEntryModel.duration2),
      countryFromMonth2: new FormControl(this.pnvQmasEntryModel.countryFromMonth2),
      countryFromYear2: new FormControl(this.pnvQmasEntryModel.countryFromYear2),
      countryToMonth2: new FormControl(this.pnvQmasEntryModel.countryToMonth2),
      countryToYear2: new FormControl(this.pnvQmasEntryModel.countryToYear2),
      

      /**part11 */
      language1: new FormControl(this.pnvQmasEntryModel.language1),
      written1: new FormControl(this.pnvQmasEntryModel.written1),
      spoken1: new FormControl(this.pnvQmasEntryModel.spoken1),
      firstSpokenLanguage1: new FormControl(this.pnvQmasEntryModel.firstSpokenLanguage1),
      language2: new FormControl(this.pnvQmasEntryModel.language2),
      written2: new FormControl(this.pnvQmasEntryModel.written2),
      spoken2: new FormControl(this.pnvQmasEntryModel.spoken2),
      firstSpokenLanguage2: new FormControl(this.pnvQmasEntryModel.firstSpokenLanguage2),
      

      /**part12 */
      sectorName: new FormControl(this.pnvQmasEntryModel.sectorName),

      });
  }
  validateNoOfCopy(){}
  private handleCalendarType() {}
  validateHospital() {}
}
