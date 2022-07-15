export class PnvEntryTwnSingle{



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
    airlineReferenceNo: string = '';

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
    twidno: string = '';
    durationInTw: string = '';
    travelDocType: string = '';
    travelDocNumber: string = '';
    travelDocPoi: string = '';
    travelDocDoiDay: string = '';
    travelDocDoiMonth: string = '';
    travelDocDoiYear: string = '';
    travelDocDoeDay: string = '';
    travelDocDoeMonth: string = '';
    travelDocDoeYear: string = '';
    travelDocDoeReEntryDay: string = '';
    travelDocDoeReEntryMonth: string = '';
    travelDocDoeReEntryYear: string = '';
    presentAddress1: string = '';
    presentAddress2: string = '';
    presentAddress3: string = '';
    presentAddress4: string = '';
    podAddress1: string = '';
    podAddress2: string = '';
    podAddress3: string = '';
    podAddress4: string = '';
    occupation: string = '';
    employerName: string = '';
    employerAddress: string = '';
    maritalStatus: string = '';
    spouseChiName: string = '';
    spouseEngName: string = '';
    spouseOccupation: string = '';
    visitReason: string = '';
    proposedDuration: string = '';
    
    /**form part3 */
    refereeChiName: string = '';
    refereeEngSurname: string = '';
    refereeEngGivenNames: string = '';
    refereeSex: string = '';
    refereeDobDay: string = '';
    refereeDobMonth: string = '';
    refereeDobYear: string = '';
    refereeHkid1: string = '';
    refereeHkid2: string = '';
    refereeContactTelephoneNo: string = '';
    refereeEmail: string = '';
    refereeResidentialAddressRoom: string = '';
    refereeResidentialAddressFloor: string = '';
    refereeResidentialAddressBlock: string = '';
    refereeResidentialAddressBuilding: string = '';
    refereeResidentialAddressEstate: string = '';
    refereeResidentialAddressStreet: string = '';
    refereeResidentialAddressDistrict: string = '';
    refereeOccupation: string = '';
    refereeOfficeTelephoneNo: string = '';
    refereeExt: string = '';
    refereeBusinessAddressRoom: string = '';
    refereeBusinessAddressFloor: string = '';
    refereeBusinessAddressBlock: string = '';
    refereeBusinessAddressBuilding: string = '';
    refereeBusinessAddressEstate: string = '';
    refereeBusinessAddressStreet: string = '';
    refereeBusinessAddressDistrict: string = '';

    
    static newInstance(): PnvEntryTwnSingle {
        return new PnvEntryTwnSingle();
    }





}