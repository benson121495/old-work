export class PnvMfds{



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
    /**formA part1 */
    applicantChiName: string = '';
    applicantEngSurname: string = '';
    applicantEngGivenNames: string = '';
    applicantChiAlias: string = '';
    applicantEngAliasSurname: string = '';
    applicantEngAliasGivenNames: string = '';
    sex: string = '';
    applicantBodday: string = '';
    applicantBodmonth: string = '';
    applicantBodyear: string = '';
    applicantBop: string = '';
    cardNo: string = '';
    applicantIop: string = '';
    applicantIodday: string = '';
    applicantIodmonth: string = '';
    applicantIodyear: string = '';
    applicantEodday: string = '';
    applicantEodmonth: string = '';
    applicantEodyear: string = '';
    applicantAddress1: string = '';
    applicantAddress2: string = '';
    applicantAddress3: string = '';
    applicantAddress4: string = '';
    applicantAppliedNo: string = '';
    
    /**formA part2 */
    boatNo: string = '';
    fileNo: string = '';
    sponsor1ChiName: string = '';
    sponsor1EngName: string = '';
    sponsor1Bodday: string = '';
    sponsor1Bodmonth: string = '';
    sponsor1Bodyear: string = '';
    sponsor1HkidNo1: string = '';
    sponsor1HkidNo2: string = '';
    sponsor1AddressRoom: string = '';
    sponsor1AddressFloor: string = '';
    sponsor1AddressBlock: string = '';
    sponsor1AddressBuilding: string = '';
    sponsor1AddressEstate: string = '';
    sponsor1AddressStreet: string = '';
    sponsor1AddressDistrict: string = '';
    sponsor1HomeTel: string = '';
    sponsor1ContactAddressRoom: string = '';
    sponsor1ContactAddressFloor: string = '';
    sponsor1ContactAddressBlock: string = '';
    sponsor1ContactAddressBuilding: string = '';
    sponsor1ContactAddressEstate: string = '';
    sponsor1ContactAddressStreet: string = '';
    sponsor1ContactAddressDistrict: string = '';
    sponsor1Tel: string = '';
    sponsor2ChiName: string = '';
    sponsor2EngName: string = '';
    sponsor2Bodday: string = '';
    sponsor2Bodmonth: string = '';
    sponsor2Bodyear: string = '';
    sponsor2HkidNo1: string = '';
    sponsor2HkidNo2: string = '';
    sponsor2AddressRoom: string = '';
    sponsor2AddressFloor: string = '';
    sponsor2AddressBlock: string = '';
    sponsor2AddressBuilding: string = '';
    sponsor2AddressEstate: string = '';
    sponsor2AddressStreet: string = '';
    sponsor2AddressDistrict: string = '';
    sponsor2HomeTel: string = '';
    sponsor2ContactAddressRoom: string = '';
    sponsor2ContactAddressFloor: string = '';
    sponsor2ContactAddressBlock: string = '';
    sponsor2ContactAddressBuilding: string = '';
    sponsor2ContactAddressEstate: string = '';
    sponsor2ContactAddressStreet: string = '';
    sponsor2ContactAddressDistrict: string = '';
    sponsor2Tel: string = '';
    sponsorType: string = '';
    companyChiName: string = '';
    companyEngName: string = '';
    registeredNo: string = '';
    companyAddressRoom: string = '';
    companyAddressFloor: string = '';
    companyAddressBlock: string = '';
    companyAddressBuilding: string = '';
    companyAddressEstate: string = '';
    companyAddressStreet: string = '';
    companyAddressDistrict: string = '';
    authorisedPersonChiName: string = '';
    authorisedPersonEngName: string = '';
    authorisedPersonBodday: string = '';
    authorisedPersonBodmonth: string = '';
    authorisedPersonBodyear: string = '';
    authorisedPersonHkid1: string = '';
    authorisedPersonHkid2: string = '';
    authorisedPersonPosition: string = '';
    authorisedPersonTel: string = '';
    
    /**formB part1 */
    bapplicantChiName: string = '';
    bapplicantEngSurname: string = '';
    bapplicantEngGivenNames: string = '';
    bapplicantSex: string = '';
    bapplicantDobday: string = '';
    bapplicantDobmonth: string = '';
    bapplicantDobyear: string = '';
    bapplicantCurrentAddress1: string = '';
    bapplicantCurrentAddress2: string = '';
    bapplicantCurrentAddress3: string = '';
    bapplicantCurrentAddress4: string = '';
    bapplicantPosition: string = '';
    bapplicantStayLengthOfYear: string = '';
    bapplicantStayLengthOfMonth: string = '';
    bapplicantStayLengthOfDay: string = '';
    bapplicantStayPurpose: string = '';
    bapplicantAddressAfterArrivingRoom: string = '';
    bapplicantAddressAfterArrivingFloor: string = '';
    bapplicantAddressAfterArrivingBlock: string = '';
    bapplicantAddressAfterArrivingBuilding: string = '';
    bapplicantAddressAfterArrivingEstate: string = '';
    bapplicantAddressAfterArrivingStreet: string = '';
    bapplicantAddressAfterArrivingDistrict: string = '';
    bapplicantRelationship: string = '';
    bapplicantLengthOfYear: string = '';
    bapplicantLengthOfMonth: string = '';
    bapplicantRelativeName: string = '';
    bapplicantRelativeAddressRoom: string = '';
    bapplicantRelativeAddressFloor: string = '';
    bapplicantRelativeAddressBlock: string = '';
    bapplicantRelativeAddressBuilding: string = '';
    bapplicantRelativeAddressEstate: string = '';
    bapplicantRelativeAddressStreet: string = '';
    bapplicantRelativeAddressDistrict: string = '';
    bapplicantRelativeRelation: string = '';
    
    
    /**formB part2 */
    sponsorChiName: string = '';
    sponsorEngSurname: string = '';
    sponsorEngGivenNames: string = '';
    sponsorSex: string = '';
    sponsorDobday: string = '';
    sponsorDobmonth: string = '';
    sponsorDobyear: string = '';
    sponsorDop: string = '';
    sponsorNationality: string = '';
    sponsorPassportNo: string = '';
    sponsorDurationYear: string = '';
    sponsorPosition: string = '';
    sponsorAddressRoom: string = '';
    sponsorAddressFloor: string = '';
    sponsorAddressBlock: string = '';
    sponsorAddressBuilding: string = '';
    sponsorAddressEstate: string = '';
    sponsorAddressStreet: string = '';
    sponsorAddressDistrict: string = '';
    sponsorTel: string = '';
    sponsorOfficeAddressRoom: string = '';
    sponsorOfficeAddressFloor: string = '';
    sponsorOfficeAddressBlock: string = '';
    sponsorOfficeAddressBuilding: string = '';
    sponsorOfficeAddressEstate: string = '';
    sponsorOfficeAddressStreet: string = '';
    sponsorOfficeAddressDistrict: string = '';
    sponsorOfficeTel: string = '';
    sponsorOfficeExt: string = '';
    
    
    static newInstance(): PnvMfds {
        return new PnvMfds();
    }





}