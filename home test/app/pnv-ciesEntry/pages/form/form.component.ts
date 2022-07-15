import { CiesEntryService } from 'src/app/pnv-ciesEntry/ciesEntry.service';
import { CiesEntry } from 'src/app/pnv-ciesEntry/ciesEntry.model';
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
  selector: ' ciesEntry-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class CiesEntryFormComponent implements OnInit, AfterViewInit, OnDestroy {

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
  ciesEntryModel: CiesEntry;
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
    private ciesEntryService: CiesEntryService,
    private formBuilder: FormBuilder,
    public translateservice: TranslateService,
    public commonService: CommonService,
    private activatedRoute: ActivatedRoute) {
      
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

    this.ciesEntryModel = this.ciesEntryService. CiesEntryModel;
    this.translateservice.onLangChange.subscribe((event: LangChangeEvent) => {
      this.browserLang = event.lang;
    });

    /**
     * Form group values for validations
     * */
    this.intializeForm();
    //this.validateNoOfCopy();
    //this.handleCalendarType();

    // enable on onchange place of birth 
    //this.validateHospital();
  }

    private intializeForm() {
      //const isdisable = (this.changeEmpModel.entry) ? false : true;
      this.fillForm = this.formBuilder.group({

        appType: new FormControl(this.ciesEntryModel.appType),
        chiName: new FormControl(this.ciesEntryModel.chiName),
        maidenSurName: new FormControl(this.ciesEntryModel.maidenName),
        engSurName: new FormControl(this.ciesEntryModel.engSurName),
        engGivenName: new FormControl(this.ciesEntryModel.engGivenName),
        chiNameAlias: new FormControl(this.ciesEntryModel.chiNameAlias),
        engSurNameAlias: new FormControl(this.ciesEntryModel.engSurNameAlias),
        engGivenNameAlias: new FormControl(this.ciesEntryModel.engGivenNameAlias),
        sex: new FormControl(this.ciesEntryModel.sex),
        dobDay: new FormControl(this.ciesEntryModel.dobDay),
        dobMonth: new FormControl(this.ciesEntryModel.dobMonth),
        dobYear: new FormControl(this.ciesEntryModel.dobYear),
        placeOfBirth: new FormControl(this.ciesEntryModel.placeOfBirth),
        nationality: new FormControl(this.ciesEntryModel.nationality),
        domicileCountry: new FormControl(this.ciesEntryModel.domicileCountry),
        residenceMonth: new FormControl(this.ciesEntryModel.residenceMonth),
        residenceYear: new FormControl(this.ciesEntryModel.residenceYear),
        hasPermanentResidence: new FormControl(this.ciesEntryModel.hasPermanentResidence),       
        maritalStatus: new FormControl(this.ciesEntryModel.maritalStatus),
        single: new FormControl(this.ciesEntryModel.single),
        married: new FormControl(this.ciesEntryModel.married),
        separated: new FormControl(this.ciesEntryModel.separated),
        divorced: new FormControl(this.ciesEntryModel.divorced),
        widowed: new FormControl(this.ciesEntryModel.widowed),
        phoneNo: new FormControl(this.ciesEntryModel.phoneNo),
        phoneExt: new FormControl(this.ciesEntryModel.phoneExt),
        faxNo: new FormControl(this.ciesEntryModel.faxNo),
        presentAddress1: new FormControl(this.ciesEntryModel.presentAddress1),
        presentAddress2: new FormControl(this.ciesEntryModel.presentAddress2),
        presentAddress3: new FormControl(this.ciesEntryModel.presentAddress3),
        permanentAddress1: new FormControl(this.ciesEntryModel.permanentAddress1),
        permanentAddress2: new FormControl(this.ciesEntryModel.permanentAddress2),
        permanentAddress3: new FormControl(this.ciesEntryModel.permanentAddress3),
        travelDocType: new FormControl(this.ciesEntryModel.travelDocType),
        placeOfIssue: new FormControl(this.ciesEntryModel.placeOfIssue),
        travelDocValue: new FormControl(this.ciesEntryModel.travelDocValue),
        travelDocIssueDay: new FormControl(this.ciesEntryModel.travelDocIssueDay),
        travelDocIssueMonth: new FormControl(this.ciesEntryModel.travelDocIssueMonth),
        travelDocIssueYear: new FormControl(this.ciesEntryModel.travelDocIssueYear),
        travelDocIssuePlace: new FormControl(this.ciesEntryModel.travelDocIssuePlace),
        travelDocExpDay: new FormControl(this.ciesEntryModel.travelDocExpDay),
        travelDocExpMonth: new FormControl(this.ciesEntryModel.travelDocExpMonth),
        travelDocExpYear: new FormControl(this.ciesEntryModel.travelDocExpYear),
        foreignIdValue: new FormControl(this.ciesEntryModel.foreignIdValue),
        foreignIdIssuePlace: new FormControl(this.ciesEntryModel.foreignIdIssuePlace),
        foreignIdIssueDay: new FormControl(this.ciesEntryModel.foreignIdIssueDay),
        foreignIdIssueMonth: new FormControl(this.ciesEntryModel.foreignIdIssueMonth),
        foreignIdIssueYear: new FormControl(this.ciesEntryModel.foreignIdIssueYear),
        hkIdValue1: new FormControl(this.ciesEntryModel.hkIdValue1),
        hkIdValue2: new FormControl(this.ciesEntryModel.hkIdValue2),
        hkIdIssueDay: new FormControl(this.ciesEntryModel.hkIdIssueDay),
        hkIdIssueMonth: new FormControl(this.ciesEntryModel.hkIdIssueMonth),
        hkIdIssueYear: new FormControl(this.ciesEntryModel.hkIdIssueYear),
        lastArrivalDay: new FormControl(this.ciesEntryModel.lastArrivalDay),
        lastArrivalMonth: new FormControl(this.ciesEntryModel.lastArrivalMonth),
        lastArrivalYear: new FormControl(this.ciesEntryModel.lastArrivalYear),
        permitRemainDay: new FormControl(this.ciesEntryModel.permitRemainDay),
        permitRemainMonth: new FormControl(this.ciesEntryModel.permitRemainMonth),
        permitRemainYear: new FormControl(this.ciesEntryModel.permitRemainYear),
        schoolName: new FormControl(this.ciesEntryModel.schoolName),
        city: new FormControl(this.ciesEntryModel.city),
        periodOfStudyFromMonth: new FormControl(this.ciesEntryModel.periodOfStudyFromMonth),
        periodOfStudyFromYear: new FormControl(this.ciesEntryModel.periodOfStudyFromYear),
        periodOfStudyToMonth: new FormControl(this.ciesEntryModel.periodOfStudyToMonth),
        periodOfStudyToYear: new FormControl(this.ciesEntryModel.periodOfStudyToYear),
        prof: new FormControl(this.ciesEntryModel.prof),
        companyName: new FormControl(this.ciesEntryModel.companyName),
        companyAddress: new FormControl(this.ciesEntryModel.companyAddress),
        position: new FormControl(this.ciesEntryModel.positon),
        nature: new FormControl(this.ciesEntryModel.nature),
        annualIncome: new FormControl(this.ciesEntryModel.annualIncome),
        employmentFromMonth: new FormControl(this.ciesEntryModel.employmentFromMonth),
        employmentFromYear: new FormControl(this.ciesEntryModel.employmentFromYear),
        employmentToMonth: new FormControl(this.ciesEntryModel.employmentToMonth),
        employmentToYear: new FormControl(this.ciesEntryModel.employmentToYear),
        hasRefusedEntry: new FormControl(this.ciesEntryModel.hasRefusedEntry),
        refusedEntryDay: new FormControl(this.ciesEntryModel.refusedEntryDay),
        refusedEntryMonth: new FormControl(this.ciesEntryModel.refusedEntryMonth),
        refusedEntryYear: new FormControl(this.ciesEntryModel.refusedEntryYear),
        refusedEntryDetail: new FormControl(this.ciesEntryModel.refusedEntryDetail),
        hasRefusedPermit: new FormControl(this.ciesEntryModel.hasRefusedPermit),
        refusedPermitDay: new FormControl(this.ciesEntryModel.refusedPermitDay),
        refusedPermitMonth: new FormControl(this.ciesEntryModel.refusedPermitMonth),
        refusedPermitYear: new FormControl(this.ciesEntryModel.refusedPermitYear),
        refusedPermitDetail: new FormControl(this.ciesEntryModel.refusedPermitDetail),
        hasDeported: new FormControl(this.ciesEntryModel.hasDeported),
        deportedDay: new FormControl(this.ciesEntryModel.deportedDay),
        deportedMonth: new FormControl(this.ciesEntryModel.deportedMonth),
        deportedYear: new FormControl(this.ciesEntryModel.deportedYear),
        deportedDetail: new FormControl(this.ciesEntryModel.deportedDetail),
        hasCriminal: new FormControl(this.ciesEntryModel.hasCriminal),
        chargeDetail: new FormControl(this.ciesEntryModel.chargeDetail),
        convictionDay: new FormControl(this.ciesEntryModel.convictionDay),
        convictionMonth: new FormControl(this.ciesEntryModel.convictionMonth),
        convictionYear: new FormControl(this.ciesEntryModel.convictionYear),
        convictionPlace: new FormControl(this.ciesEntryModel.convictionPlace),
        sentence: new FormControl(this.ciesEntryModel.sentence),
        refereeChiName: new FormControl(this.ciesEntryModel.refereeChiName),
        refereeEngSurName: new FormControl(this.ciesEntryModel.refereeEngSurName),
        refereeGivenName: new FormControl(this.ciesEntryModel.refereeGivenName),
        refereeSex: new FormControl(this.ciesEntryModel.refereeSex),
        refereeDobDay: new FormControl(this.ciesEntryModel.refereeDobDay),
        refereeDobMonth: new FormControl(this.ciesEntryModel.refereeDobMonth),
        refereeDobYear: new FormControl(this.ciesEntryModel.refereeDobYear),
        refereeHkIdValue1: new FormControl(this.ciesEntryModel.refereeHkIdValue1),
        refereeHkIdValue2: new FormControl(this.ciesEntryModel.refereeHkIdValue2),
        refereeNationality: new FormControl(this.ciesEntryModel.refereeNationality),
        refereeTravelDocType: new FormControl(this.ciesEntryModel.refereeTravelDocType),
        refereeTravelDocValue: new FormControl(this.ciesEntryModel.refereeTravelDocValue),
        refereeResidenceMonth: new FormControl(this.ciesEntryModel.refereeResidenceMonth),
        refereeResidenceYear: new FormControl(this.ciesEntryModel.refereeResidenceYear),
        refereeOccupation: new FormControl(this.ciesEntryModel.refereeOccupation),
        refereePhoneNo: new FormControl(this.ciesEntryModel.refereePhoneNo),
        refereePhoneExt: new FormControl(this.ciesEntryModel.refereePhoneExt),
        refereeAddressRoomValue: new FormControl(this.ciesEntryModel.refereeAddressRoomValue),
        refereeAddressFloorValue: new FormControl(this.ciesEntryModel.refereeAddressFloorValue),
        refereeAddressBlockValue: new FormControl(this.ciesEntryModel.refereeAddressBlockValue),
        refereeAddressBuildingValue: new FormControl(this.ciesEntryModel.refereeAddressBuildingValue),
        refereeAddressEstateValue: new FormControl(this.ciesEntryModel.refereeAddressEstateValue),
        refereeAddressStreetValue: new FormControl(this.ciesEntryModel.refereeAddressStreetValue),
        refereeAddressDistrict: new FormControl(this.ciesEntryModel.refereeAddressDistrict),
        refereeFaxNo: new FormControl(this.ciesEntryModel.refereeFaxNo),
        refereeEmail: new FormControl(this.ciesEntryModel.refereeEmail),
        relationship: new FormControl(this.ciesEntryModel.relationship),
        noReferee: new FormControl(this.ciesEntryModel.noReferee),
        accountType: new FormControl(this.ciesEntryModel.accountType),
        bankName: new FormControl(this.ciesEntryModel.bankName),
        openDay: new FormControl(this.ciesEntryModel.openDay),
        openMonth: new FormControl(this.ciesEntryModel.openMonth),
        openYear: new FormControl(this.ciesEntryModel.openYear),
        maturityDay: new FormControl(this.ciesEntryModel.maturityDay),
        maturityMonth: new FormControl(this.ciesEntryModel.maturityMonth),
        maturityYear: new FormControl(this.ciesEntryModel.maturityYear),
        currentBalance: new FormControl(this.ciesEntryModel.currentBalance),
        subTotalA: new FormControl(this.ciesEntryModel.subTotalA),
        estateDescription: new FormControl(this.ciesEntryModel.estateDescription),
        estatePurchaseDay: new FormControl(this.ciesEntryModel.estatePurchaseDay),
        estatePurchaseMonth: new FormControl(this.ciesEntryModel.estatePurchaseMonth),
        estatePurchaseYear: new FormControl(this.ciesEntryModel.estatePurchaseYear),
        estateCurrentValue: new FormControl(this.ciesEntryModel.estateCurrentValue),
        ifUnderMortgage1: new FormControl(this.ciesEntryModel.ifUnderMortgage1),
        ifUnderMortgage2: new FormControl(this.ciesEntryModel.ifUnderMortgage2),
        ifUnderMortgage3: new FormControl(this.ciesEntryModel.ifUnderMortgage3),
        estateMortgageAmount: new FormControl(this.ciesEntryModel.estateMortgageAmount),
        subTotalB: new FormControl(this.ciesEntryModel.subTotalB),
        assetsDescription: new FormControl(this.ciesEntryModel. assetsDescription),
        assetsQuantity: new FormControl(this.ciesEntryModel.assetsQuantity),
        assetsPurchaseDay: new FormControl(this.ciesEntryModel.assetsPurchaseDay),
        assetsPurchaseMonth: new FormControl(this.ciesEntryModel.assetsPurchaseMonth),
        assetsPurchaseYear: new FormControl(this.ciesEntryModel.assetsPurchaseYear),
        assetsCurrentValue: new FormControl(this.ciesEntryModel.assetsCurrentValue),
        subTotalC: new FormControl(this.ciesEntryModel.subTotalC),
        debtDescription: new FormControl(this.ciesEntryModel.debtDescription),
        debtAmount: new FormControl(this.ciesEntryModel.debtAmount),
        subTotalD: new FormControl(this.ciesEntryModel.subTotalD),
        netAssets: new FormControl(this.ciesEntryModel.netAssets),
        indication: new FormControl(this.ciesEntryModel.indication),
        realEstate: new FormControl(this.ciesEntryModel.realEstate),
        financialAssets: new FormControl(this.ciesEntryModel.financialAssets),
        investEstateType: new FormControl(this.ciesEntryModel.investEstateType),
        investEstatePurpose: new FormControl(this.ciesEntryModel.investEstatePurpose),
        investEstateRoomValue: new FormControl(this.ciesEntryModel.investEstateRoomValue),
        investEstateFloorValue: new FormControl(this.ciesEntryModel.investEstateFloorValue),
        investEstateBlockValue: new FormControl(this.ciesEntryModel.investEstateBlockValue),
        investEstateBuildingValue: new FormControl(this.ciesEntryModel.investEstateBuildingValue),
        investEstateEstateValue: new FormControl(this.ciesEntryModel.investEstateEstateValue),
        investEstateStreetValue: new FormControl(this.ciesEntryModel.investEstateStreetValue),
        investEstateDistrict: new FormControl(this.ciesEntryModel.investEstateDistrict),
        investEstatePurchaseDay: new FormControl(this.ciesEntryModel.investEstatePurchaseDay),
        investEstatePurchaseMonth: new FormControl(this.ciesEntryModel.investEstatePurchaseMonth),
        investEstatePurchaseYear: new FormControl(this.ciesEntryModel.investEstatePurchaseYear),
        investEstateValue: new FormControl(this.ciesEntryModel.investEstateValue),
        mortgageAmount: new FormControl(this.ciesEntryModel.mortgageAmount),
        investEstateAmount: new FormControl(this.ciesEntryModel.investEstateAmount),
        investEstateTotal: new FormControl(this.ciesEntryModel.investEstateTotal),
        investAssetsType: new FormControl(this.ciesEntryModel.investAssetsType),
        investAssetsDescription: new FormControl(this.ciesEntryModel.investAssetsDescription),
        investAssetsQuantity: new FormControl(this.ciesEntryModel.investAssetsQuantity),
        investAssetsPurchaseDay: new FormControl(this.ciesEntryModel.investAssetsPurchaseDay),
        investAssetsPurchaseMonth: new FormControl(this.ciesEntryModel.investAssetsPurchaseMonth),
        investAssetsPurchaseYear: new FormControl(this.ciesEntryModel.investAssetsPurchaseYear),
        investAssetsMaturityDay: new FormControl(this.ciesEntryModel.investAssetsMaturityDay),
        investAssetsMaturityMonth: new FormControl(this.ciesEntryModel.investAssetsMaturityMonth),
        investAssetsMaturityYear: new FormControl(this.ciesEntryModel.investAssetsMaturityYear),
        investAssetsAmount: new FormControl(this.ciesEntryModel.investAssetsAmount),
        equities: new FormControl(this.ciesEntryModel.equities),
        debtSecurities: new FormControl(this.ciesEntryModel.debtSecurities),
        depositsCert: new FormControl(this.ciesEntryModel.depositsCert),
        subordinatedDebt: new FormControl(this.ciesEntryModel.subordinatedDebt),
        investmentScheme: new FormControl(this.ciesEntryModel.investmentScheme),
        investAssetsTotal: new FormControl(this.ciesEntryModel.investAssetsTotal),
        ifAppointed: new FormControl(this.ciesEntryModel.ifAppointed),
        intermediaryType: new FormControl(this.ciesEntryModel.intermediaryType),
        intermediaryName: new FormControl(this.ciesEntryModel.intermediaryName),
        accountNo: new FormControl(this.ciesEntryModel.accountNo),
        contactPerson: new FormControl(this.ciesEntryModel.contactPerson),
        contactPersonPhoneNo: new FormControl(this.ciesEntryModel.contactPersonPhoneNo),
        
        
        

      
  
      }, {
        validator: [
          
        ]
      });
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

  ngOnDestroy(){

  }

 

}


