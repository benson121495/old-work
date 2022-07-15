import { AbstractControl, FormControl, ValidationErrors, FormGroup, ValidatorFn } from '@angular/forms';
import { ChineseCharacterValidationUtils } from './chinese-character-validation-utils';

export class ValidationUtils {

  constructor() { }

  // ******REGULAR EXPRESSION*****
  static ARN_REGEX = RegExp('([a-zA-Z]{4})([0-9]{9})');
  static hkPhRegex = /^(?!(1|0|4|999).*$)\d{8}$/;

  /**REGEX Pattern for First section of HK ID */
  static hkIdFirstPartPattern = /^([A-Z]{1,2})([0-9]{6})$/;


  /**Valid characters */
  static STR_VALID_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  private _maxlength: number;
  private _idNumber: string;
  private countryCodeRegex = /([0-9])/;
  private hkPhoneRegex = /^(?!(1|0|4|999).*$)\d{8}$/;
  private phoneRegex = /([0-9])/;



  private hkIdmask_alpha = /^([a-zA-Z]){1,2}([0-9]){6}([a-zA-Z0-9]){1}$/;
  private travelDocRegexforSix = /^([a-zA-Z0-9]){6}$/;
  private nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z])?[a-zA-Z]*)*$/;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  // ***************MASKING*******************/
  addressMask = [/(?!^[ ])((?!(  )).)/];
  codeMask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  travelDocMask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  travelDocMask1 = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  appRefNumberMask = [
    /[a-zA-Z]/, /[a-zA-Z]/, /[a-zA-Z]/, /[a-zA-Z]/, '-',
    /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-',
    /\d/, /\d/];
  dateOfBirthMask = [/[0-3]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  hkIDMask1 = [/[a-zA-Z]/, /[a-zA-Z0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  hkIDMask2 = [/[a-zA-Z0-9]/];
  extPhoneMask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  numberMask = [/[1-9]/, /[0-9]/];
  phoneMask1 = [/[2,3,4-9]/, /[0-9]/, /[0-8]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  phoneMask = [/[2,3,4-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  arnMask = [/[a-zA-Z]/, /[a-zA-Z]/, /[a-zA-Z]/, /[a-zA-Z]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  phoneMask15 = [/[2-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  numberOfChildrenMask = [/[1-9]/, /[0-9]/];


  notificationSlipMask1 = [/[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/];
  notificationSlipMask2 = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  notificationSlipMask3 = [/[0-9]/, /[0-9]/];
  notificationSlipMask4 = [/[a-zA-Z0-9]/];

  static isHKIdValid(hkId) {
    const hkIdmask_alpha = /^([a-zA-Z]){1,2}([0-9]){6}([a-zA-Z0-9]){1}$/;
    return (!hkId.match(hkIdmask_alpha)) ? false : true;
  }

  static isValidEmail(emailAddress) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!(emailRegex.test(emailAddress))) {
      return false;
    }
    return true;
  }


  static chineseMaxChar(field1: string, maxlenChin: any, errorKey: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {


      const keyValueObj: { [key: string]: boolean } = { errorKey: false };



      const chineseRegex = /^[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+$/g;

      if (control.get(field1).value) {
        for (let i = 0; i < control.get(field1).value.length; i++) {
          if (chineseRegex.test(control.get(field1).value.charAt(i))) {
            if (control.get(field1).value.length > maxlenChin) {
              keyValueObj[errorKey] = true;
              return keyValueObj;
            }
          }
        }
      }
    };
  }
  // Check Same HKId
  static isEqualHKId(field1: string, field2: string, field3: string, field4: string, errorkey: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {

      const keyValueObj: { [key: string]: boolean } = { errorKey: false };

      const hkidM: string = control.get(field1).value + control.get(field2).value;
      const hkidF: string = control.get(field3).value + control.get(field4).value;
      if (hkidM == null || hkidM == undefined || hkidM == '') { return null; }
      if (hkidF == null || hkidF == undefined || hkidF == '') { return null; }

      if (hkidM == hkidF) {
        keyValueObj[errorkey] = true;
        return keyValueObj;
      }
      return null;
    }
  }

  // Check Date and Travel Document are the same for male and female
  static isDateTDEqual(field1: string, field2: string, field3: string, field4: string, errorKey: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const keyValueObj: { [key: string]: boolean } = { errorKey: false };
      const dt: string = control.get(field1).value + control.get(field3).value;
      const td: string = control.get(field2).value + control.get(field4).value;
      if (dt == null || dt == undefined || dt == '') { return null; }
      if (td == null || td == undefined || td == '') { return null; }
      if (td === dt) {
        keyValueObj[errorKey] = true;
        return keyValueObj;
      }
      return null;
    }
  }


  /* Use this method to check the email validation */
  static validateEmail(control: FormControl) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (control.value === null || control.value === '' || control.value === undefined) {
      return null;
    } else if (!(emailRegex.test(control.value))) {
      return { 'invalidEmail': true };
    }
  }

  /*E-mail validation accepting only alphanumeric characters*/
  static validateEmail2(control: FormControl) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (control.value === null || control.value === '' || control.value === undefined) {
      return null;
    } else if (!(emailRegex.test(control.value))) {
      return { 'invalidEmail': true };
    }
  }


  /**
   * Multi field form validation for Surname and English name greater than 38 characters
   */

  static nameLengValidator(field1: string, field2: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const first = control.get(field1).value;
      const second = control.get(field2).value;
      const total = first + second;

      return total.length > 38 ? { isNameLonger: true } : null;
    };
  }
  static nameLengValidatorWithCustomeKey(field1: string, field2: string, nameKey: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const first = control.get(field1).value;
      const second = control.get(field2).value;
      const total = first + second;

      if (total.length > 38) {
        const keyValueObj: { [key: string]: boolean } = { errorKey: false };
        keyValueObj[nameKey] = true;
        return keyValueObj;
      }
      return null;
    };
  }
  static aliasNameLengValidator(field1: string, field2: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const first = control.get(field1).value;
      const second = control.get(field2).value;
      const total = first + second;

      return total.length > 38 ? { isAliasNameLonger: true } : null;
    };
  }
  /* To compare two strings */
  static stringCompare(field1: string, field2: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {

      const a = control.get(field1).value;
      const b = control.get(field2).value;
      const nullCheck = (a != '' && b != '');

      return nullCheck && (a == b) ? { equalString: true } : null;
    };
  }
  /* Method to check whehter two chinese inputs are same or not */

  static chineseEqual(field1: string, field2: string, field3?: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {

      const a = control.get(field1).value;
      let b = field3?control.get(field2).value:control.get(field2).value + control.get(field3).value;
      return (a != '' && b != '') && (a != null && b != null) && (a.localeCompare(b) == 0) ? { isChineseNameSame: true } : null;
    };
  }
  static isValidContactNumberForSuppl(contactNum) {
    const hkPhoneRegex = /^(?!(1|0|999).*$)\d{8}$/;
    if (!(hkPhoneRegex.test(contactNum))) {
      return false;
    } else {
      return true;
    }
  }

  static phoneCheck(control: FormControl) {
    const phoneRegEx = /^(?!(1|0|999).*$)\d{8}$/;
    if (control.value == null || control.value == '') {
      return null;
    } else if (!(phoneRegEx.test(control.value))) {
      return { 'phoneMatch': true };
    }

    return null;
  }
  static phoneCheck15(control: FormControl) {
    const phoneRegEx = /^(?!(1|0|999).*$)\d{8,15}$/;
    if (control.value == '' || control.value == null) {
      return null;
    } else if (!(phoneRegEx.test(control.value))) {
      return { 'phoneMatch': true };
    }

    return null;
  }

  static phoneCheck16(control: FormControl) {
    const phoneRegEx = /[0-9]{4}$/;
    if (control.value == '' || control.value == null) {
      return null;
    } else if (!(phoneRegEx.test(control.value))) {
      return { 'phoneMatch': true };
    }

    return null;
  }

  // tslint:disable-next-line:member-ordering
  static isValidName(name) {

    const reg1 = /^[a-zA-Z][a-zA-Z,'-. ]*[a-zA-Z'. ]$/;
    const reg2 = /.*[.][a-zA-Z,'-.].*/;
    const reg3 = /".*[,][a-zA-Z,'-.].*/;
    const reg4 = /.*[,-. ][,].*/;
    const reg5 = /.*['-. ]['].*/;
    const reg6 = /[a-zA-Z]/;


    if (name.length == 1) {
      if ((reg6.test(name))) {
        return true;
      } {
        return false;
      }
    }


    if (!(reg1.test(name)) ||
      reg2.test(name) ||
      reg3.test(name) ||
      reg4.test(name) ||
      reg5.test(name) ||
      name.includes(' -') ||
      name.includes('- ') ||
      name.endsWith('-\'') ||
      name.endsWith('-') ||
      name.startsWith('\'') ||
      (name.indexOf(' .') >= 0) ||
      (name.indexOf('  ') >= 0)
    ) {
      return false;
    } else {
      return true;
    }

  }

  /**
   * Validate ARN (eg: RNVE500033213)
   * @param control
   */
  static validateArn(control: FormControl): { [key: string]: any } {
    if (!control.value.replace(/-/g, '').match(ValidationUtils.ARN_REGEX)) {
      return { 'arnMatch': true };
    }
    return null;
  }



  /**
  * Allow the entry of chinese characters only
  */

  static isValidChineseEntry(control: FormControl): { [key: string]: any } {

    const chineseRegex = /^[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+$/g;

    if (control.value == null || control.value == '') {
      return null;
    } else if (!(chineseRegex.test(control.value))) {
      return { 'isChinese': true };
    }

    return null;
  }

  /**
   * Check the HK-ID card is valid
   */
  static validateHKID(control: FormControl) {
    const hkIdmask_1alpha = /^([a-zA-Z]{1,2})([0-9]{6})$/;
    if (control.value == '' || control.value == null) {
      return null;
    } else if (!(hkIdmask_1alpha.test(control.value))) {
      return { 'hkId1Match': true };
    }
  }

  /* Method to check whether the particular form control is null */
  static isHkId2Null(control: FormControl) {
    const input = control.value;
    return (input == '') ? { hk2Empty: true } : null;
  }


  static checkBothBlank(field1: string, field2: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      return (control.get(field1).value == '' && control.get(field2).value == '') ? { bothBlank: true } : null;
    };
  }
  static checkAnyOneBlank(field1: string, field2: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      return (control.get(field1).value != '' && control.get(field2).value == '') ? { anyOneBlank: true } : null;
    };
  }
  /* Method to check whether the field has Chinese character or not */

  static hasChinese(control: FormControl) {

    const chineseRegex = /[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]/;

    if (control.value == '') {
      return null;
    } else if (chineseRegex.test(control.value)) {
      return { hasChineseChar: true };
    }
    return null;
  }


  static englishNameCheck(control: FormControl) {
    const engNameInvalidCharRegEx = /[^A-Z ,'.-]+/;
    const engNameInvalidStartRegEx = /^[ ,'.-]/;
    const engNameInvalidEndRegEx = /[ ,'-]$/;
    const engNameInValidSuccesCharRegEx = /[,]{2}|[']{2}|[.]{2}|[-]{2}|[ ]{2}/;
    const engNameInvalidNumCommaRegEx = /^[A-Z '.-]*$|[,][A-Z '.-]*[,]/;
    const engNameNoSpAfterCommaRegEx = /[,][^ ]/;
    const noLetterApoAfterCommaSpaceeRegEx = /[,][ ][^A-Z']/;
    const noLetterApoBeforeCommaRegEx = /[^A-Z'][,]/;
    const noLetterApoAfterHyphenRegEx = /[-][^A-Z']/;
    const noLetterApoBeforeHyphenRegEx = /[^A-Z'][-]/;
    const noLetterFullstopAfterApoRegEx = /['][^A-Z.]/;
    const noLetterBeforeApoRegEx = /[^A-Z][']/;
    const noSpaceBeforeFullstopRegEx = /[ ][.]/;
    const noSpaceAfterFullstopRegEx = /[.][^ ]/;
    const noInvalidApoPositionRegEx = /^[A-Z ,.-][']|[ ][A-Z,.-][']/;

    if (control.value === '' || control.value === null) {
      return null;
    } else if (engNameInvalidCharRegEx.test(control.value)) {
      return { 'enNameInvalidChar': true };
    } else if (engNameInvalidStartRegEx.test(control.value)) {
      return { 'enNameInvalidSt': true };
    } else if (engNameInvalidEndRegEx.test(control.value)) {
      return { 'enNameInvalidEnd': true };
    } else if (engNameInValidSuccesCharRegEx.test(control.value)) {
      return { 'enNameInValidSuccesChar': true };
    } else if (engNameInvalidNumCommaRegEx.test(control.value)) {
      return { 'enNameInvalidNumComma': true };
    } else if (engNameNoSpAfterCommaRegEx.test(control.value)) {
      return { 'enNameNoSpAfterComma': true };
    } else if (noLetterApoAfterCommaSpaceeRegEx.test(control.value)) {
      return { 'noLetterApoAfterCommaSpace': true };
    } else if (noLetterApoBeforeCommaRegEx.test(control.value)) {
      return { 'noLetterApoBeforeComma': true };
    } else if (noLetterApoAfterHyphenRegEx.test(control.value)) {
      return { 'noLetterApoAfterHyphen': true };
    } else if (noLetterApoBeforeHyphenRegEx.test(control.value)) {
      return { 'noLetterApoBeforeHyphen': true };
    } else if (noLetterFullstopAfterApoRegEx.test(control.value)) {
      return { 'noLetterFullstopAfterApo': true };
    } else if (noLetterBeforeApoRegEx.test(control.value)) {
      return { 'noLetterBeforeApo': true };
    } else if (noSpaceBeforeFullstopRegEx.test(control.value)) {
      return { 'noSpaceBeforeFullstop': true };
    } else if (noSpaceAfterFullstopRegEx.test(control.value)) {
      return { 'noSpaceAfterFullstop': true };
    } else if (noInvalidApoPositionRegEx.test(control.value)) {
      return { 'noInvalidApoPosition': true };
    }
    return null;
  }

  /* Method to check whether the input is null */
  static isEmpty(field: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const input = control.get(field).value;

      return (input == '') ? { itsEmpty: true } : null;
    };
  }

  /* Method to check whether the input is not null */
  static isNotEmpty(field: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const input = control.get(field).value;

      return (input != '') ? { itsNotEmpty: true } : null;
    };
  }
  /* Method to accept chinese and English only */
  static isEngOrChinese(field: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const chineseRegex = /[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]/;
      const engRegex = /^[a-zA-Z]+$/;
      const a = control.get(field).value;

      if (a == '') {
        return null;
      } else if (!(chineseRegex.test(a) || engRegex.test(a))) {
        return { engOrChin: true };
      }
      return null;
    };
  }


  static isEnglishOrChinese(field: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const chineseRegex = /^[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+$/g;
      const engRegex = /^[a-zA-Z]+$/;
      const a = control.get(field).value;

      if (a == '') {
        return null;
      } else if (!(chineseRegex.test(a) || engRegex.test(a))) {
        return { englishOrChin: true };
      }
      return null;
    };
  }

  /* Method to accept  Traditional chinese and English only */
  /* static isEngOrTradChinese(field: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const chineseTradRegex = /^[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+$/g;
      const engRegex = /^[a-zA-Z]+$/;
      var a = control.get(field).value;

      if (a == '') {
        return null;
      } else if (!(chineseTradRegex.test(a) || engRegex.test(a))) {
        return { engOrTradChin: true };
      }
      return null;
    };
  };*/



  static renetryDocCheck(control: FormControl) {
    const renetryDocRegex = /^[A-Z]?[0-9]{9}$|^[A-Z][0-9]{8}$/;
    if (control.value == '') {
      return null;
    } else if (!renetryDocRegex.test(control.value)) {
      return { 'renetryDocInvalid': true };
    }
    return null;
  }


  static nameValidation(control: FormControl) {

    if (!(/^[A-Za-z '.,]*$/).test(control.value) && !(/^[-]*$/.test(control.value))) {
      return { 'nameError1': true };
    } else {
      if (control.value.length == 0 && !(/^[A-Za-z']*$/).test(control.value)) {
        return { 'nameError2': true };
      }

      if (control.value.charAt(control.value.length - 1) == '  ' && !(/^[A-Za-z']*$/).test(control.value)) {
        return { 'nameError3': true };
      }


      if (control.value.charAt(control.value.length - 1) == '.' && !(/^[ ]*$/).test(control.value)) {
        return { 'nameError4': true };
      }


      if (control.value.charAt(control.value.length - 1) == '-' && !(/^[A-Za-z']*$/).test(control.value)) {
        return { 'nameError5': true };
      }


      if (control.value.charAt(control.value.length - 1) == ',' && !(/^[ ]*$/).test(control.value)) {
        return { 'nameError6': true };
      }


      if (control.value.charAt(control.value.length - 1) == '\'' && control.value.length > 1) {
        if (!(/^[A-Za-z]*$/).test(control.value.charAt(control.value.length - 2)) && !(/^[A-Za-z]*$/).test(control.value)) {
          return { 'nameError7': true };
        }
      }


    }

  }

  /** Lakshman Time Check */

  static timeCheck(control: FormControl) {
    const reg1 = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/;
    if (control.value == undefined || control.value == null || control.value == '') {
      return null;
    } else {
      if (!(reg1.test(control.value))) {
        return { wrongTime: true };
      }
    }

  }

  /**Method to invoke name check */
  // static useEnglishNameCheck(control: FormControl) {

  //   if(control.value != null){
  //     let check = ValidationUtils.nameValidation(control);
  //     const trailingLeadingSpace = (control.value.length > 0) &&
  //       (!(/^[a-zA-Z][a-zA-Z ]*[a-zA-Z]$/).test(control.value));
  //     if (check != null || trailingLeadingSpace) {
  //       return { wrongName: true }
  //     }
  //   }

  //   return null;
  // }


  /**Method to invoke name check */
  static useEnglishNameWithPuncCheck(control: FormControl) {
    const reg1 = /^[a-zA-Z][a-zA-Z,'-. ]*[a-zA-Z'. ]$/;
    const reg2 = /.*[.][a-zA-Z,'-.].*/;
    const reg3 = /".*[,][a-zA-Z,'-.].*/;
    const reg4 = /.*[,-. ][,].*/;
    const reg5 = /.*['-. ]['].*/;
    const reg6 = /[a-zA-Z]/;

    if (control.value == undefined || control.value == null || control.value == '') {
      return null;
    } else {


      if (control.value.length == 1) {
        if ((reg6.test(control.value))) {
          return;
        } {
          return { wrongName: true }
        }
      }


      if (!(reg1.test(control.value)) ||
        reg2.test(control.value) ||
        reg3.test(control.value) ||
        reg4.test(control.value) ||
        reg5.test(control.value)
      ) {
        return { wrongName: true }
      }
    }
  }

  // Name check for offence//
  static useEnglishNameWithSymbol(control: FormControl) {
    const reg1 = /^[a-zA-Z,'-.?][a-zA-Z,'-.? ]*[a-zA-Z,'-.?]$/;
    const reg2 = /.*[.][a-zA-Z,'-.].*/;
    const reg3 = /".*[,][a-zA-Z,'-.].*/;
    const reg4 = /.*[,-. ][,].*/;
    const reg5 = /.*['-. ]['].*/;
    const reg6 = /[a-zA-Z]/;

    if (control.value == undefined || control.value == null || control.value == '') {
      return null;
    } else {


      if (control.value.length == 1) {
        if ((reg6.test(control.value))) {
          return;
        } {
          return { wrongName: true }
        }
      }


      if (!(reg1.test(control.value)) ||
        reg2.test(control.value) ||
        reg3.test(control.value) ||
        reg4.test(control.value) ||
        reg5.test(control.value)
      ) {
        return { wrongName: true }
      }
    }
  }


  /**Method to invoke name check */
  static useEnglishNameCheck(control: FormControl) {
    const reg1 = /[a-zA-Z][a-zA-Z,'-. ]*[a-zA-Z'. ]$/;
    const reg2 = /.*[.][a-zA-Z,'-.].*/;
    const reg3 = /".*[,][a-zA-Z,'-.].*/;
    const reg4 = /.*[,-. ][,].*/;
    const reg5 = /.*['-. ]['].*/;
    const reg6 = /[a-zA-Z]/;
    const reg7 = /.*[-'][a-zA-Z].*/;
    if (control.value == undefined || control.value == null || control.value == '' || control.value == ' ') {
      return null;
    } else {

      if (control.value.length == 1) {
        if ((reg6.test(control.value))) {
          return;
        } {
          return { wrongName: true }
        }
      }


      if (!(reg1.test(control.value)) ||
        reg2.test(control.value) ||
        reg3.test(control.value) ||
        reg4.test(control.value) ||
        reg5.test(control.value) ||
        control.value.includes(' -') ||
        control.value.includes('- ') ||
        // needed only for mr21b
        // control.value.endsWith("-'") ||
        control.value.endsWith('-') ||
        control.value.startsWith('\'') ||
        (control.value.indexOf(' .') >= 0) ||
        (control.value.indexOf('  ') >= 0)
      ) {

        if (control.value.includes('.-') || control.value.includes('-.')) {
          return { wrongName: true }
        }

        if (reg7.test(control.value)) {

        } else {
          return { wrongName: true }
        }


      }
      if (control.value.startsWith('-') || control.value.includes('--') || control.value.includes('\'\'') || control.value.endsWith('-') || control.value.includes('-.') || control.value.includes('.-')) {
        return { wrongName: true }
      }
    }
  }

  // surname givenname validation - birth search
  static checkNameWithAlphaSpecial(control: FormControl) {
    const checkRegEx = /[^A-Za-z '.-]+/;
    const checkStartRegEx = /^[ .-]/;
    const checkEndRegEx = /[ -]$/;
    const checkSuccessiveRegEx = /[']{2}|[.]{2}|[-]{2}|[ ]{2}/;
    const checkCharBeforeFullStopRegEx = /[^A-Za-z'][.]/;
    const checkCharAfterFullStopRegEx = /[.][^ ]/;
    const checkCharBeforeHyphenRegEx = /[^A-Za-z'][-]/;
    const checkCharAfterHyphenRegEx = /[-][^A-Za-z']/;
    const checkCharBeforeApostrRegEx = /[^A-Za-z]['][^A-Za-z]/;
    const checkSpecialCharOnlyRegEx = new RegExp('(?=.*[A-Za-z])');

    if (control.value === '' || control.value === null) {
      return null;
    } else if (checkRegEx.test(control.value.toUpperCase())) {
      return { 'checkRegEx': true };
    } else if (checkStartRegEx.test(control.value.toUpperCase())) {
      return { 'checkRegEx': true };
    } else if (checkEndRegEx.test(control.value.toUpperCase())) {
      return { 'checkRegEx': true };
    } else if (checkSuccessiveRegEx.test(control.value.toUpperCase())) {
      return { 'checkRegEx': true };
    } else if (checkCharBeforeFullStopRegEx.test(control.value.toUpperCase())) {
      return { 'checkRegEx': true };
    } else if (checkCharAfterFullStopRegEx.test(control.value.toUpperCase())) {
      return { 'checkRegEx': true };
    } else if (checkCharBeforeHyphenRegEx.test(control.value.toUpperCase())) {
      return { 'checkRegEx': true };
    } else if (checkCharAfterHyphenRegEx.test(control.value.toUpperCase())) {
      return { 'checkRegEx': true };
    } else if (checkCharBeforeApostrRegEx.test(control.value.toUpperCase())) {
      return { 'checkRegEx': true };
    } else if (!checkSpecialCharOnlyRegEx.test(control.value.toUpperCase())) {
      return { 'checkRegEx': true };
    }
    return null;
  }


  static parseDateToString(date: Date): string {
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDay().toString();
    return day + '-' + month + '-' + year;
  }

  static isEmptyString(value: string) {
    if (value == undefined || value == null || value == '' || value == 'null') {
      return true;
    }
    return false;
  }

  /** Check HK ID is valid */
  static hkIdValid(field1: string, field2: string, errorKey: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {

      let a: string = control.get(field1).value;
      let checkDigit: string = control.get(field2).value;

      const keyValueObj: { [key: string]: boolean } = { errorKey: false };

      if (a == undefined && checkDigit == undefined) {
        return null;
      }

      if (a == '' && checkDigit == '') {
        return null;
      }

      if (checkDigit == undefined || checkDigit == '') {
        keyValueObj[errorKey] = true;
        return keyValueObj;
      }

      if (a == undefined || a == '') {
        keyValueObj[errorKey] = true;
        return keyValueObj;
      }



      // Convert to upper case
      a = a.toUpperCase();
      checkDigit = checkDigit.toUpperCase();

      const match: string[] = a.match(ValidationUtils.hkIdFirstPartPattern);

      // not match, return false
      if (match == null) {
        keyValueObj[errorKey] = true;
        return keyValueObj;
      }

      if (a == undefined || a == '') {
        keyValueObj[errorKey] = true;
        return keyValueObj;
      }

      // the character part, numeric part and check digit part
      const charPart: string = match[1];
      const numPart: string = match[2];

      // calculate the checksum for character part
      let checkSum = 0;

      if (charPart.length == 2) {
        checkSum += 9 * (10 + ValidationUtils.STR_VALID_CHARS.indexOf(charPart.charAt(0)));
        checkSum += 8 * (10 + ValidationUtils.STR_VALID_CHARS.indexOf(charPart.charAt(1)));
      } else {
        checkSum += 9 * 36;
        checkSum += 8 * (10 + ValidationUtils.STR_VALID_CHARS.indexOf(charPart));
      }

      // calculate the checksum for numeric part
      for (let i: number = 0, j = 7; i < numPart.length; i++ , j--) {
        checkSum += j * Number(numPart.charAt(i));
      }

      // verify the check digit
      const remaining = checkSum % 11;
      const verify: any = remaining == 0 ? 0 : 11 - remaining;

      if (verify == checkDigit || (verify == 10 && checkDigit == 'A')) {
        return null;
      } else {
        keyValueObj[errorKey] = true;
        return keyValueObj;
      }
    };
  }
  static validateBothBlank(field1: string, field2: string, errorKey: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const keyValueObj: { [key: string]: boolean } = { errorKey: false };
      if (control.get(field1).value == '' && control.get(field2).value == '') {
        keyValueObj[errorKey] = true;
        return keyValueObj;
      }
      return null;
    };
  }

  static validateAnyOneBlank(field1: string, field2: string, errorKey: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const keyValueObj: { [key: string]: boolean } = { errorKey: false };
      if (control.get(field1).value != '' && control.get(field2).value == '') {
        keyValueObj[errorKey] = true;
        return keyValueObj;
      }
      return null;
    };
  }


  static validateMultipleNameCondition(nameM: string, surnameM: string, nameF: string, surnameF: string): ValidatorFn {
    let allNamesBlank = false;
    return (control: FormGroup): ValidationErrors | null => {
      // Validation for all names blank
      if (control.get(nameM).value === '' && control.get(surnameM).value === '' && control.get(nameF).value === '' && control.get(surnameF).value === '') {
        allNamesBlank = true;
        return { allNamesBlank: allNamesBlank };
      }
      return null;
    };
  }


  static isChinese(field1: string, errorKey: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const chineseRegex = /[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]/;
      const keyValueObj: { [key: string]: boolean } = { errorKey: false };
      if (control.get(field1).value == '' || control.get(field1).value == null) {
        return null;
      } else if (chineseRegex.test(control.get(field1).value)) {
        keyValueObj[errorKey] = true;
        return keyValueObj;
      }

    }
  }

  static isChineseInBetweeen(input: string, errorKey: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const keyValueObj: { [key: string]: boolean } = { errorKey: false };
      const chineseRegex = /[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]/;
      if (control.get(input).value == '' || control.get(input).value == null) {
        return null;
      } else {
        for (let i = 0; i < control.get(input).value.length; i++) {
          if (chineseRegex.test(control.get(input).value.charAt(i))) {
            keyValueObj[errorKey] = true;
            return keyValueObj;
          }
        }
      }
    }
  }

  static chineseMaxCharSex(control: FormControl) {

    const chineseRegex = /^[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+$/g;

    if (control.value) {
      for (let i = 0; i < control.value.length; i++) {
        if (chineseRegex.test(control.value.charAt(i))) {
          if (control.value.length > 3) {

            return { chinSexLen: true };
          }
        }
      }
    }
  }

  static pdfEmailValidation(email: string, errorKey: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      {

        // var strEmail = new String(control.get(email).value);
        const strEmail: string = control.get(email).value;
        if (strEmail == '' || strEmail == undefined || strEmail == null) {
          return null;
        }

        const keyValueObj: { [key: string]: boolean } = { errorKey: false };

        const strEmailArray1 = strEmail.split('@');
        let strEmailArray2;

        for (let i = 0; i < strEmail.length; i++) {
          if (strEmail.charAt(i) == ' ') {
            keyValueObj[errorKey] = true;
            return keyValueObj;
          }

          if (strEmail.charCodeAt(i) >= 12288) {
            keyValueObj[errorKey] = true;
            return keyValueObj;
          }
        }
        if (strEmailArray1.length != 2) {
          keyValueObj[errorKey] = true;
          return keyValueObj;
        }
        if (strEmailArray1[0].charAt(0) == '.') {
          keyValueObj[errorKey] = true;
          return keyValueObj;
        }
        strEmailArray2 = strEmailArray1[1].split('.');
        if (strEmailArray2.length < 2) {
          keyValueObj[errorKey] = true;
          return keyValueObj;
        }
        if (strEmailArray1[0] == '') {
          keyValueObj[errorKey] = true;
          return keyValueObj;
        }
        for (let i = 0; i < strEmailArray2.length; i++) {
          if (strEmailArray2[i] == '') {
            keyValueObj[errorKey] = true;
            return keyValueObj;
          }
        }
      }
    }
  }

  static englishOrChineseMaxLength(input: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      if (control.get(input).value == '' || control.get(input).value == null) {
        return null;
      }

      return null;
    }
  }

  static emailComparisonValidation(fcontrol): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } => {
      const c = control.value;
      if (c == null || c == undefined) { return null; }
      if (undefined != fcontrol.reEnterEmail) {
        if (c !== fcontrol.reminderEmail.value) { return { 'mismatch': true } }
      }
      return null;
    };
  }

  public getMaxlength(): number {
    return this._maxlength;
  }
  public setMaxlength(maxlength: number) {
    this._maxlength = maxlength;
  }

  public getIdNumber(): string {
    return this._idNumber;
  }
  public setIdNumber(idNumber: string) {
    this._idNumber = idNumber;
  }





  isHKIdValid(hkId) {
    return (!hkId.match(this.hkIdmask_alpha)) ? false : true;
  }

  isEmailValid(emailAddress, errorArr) {
    if (!(this.emailRegex.test(emailAddress))) {
      errorArr.push('Please input valid email address.');
    }
    return errorArr;
  }

  isValidEmail(emailAddress) {
    if (!(this.emailRegex.test(emailAddress))) {
      return false;
    }
    return true;
  }

  onInputChange(inputValue: Event, idNumber: string) {
    const e = <KeyboardEvent>inputValue;
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+V
      (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (idNumber === undefined || idNumber === null || idNumber === '' || idNumber.length === 0) {
      // Ensure that it is a letter and stop the keypress
      if (e.shiftKey || (e.keyCode < 65 || e.keyCode > 90)) {
        e.preventDefault();
      }
    } else if ((idNumber !== undefined && idNumber.length >= 2) &&
      (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
      (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }

  }


  useHkIdMask(idNumber: string, maxlengthValue: number) {
    if (idNumber !== undefined && idNumber.length >= 2) {
      const secondChar = parseInt(idNumber.charAt(1));
      let isCharacter = false;

      if (Number.isNaN(secondChar)) {
        isCharacter = true;
      }

      if (isCharacter && idNumber.length === 9) {
        // idNumber.match
        idNumber = idNumber.replace(/^([a-zA-Z]{1,2})(\d{6})(\d{1})$/, '$1$2($3)');
        maxlengthValue = 11;
      } else if (!isCharacter && idNumber.length === 8) {
        idNumber = idNumber.replace(/^([a-zA-Z]{1})(\d{6})(\d{1})$/, '$1$2($3)');
        maxlengthValue = 10;
      } else {
        maxlengthValue = 11;
      }


      if (isCharacter && idNumber.length === 9) {
        idNumber.match
        idNumber = idNumber.replace(/^([a-zA-Z]{1,2})(\d{6})(\d{1})$/, '$1$2($3)');
        maxlengthValue = 11;
      } else if (!isCharacter && idNumber.length === 8) {
        idNumber = idNumber.replace(/^([a-zA-Z]{1})(\d{6})(\d{1})$/, '$1$2($3)');
        maxlengthValue = 10;
      } else {
        maxlengthValue = 11;
      }


      this.setIdNumber(idNumber);
      this.setMaxlength(maxlengthValue);
    }
  }
  isCountryCodeHK(countryCode) {
    return countryCode == '852';
  }


  validateContactNumber(countryCode, contactNum, errorArr) {
    if (countryCode == null && contactNum == null) {
      errorArr.push('Please input a contact telephone no.');
    } else if (countryCode != null && contactNum == null) {
      errorArr.push('Please input a contact telephone no.');
    } else if (!(this.countryCodeRegex.test(countryCode)) || !(this.phoneRegex.test(contactNum))) {
      errorArr.push('Please input a valid contact telephone no.');
    } else if (countryCode == '852' && !(this.hkPhoneRegex.test(contactNum))) {
      errorArr.push('Please provide contact telephone no. in Hong Kong.')
    } else if (countryCode == null && contactNum != null) {
      errorArr.push('Please input a country code.');
    }
    return errorArr;
  }


  isValidContactNumber(countryCode, contactNum) {
    if (countryCode == null && contactNum == null) {
      return 1;
    } else if (countryCode != null && contactNum == null) {
      return 1;
    } else if (!(this.countryCodeRegex.test(countryCode)) || !(this.phoneRegex.test(contactNum))) {
      return 2;
    } else if (countryCode == '852' && !(this.hkPhoneRegex.test(contactNum))) {
      return 3;
    } else if (countryCode == null && contactNum != null) {
      return 4;
    } else {
      return 0;
    }
  }

  isTravelDocValid(traDoc, length) {
    if (length == 6) {
      return (!traDoc.match(this.travelDocRegexforSix)) ? false : true;
    } else if (length == 8) {
      return (!traDoc.match(this.travelDocRegexforSix)) ? false : true;
    }
  }

  isValidContactNumberForSuppl(contactNum) {
    if (!(this.hkPhoneRegex.test(contactNum))) {
      return false;
    } else {
      return true;
    }
  }



  isValidName(name) {
    if (!(this.nameRegex.test(name))) {
      return false;
    } else {
      return true;
    }
  }

  nameMaskOnInput(name): string {
    const regex = /[^ a-z.'-]/gi;
    if (name == '' || name == null || name == undefined) {
      return '';
    }
    if (name.charAt(0) === '-' || name.charAt(0) === '.') {
      return '';
    }
    return name.replace(regex, '');
  }

  nameMaskWithCommaEnglish(name): string {
    const regex = /[^ a-z.',-]/gi;
    if (name === '' || name == null || name === undefined) {
      return '';
    }
    if (name.charAt(0) === '-' || name.charAt(0) === '.') {
      return '';
    }
    return name.replace(regex, '');
  }

  nameMaskWithCommaAndChinese(name): string {
    const regex = /[^\ a-z,-.'\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]/gi;
    if (name == '' || name == null || name == undefined) {
      return '';
    }
    if (name.charAt(0) === '-' || name.charAt(0) === '.' || name.charAt(0) === ',') {
      return '';
    }
    return name.replace(regex, '');
  }

  chineseSpacePreventer(name): string {
    return name.replace(' ', '');
  }

  nameMaskchinesePreventer(name): string {
    const chineseRegex = /^[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+$/g;

    if (name == '' || name == null || name == undefined) {
      return '';
    }
    return name.replace(chineseRegex, '');
  }

  startWithSpaceMask(name): string {
    const spaceRegex = /\s/g;
    if (name === '' || name === null || name === undefined) {
      return '';
    }
    if (name.charAt(0).match(spaceRegex)) {
      return '';
    }
    return name;
  }
  /* End of Class */
}








