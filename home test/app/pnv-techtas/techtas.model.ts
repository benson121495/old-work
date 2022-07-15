export class Techtas {



    // Common-Details
    modifyBy: string = 'W';

    // Choose-form
    chooseYes: boolean;
    chooseNo: boolean;
    appId: string = '';

    generalAmt: string = '';
    particularAmt: string = '';
    normalAmt: string = '';

    searchType: string = '';
    
    chiName: string = '';
    maidenSurName: string = '';
    engSurName: string = '';
    engGivenName: string = '';
    alias: string = '';
    sex: string = '';
    dobDay: string = '';
    dobMonth: string = '';
    dobYear: string = '';
    placeOfBirth: string = '';
    nationality: string = '';
    maritalStatus: string = '';
    hkIdValue1: string = '';
    hkIdValue2: string = '';
    mainlandIdNo: string = '';
    travelDocType: string = '';
    travelDocValue: string = '';
    travelDocIssuePlace: string = '';
    travelDocIssueDay: string = '';
    travelDocIssueMonth: string = '';
    travelDocIssueYear: string = '';
    travelDocExpDay: string = '';
    travelDocExpMonth: string = '';
    travelDocExpYear: string = '';
    email: string = '';
    phoneNo: string = '';
    faxNo: string = '';
    domicileCountry: string = '';
    hasPermanentResidence: string = '';
    residenceMonth: string = '';
    residenceYear: string = '';
    presentAddress1: string = '';
    presentAddress2: string = '';
    presentAddress3: string = '';
    permanentAddress1: string = '';
    permanentAddress2: string = '';
    permanentAddress3: string = '';
    schoolName: string = '';
    major: string = '';
    degreeObtain: string = '';
    peroidOfStudy: string = '';
    periodOfStudyToMonth: string = '';
    periodOfStudyToYear: string = '';
    periodOfStudyFromMonth: string = '';
    periodOfStudyFromYear: string = '';
    qualification: string = '';
    issueOrg: string = '';
    qualificationIssueDay: string = '';
    qualificationIssueMonth: string = '';
    qualificationIssueYear: string = '';
    employmentFromMonth: string = '';
    employmentFromYear: string = '';
    employmentToMonth: string = '';
    employmentToYear: string = '';
    companyName: string = '';
    companyAddress: string = '';
    position: string = '';
    nature: string = '';
    noOfDependant: string = '';
    dependantEngSurName: string = '';
    dependantEngGivenName: string = '';
    dependantChiName: string = '';
    dependantAlias: string = '';
    dependantSex: string = '';
    dependantDobDay: string = '';
    dependantDobMonth: string = '';
    dependantDodYear: string = '';
    dependantPlaceOfBirth: string = '';
    dependantNationality: string = '';
    dependantRelationship: string = '';
    dependantMaritalStatus: string = '';
    dependantTravelDocType: string = '';
    dependantTravelDocValue: string = '';
    dependantHkIdValue1: string = '';
    dependantHkIdValue2: string = '';
    dependantDomicileCountry: string = '';
    dependantHasPermanentResidence: string = '';

    //formB
    appCompanyName: string = '';
    contactPerson: string = '';
    appCompanyEmail: string = '';
    appCompanyWebsite: string = '';
    appCompanyRoomValue: string = '';
    appCompanyFloorValue: string = '';
    appCompanyBlockValue: string = '';
    appCompanyBuildingValue: string = '';
    appCompanyEstateValue: string = '';
    appCompanyStreetValue: string = '';
    appCompanyDistrict: string = '';
    correspondenceAddressRoomValue: string = '';
    correspondenceAddressFloorValue: string = '';
    correspondenceAddressBlockValue: string = '';
    correspondenceAddressBuildingValue: string = '';
    correspondenceAddressEstateValue: string = '';
    correspondenceAddressStreetValue: string = '';
    correspondenceAddressDistrict: string = '';
    appCompanyPhoneNo: string = '';
    appCompanyPhoneExt: string = '';
    appCompanyFaxNo: string = '';    
    businessRegNo: string = '';
    ifSubsidiary: string = '';
    parentCompanyName: string = '';
    parentCompanyAddress1: string = '';
    parentCompanyAddress2: string = '';
    parentCompanyAddress3: string = '';
    employeeEngSurName: string = '';
    employeeEngGivenName: string = '';
    ifConductResearch: string = '';
    postTitle: string = '';
    areaEngage: string = '';
    monthlySalary: string = '';
    fringeBenefit: string = '';
    fringeBenefitValue: string = '';
    packageTotalValue: string = '';
    jobDuty: string = '';
    employerSkill: string = '';
    itcRefNo: string = '';
    quotaValidDay: string = '';
    quotaValidMonth: string = '';
    quotaValidYear: string = '';
    serialNo: string = '';



    //Lunar Related entries
    lunarLeap: string = '';
    gregorianDOB: string = '';

    // Results
    ern: string = '';
    trn: string = '';
    arn: string = '';
    collectionDate: Date;
    transactionDateTime: string;
    applicationDateTime: string;


    /** Set Address */
    appAddr1 = '';
    appAddr2 = '';
    appAddr3 = '';
    appAddr4 = '';
    appAddr5 = '';
    appAddr6 = '';
    totalAddress = '';

    //Payment info
    payRefNum: string = '';
    ppsRefNum: string = '';
    payMethod: string = '';
    payStatus: string = '';
    paidAmount: string = '';

    // HkId for Tiff
    hkidValueAlpha: string = '';
    hkidValueDigit: string = '';
    hkidValueAppAlpha: string = '';
    hkidValueAppDigit: string = '';

    birthFullAddr: string = '';

    paymentStatus: string = '';

    paymentTRN: string = '';

    paymentDetails: any;

    officeVO: any;

    amount: string = '';

    // ? Collection Date
    collectionDateEng: string;
    collectionDateCN: string;
    collectionDateHK: string;

    // ? Application Date 
    applicationDateTimeEng: string;
    applicationDateTimeCN: string;
    applicationDateTimeHK: string;

    // ? Transaction Date
    transactionDateTimeEng: string;
    transactionDateTimeHK: string;
    transactionDateTimeCN: string;
    appDate: string;

    //Tiff additional info
    additionalInfoSplit: string;


    static newInstance(): Techtas {
        return new Techtas();
    }





}
