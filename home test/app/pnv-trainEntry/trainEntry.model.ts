export class TrainEntry {



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
    
    //formA-part1
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
    travelDocType:  string = '';
    travelDocValue: string = '';
    placeOfIssue: string = '';
    travelDocIssueDay: string = '';
    travelDocIssueMonth: string = '';
    travelDocIssueYear: string = '';
    travelDocExpDay: string = '';
    travelDocExpMonth: string = '';
    travelDocExpYear: string = '';
    email:  string = '';
    phoneNo: string = '';
    faxNo: string = '';
    domicileCountry: string = '';
    hasPermanentResidence: string = '';
    residenceYear: string = '';
    residenceMonth: string = '';
    
    isStayingHK: string = '';
    permitRemainDay: string = '';
    permitRemainMonth: string = '';
    permitRemainYear: string = '';
    statusInHK: string = '';
    presentAddress: string = '';
    permanentAddress: string = '';

    //formA - part2
    proposedEntryDay:  string = '';
    proposedEntryMonth:  string = '';
    proposedEntryYear: string = '';
    proposedDuration: string = '';

    //formA - part3
    noOfdependant: string = '';
    dependantEngSurName: string = '';
    dependantEngGivenName: string = '';
    dependantChiName: string = '';
    dependantAlias: string = '';
    dependantSex: string = '';
    dependantDob: string = '';
    dependantPlaceOfBirth: string = '';
    dependantNationality: string = '';
    relationship: string = '';
    dependantMaritalStatus: string = '';
    dependantTravelDocType: string = '';
    dependantTravelDocValue: string = '';
    dependantHkIdValue1: string = '';
    dependantHkIdValue2: string = '';
    dependantMainlandIdNo: string = '';
    dependantIsStayingHK: string = '';
    dependantPermitRemainDay: string = '';
    dependantPermitRemainMonth: string = '';
    dependantPermitRemainYear: string = '';
    dependantStatus: string = '';
    dependantDomicileCountry: string = '';
    dependantHasPermanentResidence: string = '';

    //formA - part4
    schoolName: string = '';
    major: string = '';
    qualification: string = '';
    periodOfStudyFromMonth: string = '';
    periodOfStudyFromYear: string = '';
    periodOfStudyToMonth: string = '';
    periodOfStudyToYear: string = '';
    
    //formA - part5
    tech: string = '';
    profIssueOrg: string = '';
    profIssueDay: string = '';
    profIssueMonth: string = '';
    profIssueYear: string = '';
    companyName: string = '';
    companyAddress: string = '';
    position: string = '';
    duty: string = '';
    employmentFromDay: string = '';
    employmentFromMonth: string = '';
    employmentFromYear: string = '';
    employmentToDay: string = '';
    employmentToMonth: string = '';
    employmentToYear: string = '';


    fromDay: string = '';
    fromMonth: string = '';
    fromYear: string = '';

    toDay: string = '';
    toMonth: string = '';
    toYear: string = '';

    //formB -part1
    sponsorCompanyName: string = '';
    contactPerson: string = '';
    sponsorCompanyEmail: string = '';
    website: string = '';
    sponsorCompany: string = '';
    sponsorCompanyRoomValue: string = '';
    sponsorCompanyFloorValue: string = '';
    sponsorCompanyBlockValue: string = '';
    sponsorCompanyBuildingValue: string = '';
    sponsorCompanyEstateValue: string = '';
    sponsorCompanyStreetValue: string = '';
    sponsorCompanyDistrict: string = '';
    correspondenceAddressRoomValue: string = '';
    correspondenceAddressFloorValue: string = '';
    correspondenceAddressBlockValue: string = '';
    correspondenceAddressBuildingValue: string = '';
    correspondenceAddressEstateValue: string = '';
    correspondenceAddressStreetValue: string = '';
    correspondenceAddressDistrict: string = '';
    sponsorCompanyPhoneNo: string = '';
    sponsorCompanyPhoneExt: string = '';
    sponsorCompanyFaxNo: string = '';
    regNo: string = '';
    commencementDay: string = '';
    commencementMonth: string = '';
    commencementYear: string = '';

    nature: string = '';
    ifSubsidiary: string = '';
    parentCompanyName: string = '';
    parentCompanyAddress1: string = '';
    parentCompanyAddress2: string = '';
    parentCompanyAddress3: string = '';

    traineeName: string = '';
    traineeSurName: string = '';
    traineeGivenName: string = '';
    postTitle: string = '';
   
    salary: string = '';
    fringeBenefit: string = '';
    fringeBenefitValue: string = '';
    packageValue: string = '';
    trainingDetail: string = '';
    trainingAddress: string = '';
    newAddressRoomValue: string = '';
    newAddressFloorValue: string = '';
    newAddressBlockValue: string = '';
    newAddressBuildingValue: string = '';
    newAddressEstateValue: string = '';
    newAddressStreetValue: string = '';
    newAddressDistrict: string = '';
    justification: string = '';

    turnoverFromYear1: string = '';
    turnoverToYear1: string = '';
    turnover1: string = '';
    turnoverFromYear2: string = '';
    turnoverToYear2: string = '';
    turnover2: string = '';
    paidUp: string = '';

    staffingPositionAtDay: string = '';
    staffingPositionAtMonth: string = '';
    staffingPositionAtYear: string = '';


    localProf: string = '';
    nonLocalProf: string = '';
    localStaff: string = '';
    nonLocalStaff: string = '';



    ifSuccessfulObtain: string = '';
    employRefNo: string = '';
   

   




    regDay: string = '';
    regMonth: string = '';
    regYear: string = '';

    addInfo: string = '';
    entry: string = '';
    copies: string = '';
    hkAddRadio: string = '';

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


    static newInstance(): TrainEntry {
        return new TrainEntry();
    }





}
