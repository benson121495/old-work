export class PnvStatusMainlandOfficial{



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
    sponsorType: string = '';
    companyChiName: string = '';
    companyEngName: string = '';
    businessRegistrationCertificateNo: string = '';
    companyEmail: string = '';
    companyAddressRoom: string = '';
    companyAddressFloor: string = '';
    companyAddressBlock: string = '';
    companyAddressBuilding: string = '';
    companyAddressEstate: string = '';
    companyAddressStreet: string = '';
    companyAddressDistrict: string = '';
    companyAuthorisedperson: string = '';
    companyDesignation: string = '';
    companyTel: string = '';
    companyExt: string = '';
    companyFax: string = '';
    individualChiName: string = '';
    individualEngSurname: string = '';
    individualEngGivenNames: string = '';
    individualSex: string = '';
    individualDobday: string = '';
    individualDobmonth: string = '';
    individualDobyear: string = '';
    individualHkIdno1: string = '';
    individualHkIdno2: string = '';
    individualNationality: string = '';
    individualRelationship: string = '';
    individualOccupation: string = '';
    individualSponsorCurrentLimitStay: string = '';
    individualEmail: string = '';
    individualAddressRoom: string = '';
    individualAddressFloor: string = '';
    individualAddressBlock: string = '';
    individualAddressBuilding: string = '';
    individualAddressEstate: string = '';
    individualAddressStreet: string = '';
    individualAddressDistrict: string = '';
    individualTel: string = '';
    individualExt: string = '';
    individualFax: string = '';
    individualMonthlyIncome: string = '';
    individualTotalAssetValue: string = '';

    /**form part2 */
    applicantChiName: string = '';
    applicantEngSurname: string = '';
    applicantEngGivenNames: string = '';
    applicantSex: string = '';
    applicantDobday: string = '';
    applicantDobmonth: string = '';
    applicantDobyear: string = '';
    applicantPurposeOfComingToHk: string = '';
    applicantOthers: string = '';
    

    static newInstance(): PnvStatusMainlandOfficial {
        return new PnvStatusMainlandOfficial();
    }





}