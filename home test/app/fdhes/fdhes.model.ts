export class Fdhes{

    appType: string = ''
    currentStayStatus:string =''
    sponsorStatus:string=''
    // Common-Details
    modifyBy: string = 'W';

    // Choose-form
    chooseYes: boolean;
    chooseNo: boolean;
    appId: string = '';

    generalAmt: string = '';
    particularAmt: string = '';
    normalAmt: string = '';

	formSelected: string = '';
    emailKey: string = '';
    reEnterEmail: string = '';
	verCode: string = '';

    //form A
    lastestApplicationRefNo: string = '';
    isInHk: string = '';
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
    hkid: string = '';
    occupation: string = '';
    travelDocType: string = '';
    travelDocValue: string = '';
    placeOfIssue: string = '';
    travelDocIssueDay: string = '';
    travelDocIssueMonth: string = '';
    travelDocIssueYear: string = '';
    travelDocExpDay: string = '';
    travelDocExpMonth: string = '';
    travelDocExpYear: string = '';
    email: string = '';
    phoneNo: string = '';
    phoneExt: string = '';
    faxNo: string = '';
    employerName: string = '';
    employerAddress: string = '';     
    statusInHK: string = '';
    presentAddress: string = '';
    permanentAddress: string = '';
    proposedEntryDay: string = '';
    proposedEntryMonth: string = '';
    proposedEntryYear: string = '';
    proposedDuration: string = '';
    address: string = '';
    employmentPeriodFromMonth: string = '';
    employmentPeriodFromYear: string = '';
    employmentPeriodToMonth: string = '';
    employmentPeriodToYear: string = '';
    workingYear: string = '';
    workingMonth: string = '';
    currentStatus: string = '';
    others: string = '';
    permittedRemainDay: string = '';
    permittedRemainMonth: string = '';
    permittedRemainYear: string = '';
    purposeOfApplication: string = '';


    //form B
    employerChiName: string = '';
    employerEngSurName: string = '';
    employerEngGivenName: string = '';
    employerSex: string = '';
    employerDobDay: string = '';
    employerDobMonth: string = '';
    employerDobYear: string = '';
    employerHkIdValue1: string = '';
    employerHkIdValue2: string = '';
    employerNationality: string = '';
    employerOccupation: string = '';
    hasHkId: string = '';
    employerTravelDocType: string = '';
    employerTravelDocValue: string = '';
    employerResidentialRoomValue: string = '';
    employerResidentialFloorValue: string = '';
    employerResidentialBlockValue: string = '';
    employerResidentialBuildingValue: string = '';
    employerResidentialEstateValue: string = '';
    employerResidentialStreetValue: string = '';
    employerResidentialDistrict: string = '';
    employerCorrespondenceRoomValue: string = '';
    employerCorrespondenceFloorValue: string = '';
    employerCorrespondenceBlockValue: string = '';
    employerCorrespondenceBuildingValue: string = '';
    employerCorrespondenceEstateValue: string = '';
    employerCorrespondenceStreetValue: string = '';
    employerCorrespondenceDistrict: string = '';
    employerPhoneNo: string = '';
    employerPhoneExt: string = '';
    homeTelNo: string = '';
    employerFaxNo: string = '';
    employerEmail: string = '';
    helperName: string = '';
    fileRefNo: string = '';
    relatioshipWithHelper: string = '';
    empType: string = '';
    replacedHelperName: string = '';
    replacedHelperHkIdValue1: string = '';
    replacedHelperHkIdValue2: string = '';
    terminationDay: string = '';
    terminationMonth: string = '';
    terminatioYear: string = '';
    reasonForAddirional: string = '';
    livingArrg: string = '';
    deploymentDetail: string = '';
    arrangementAfterApproved: string = '';
    deferReason: string = "";
    ifIncomeLessThan15000: string = '';
    avgMonthlyIncome: string = '';
    noOfBedroom: string = '';
    ifSeparate: string = '';
    memberParticulars: string = '';
    memberName: string = '';
    memberDobYear: string = '';
    relationshipWithEmployer: string = '';
    memberHkIdValue1: string = '';
    memberHkIdValue2: string = '';
    currentHelperName: string = '';
    currentHelperHkIdValue1: string = '';
    currentHelperHkIdValue2: string = '';
    permitRemainDay: string = '';
    permitRemainMonth: string = '';
    permitRemainYear: string = '';
    employedBy: string = '';

    //DeclarationA
    undertakingA: string = '';
    agreementA: string = '';

    //DeclarationB   
    undertakingB: string = '';
    agreementB: string = '';
    

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


    static newInstance(): Fdhes{
        return new Fdhes();
    }





}
