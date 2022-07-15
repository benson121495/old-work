export class PnvTermEmp{



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

    date: string = '';
    visaRef: string = '';
    emplopmentContractNo: string ='';

    employerName: string ='';
    employerHkidNo: string ='';
    employerAddress: string ='';
    employerDayTimePhoneNo: string ='';

    employeeName: string ='';
    employeeHkidNo: string ='';
    employeeAddress: string ='';
    employeeDayTimePhoneNo: string ='';
    contractTermDate: string ='';

    //Supplymentary Information
    reasonForTermination: string ='';

    static newInstance(): PnvTermEmp {
        return new PnvTermEmp();
    }





}