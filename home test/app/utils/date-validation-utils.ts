import { ValueTransformer } from "@angular/compiler/src/util";
import { FormControl, ValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";
import { DatePipe, getNumberOfCurrencyDigits } from "@angular/common";
import { MOMENT } from "angular-calendar";
import { months } from "moment";

// Criteria:
// 1. Must match regex masking
// 2. Must be of valid values including leap years
// 3. Must not be a future date
// 4. Year must be greater than 1800

export class DateValidationUtils {

    static DATE_FORMAT: string = "dd-MM-yyyy";
    private dateMaskDDMMYY = /^(\d{2})\-(\d{2})\-(\d{2})$/;
    private dateMaskDDYYYY = /^(\d{2})\-(\d{4})$/;
    private dateMaskDDMMYYYY = /^(\d{2})\-(\d{2})\-(\d{4})$/;
    private dateMaskMMYYYY = /^(\d{2})\-(\d{4})$/;


    //"dd-mm-yyyy" 
    static datePattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g;

    /*  ARN prefix which can use ROA
     *  RNCS	RNRF	RNVE
    */
    static ROA_PREFIXES: string[] = ["RNCS", "RNRF", "RNVE"];
    static yearPattern = /(?:(?:18|19|20)[0-9]{2})/;

    static yearsList: number[] = undefined;
    static yearsNext25List: number[] = undefined;
    static monthList: string[] = undefined;
    static defaultDayList: string[] = undefined;




    constructor() { }

    static parseDaytime(time) {
        let [hours, minutes] = time.substr(0, time.length - 2).split(':').map(Number);
        if (time.includes('PM') && hours !== 12) {
            hours += 12;
        }
        return 1000/*ms*/ * 60/*s*/ * (hours * 60 + minutes);
    }

    validateDate(inputDate, format) {
        if (!(this.checkIfNotEmpty(inputDate)) || !(this.checkIfNotEmpty(format)))
            return false;

        if (format == 'DD-MM-YYYY') {
            return this.validateDateDDMMYYYY(inputDate);
        } else if (format == 'DD-MM-YY') {
            if (inputDate.match(this.dateMaskDDMMYY)) {
                var year = inputDate.split("-")[2];
                var dateDDMMYYYY = "";
                if (year > 50)
                    dateDDMMYYYY = inputDate.split("-")[0] + inputDate.split("-")[1] + "19" + inputDate.split("-")[2];
                else
                    dateDDMMYYYY = inputDate.split("-")[0] + inputDate.split("-")[1] + "20" + inputDate.split("-")[2];
                return this.validateDateDDMMYYYY(dateDDMMYYYY);
            }
        } else if (format == 'DD-YYYY') {
            if (inputDate.match(this.dateMaskDDYYYY)) {
                var day = inputDate.split("-")[0];
                var year = inputDate.split("-")[1];
                return (day > 31 || day == 0) ? false : this.checkIfValidYear(year);
            }
        } else {
            return false;
        }
    }

    validateDateMarriage(inputDate, format) {
        if (!(this.checkIfNotEmpty(inputDate)) || !(this.checkIfNotEmpty(format)))
            return false;


        if (inputDate.length != 10 || !inputDate.match(this.dateMaskDDMMYYYY))
            return false;
        if (!this.checkIfValidDateForMarriage(inputDate))
            return false;

        return true;
    }

    validateDateMMYYYY(inputDate, format) {
        var today = new Date();
        var currDay = today.getDay();
        var currMonth = today.getMonth() + 1;
        var currYear = today.getFullYear();


        if (!(this.checkIfNotEmpty(inputDate)) || !(this.checkIfNotEmpty(format)))
            return false;

        if (format == 'MM-YYYY') {
            if (inputDate.match(this.dateMaskMMYYYY)) {
                var month = inputDate.split("-")[0];
                var year = inputDate.split("-")[1];
                return ((month > 12 || month == 0) || year > currYear || (month > currMonth && year == currYear)) ? false : this.checkIfValidYear(year);
            }
        }
    }

    private checkIfValidYear(year) {
        return (year < 1800 || year > new Date().getFullYear()) ? false : true;
    }

    private checkIfNotEmpty(field) {
        return (field === undefined || field === null || field === "") ? false : true;
    }

    public checkIfTodayDate(dateInput) {
        var today = new Date();
        var todayMonth = today.getMonth() + 1;
        var todayYYYYMMDD = today.getFullYear().toString() + todayMonth.toString().padStart(2, '0') + today.getDate().toString().padStart(2, '0');
        var inputYYYYMMDD = dateInput.split("-")[2] + dateInput.split("-")[1] + dateInput.split("-")[0];
        if (todayYYYYMMDD == inputYYYYMMDD)
            return true;
        else
            return false;
    }

    public getDate(inputDate, format) {
        if (inputDate != null) {
            if (format == 'DD-MM-YYYY') {
                var day = inputDate.split("-")[0];
                var month = inputDate.split("-")[1];
                var year = inputDate.split("-")[2];
                return day;
            }
        }
    }

    public getMonth(inputDate, format) {
        if (inputDate != null) {
            if (format == 'DD-MM-YYYY') {
                var month = inputDate.split("-")[1];
                return month;
            }
        }
    }

    static getYear(inputDate, format) {
        if (inputDate != null) {
            if (format == 'DD-MM-YYYY') {
                var year = inputDate.split("-")[2];
                return year;
            }
        }
    }

    /**
     * Date Format :  dd-mm-yyyy
     * @param control
     */
    static validateDateFormat(control: FormControl): { [key: string]: any } {
        if (control.value == '' || control.value == null) {
            return null;
        } else if (!control.value.match(DateValidationUtils.datePattern))
            return { "dateFormat": true };

        return null;
    }

    /**
     * 
     * @param control 
     */
    static validatePastDate(control: FormControl): { [key: string]: any } {

        //If format is invalid, return error
        if (DateValidationUtils.validateDateFormat(control) != null) {
            return { "dateCurrentOrFuture": true };
        }

        if (control.value != null) {

            let day = control.value.split("-")[0];
            let month = control.value.split("-")[1];
            month--;//Since gregorian calendar month starts with 0, decrement entered value with one.
            let year = control.value.split("-")[2];

            let inputDate = new Date(year, month, day);
            let currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            if (year < 1800) {
                return { "dateCurrentOrFuture": true };
            }
            if (inputDate >= currentDate)
                return { "dateCurrentOrFuture": true };
        }

        return null;
    }

    /**
   * 
   * @param control 
   */
    static validateFutureDate(control: FormControl): { [key: string]: any } {
        //If format is invalid, return error
        if (DateValidationUtils.validateDateFormat(control) != null) {
            return { "dateCurrentOrPast": true };
        }

        if (control.value != null) {

            let day = control.value.split("-")[0];
            let month = control.value.split("-")[1];
            month--;//Since gregorian calendar month starts with 0, decrement entered value with one.
            let year = control.value.split("-")[2];

            let inputDate = new Date(year, month, day);
            let currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            let comingThirdMonth = currentDate.getMonth() + 3;
            let comingThirdMonthDate = new Date(year, comingThirdMonth, day);

            if (inputDate < currentDate) {
                return { "dateCurrentOrPast": true };
            }
            // else if (inputDate <= comingThirdMonthDate) {
            //     return { "dateCurrentOrPast": true };
            // } 
            // else if (inputDate > currentDate) {
            //     return { "dateCurrentOrPast": false };
            // }
        }

        return null;
    }



    static isROA(arn: string) {
        let firstFourChars = arn.split("-")[0];
    }

    /**
     * Abishek *
     * To convert the UI string dd-mm-yyyy to date object 
     */
    static getDateObject(date: any) {
        if (date == null || date == '') {
            return null;
        }
        let day = date.split("-")[0];
        let month = date.split("-")[1];
        month--;//Since gregorian calendar month starts with 0, decrement entered value with one.
        let year: any = date.split("-")[2];

        let inputDate: Date;
        inputDate = new Date(year, month, day);

        return inputDate;


    }

    /**
     * Abishek *
     * To compare two dates whether equal, before or after
     * Assuming the format of both the dates are correct,
     * if not use the method "validateDateFormat".
     */
    static isBeforeDates(dateField1: string, dateField2: string): ValidatorFn {
        return (control: FormGroup): ValidationErrors | null => {
            let date1: Date = this.getDateObject(control.get(dateField1).value);
            let date2: Date = this.getDateObject(control.get(dateField2).value);


            if (date1 != null && date2 != null && date1 < date2) {
                return { "beforeDate": true };
            }

            return null;
        };
    };

    static isBeforeDeathDates(dateField1: string, dateField2: string): ValidatorFn {
        return (control: FormGroup): ValidationErrors | null => {
            let date1: Date = this.getDateObject(control.get(dateField1).value);
            let date2: Date = this.getDateObject(control.get(dateField2).value);


            if (date1 != null && date2 != null && date1 < date2) {
                return { "beforeDeathDate": true };
            }

            return null;
        };
    };

    static isAfterDates(dateField1: string, dateField2: string): ValidatorFn {
        return (control: FormGroup): ValidationErrors | null => {
            let date1: Date = this.getDateObject(control.get(dateField1).value);
            let date2: Date = this.getDateObject(control.get(dateField2).value);


            if (date1 != null && date2 != null && date1 > date2) {
                return { "afterDate": true };
            }

            return null;
        };
    };

    static isEqualDates(dateField1: string, dateField2: string): ValidatorFn {
        return (control: FormGroup): ValidationErrors | null => {
            let date1: Date = this.getDateObject(control.get(dateField1).value);
            let date2: Date = this.getDateObject(control.get(dateField2).value);


            if (date1 != null && date2 != null && date1 == date2) {
                return { "equalDate": true };
            }

            return null;
        };
    };

    static getDiffInDays(dateField1: string, dateField2: string): number {
        let date1: Date = this.getDateObject(dateField1);
        let date2: Date = this.getDateObject(dateField2);

        let diffDays: number;
        if (date1 != null && date2 != null) {
            diffDays = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);
        }


        return diffDays;

    }

    static parseDateFromCalendar(date: string): string {
        let dateSplitArray: string[] = date.substring(0, 10).split("-");
        return dateSplitArray[2] + "-" + dateSplitArray[1] + "-" + dateSplitArray[0];
    }

    static parseUTCDateFromResponse(date: string): string {
        let dateSplitArray: string[] = date.substring(0, 10).split("-");
        return dateSplitArray[0] + dateSplitArray[1] + dateSplitArray[2];
    }

    // tslint:disable-next-line: member-ordering
    static parseUTCDateFromDate(date: any): string {
        const today = date;
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();

        // tslint:disable-next-line: no-shadowed-variable
        let months = mm.toString();

        if (months.length < 2) { months = '0' + months; }
        return yyyy + '' + months + '' + dd;
    }

    /**
     * 
     * @param date Format 'dd-MM-yyyy'
     */
    static getDate(date: string) {
        let dateSplitArray: string[] = date.split("-");
        return new Date(dateSplitArray[2] + "-" + dateSplitArray[1] + "-" + dateSplitArray[0]);
    }







    validateDateAmendment(inputDate, format) {

        if (!(this.checkIfNotEmpty(inputDate)) || !(this.checkIfNotEmpty(format)))
            return false;

        if (format == 'DD-MM-YYYY') {
            return this.validateDateDDMMYYYYAmendment(inputDate);
        } else if (format == 'DD-MM-YY') {
            if (inputDate.match(this.dateMaskDDMMYY)) {
                var year = inputDate.split("-")[2];
                var dateDDMMYYYY = "";
                if (year > 50)
                    dateDDMMYYYY = inputDate.split("-")[0] + '-' + inputDate.split("-")[1] + '-' + "19" + inputDate.split("-")[2];
                else
                    dateDDMMYYYY = inputDate.split("-")[0] + '-' + inputDate.split("-")[1] + '-' + "20" + inputDate.split("-")[2];
                return this.validateDateDDMMYYYYAmendment(dateDDMMYYYY);
            }
        } else if (format == 'DD-YYYY') {
            if (inputDate.match(this.dateMaskDDYYYY)) {
                var day = inputDate.split("-")[0];
                var year = inputDate.split("-")[1];
                return (day > 31 || day == 0) ? false : this.checkIfValidYear(year);
            }
        } else {
            return false;
        }
    }

    public validateDateDDMMYYYY(dateInput) {
        if (dateInput.length != 10 || !dateInput.match(this.dateMaskDDMMYYYY))
            return false;
        if (!this.checkIfValidDate(dateInput))
            return false;
        if (!this.checkIfPastDate(dateInput))
            return false;
        return true;
    }

    private validateDateDDMMYYYYAmendment(dateInput) {
        if (dateInput.length != 10 || !dateInput.match(this.dateMaskDDMMYYYY))
            return false;
        if (!this.checkIfValidDate(dateInput))
            return false;
        return true;
    }

    private checkIfPastDate(dateInput) {
        var today = new Date();
        var todayMonth = today.getMonth() + 1;
        var todayYYYYMMDD = today.getFullYear().toString() + todayMonth.toString().padStart(2, '0')
            + today.getDate().toString().padStart(2, '0');
        var inputYYYYMMDD = dateInput.split("-")[2] + dateInput.split("-")[1] + dateInput.split("-")[0];

        if (todayYYYYMMDD < inputYYYYMMDD)
            return false;
        return true;
    }

    private checkIfValidDateForMarriage(inputDate) {
        var year = inputDate.split("-")[2];
        var month = inputDate.split("-")[1];
        var day = inputDate.split("-")[0];

        if (month < 1 || month > 12)
            return false;
        if (day < 1 || day > 31)
            return false;
        if ((month === "04" || month === "06" || month === "09" || month === "11") && day === "31")
            return false;
        if (month == 2) { // check for leap year
            var isleap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
            if (day > 29 || (day === "29" && !isleap))
                return false;
        }
        return true;
    }

    private checkIfValidDate(inputDate) {
        var year = inputDate.split("-")[2];
        var month = inputDate.split("-")[1];
        var day = inputDate.split("-")[0];

        if (month < 1 || month > 12)
            return false;
        if (day < 1 || day > 31)
            return false;
        if ((month === "04" || month === "06" || month === "09" || month === "11") && day === "31")
            return false;
        if (month == 2) { // check for leap year
            var isleap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
            if (day > 29 || (day === "29" && !isleap))
                return false;
        }
        return this.checkIfValidYear(year);
    }

    calculateAge(d, m, y) {
        let year, month, day, dob, diff_ms, age_dt, age;
        year = y;
        month = m;
        day = d;

        let todayDate = new Date();
        let todayYear: any = todayDate.getFullYear();
        let todayMonth: any = todayDate.getMonth();
        let todayDay: any = todayDate.getDate();
        age = todayYear - year;

        if (todayMonth < month - 1) {
            age--;
        }

        if (month - 1 === todayMonth && todayDay < day) {
            age--;
        }

        return age;
    }

    static lpad(num: number, size: number): string {
        let s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    static getStringDate(date: Date): string {

        let month: number = date.getMonth() + 1;


        return DateValidationUtils.lpad(date.getDate(), 2) + '-' + DateValidationUtils.lpad(month, 2) + '-' + date.getFullYear();

    }
    /**
    * Date Format :  YYYY
    * @param control
    */
    static validateYearFormat(control: FormControl): { [key: string]: any } {
        if (control.value == '' || control.value == null) {
            return null;
        } else if (!control.value.match(DateValidationUtils.yearPattern))
            return { "yearFormat": true };

        return null;
    }
    static validatePastYear(control: FormControl): { [key: string]: any } {

        //If format is invalid, return error
        if (DateValidationUtils.validateYearFormat(control) != null) {
            return { "YearCurrentOrFuture": true };
        }

        if (control.value != null) {
            let year = control.value;

            let inputYear = new Date(year);
            let currentYear = new Date();
            currentYear.setHours(0, 0, 0, 0);

            if (inputYear >= currentYear)
                return { "YearCurrentOrFuture": true };
        }

        return null;
    }

    static getAllYears() {

        if (DateValidationUtils.yearsList != undefined) {
            return DateValidationUtils.yearsList;
        }

        let oldDate: Date = new Date('01/01/1800');
        let currentDate: Date = new Date();

        let years: number[] = [];

        while (oldDate.getFullYear() <= currentDate.getFullYear()) {
            years.push(currentDate.getFullYear());
            currentDate.setFullYear(currentDate.getFullYear() - 1);
        }


        DateValidationUtils.yearsList = years;

        return DateValidationUtils.yearsList;

    }

    static getNext25Years() {

        if (DateValidationUtils.yearsNext25List != undefined) {
            return DateValidationUtils.yearsNext25List;
        }


        let currentDate: Date = new Date();
        let minYear = currentDate.getFullYear();
        let maxYear = currentDate.getFullYear() + 25;
        let years: number[] = [];

        while (minYear <= maxYear) {
            years.push(maxYear);
            maxYear = maxYear - 1;
        }


        DateValidationUtils.yearsNext25List = years;

        return DateValidationUtils.yearsNext25List;

    }

    static getDaysList(month: number, year: number) {
        let days: string[] = [];

        if (month == undefined || month <= 0 || year == undefined || year <= 0) {
            for (let i = 1; i < 32; i++) {
                days.push(this.lpad(i, 2));
            }

            return days;
        }

        for (let i = 1; i < 32; i++) {
            let date: any = new Date(month + '/' + i + '/' + year);
            if (DateValidationUtils.isValidDate(date)) {
                let dayOfMonth = this.lpad(date.getDate(), 2)
                if (days.indexOf(dayOfMonth) < 0) {
                    days.push(dayOfMonth);
                }
            }
            else {
                return days;
            }
        }

        return days;
    }

    static getDefaultDayList() {
        let days: string[] = [];
        if (DateValidationUtils.defaultDayList != undefined) {
            return DateValidationUtils.defaultDayList;
        }

        let i: number;
        for (i = 1; i < 32; i++) {
            days.push(DateValidationUtils.lpad(i, 2));
        }
        DateValidationUtils.defaultDayList = days;
        return DateValidationUtils.defaultDayList;
    }

    static getMonthList() {

        let months: string[] = [];
        if (DateValidationUtils.monthList != undefined) {
            return DateValidationUtils.monthList;
        }

        let i: number;
        for (i = 1; i <= 12; i++) {
            months.push(DateValidationUtils.lpad(i, 2));
        }
        DateValidationUtils.monthList = months;
        return DateValidationUtils.monthList;
    }

    static getNumber(value: string) {
        let y: number;
        y = +value;
        return y;
    }

    static isValidDate(d: any) {
        return d instanceof Date;
    }

    /* Eswaran : Date validations for empty or */
    static validateDropDownDatesEmpty(dd: string, mm: string, yyyy: string, errorKey: string): ValidatorFn {
        return (control: FormGroup): ValidationErrors | null => {

            let day: string = control.get(dd).value;
            let month: string = control.get(mm).value;
            let year: string = control.get(yyyy).value;

            let keyValueObj: { [key: string]: boolean } = { errorKey: false };


            if ((day == '' || month == '' || year == '') || (day == '00' || month == '00' || year == '00')) {


                keyValueObj[errorKey] = true;

                return keyValueObj;

            } else {
                return null;
            }


        };
    };

    /* George : Date validations for empty */
    // tslint:disable-next-line: member-ordering
    static validateDropDownDatesNull(dd: string, mm: string, yyyy: string, errorKey: string): ValidatorFn {
        return (control: FormGroup): ValidationErrors | null => {

            const day = control.get(dd).value;
            const month = control.get(mm).value;
            const year = control.get(yyyy).value;
            let keyValueObj: { [key: string]: boolean } = { errorKey: false };


            if ((day == '' && month == '' && year == '') || (day == '00' && month == '' && year == '')) {
                keyValueObj[errorKey] = true;

                return keyValueObj;

            } else {
                return null;
            }


        };
    };

    /* George : Date validations for any feild empty */
    static validateDropDownDatesAnyNull(dd: string, mm: string, yyyy: string, errorKey: string): ValidatorFn {
        return (control: FormGroup): ValidationErrors | null => {

            let day: string = control.get(dd).value;
            let month: string = control.get(mm).value;
            let year: string = control.get(yyyy).value;

            let keyValueObj: { [key: string]: boolean } = { errorKey: false };


            if (day == '' || month == '' || year == '') {


                keyValueObj[errorKey] = true;

                return keyValueObj;

            } else {
                return null;
            }


        };
    };

    static isDateDiffFiveYrs(fromdd: string, frommm: string, fromyyyy: string, todd: string, tomm: string, toyy: string, searchType: string, errorKey: string) {
        return (control: FormGroup): ValidationErrors | null => {
            let day: string = control.get(fromdd).value;
            let month: string = control.get(frommm).value;
            let year: string = control.get(fromyyyy).value;
            day  = (day=='00')?'':day;
            month = (month=='00')?'':month;
            year = (year=='0000')?'':year;
            var fromDate: string = day + '-' + month + '-' + year;
            let keyValueObj: { [key: string]: boolean } = { errorKey: false };
            let toDay: string = control.get(todd).value;
            let toMonth: string = control.get(tomm).value;
            let toYear: string = control.get(toyy).value;
            toDay = (toDay=='00')?'':toDay;;
            toMonth = (toMonth=='00')?'':toMonth;
            toYear= (toYear=='0000')?'':toYear;

            let st: string = control.get(searchType).value;

            if (day == '' && month != '' && year != '' && toDay == '' && toMonth != '' && toYear != '') {
                let day: string = '01';
                let toDay: string = '01';
            }
            if (day == '' && month == '' && year != '' && toDay == '' && toMonth == '' && toYear != '') {
                let day: string = '01';
                let toDay: string = '01';
                let month: string = '01';
                let toMonth: string = '01';
            }
            var todayDate: string = toDay + '-' + toMonth + '-' + toYear;
            let diff: number = DateValidationUtils.getDiffInDays(fromDate, todayDate);

            if (st==='P' && diff > 1826) {
                keyValueObj = { errorKey: true };
                keyValueObj[errorKey] = true;
                return keyValueObj;
            }
            return null;
        }
    }


    static isDateEqualTodayFuture(fromdd: string, frommm: string, fromyyyy: string, errorKey: string) {
        return (control: FormGroup): ValidationErrors | null => {
            let day: string = control.get(fromdd).value;
            let month: string = control.get(frommm).value;
            let year: string = control.get(fromyyyy).value;
            
            day     =(day=='00')?'':day;
            month   =(month=='00')?'':month;
            year    =(year=='0000')?'':year;
            
            var fromDate = month + '/' + day + '/' + year;
            let keyValueObj: { [key: string]: boolean } = { errorKey: false };
            var today = new Date();
            var todayYear = today.getFullYear();
            var todayMonth = today.getMonth() + 1;
            var todayDay = today.getDate();
            var todayDate = todayMonth + '/' + todayDay + '/' + todayYear;
            if (day != '' && month != '' && year != '') {
                if (Date.parse(fromDate) >= Date.parse(todayDate)) {
                    keyValueObj = { errorKey: true };
                    keyValueObj[errorKey] = true;
                    return keyValueObj;
                }
            }
            if (day == '' && month != '' && year != '') {
                let day: string = '01';
                if (Number(day) == todayDay && Number(month) >= todayMonth && Number(year) >= todayYear) {
                    keyValueObj = { errorKey: true };
                    keyValueObj[errorKey] = true;
                    return keyValueObj;
                }
            }
            if (day == '' && month == '' && year != '') {
                let day: string = '01';
                let month: string = '01';
                if (Number(day) == todayDay && Number(month) == todayMonth && Number(year) >= todayYear) {
                    keyValueObj = { errorKey: true };
                    keyValueObj[errorKey] = true;
                    return keyValueObj;
                }
            }
            return null;
        }
    }

    static validateDropDownsameformat(fromdd: string, frommm: string, fromyyyy: string, todd: string, tomm: string, toyy: string, errorKey: string) {
        return (control: FormGroup): ValidationErrors | null => {
            let day: string = control.get(fromdd).value;
            let month: string = control.get(frommm).value;
            let year: string = control.get(fromyyyy).value;
            let toDay: string = control.get(todd).value;
            let toMonth: string = control.get(tomm).value;
            let toYear: string = control.get(toyy).value;

            day  = (day=='00')?'':day;
            month = (month=='00')?'':month;
            year = (year=='0000')?'':year;;
            toDay = (toDay=='00')?'':toDay;;
            toMonth = (toMonth=='00')?'':toMonth;
            toYear= (toYear=='0000')?'':toYear;

            let keyValueObj: { [key: string]: boolean } = { errorKey: false };

            //var fromDate = day+'/'+ month + '/'+ year;                
            //var toDate = toDay+'/'+ toMonth + '/'+ toYear;                
            //var regex_date = /^\d{2}\/\d{2}\/\d{4}$/;   
            //var frmMonthYr = month + '/'+ year;
            //var toMthYr = toMonth + '/'+ toYear;
            //var regex_monthyr = /^\d{2}\/\d{4}$/;    
            //var regex_yr = /^\d{4}$/;

            if (day != '' && month == '' && year != '' || toDay != '' && toMonth == '' && toYear != ''
                || day != '' && month == '' && year == '' || toDay != '' && toMonth == '' && toYear == ''
                || day != '' && month != '' && year == '' || toDay != '' && toMonth != '' && toYear == '') {
                keyValueObj = { errorKey: true };
                keyValueObj[errorKey] = true;
                return keyValueObj;
            }

            /*if(regex_date.test(fromDate) != regex_date.test(toDate))
            {
                keyValueObj = { errorKey : true };                
                keyValueObj[errorKey] = true;
                return keyValueObj;
            } 
            else if(regex_monthyr.test(frmMonthYr) != regex_monthyr.test(toMthYr))
            {
                keyValueObj = { errorKey : true };                
                keyValueObj[errorKey] = true;
                return keyValueObj;
            }
            else if(regex_yr.test(year) != regex_yr.test(toYear))
            {
                keyValueObj = { errorKey : true };                
                keyValueObj[errorKey] = true;
                return keyValueObj;
            }*/
            return null;
        }
    }

    static validateDropDownDatesGreater(fromdd: string, frommm: string, fromyyyy: string, todd: string, tomm: string, toyy: string, errorKey: string) {
        return (control: FormGroup): ValidationErrors | null => {
            let day: string = control.get(fromdd).value;
            let month: string = control.get(frommm).value;
            let year: string = control.get(fromyyyy).value;

            let toDay: string = control.get(todd).value;
            let toMonth: string = control.get(tomm).value;
            let toYear: string = control.get(toyy).value;

            day  = (day=='00')?'':day;
            month = (month=='00')?'':month;
            year = (year=='0000')?'':year;;
            toDay = (toDay=='00')?'':toDay;;
            toMonth = (toMonth=='00')?'':toMonth;
            toYear= (toYear=='0000')?'':toYear;

            let keyValueObj: { [key: string]: boolean } = { errorKey: false };
            var today = new Date();

            if (day != '' && month != '' && year != '' && toDay != '' && toMonth != '' && toYear != '') {
                var fromDate = month + '/' + day + '/' + year;
                var toDate = toMonth + '/' + toDay + '/' + toYear;
                if (Date.parse(fromDate) > Date.parse(toDate)) {
                    keyValueObj = { errorKey: true };
                    keyValueObj[errorKey] = true;
                    return keyValueObj;
                }
            }

            if (day == '' && month != '' && year != '' && toDay == '' && toMonth != '' && toYear != '') {
                var fromMonthYr = new Date(Number(year), Number(month) - 1);
                var toMonthYr = new Date(Number(toYear), Number(toMonth) - 1);
                if (fromMonthYr > toMonthYr) {
                    keyValueObj = { errorKey: true };
                    keyValueObj[errorKey] = true;
                    return keyValueObj;
                }
            }

            if (day == '' && month == '' && year != '' && toDay == '' && toMonth == '' && toYear != '') {
                var fromYr = new Date(Number(year));
                var toYr = new Date(Number(toYear));
                if (fromYr > toYr) {
                    keyValueObj = { errorKey: true };
                    keyValueObj[errorKey] = true;
                    return keyValueObj;
                }
            }

            if (day != '' && month != '' && year != '' && toDay == '' && toMonth == '' && toYear != '') {
                var fromYr = new Date(Number(year));
                var toYr = new Date(Number(toYear));
                if (fromYr > toYr) {
                    keyValueObj = { errorKey: true };
                    keyValueObj[errorKey] = true;
                    return keyValueObj;
                }
            }

            if (day == '' && month == '' && year != '' && toDay != '' && toMonth != '' && toYear != '') {
                var fromYr = new Date(Number(year));
                var toYr = new Date(Number(toYear));
                if (fromYr > toYr) {
                    keyValueObj = { errorKey: true };
                    keyValueObj[errorKey] = true;
                    return keyValueObj;
                }
            }
            return null;
        }

    }

    /* Abishek : Date validations for past date from the drop down */
    static validateDropDownDatesPast(dd: string, mm: string, yyyy: string, errorKey: string): ValidatorFn {
        return (control: FormGroup): ValidationErrors | null => {

            let day: string = control.get(dd).value;
            let month: string = control.get(mm).value;
            let year: string = control.get(yyyy).value;

            day     =(day=='00')?'':day;
            month   =(month=='00')?'':month;
            year    =(year=='0000')?'':year;
            
            let keyValueObj: { [key: string]: boolean } = { errorKey: false };
            var today = new Date();
            today.setHours(0, 0, 0, 0);

            if (day == '00') {
                day = '';
            }
            
            if (day != '' || month != '' || year != '') {

                if ((day != '') && (month == '')) {
                    keyValueObj[errorKey] = true;
                    return keyValueObj;

                }

                if ((day != '') && (month != '') && (year == '')) {
                    keyValueObj[errorKey] = true;
                    return keyValueObj;

                }

                if ((day != '' || month != '') && (year == '')) {
                    keyValueObj[errorKey] = true;
                    return keyValueObj;

                }

                if (year != '' && month != '') {

                    if (year == today.getFullYear().toString() && DateValidationUtils.getNumber(month) > today.getMonth() + 1) {
                        keyValueObj[errorKey] = true;
                        return keyValueObj;

                    }
                    else if (year == today.getFullYear().toString()
                        && DateValidationUtils.getNumber(month) == today.getMonth() + 1
                        && DateValidationUtils.getNumber(day).toString() > today.toString()) {
                        keyValueObj[errorKey] = true;
                        return keyValueObj;
                    }
                    if (day != '') {

                        if ((new Date(DateValidationUtils.getNumber(year), DateValidationUtils.getNumber(month) - 1, DateValidationUtils.getNumber(day)).toString() == today.toString())
                            || (new Date(DateValidationUtils.getNumber(year), DateValidationUtils.getNumber(month) - 1, DateValidationUtils.getNumber(day)) > today)) {
                            keyValueObj[errorKey] = true;
                            return keyValueObj;

                        }
                    }
                }
            }
            return null;
        };
    };



    static validateEnquiryDropDownDatesPast(day: string, month: string, year: string) {

        var today = new Date();
        today.setHours(0, 0, 0, 0);

        if (day == '00') {
            day = '';
        }

        if (day != '' || month != '' || year != '') {

            if ((day != '') && (month == '')) {
                return true;

            }

            if ((day != '') && (month != '') && (year == '')) {
                return true;

            }

            if ((day != '' || month != '') && (year == '')) {
                return true;

            }

            if (year != '' && month != '') {

                if (year == today.getFullYear().toString() && DateValidationUtils.getNumber(month) > today.getMonth() + 1) {
                    return true;

                }
                /*if date is future/current and pass for history date*/
                else if (year == today.getFullYear().toString()
                    && DateValidationUtils.getNumber(month) == today.getMonth() + 1
                    && DateValidationUtils.getNumber(day).toString() > today.toString()) {
                    return true;
                }
                if (day != '') {

                    if ((new Date(DateValidationUtils.getNumber(year), DateValidationUtils.getNumber(month) - 1, DateValidationUtils.getNumber(day)).toString() == today.toString())
                        || (new Date(DateValidationUtils.getNumber(year), DateValidationUtils.getNumber(month) - 1, DateValidationUtils.getNumber(day)) > today)) {
                        return true;

                    }
                }
            }
        }
        return false;
    };

}

