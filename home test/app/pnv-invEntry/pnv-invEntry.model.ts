export class PnvInvEntry{



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
    //formA
    /**formA part1 */
    applicantChiName: string = '';
    applicantChiMaidenSurname: string = '';
    applicantEngSurName: string = '';
    applicantEngGivenName: string = '';
    applicantAlias: string = '';
    applicantSex: string = '';
    applicantDobDay: string = '';
    applicantDobMonth: string = '';
    applicantDobYear: string = '';
    applicantPlaceOfBirth: string = '';
    applicantNationality: string = '';
    applicantMaritalStatus: string = '';
    applicantHkidNo1: string = '';
    applicantHkidNo2: string = '';
    applicantTravelDocType: string = '';
    applicantTravelDocValue: string = '';
    applicantDoiDay: string = '';
    applicantDoiMonth: string = '';
    applicantDoiYear: string = '';
    applicantDoeDay: string = '';
    applicantDoeMonth: string = '';
    applicantDoeYear: string = '';
    applicantTravelDocIssuePlace: string = '';
    applicantEMail: string = '';
    applicantPhoneNo: string = '';
    applicantFaxNo: string = '';
    applicantCountry: string = '';
    applicantAcquiredPermanentResidence: string = '';
    applicantLengthOfYears: string = '';
    applicantLengthOfMonths: string = '';
    applicantCurrentStaying: string = '';
    applicantPDDay: string = '';
    applicantPDMonth: string = '';
    applicantPDYear: string = '';
    applicantStatus: string = '';
    applicantStatusOthers: string = '';
    presentAddress1: string = '';
    presentAddress2: string = '';
    presentAddress3: string = '';
    presentAddress4: string = '';
    permanentAddress1: string = '';
    permanentAddress2: string = '';
    permanentAddress3: string = '';
    permanentAddress4: string = '';

    /**formA part2 */
    applicantProposedDateOfEntryDay: string = '';
    applicantProposedDateOfEntryMonth: string = '';
    applicantProposedDateOfEntryYear: string = '';
    applicantProposedDuration: string = '';

    /**formA part3 */
    dependantsNo: string = '';
    dependantEngSurName: string = '';
    dependantEngGivenName: string = '';
    dependantChiName: string = '';
    dependantAlias: string = '';
    dependantSex: string = '';
    dependantDobDay: string = '';
    dependantDobMonth: string = '';
    dependantDobYear: string = '';    
    dependantPlaceOfBirth: string = '';
    dependantNationality: string = '';
    dependantRelationship: string = '';
    dependantMaritalStatus: string = '';
    dependantTravelDocType: string = '';
    dependantTravelDocValue: string = '';
    dependantMainlandidNo: string = '';
    dependantCurrentStaying: string = '';
    dependantPDDay: string = '';
    dependantPDMonth: string = '';
    dependantPDYear: string = '';
    dependantStatus: string = '';
    dependantStatusOthers: string = '';
    dependantHkidNo1: string = '';
    dependantHkidNo2: string = '';
    dependantCountry: string = '';
    dependentAcquiredPermanentResidence: string = '';

    /**formA part4 */
    nameOfSchool1: string = '';
    majorSubject1: string = '';
    degree1: string = '';
    fromMonth1: string = '';
    fromYear1: string = '';
    toMonth1: string = '';
    toYear1: string = '';
    nameOfSchool2: string = '';
    majorSubject2: string = '';
    degree2: string = '';
    fromMonth2: string = '';
    fromYear2: string = '';
    toMonth2: string = '';
    toYear2: string = '';
    nameOfSchool3: string = '';
    majorSubject3: string = '';
    degree3: string = '';
    fromMonth3: string = '';
    fromYear3: string = '';
    toMonth3: string = '';
    toYear3: string = '';
    nameOfSchool4: string = '';
    majorSubject4: string = '';
    degree4: string = '';
    fromMonth4: string = '';
    fromYear4: string = '';
    toMonth4: string = '';
    toYear4: string = '';
    professional1: string = '';
    issuingAuthority1: string = '';
    applicantProfessionalDay1: string = '';
    applicantProfessionalMonth1: string = '';
    applicantProfessionalYear1: string = '';
    professional2: string = '';
    issuingAuthority2: string = '';
    applicantProfessionalDay2: string = '';
    applicantProfessionalMonth2: string = '';
    applicantProfessionalYear2: string = '';
    professional3: string = '';
    issuingAuthority3: string = '';
    applicantProfessionalDay3: string = '';
    applicantProfessionalMonth3: string = '';
    applicantProfessionalYear3: string = '';
    professional4: string = '';
    issuingAuthority4: string = '';
    applicantProfessionalDay4: string = '';
    applicantProfessionalMonth4: string = '';
    applicantProfessionalYear4: string = '';

    /**formA part5 */
    nameAndAddressOfCompany1: string = '';
    position1: string = '';
    natureOfDuties1: string = '';
    employmentFromMonth1: string = '';
    employmentFromYear1: string = '';
    employmentToMonth1: string = '';
    employmentToYear1: string = '';
    nameAndAddressOfCompany2: string = '';
    position2: string = '';
    natureOfDuties2: string = '';
    employmentFromMonth2: string = '';
    employmentFromYear2: string = '';
    employmentToMonth2: string = '';
    employmentToYear2: string = '';
    nameAndAddressOfCompany3: string = '';
    position3: string = '';
    natureOfDuties3: string = '';
    employmentFromMonth3: string = '';
    employmentFromYear3: string = '';
    employmentToMonth3: string = '';
    employmentToYear3: string = '';
    nameAndAddressOfCompany4: string = '';
    position4: string = '';
    natureOfDuties4: string = '';
    employmentFromMonth4: string = '';
    employmentFromYear4: string = '';
    employmentToMonth4: string = '';
    employmentToYear4: string = '';

    /**formA part6 */
    governmentBackedProgramme: string ='';
    nameOfSupporingOrganisation: string ='';
    nameOfProgramme: string ='';
    nameOfCompany: string ='';
    companyEstablismentDateDay: string = '';
    companyEstablismentDateMonth: string = '';
    companyEstablismentDateYear: string = '';
    companyType: string ='';
    nameOfParentCompany: string ='';
    capital: string ='';
    authorisedCapital: string ='';
    paidUpCapital: string ='';
    shareholders: string ='';
    directorNo: string ='';
    directorName: string ='';
    directorHkid1: string ='';
    directorHkid2: string ='';
    isOfficeExist: string ='';
    areaSize: string ='';
    monthlyRent: string ='';
    purchasePrice: string ='';
    addressRoom: string ='';
    addressFloor: string ='';
    addressBlock: string ='';
    addressBuilding: string ='';
    addressEstate: string ='';
    addressStreet: string ='';
    addressDistrict: string ='';
    industry: string ='';
    service: string ='';
    trading: string ='';
    othersPleaseState: string ='';
    modeOfOperation: string ='';
    companyCurrentAccount: string ='';
    companySavingsAccount: string ='';
    companyTimeDepositAccount: string ='';
    companyBankFinancing: string ='';
    companyProfitsTax: string ='';
    applicantCurrentAccount: string ='';
    applicantSavingsAccount: string ='';
    applicantTimeDepositAccount: string ='';
    applicantOverdraft: string ='';
    existingStaffInHkNo: string ='';
    existingStaffoutsideHkNo: string ='';
    staffAndPostInHkInComingYear: string ='';
    businessConnectionsHk: string ='';
    businessConnectionsOverseas: string ='';
    cooperationWithLocalManufacturers: string ='';
    turnoverAsAtLastMonth: string ='';
    estimatedTurnoverInTheComingYear: string ='';
    commencementOfBusinessDateDay: string = '';
    commencementOfBusinessDateMonth: string = '';
    commencementOfBusinessDateYear: string = '';
    amountOfCapitalInvestedInHk: string = '';
    postsCreatedNo: string = '';
    createdPostTitle: string = '';
    createdMonthlySalary: string = '';
    createdPostsNo: string = '';
    estimatedAmountOfCapitalInHkInTheComing2Years: string = '';
    estimatedPostNoInTheComing2Years: string = '';
    estimatedPostTitle: string = '';
    estimatedMonthlySalary: string = '';
    estimatedPostNoWithPostTitleInTheComing2Years: string = '';
    introduction: string = '';
    otherContribution: string = '';

    //formB
    /**formB part1 */
    BapplicantChiName: string = '';
    applicantEngName: string = '';

    /**part2 */
    selection: string = '';
    nameOfTheCompany: string = '';
    businessRegistrationCertificateNo: string = '';
    contactTelephoneNo: string = '';
    ext: string = '';
    companyAddress: string = '';
    faxNo: string = '';
    authorisedPerson: string = '';
    postTitle: string = '';
    email: string = '';
    website: string = '';
    companyAddressRoom: string ='';
    companyAddressFloor: string ='';
    companyAddressBlock: string ='';
    companyAddressBuilding: string ='';
    companyAddressEstate: string ='';
    companyAddressStreet: string ='';
    companyAddressDistrict: string ='';
    nameChinese: string = '';
    SurnameEnglish: string = '';
    GivenNamesEnglish: string = '';
    sex: string = '';
    day: string = '';
    month: string = '';
    year: string = '';
    HkidNo1: string = '';
    HkidNo2: string = '';
    nationality: string = '';
    individualEmail: string = '';
    occupation: string = '';
    individualFaxNo: string = '';
    relationshipApplicant: string = '';
    individualContactTelephoneNo: string = '';
    correspondenceAddressRoom: string ='';
    correspondenceAddressFloor: string ='';
    correspondenceAddressBlock: string ='';
    correspondenceAddressBuilding: string ='';
    correspondenceAddressEstate: string ='';
    correspondenceAddressStreet: string ='';
    correspondenceAddressDistrict: string ='';


    static newInstance(): PnvInvEntry {
        return new PnvInvEntry();
    }





}