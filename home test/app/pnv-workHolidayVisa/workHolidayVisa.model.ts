export class WorkHolidayVisa {



    // Common-Details
    modifyBy: string = 'W';

    // Choose-form
    chooseYes: boolean;
    chooseNo: boolean;
    appId: string = '';

    generalAmt: string = '';
    particularAmt: string = '';
    normalAmt: string = '';

    //Personal Particulars
    chiName: string = '';
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
    placeOfBirth: string = '';
    maritalStatus: string = '';
    single: string = '';
    married: string = '';
    separated: string = '';
    divorced: string = '';
    widowed: string = '';
    hkIdNo: string = '';
    hkIdValue1: string = '';
    hkIdValue2: string = '';
    nationality: string = '';
    occupation: string = '';

    travelDocHeld: string = '';
    travelDocType:string = '';
    passport: string= '';
    reEntryPermit: string= '';
    certOfIdentity: string= '';
    affidavit: string= '';
    prcTravelPermit: string= '';
    exitEntryPermit: string= '';
    travelDocValue: string= "";
    travelDocIssuePlace: string = '';
    travelDocIssueDay: string = '';
    travelDocIssueMonth: string = '';
    travelDocIssueYear: string = '';
    travelDocExpDay: string = '';
    travelDocExpMonth: string = '';
    travelDocExpYear:string = '';
    
    phoneNo: string = '';
    phoneExt: string = '';
    faxNo: string = '';
    email: string= '';
    presentAddress1: string= '';
    presentAddress2: string= '';
    presentAddress3: string= '';
    permanentAddress1: string= '';
    permanentAddress2: string= '';
    permanentAddress3: string= '';
    
    educationLv: string = '';
    uniOrAbove: string = '';
    postSec: string = '';
    sec: string = '';
    prim: string = '';
    belowPrim: string = '';

    //Particulars of Referee in HK
    refereeChiName: string = '';
    refereeEngSurName: string = '';
    refereeEngGivenName: string = '';
    refereeSexType: string = '';
    refereeDobDay: string = '';
    refereeDobMonth: string = '';
    refereeDobYear: string = '';
    refereeHkIdNo: string = '';
    refereeAddress: string = '';
    refereePhoneNo: string = '';
    refereePhoneExt: string = '';
    refereeFax: string = '';
   
    static newInstance(): WorkHolidayVisa {
        return new WorkHolidayVisa();
    }


}
