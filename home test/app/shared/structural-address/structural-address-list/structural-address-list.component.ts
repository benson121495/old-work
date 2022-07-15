import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { structural } from '../structural-address.model';
import { StructuralAddressService } from '../structural-address.service';
import { CommonService } from 'src/app/common.service';
import { ValidationUtils } from 'src/app/utils/validation-utils';

@Component({
  selector: 'app-structural-address-list',
  templateUrl: './structural-address-list.component.html',
  styleUrls: ['./structural-address-list.component.css']
})
export class StructuralAddressListComponent implements OnInit, AfterViewInit {
  @Input() inputFormGroup: FormGroup;
  browserLang: string;
  structModel: structural;
  regionName = '';
  HospitalSubmitted = false;

  errorCode = true;

  deathAppId = '502';
  birthAppId = '568';

  subDistList: any[];
  subDistList2: any[];
  structuralAddress = '';
  othersDisplay = '0';
  othersDisplay2 = '0';
  private validationUtils: ValidationUtils;

  constructor(
    private translate: TranslateService,
    public commonService: CommonService,
    private formBuilder: FormBuilder,
    private structService: StructuralAddressService
  ) {
    this.browserLang = this.translate.currentLang;
    this.validationUtils = new ValidationUtils();
  }

  ngOnInit() {
    this.structModel = this.structService.structModel;
    this.setLanguage();
    this.createControls();
    this.enableDisableHospitalAddress();
    this.radioAddrTypeSelect();

    this.setDistrictData();
    this.subDistList = this.DistrictList;
  }

