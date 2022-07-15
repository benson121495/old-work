import { FormControl } from "@angular/forms";

export class AppointmentValidationUtils {

    static travelDocRegexforEigth = /^([0-9]){8}$/;
 /**
   * Check the Travel Document is valid
   */
  static validateTravelDocument(control: FormControl) {
    if (control.value == '' || control.value == null) {
      return null;
    } else if (!(AppointmentValidationUtils.travelDocRegexforEigth.test(control.value))) {
      return { "invalid": true };
    }
  }

}