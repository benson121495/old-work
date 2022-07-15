export class Visa {



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
    
    //formB
    appType: string = '';
    appCompanyName: string = '';
    regNo: string = '';
    appCompanyPhoneNo: string = '';
    appCompanyPhoneExt: string = '';
    appCompanyRoomValue: string = '';
    appCompanyFloorValue: string = '';
    appCompanyBlockValue: string = '';
    appCompanyBuildingValue: string = '';
    appCompanyEstateValue: string = '';
    appCompanyStreetValue: string = '';
    appCompanyDistrict: string = '';
    appCompanyFaxNo: string = '';
    contactPerson: string = '';
    post: string = '';
    appCompanyEmail: string = '';
    appCompanyWebsite: string = '';
    appIndivChiName: string = '';
    appIndivHkIdValue1: string = '';
    appIndivHkIdValue2: string = '';
    appIndiveEngSurName: string = '';
    appIndivEngGivenName: string = '';
    appIndivDobDay: string = '';
    appIndivDobMonth: string = '';
    appIndivDobYear: string = '';
    appIndivSex: string = '';
    appIndivNationality: string = '';
    appIndivOccupation: string = '';
    appIndivIncome: string = '';
    appIndivPhoneNo: string = '';
    appIndivAddressRoomValue: string = '';
    appIndivAddressFloorValue: string = '';
    appIndivAddressBlockValue: string = '';
    appIndivAddressBuildingValue: string = '';
    appIndivAddressEstateValue: string = '';
    appIndivAddressStreetValue: string = '';
    appIndivAddressDistrict: string = '';
    appIndivFaxNo: string = '';
    appIndivEmail: string = '';
    applicantRelationship: string = '';
    visitorChiName: string = '';
    visitorEngName: string = '';


    
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


    static newInstance(): Visa {
        return new Visa();
    }





}