  setDistrictData() {

    if (this.structModel !== undefined) {

      // this.inputFormGroup.controls.hospAddress.setValue(this.structModel.hospAddress);

      if (this.structModel.areaHospital !== undefined) {
        this.processSelected(this.structModel.areaHospital);
        this.translateReg(this.structModel.areaHospital);
      }
      if (this.structModel.districtHospital !== undefined) {
        this.changeToOtherHospital(this.structModel.districtHospital);
        this.inputFormGroup.controls.districtHospital.setValue(this.structModel.districtHospital);
      }
      if (this.structModel.areaValue !== undefined) {
        this.processSelectedOthers(this.structModel.areaValue);
        this.translateReg(this.structModel.areaValue);
      }
      if (this.structModel.districtValue !== undefined) {
        this.changeToOthers(this.structModel.districtValue);
        this.inputFormGroup.controls.districtValue.setValue(this.structModel.districtValue);
      }

      this.inputFormGroup.controls.hospAddress.setValue(this.structModel.hospAddress === '' ? 'H' : this.structModel.hospAddress);

    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.validateDistrict();
    });
  }

  reset() {
    this.enableDisableHospitalAddress();
    this.createControls();
    this.resetModel();
    this.HospitalSubmitted = false;
  }

  setLanguage() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.browserLang = event.lang;
    });
  }

  setLanguageValidation(string: string) {
    if (this.browserLang !== 'en-US') {
      this.isSimplifiedChineseCheck(string);
    }
  }

  cutValues(key: any, field: string) {
    this.inputFormGroup.get(field).setValue(this.addressField(key));
  }

  // tslint:disable-next-line:member-ordering
  addressField(value): string {
    if (this.browserLang === 'en-US') {
      // English only
      const regex = /[^\ a-z,0-9,-.()*&^%$#@!' ]/gi;
      const regex2 = /(  )/gi;
      if (value === '' || value === null || value === undefined) {
        return '';
      }
      if (value.charAt(0) === ' ') {
        value = value.slice(1);
      }
      if (value.charAt(0) === '-' || value.charAt(0) === '.') {
        return '';
      }
      if (value.charAt(value.length - 1) === ' ' && value.charAt(value.length - 2) === ' ') {
        return value.slice(0, value.length - 1);
      }
      value = value.replace(regex2, ' ');
      return value.replace(regex, '');

    } else {
      // English and traditional chinese only
      const regex = /[^\ a-z,0-9,-.()*&^%$#@!'\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]/gi;
      const regex2 = /(  )/gi;
      if (value === '' || value === null || value === undefined) {
        return '';
      }

      if (value.charAt(0) === ' ') {
        value = value.slice(1);
      }

      if (value.charAt(0) === '-' || value.charAt(0) === '.') {
        return '';
      }
      value = value.replace(regex2, ' ');
      return value.replace(regex, '');

    }
  }

  // tslint:disable-next-line: member-ordering
  public regionList: any[] = [
    { label: 'ADDRESS_LOOKUP.REGION.HK', value: 'HK' },
    { label: 'ADDRESS_LOOKUP.REGION.KLN', value: 'KLN' },
    { label: 'ADDRESS_LOOKUP.REGION.NT', value: 'NT' },
    { label: 'ADDRESS_LOOKUP.REGION.OI', value: 'OI' }
  ];

  createControls() {
    // tslint:disable-next-line: max-line-length
    this.inputFormGroup.addControl('hospAddress', new FormControl((this.structModel.hospAddress == '' ? 'H' : this.structModel.hospAddress)));
    this.inputFormGroup.addControl('hkAddRadio', new FormControl(this.structModel.hkAddRadio));
    this.inputFormGroup.addControl('hospitalName', new FormControl(this.structModel.hospitalName));
    this.inputFormGroup.addControl('streetHospitalValue', new FormControl(this.structModel.streetHospitalValue));
    this.inputFormGroup.addControl('areaHospital', new FormControl(this.structModel.areaHospital, { validators: [] }));
    this.inputFormGroup.addControl('districtHospital', new FormControl(this.structModel.districtHospital, { validators: [] }));
    this.inputFormGroup.addControl('otherDistrictHospital', new FormControl(this.structModel.otherDistrictHospital, { validators: [] }));
    this.inputFormGroup.addControl('roomValue', new FormControl(this.structModel.roomValue));
    this.inputFormGroup.addControl('floorValue', new FormControl(this.structModel.floorValue));
    this.inputFormGroup.addControl('blockValue', new FormControl(this.structModel.blockValue));
    this.inputFormGroup.addControl('buildingValue', new FormControl(this.structModel.buildingValue));
    this.inputFormGroup.addControl('estateValue', new FormControl(this.structModel.estateValue));
    this.inputFormGroup.addControl('streetValue', new FormControl(this.structModel.streetValue));
    this.inputFormGroup.addControl('areaValue', new FormControl(this.structModel.areaValue, { validators: [] }));
    this.inputFormGroup.addControl('districtValue', new FormControl(this.structModel.districtValue, { validators: [] }));
    this.inputFormGroup.addControl('otherinfoValue', new FormControl(this.structModel.otherinfoValue));
    this.inputFormGroup.addControl('otherDistrictValue', new FormControl(this.structModel.otherDistrictValue));

  }

  radioAddrTypeSelect() {
    const hospName = this.inputFormGroup.get('hospitalName');
    const hospStreet = this.inputFormGroup.get('streetHospitalValue');
    const hospArea = this.inputFormGroup.get('areaHospital');
    const hospdist = this.inputFormGroup.get('districtHospital');

    const roomValue = this.inputFormGroup.get('roomValue');
    const floorValue = this.inputFormGroup.get('floorValue');
    const blockValue = this.inputFormGroup.get('blockValue');
    const buildingValue = this.inputFormGroup.get('buildingValue');
    const estateValue = this.inputFormGroup.get('estateValue');
    const streetValue = this.inputFormGroup.get('streetValue');
    const areaValue = this.inputFormGroup.get('areaValue');
    const districtValue = this.inputFormGroup.get('districtValue');
    const otherinfoValue = this.inputFormGroup.get('otherinfoValue');

    this.inputFormGroup.get('hospAddress').valueChanges.subscribe(
      (mode: string) => {

        if (mode === 'H') {
          hospName.enable();
          hospStreet.enable();
          hospArea.enable();
          hospArea.setValidators([Validators.required]);
          hospdist.enable();
          hospdist.setValidators([Validators.required]);

          // Disable Non-Hospital names
          roomValue.disable();
          roomValue.reset();
          roomValue.clearValidators();

          floorValue.disable();
          floorValue.reset();
          floorValue.clearValidators();

          blockValue.disable();
          blockValue.reset();
          blockValue.clearValidators();

          buildingValue.disable();
          buildingValue.reset();
          buildingValue.clearValidators();

          estateValue.disable();
          estateValue.reset();
          estateValue.clearValidators();

          streetValue.disable();
          streetValue.reset();
          streetValue.clearValidators();

          areaValue.disable();
          areaValue.setValue('');
          areaValue.clearValidators();

          districtValue.disable();
          districtValue.setValue('');
          districtValue.clearValidators();

          otherinfoValue.disable();
          otherinfoValue.reset();
          otherinfoValue.clearValidators();
          this.resetModel();

        } else if (mode === 'NH') {

          hospName.disable();
          hospStreet.disable();
          hospArea.disable();
          hospdist.disable();

          hospName.reset();
          hospStreet.reset();
          hospArea.setValue('');
          hospdist.setValue('');

          hospName.clearValidators();
          hospStreet.clearValidators();
          hospArea.clearValidators();
          hospdist.clearValidators();

          roomValue.enable();
          floorValue.enable();
          blockValue.enable();
          buildingValue.enable();
          estateValue.enable();
          streetValue.enable();
          areaValue.enable();
          districtValue.enable();
          areaValue.setValidators([Validators.required]);
          districtValue.setValidators([Validators.required]);
          otherinfoValue.enable();
          this.resetModel();
        }

        hospName.updateValueAndValidity();
        hospStreet.updateValueAndValidity();
        hospArea.updateValueAndValidity();
        hospdist.updateValueAndValidity();

        roomValue.updateValueAndValidity();
        floorValue.updateValueAndValidity();
        blockValue.updateValueAndValidity();
        buildingValue.updateValueAndValidity();
        estateValue.updateValueAndValidity();
        streetValue.updateValueAndValidity();
        areaValue.updateValueAndValidity();
        districtValue.updateValueAndValidity();
        otherinfoValue.updateValueAndValidity();
      });
  }

  enableDisableHospitalAddress() {

    const hospName = this.inputFormGroup.get('hospitalName');
    const hospStreet = this.inputFormGroup.get('streetHospitalValue');
    const hospArea = this.inputFormGroup.get('areaHospital');
    const hospdist = this.inputFormGroup.get('districtHospital');

    const roomValue = this.inputFormGroup.get('roomValue');
    const floorValue = this.inputFormGroup.get('floorValue');
    const blockValue = this.inputFormGroup.get('blockValue');
    const buildingValue = this.inputFormGroup.get('buildingValue');
    const estateValue = this.inputFormGroup.get('estateValue');
    const streetValue = this.inputFormGroup.get('streetValue');
    const areaValue = this.inputFormGroup.get('areaValue');
    const districtValue = this.inputFormGroup.get('districtValue');
    const otherinfoValue = this.inputFormGroup.get('otherinfoValue');

    const hospAddress = this.inputFormGroup.get('hospAddress');
    this.inputFormGroup.get('placeOfBirth').valueChanges.subscribe(
      (mode: string) => {

        // If the place of birth is changed
        hospAddress.reset();
        hospAddress.clearValidators();

        // Disable Non-Hospital names
        roomValue.reset();
        roomValue.clearValidators();

        floorValue.reset();
        floorValue.clearValidators();

        blockValue.reset();
        blockValue.clearValidators();

        buildingValue.reset();
        buildingValue.clearValidators();

        estateValue.reset();
        estateValue.clearValidators();

        streetValue.reset();
        streetValue.clearValidators();

        areaValue.reset();
        areaValue.clearValidators();

        districtValue.reset();
        districtValue.clearValidators();

        otherinfoValue.reset();
        otherinfoValue.clearValidators();

        hospName.reset();
        hospStreet.reset();
        hospArea.reset();
        hospdist.reset();

        hospName.clearValidators();
        hospStreet.clearValidators();
        hospArea.clearValidators();
        hospdist.clearValidators();

        hospName.updateValueAndValidity();
        hospStreet.updateValueAndValidity();
        hospArea.updateValueAndValidity();
        hospdist.updateValueAndValidity();

        roomValue.updateValueAndValidity();
        floorValue.updateValueAndValidity();
        blockValue.updateValueAndValidity();
        buildingValue.updateValueAndValidity();
        estateValue.updateValueAndValidity();
        streetValue.updateValueAndValidity();
        areaValue.updateValueAndValidity();
        districtValue.updateValueAndValidity();
        otherinfoValue.updateValueAndValidity();

        hospName.disable();
        hospStreet.disable();
        hospArea.disable();
        hospdist.disable();
        roomValue.disable();
        floorValue.disable();
        blockValue.disable();
        buildingValue.disable();
        estateValue.disable();
        streetValue.disable();
        areaValue.disable();
        districtValue.disable();
        otherinfoValue.disable();

      });

    if (hospAddress.value == '' || hospAddress.value == null || hospAddress.value == 'H') {
      hospAddress.setValue('H');
      hospAddress.updateValueAndValidity();

      hospName.enable();
      hospStreet.enable();
      hospArea.enable();
      hospArea.setValidators([Validators.required]);
      hospdist.enable();
      hospdist.setValidators([Validators.required]);

      hospName.updateValueAndValidity();
      hospStreet.updateValueAndValidity();
      hospArea.updateValueAndValidity();
      hospdist.updateValueAndValidity();

      roomValue.disable();
      floorValue.disable();
      blockValue.disable();
      buildingValue.disable();
      estateValue.disable();
      streetValue.disable();
      areaValue.disable();
      districtValue.disable();
      otherinfoValue.disable();
    }

  }

  resetModel() {
    this.structModel.hkAddRadio = '';
    this.structModel.hospAddress = '';
    this.structModel.hospitalName = '';
    this.structModel.streetHospitalValue = '';
    this.structModel.areaHospital = '';
    this.structModel.districtValue = '';
    this.structModel.roomValue = '';
    this.structModel.floorValue = '';
    this.structModel.blockValue = '';
    this.structModel.buildingValue = '';
    this.structModel.estateValue = '';
    this.structModel.streetValue = '';
    this.structModel.areaValue = '';
    this.structModel.districtHospital = '';
    this.structModel.otherinfoValue = '';
  }

  setToModel() {

    this.structModel.hospAddress = this.inputFormGroup.controls.hospAddress.value;
    this.structModel.hospitalName = this.inputFormGroup.controls.hospitalName.value;
    this.structModel.streetHospitalValue = this.inputFormGroup.controls.streetHospitalValue.value;
    this.structModel.areaHospital = this.inputFormGroup.controls.areaHospital.value;
    this.structModel.districtHospital = this.inputFormGroup.controls.districtHospital.value;
    this.structModel.otherDistrictHospital = this.inputFormGroup.controls.otherDistrictHospital.value;
    this.structModel.roomValue = this.inputFormGroup.controls.roomValue.value;
    this.structModel.floorValue = this.inputFormGroup.controls.floorValue.value;
    this.structModel.blockValue = this.inputFormGroup.controls.blockValue.value;
    this.structModel.buildingValue = this.inputFormGroup.controls.buildingValue.value;
    this.structModel.estateValue = this.inputFormGroup.controls.estateValue.value;
    this.structModel.streetValue = this.inputFormGroup.controls.streetValue.value;
    this.structModel.areaValue = this.inputFormGroup.controls.areaValue.value;
    this.structModel.districtValue = this.inputFormGroup.controls.districtValue.value;
    this.structModel.otherinfoValue = this.inputFormGroup.controls.otherinfoValue.value;
    this.structModel.otherDistrictValue = this.inputFormGroup.controls.otherDistrictValue.value;

    this.formatHospitalAddress();
  }

  // set Hospital address
  formatHospitalAddress() {
    const hospAddress = this.inputFormGroup.get('hospAddress').value;
    let hospitalName = this.inputFormGroup.get('hospitalName').value;
    let hospStreet = this.inputFormGroup.get('streetHospitalValue').value;
    const hospArea = this.inputFormGroup.get('areaHospital').value;
    const hospdist = this.inputFormGroup.get('districtHospital').value;

    let roomValue = this.inputFormGroup.get('roomValue').value;
    let floorValue = this.inputFormGroup.get('floorValue').value;
    let blockValue = this.inputFormGroup.get('blockValue').value;
    let buildingValue = this.inputFormGroup.get('buildingValue').value;
    let estateValue = this.inputFormGroup.get('estateValue').value;
    let streetValue = this.inputFormGroup.get('streetValue').value;
    const areaValue = this.inputFormGroup.get('areaValue').value;
    const districtValue = this.inputFormGroup.get('districtValue').value;
    let otherinfoValue = this.inputFormGroup.get('otherinfoValue').value;
    this.structuralAddress = '';

    if (hospitalName) {
      hospitalName = hospitalName.toUpperCase();
    }
    if (hospStreet) {
      hospStreet = hospStreet.toUpperCase();
    }
    if (roomValue) {
      roomValue = roomValue.toUpperCase();
    }
    if (floorValue) {
      floorValue = floorValue.toUpperCase();
    }
    if (blockValue) {
      blockValue = blockValue.toUpperCase();
    }
    if (buildingValue) {
      buildingValue = buildingValue.toUpperCase();
    }
    if (estateValue) {
      estateValue = estateValue.toUpperCase();
    }
    if (streetValue) {
      streetValue = streetValue.toUpperCase();
    }
    if (otherinfoValue) {
      otherinfoValue = otherinfoValue.toUpperCase();
    }

    if (this.browserLang === 'en-US') {

      if (this.structModel.hospAddress === 'H') {
        if (hospitalName !== '' && hospitalName !== null) {
          this.structuralAddress = hospitalName.trim() + ', ';
        }
        if (hospStreet !== '' && hospStreet !== null) {
          this.structuralAddress += hospStreet.trim() + ', ';
        }
        if (hospdist !== '' && hospdist !== null) {
          this.structuralAddress += this.getTranslated(hospdist.trim()) + ', ';
        }
        if (hospArea !== '' && hospArea !== null) {
          this.structuralAddress += this.setAreaValue(hospArea.trim());
        }
      } else {
        if (roomValue !== '' && roomValue !== null) {
          this.structuralAddress = 'RM/FLAT ' + roomValue.trim() + ', ';
        }
        if (floorValue !== '' && floorValue !== null) {
          this.structuralAddress += floorValue.trim() + '/F, ';
        }
        if (blockValue !== '' && blockValue !== null) {
          this.structuralAddress += 'BLK ' + blockValue.trim() + '\n';
        }
        if (buildingValue !== '' && buildingValue !== null) {
          this.structuralAddress += buildingValue.trim() + '\n';
        }
        if (estateValue !== '' && estateValue !== null) {
          this.structuralAddress += estateValue.trim() + '\n';
        }
        if (streetValue !== '' && streetValue !== null) {
          this.structuralAddress += streetValue.trim() + ', ';
        }
        if (districtValue !== '' && districtValue !== null) {
          this.structuralAddress += this.getTranslated(districtValue.trim()) + ', ';
        }
        if (areaValue !== '' && areaValue !== null) {
          this.structuralAddress += this.setAreaValue(areaValue.trim());
        }
      }

    } else {

      if (this.structModel.hospAddress === 'H') {

        if (hospArea !== '' && hospArea !== null) {
          this.structuralAddress += this.setAreaValue(hospArea.trim()) + ' ';
        }
        if (hospdist !== '' && hospdist !== null) {
          this.structuralAddress += this.getTranslated(hospdist.trim()) + '\n';
        }
        if (hospStreet !== '' && hospStreet !== null) {
          this.structuralAddress += hospStreet.trim() + ' ';
        }
        if (hospitalName !== '' && hospitalName !== null) {
          this.structuralAddress += hospitalName.trim();
        }

      } else {

        if (areaValue !== '' && areaValue !== null) {
          this.structuralAddress += this.setAreaValue(areaValue.trim()) + ' ';
        }
        if (districtValue !== '' && districtValue !== null) {
          this.structuralAddress += this.getTranslated(districtValue.trim()) + '\n';
        }
        if (streetValue !== '' && streetValue !== null) {
          this.structuralAddress += streetValue.trim() + '\n';
        }
        if (estateValue !== '' && estateValue !== null) {
          this.structuralAddress += estateValue.trim() + '\n';
        }
        if (buildingValue !== '' && buildingValue !== null) {
          this.structuralAddress += buildingValue.trim() + ' ';
        }
        if (blockValue !== '' && blockValue !== null) {
          this.structuralAddress += blockValue.trim() + '座 ';
        }
        if (floorValue !== '' && floorValue !== null) {
          this.structuralAddress += floorValue.trim() + '樓 ';
        }
        if (roomValue !== '' && roomValue !== null) {
          this.structuralAddress = roomValue.trim() + '室/號';
        }

      }
    }
  }

  // Check String in only in English no Chinese allowed.
  checkNameForChinese(formControlName: string) {
    let fControl: AbstractControl = this.inputFormGroup.get(formControlName);
    let value: string = fControl.value;
    const chineseRegex = /[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]/;
    let result: boolean;

    if (fControl.value != '' && fControl.value != null) {

      for (var i = 0; i < fControl.value.length; i++) {
        if (chineseRegex.test(fControl.value.charAt(i))) {
          fControl.setErrors({ isChinese: true });
        }
      }
    }
  }

  // Accepts all except simplifies chinese 
  isSimplifiedChineseCheck(formControlName: string) {
    let fControl: AbstractControl = this.inputFormGroup.get(formControlName);
    let value: string = fControl.value;
    let result: boolean;

    if (fControl.value != undefined && fControl.value != null && fControl.value != '') {

      this.commonService.tradChineseAndEnglish(value).subscribe(
        (response) => {

          result = JSON.parse(JSON.stringify(response));

          if (!result) {
            fControl.setErrors({ isSimplifiedChineseCheck: true });
          }

        }, (err) => {

          console.log('Error: ' + err);

        });
    }
  }

  public setAreaValue(data: string): string {
    if (this.translate.currentLang === 'en-US') {
      if (data === 'HK') {
        return 'HONG KONG';
      } else if (data === 'KLN') {
        return 'KOWLOON';
      } else if (data === 'NT') {
        return 'NEW TERRITORIES';
      } else {
        return 'OUTLYING ISLANDS';
      }
    } else {
      if (data === 'HK') {
        return '香港';
      } else if (data === 'KLN') {
        return '九龍';
      } else if (data === 'NT') {
        return '新界';
      } else {
        return '離島';
      }
    }

  }

  private getTranslated(data: string) {
    let res: string;
    this.translate.get(data).subscribe(response => {
      res = response;
    });
    return res;
  }

  public translateReg(data: string) {
    if (data === 'HK') {
      this.regionName = 'HONG KONG';
    } else if (data === 'KLN') {
      this.regionName = 'KOWLOON';
    } else if (data === 'NT') {
      this.regionName = 'NEW TERRITORIES';
    } else {
      this.regionName = 'OUTLYING ISLANDS';
    }
  }

  private langCode() {

    if (this.browserLang === 'en-US') {
      return 'eng';
    } else if (this.browserLang === 'zh-HK') {
      return 'chi';
    } else if (this.browserLang === 'zh-CN') {
      return 'sChi';
    } else {
      return 'eng';
    }
  }


  processSelected(data: string) {
    this.othersDisplay = '0';
    this.inputFormGroup.get('otherDistrictHospital').reset();
    if (data !== '') {
      this.subDistList = this.DistrictList;
      this.subDistList.forEach((obj) => {

        if (data === 'OI' && obj.value === 'Z') {
          this.inputFormGroup.get('districtHospital').setValue(obj.label);
        } else if (data === 'HK' && obj.value === '0') {
          this.inputFormGroup.get('districtHospital').setValue(obj.label);
        } else if (data === 'KLN' && obj.value === '28') {
          this.inputFormGroup.get('districtHospital').setValue(obj.label);
        } else if (data === 'NT' && obj.value === '59') {
          this.inputFormGroup.get('districtHospital').setValue(obj.label);
        }

      });
    }
    this.validateDistrict();
    console.log('Hospital GROUP --> ', this.inputFormGroup);
  }

  changeToOtherHospital(data: string) {
    if (data === 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.Q') {
      this.othersDisplay = '1';
      this.inputFormGroup.controls['otherDistrictHospital'].setValidators([Validators.required]);
      this.inputFormGroup.controls['otherDistrictHospital'].updateValueAndValidity();
    } else {
      this.othersDisplay = '0';
      this.inputFormGroup.controls['otherDistrictHospital'].clearValidators();
      this.inputFormGroup.controls['otherDistrictHospital'].updateValueAndValidity();
    }
  }

  processSelectedOthers(data: string) {

    this.othersDisplay2 = '0';
    this.inputFormGroup.get('otherDistrictValue').reset();
    if (data !== '') {
      this.subDistList2 = this.DistrictList;
      this.subDistList2.forEach((obj) => {

        if (data === 'OI' && obj.value === 'Z') {
          this.inputFormGroup.get('districtValue').setValue(obj.label);
        } else if (data === 'HK' && obj.value === '0') {
          this.inputFormGroup.get('districtValue').setValue(obj.label);
        } else if (data === 'KLN' && obj.value === '28') {
          this.inputFormGroup.get('districtValue').setValue(obj.label);
        } else if (data === 'NT' && obj.value === '59') {
          this.inputFormGroup.get('districtValue').setValue(obj.label);
        }

      });
    }
    this.validateDistrict();
  }

  changeToOthers(data: string) {
    if (data === 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.Q') {
      this.othersDisplay2 = '1';
      this.inputFormGroup.controls['otherDistrictValue'].setValidators([Validators.required]);
      this.inputFormGroup.controls['otherDistrictValue'].updateValueAndValidity();
    } else {
      this.othersDisplay2 = '0';
      this.inputFormGroup.controls['otherDistrictValue'].clearValidators();
      this.inputFormGroup.controls['otherDistrictValue'].updateValueAndValidity();
    }
  }

  resetError() {
    // this.errorAddress = [];
    // this.errorAddress2 = [];
    // this.errorAddress3 = [];
    // this.errorAddress4 = [];
  }

  // tslint:disable-next-line:member-ordering
  private distList_new: any[] = [{
    'districtCd': 'HK',
    'engName': 'Hong Kong',
    'sChiName': '香港',
    'chiName': '香港',
    'region': 'HK',
  },
  {
    'districtCd': 'KLN',
    'engName': 'KOWLOON',
    'sChiName': '九龙',
    'chiName': '九龍',
    'region': 'KLN',
  },
  {
    'districtCd': 'NT',
    'engName': 'NEW TERRITORIES',
    'sChiName': '新界',
    'chiName': '新界',
    'region': 'NT',
  },
  {
    'districtCd': 'OI',
    'engName': 'OUTLYING ISLANDS',
    'sChiName': '离岛',
    'chiName': '離島',
    'region': 'OI',
  }];

  // tslint:disable-next-line: member-ordering
  private DistrictList: any[] = [
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.0', value: '0' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.1', value: '1' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.2', value: '2' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.3', value: '3' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.4', value: '4' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.5', value: '5' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.6', value: '6' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.7', value: '7' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.8', value: '8' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.9', value: '9' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.10', value: '10' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.11', value: '11' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.12', value: '12' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.13', value: '13' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.14', value: '14' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.15', value: '15' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.16', value: '16' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.17', value: '17' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.18', value: '18' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.19', value: '19' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.20', value: '20' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.21', value: '21' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.22', value: '22' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.23', value: '23' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.24', value: '24' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.25', value: '25' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.26', value: '26' },
    { label: 'DISTRICT_LOOKUP_NEW.HKDISTRICT.27', value: '27' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.28', value: '28' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.29', value: '29' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.30', value: '30' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.31', value: '31' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.32', value: '32' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.33', value: '33' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.34', value: '34' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.35', value: '35' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.36', value: '36' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.37', value: '37' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.38', value: '38' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.39', value: '39' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.40', value: '40' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.41', value: '41' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.42', value: '42' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.43', value: '43' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.44', value: '44' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.45', value: '45' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.46', value: '46' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.47', value: '47' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.48', value: '48' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.49', value: '49' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.50', value: '50' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.51', value: '51' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.52', value: '52' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.53', value: '53' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.54', value: '54' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.55', value: '55' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.56', value: '56' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.57', value: '57' },
    { label: 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.58', value: '58' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.59', value: '59' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.60', value: '60' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.61', value: '61' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.62', value: '62' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.63', value: '63' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.64', value: '64' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.65', value: '65' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.66', value: '66' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.67', value: '67' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.68', value: '68' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.69', value: '69' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.70', value: '70' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.71', value: '71' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.72', value: '72' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.73', value: '73' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.74', value: '74' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.75', value: '75' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.76', value: '76' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.77', value: '77' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.78', value: '78' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.79', value: '79' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.80', value: '80' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.81', value: '81' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.82', value: '82' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.83', value: '83' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.84', value: '84' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.85', value: '85' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.86', value: '86' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.87', value: '87' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.88', value: '88' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.89', value: '89' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.90', value: '90' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.91', value: '91' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.92', value: '92' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.93', value: '93' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.94', value: '94' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.95', value: '95' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.96', value: '96' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.97', value: '97' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.98', value: '98' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.99', value: '99' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.100', value: '100' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.101', value: '101' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.102', value: '102' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.103', value: '103' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.104', value: '104' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.105', value: '105' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.106', value: '106' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.107', value: '107' },
    { label: 'DISTRICT_LOOKUP_NEW.NTDISTRICT.108', value: '108' },
    { label: 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.Z', value: 'Z' },
    { label: 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.A', value: 'A' },
    { label: 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.B', value: 'B' },
    { label: 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.C', value: 'C' },
    { label: 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.D', value: 'D' },
    { label: 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.E', value: 'E' },
    { label: 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.F', value: 'F' },
    { label: 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.G', value: 'G' },
    { label: 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.H', value: 'H' },
    { label: 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.I', value: 'I' },
    { label: 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.J', value: 'J' },
    { label: 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.K', value: 'K' },
    { label: 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.L', value: 'L' },
    { label: 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.M', value: 'M' },
    { label: 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.N', value: 'N' },
    { label: 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.O', value: 'O' },
    { label: 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.P', value: 'P' },
    { label: 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.Q', value: 'Q' }
  ];

  get f() {
    return this.inputFormGroup.controls;
  }

  get g() {
    return this.inputFormGroup;
  }

  validateDistrict() {
    const districtName = this.inputFormGroup.get('districtValue').value;
    const districtNamelet: AbstractControl = this.inputFormGroup.get('districtValue');
    const districtHospital = this.inputFormGroup.get('districtHospital').value;
    const districtHospitallet: AbstractControl = this.inputFormGroup.get('districtHospital');

    const hospAddress = this.inputFormGroup.get('hospAddress').value;

    if (hospAddress === 'NH') {
      if (districtName == null || districtName === '' ||
        districtName === 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.28' ||
        districtName === 'DISTRICT_LOOKUP_NEW.HKDISTRICT.0' ||
        districtName === 'DISTRICT_LOOKUP_NEW.NTDISTRICT.59' ||
        districtName === 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.Z') {
        districtNamelet.setErrors({ districtEmpty: true });
        return;
      }
    } else if (hospAddress === 'H') {
      if (districtHospital == null ||
        districtHospital === '' ||
        districtHospital === 'DISTRICT_LOOKUP_NEW.KLNDISTRICT.28' ||
        districtHospital === 'DISTRICT_LOOKUP_NEW.HKDISTRICT.0' ||
        districtHospital === 'DISTRICT_LOOKUP_NEW.NTDISTRICT.59' ||
        districtHospital === 'DISTRICT_LOOKUP_NEW.OUTLYINGISLANDS.Z') {
        districtHospitallet.setErrors({ districtHospitalEmpty: true });
        return;
      }
    }
  }
}


