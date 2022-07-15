export class PnvChnResident2Twn{



    // Common-Details
    modifyBy: string = 'W';

    // Choose-form
    chooseYes: boolean;
    chooseNo: boolean;
    appId: string = '';

    generalAmt: string = '';
    particularAmt: string = '';
    normalAmt: string = '';

    /**
     * Notication of Termination of Employment Contract with Foreign Domestic Helper
     * Variables for app id XX
     */
    /**form part1 */
    permitType: string = '';
    applicationType: string = '';
    
    /**form part2 */
    chiName: string = '';
    maidenSurname: string = '';
    engSurname: string = '';
    engGivenNames: string = '';
    aliasInChi: string = '';
    aliasInEngSurname: string = '';
    aliasInEngGivenNames: string = '';
    sex: string = '';
    dobday: string = '';
    dobmonth: string = '';
    dobyear: string = '';
    pob: string = '';
    maritalStatus: string = '';
    type: string = '';
    number: string = '';
    doiDay: string = '';
    doiMonth: string = '';
    doiYear: string = '';
    doeDay: string = '';
    doeMonth: string = '';
    doeYear: string = '';
    poi: string = '';
    addressRoom: string = '';
    addressFloor: string = '';
    addressBlock: string = '';
    addressBuilding: string = '';
    addressEstate: string = '';
    addressStreet: string = '';
    addressDistrict: string = '';
    twIdno: string = '';
    hkidno1: string = '';
    hkidno2: string = '';
    occupation: string = '';
    email: string = '';
    contactTelephoneNo: string = '';
    ext: string = '';
    
    static newInstance(): PnvChnResident2Twn {
        return new PnvChnResident2Twn();
    }





}