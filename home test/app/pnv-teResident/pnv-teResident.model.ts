export class PnvTeResident{



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
    documentName: string = '';
    documentType: string = '';
    documentDateDay: string = '';
    documentDateMonth: string = '';
    documentDateYear: string = '';
    documentPlace: string = '';
    documentCircumstance: string = '';

    /**formA part2 */
    arrivalDateDay: string = '';
    arrivalDateMonth: string = '';
    arrivalDateYear: string = '';
    arrivalNumber: string = '';
    arrivalLimitOfStayDay: string = '';
    arrivalLimitOfStayMonth: string = '';
    arrivalLimitOfStayYear: string = '';

    /**formA part3 */
    departureDateDay: string = '';
    departureDateMonth: string = '';
    departureDateYear: string = '';
    departureTime: string = '';
    departureDestination: string = '';
    departureNumber: string = '';
    
    /**formB part1 */
    documentMainlandName: string = '';
    documentDobDay: string = '';
    documentDobMonth: string = '';
    documentDobYear: string = '';
    sex: string = '';
    chinaIdno: string = '';
    

    /**formB part2 */
    documentMainlandType: string = '';
    documentdolDay: string = '';
    documentdolMonth: string = '';
    documentdolYear: string = '';
    documentMainlandPlace: string = '';
        
    static newInstance(): PnvTeResident {
        return new PnvTeResident();
    }





}