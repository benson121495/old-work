export class TransEndorseDH {



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
    chiSurName: string = '';
    chiGivenName: string = '';
    maidenSurName: string = '';
    engSurName: string = '';
    engGivenName: string = '';
    chiNameAlias: string = '';
    engSurNameAlias: string = '';
    engGivenNameAlias: string = '';
    sexType: string = '';
    male: string = '';
    female: string = '';
    dobDay: string = '';
    dobMonth: string = '';
    dobYear: string = '';
    nationality: string = '';
    placeOfBirth: string = '';
    isOtherNationality: string = '';
    otherNationality: string = '';
    otherNationalityAcquire: string = '';
    renunciateChinese: string = '';
    placeOfResidence: string = '';
    statusAtPlaceOfResidence: string = '';
    phoneNo: string = '';
    phoneExt: string = '';
    email: string = '';
    occupation: string = '';
    company: string = '';
    hkIdNo: string = '';
    lastArrivalDay: string = '';
    lastArrivalMonth: string = '';
    lastArrivalYear: string = '';
    permitRemainDay: string = '';
    permitRemainMonth: string = '';
    permitRemainYear: string = '';
    pagesFull: string = '';
    loss: string = '';
    others: string = '';
    travelDocType: string = '';
    travelDocValue: string = '';
    dateOfIssue: string = '';
    issueDay: string = '';
    issueMonth: string = '';
    issueYear: string = '';
    placeOfIssue: string = '';

    address1: string= '';
    address2: string= '';
    address3: string= '';
    address4: string= '';

    reasonForTransfer: string= '';
    //old


    calendarType: string = '';
    calendarTypeGreg: boolean;
    calendarTypeLun: boolean;


    hkIdValue1: string = '';
    hkIdValue2: string = '';

    fromDay: string = '';
    fromMonth: string = '';
    fromYear: string = '';

    toDay: string = '';
    toMonth: string = '';
    toYear: string = '';


    birthAddress: string = '';
    hospAddress: string = '';
    hospitalName: string = '';
    streetHospitalValue: string = '';
    areaHospital: string = '';
    districtValue: string = '';
    notHospAddress: string = '';
    roomValue: string = '';
    floorValue: string = '';
    blockValue: string = '';
    buildingValue: string = '';
    estateValue: string = '';
    streetValue: string = '';
    areaValue: string = '';
    district: string = '';
    districtHospital: string = '';
    otherinfoValue: string = '';
    chinFatherName: string = '';
    engFatherSurName: string = '';
    chinMotherName: string = '';
    engMotherSurName: string = '';
    midWifeName: string = '';

    regDay: string = '';
    regMonth: string = '';
    regYear: string = '';

    addInfo: string = '';
    entry: string = '';
    copies: string = '';
    hkAddRadio: string = '';

    // Applicant name
    applicantName: string = '';
    hkIdValueApp1: string = '';
    hkIdValueApp2: string = '';
    hkIdValueApp1Temp: string = '';
    hkIdValueApp2Temp: string = '';
    travelDocValueTemp: string = '';
    phoneVal: string = '';
    extValue: string = '';
    emailVal: string = '';
    roomValueApp: string = '';
    floorValueApp: string = '';
    blockValueApp: string = '';
    buildingValueApp: string = '';
    estateValueApp: string = '';
    streetValueApp: string = '';
    areaValueApp: string = '';
    districtValueApp: string = '';
    otherInfoValueapp: string = '';
    captcha: string = '';
    withinHK: string = '';
    outsideHK: string = '';
    hkBox: string = '';

    // Supplymentary Information
    applicationType: string = '';

    orgEngVal: string = '';
    orgChineseValue: string = '';
    phoneSuppVal: string = '';
    relationSuppValue: string = '';

    // Office
    officeValue: string = '';

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


    /**
     * Application for a Certified Copy of an Entry in the Births Register
     * Variables for app id 569, apart from commonly used ones.
     */
    dobYesDay: string = '';
    dobYesMonth: string = '';
    dobYesYear: string = '';

    supDocTypeC: string = '';
    supDocTypeS: string = '';
    supDocType: string = '';
    audit: string = '';
    appRefNum: string = '';
    birthRegNum: string = '';
    appRelate: string = '';

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


    static newInstance(): TransEndorseDH {
        return new TransEndorseDH();
    }





}
