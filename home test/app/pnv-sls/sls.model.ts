export class Sls {



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
    presentAddress: string = '';
    permanentAddress: string = '';

    //formA - part2
    proposedEntryDay:  string = '';
    proposedEntryMonth:  string = '';
    proposedEntryYear: string = '';
    proposedDurationMonth: string = '';
    proposedDurationYear: string = '';

    //formA - part3
    schoolName: string = '';
    major: string = '';
    qualification: string = '';
    periodOfStudyFromMonth: string = '';
    periodOfStudyFromYear: string = '';
    periodOfStudyToMonth: string = '';
    periodOfStudyToYear: string = '';
    
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

    //formB -part1
    appCompanyName: string = '';
    contactPerson: string = '';
    appCompanyEmail: string = '';
    website: string = '';
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

    //formB -part2
    staffingPositionAtDay: string = '';
    staffingPositionAtMonth: string = '';
    staffingPositionAtYear: string = '';
    noOfStaff: string = '';

    //formB -part3
    employeeChiName: string = '';
    employeeEngName: string = '';
    postTitle: string = '';
    salary: string = '';
    fringeBenefit: string = '';
    jobDuty: string = '';
    workingAddress: string = '';
    newAddressRoomValue: string = '';
    newAddressFloorValue: string = '';
    newAddressBlockValue: string = '';
    newAddressBuildingValue: string = '';
    newAddressEstateValue: string = '';
    newAddressStreetValue: string = '';
    newAddressDistrict: string = '';

    // formb -part4
    refNo: string = '';
    approvalDay: string = '';
    approvalMonth: string = '';
    approvalYear: string = '';




    appDay: string = '';
    appMonth: string = '';
    appYear: string = '';
    appResult: string = '';

   




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


    static newInstance(): Sls {
        return new Sls();
    }





}
