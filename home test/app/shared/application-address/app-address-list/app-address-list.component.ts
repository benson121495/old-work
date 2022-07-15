
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CommonService } from 'src/app/common.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { ApplicationsAddress } from '../application-address.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-residential-address-list',
  templateUrl: './app-address-list.component.html',
  styleUrls: ['./app-address-list.component.css']
})
export class AppAddressListComponent implements OnInit {
  prefix: string;
  @Input() inputFormGroup: FormGroup;
  @Input() set ObjInput({ prefix }) {
    this.prefix = prefix;
  }
  addressModel: ApplicationsAddress;
  selectedCountry: any;
  selectedLocation: string;
  collectionOfficesOfSelected: any;
  collectionOfficesOfSelectedCountry: any;
  strIdentifier: string;

  listOfCountries = [];
  totalAddress: string;

  listOfRegionsAndCountries = [];
  showCountryDropDown = false;
  showRegionDropDown = false;

  modal: HTMLElement;
  regionName: string = '';
  hasAddress = false;

  areaList: any[];
  subDistList: any[];
  streetList: any[];
  bldgList: any[];
  estateList: any[];
  selectedRegion: any = '';
  subDistrictSelected: string;

  // misc
  addressDisplay: string;
  submitted = false;
  otherInfoMan = 0;
  browserLang: string;
  othersDisplay: string = '0';
  popUpLang: string;
  private addressTypeSubscriber: Subscription;


  @Output() navEvent = new EventEmitter();

  constructor(
    private translate: TranslateService,
    public commonService: CommonService,
    private formBuilder: FormBuilder) {
    this.browserLang = this.translate.currentLang;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.addressDisplay = this.inputFormGroup.controls.addressDisplay.value;
    this.addressModel = ApplicationsAddress.newInstance();
    this.createControls();
    this.setAddressType();
    this.setLanguage();
    this.addressLangChange();

  }

  setLanguage() {
    if (this.commonService.addressLang) {
      this.inputFormGroup.get('addLang').setValue(this.commonService.addressLang);
      if (this.commonService.addressLang === 'en') {
        this.inputFormGroup.get('addLang').setValue('en');
        this.popUpLang = 'en';
        this.areaList = this.areaListEN;
        this.subDistList = this.DistrictListEN;
      } else {
        this.inputFormGroup.get('addLang').setValue('ch');
        this.popUpLang = 'ch';
        this.areaList = this.areaListHK;
        this.subDistList = this.DistrictListHK;
      }
    } else {
      this.handleAddressLangChange();
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        if (!this.commonService.addressLang) {
          this.handleAddressLangChange();
        }
      });
    }
  }

  handleAddressLangChange() {
    // Set the language to input type.
    if (this.translate.currentLang === 'en-US') {
      this.inputFormGroup.get('addLang').setValue('en');
      this.areaList = this.areaListEN;
      this.subDistList = this.DistrictListEN;
      this.popUpLang = 'en';
    } else {
      this.inputFormGroup.get('addLang').setValue('ch');
      this.areaList = this.areaListHK;
      this.subDistList = this.DistrictListHK;
      this.popUpLang = 'ch';
    }
  }

  addressLangChange() {
    this.inputFormGroup.get('addLang').valueChanges.subscribe(
      (mode: string) => {

        if (mode === 'en') {
          this.addressModel.addLang = 'en';
          this.popUpLang = 'en';

        } else {
          this.addressModel.addLang = 'ch';
          this.popUpLang = 'ch';
        }

      });
  }

  // ? ON RADIO CHANGE OF THE LANGUAGE, RESET ALL THE ENTERED ADDRESS VALUES.
  resetOnRadioLangChange(value) {

    this.inputFormGroup.get('area').setValue('');
    this.inputFormGroup.get('districtName').setValue('');
    this.inputFormGroup.get('otherDistrict').setValue('');
    this.inputFormGroup.get('roomFlat').setValue('');
    this.inputFormGroup.get('floor').setValue('');
    this.inputFormGroup.get('block').setValue('');
    this.inputFormGroup.get('buildingPhase').setValue('');
    this.inputFormGroup.get('estateName').setValue('');
    this.inputFormGroup.get('streetName').setValue('');
    this.inputFormGroup.get('otherInfo1').setValue('');
    this.inputFormGroup.get('otherInfo2').setValue('');
    // ?To make district as drop down instead of text box.
    this.othersDisplay = '0';

    if (value === 'en') {
      console.log('in en arealist ', this.areaList);
      this.areaList = this.areaListEN;
      this.subDistList = this.DistrictListEN;
      this.popUpLang = 'en';
    } else if (value === 'ch') {
      this.areaList = this.areaListHK;
      this.subDistList = this.DistrictListHK;
      this.popUpLang = 'ch';
    }

    // ? To reset address type radio.
    this.inputFormGroup.get('addTypeRadio').setValue('withinHK');
    this.inputFormGroup.setErrors(null);
    this.inputFormGroup.updateValueAndValidity();

  }


  createControls() {
    this.inputFormGroup = this.formBuilder.group({
      addLang: new FormControl(this.addressModel.addLang),
      roomFlat: new FormControl(this.addressModel.roomFlat),
      floor: new FormControl(this.addressModel.floor),
      block: new FormControl(this.addressModel.block),
      buildingPhase: new FormControl(this.addressModel.buildingPhase),
      estateName: new FormControl(this.addressModel.estateName),
      streetName: new FormControl(this.addressModel.streetName),
      area: new FormControl(this.addressModel.area, [Validators.required]),
      districtName: new FormControl(this.addressModel.districtName),
      otherInfo1: new FormControl(this.addressModel.otherInfo1),
      otherInfo2: new FormControl(this.addressModel.otherInfo2),
      otherDistrict: new FormControl(this.addressModel.otherDistrict),

      totalAddress: new FormControl(this.addressModel.totalAddress),
      address1: new FormControl(this.addressModel.address1),
      address2: new FormControl(this.addressModel.address2),
      address3: new FormControl(this.addressModel.address3),
      address4: new FormControl(this.addressModel.address4),
      address5: new FormControl(this.addressModel.address5),
      address6: new FormControl(this.addressModel.address6),

      addTypeRadio: new FormControl(this.addressModel.addTypeRadio),

    },
      {
        validator: [
          validateDistrict,
          validateOtherInfo
        ]
      });
    if (this.addressDisplay !== undefined && this.addressDisplay !== null && this.addressDisplay !== '') {
      this.hasAddress = true;
      this.inputFormGroup.get('totalAddress').setValue(this.addressDisplay);
    }
  }

  private setAddressType() {
    let editAddType = '';

    if ((this.addressDisplay !== undefined && this.addressDisplay !== null && this.addressDisplay !== '') ||
      (this.totalAddress !== undefined && this.totalAddress !== null && this.totalAddress !== '')) {
      this.getSession();
      this.getAllAddressSession();
      editAddType = sessionStorage.getItem('addTypeRadio');
      if (editAddType === 'withinHK') {
        this.otherInfoMan = 0;
        this.inputFormGroup.get('otherInfo2').disable();
      }
      if (editAddType === 'outsideHK') {
        this.otherInfoMan = 1;
        this.inputFormGroup.get('area').disable();
        this.inputFormGroup.get('districtName').disable();
        this.inputFormGroup.get('otherDistrict').disable();
      } if (editAddType === 'hkPB') {
        this.otherInfoMan = 1;
        this.inputFormGroup.get('area').disable();
        this.inputFormGroup.get('districtName').disable();
        this.inputFormGroup.get('otherDistrict').disable();
        this.inputFormGroup.get('roomFlat').disable();
        this.inputFormGroup.get('floor').disable();
        this.inputFormGroup.get('block').disable();
        this.inputFormGroup.get('buildingPhase').disable();
        this.inputFormGroup.get('estateName').disable();
        this.inputFormGroup.get('streetName').disable();
      }
    } else {
      this.otherInfoMan = 0;
      this.inputFormGroup.patchValue({ addTypeRadio: 'withinHK' });
      this.inputFormGroup.get('otherInfo2').disable();
    }

    this.subscribeAddressTypeValueChange();
  }

  // ? To provide subscribtion to addressType radio change.
  subscribeAddressTypeValueChange() {
    const editAddType = sessionStorage.getItem('addTypeRadio');
    this.addressTypeSubscriber = this.inputFormGroup.get('addTypeRadio').valueChanges.subscribe(
      (mode: string) => {

        if (mode === 'withinHK') {
          this.otherInfoMan = 0;
          this.inputFormGroup.get('area').enable();
          this.inputFormGroup.get('districtName').enable();
          this.inputFormGroup.get('otherDistrict').enable();
          this.inputFormGroup.get('roomFlat').enable();
          this.inputFormGroup.get('floor').enable();
          this.inputFormGroup.get('block').enable();
          this.inputFormGroup.get('buildingPhase').enable();
          this.inputFormGroup.get('estateName').enable();
          this.inputFormGroup.get('streetName').enable();
          this.inputFormGroup.get('otherInfo2').disable();
          if (editAddType !== 'withinHK') {
            this.inputFormGroup.get('area').setValue('');
            this.inputFormGroup.get('districtName').setValue('');
            this.inputFormGroup.get('otherDistrict').reset();
            this.inputFormGroup.get('roomFlat').reset();
            this.inputFormGroup.get('floor').reset();
            this.inputFormGroup.get('block').reset();
            this.inputFormGroup.get('buildingPhase').reset();
            this.inputFormGroup.get('estateName').reset();
            this.inputFormGroup.get('streetName').reset();
            this.inputFormGroup.get('otherInfo1').reset();
            this.inputFormGroup.get('otherInfo2').reset();

          }
        } else if (mode === 'outsideHK') {
          this.otherInfoMan = 1;
          this.inputFormGroup.get('area').disable();
          this.inputFormGroup.get('districtName').disable();
          this.inputFormGroup.get('otherDistrict').disable();

          this.inputFormGroup.get('roomFlat').enable();
          this.inputFormGroup.get('floor').enable();
          this.inputFormGroup.get('block').enable();
          this.inputFormGroup.get('buildingPhase').enable();
          this.inputFormGroup.get('estateName').enable();
          this.inputFormGroup.get('streetName').enable();
          this.inputFormGroup.get('otherInfo2').enable();
          if (editAddType !== 'outsideHK') {

            this.inputFormGroup.get('area').setValue('');
            this.inputFormGroup.get('districtName').setValue('');
            this.inputFormGroup.get('otherDistrict').reset();
            this.inputFormGroup.get('roomFlat').reset();
            this.inputFormGroup.get('floor').reset();
            this.inputFormGroup.get('block').reset();
            this.inputFormGroup.get('buildingPhase').reset();
            this.inputFormGroup.get('estateName').reset();
            this.inputFormGroup.get('streetName').reset();
            this.inputFormGroup.get('otherInfo1').reset();
            this.inputFormGroup.get('otherInfo2').reset();

          }
        } else if (mode === 'hkPB') {
          this.otherInfoMan = 1;
          this.inputFormGroup.get('area').disable();
          this.inputFormGroup.get('districtName').disable();
          this.inputFormGroup.get('otherDistrict').disable();
          this.inputFormGroup.get('roomFlat').disable();
          this.inputFormGroup.get('floor').disable();
          this.inputFormGroup.get('block').disable();
          this.inputFormGroup.get('buildingPhase').disable();
          this.inputFormGroup.get('estateName').disable();
          this.inputFormGroup.get('streetName').disable();
          this.inputFormGroup.get('otherInfo2').enable();
          if (editAddType !== 'hkPB') {
            this.inputFormGroup.get('area').setValue('');
            this.inputFormGroup.get('districtName').setValue('');
            this.inputFormGroup.get('otherDistrict').reset();
            this.inputFormGroup.get('roomFlat').reset();
            this.inputFormGroup.get('floor').reset();
            this.inputFormGroup.get('block').reset();
            this.inputFormGroup.get('buildingPhase').reset();
            this.inputFormGroup.get('estateName').reset();
            this.inputFormGroup.get('streetName').reset();
            this.inputFormGroup.get('otherInfo1').reset();
            this.inputFormGroup.get('otherInfo2').reset();

          }

        }

        // ?To make district as drop down instead of text box.
        this.othersDisplay = '0';

        this.inputFormGroup.setErrors(null);
        this.inputFormGroup.updateValueAndValidity();

      });
  }


  get f() {
    return this.inputFormGroup.controls;
  }

  get g() {
    return this.inputFormGroup;
  }

  regionSelected(data: any) {
    this.selectedLocation = '';
    this.selectedCountry = 0;
    this.collectionOfficesOfSelectedCountry = [];
    this.listOfRegionsAndCountries.forEach((key) => {
      if (key.code === data) {
        this.listOfCountries = key.countries;
      }
    });
    this.showCountryDropDown = true;
  }

  // ADDRESS START

  showAddressModal() {
    this.setLanguage();
    this.addressLangChange();
    this.modal = document.getElementById('pdfAddressModal');
    this.modal.setAttribute('style', 'display:block');
    if ((this.addressDisplay !== undefined && this.addressDisplay !== null && this.addressDisplay !== '') ||
      (this.totalAddress !== undefined && this.totalAddress !== null && this.totalAddress !== '')) {
      this.setAddressType();
    }

  }

  continueAddress() {
    this.submitted = true;
    if (this.inputFormGroup.invalid) {
      return;
    } else {
      if (this.inputFormGroup.get('addLang').value === 'en') {
        // !Eng
        this.concatEngAddress();
      } else {
        // !Chn
        this.concatCnhAddress();
      }

      this.commonService.addressLang = this.inputFormGroup.get('addLang').value;
      this.hasAddress = true;
      this.modal.setAttribute('style', 'display:none');
    }

  }

  addSession() {
    sessionStorage.setItem('addTypeRadio', this.inputFormGroup.get('addTypeRadio').value);
    sessionStorage.setItem('area', this.inputFormGroup.get('area').value);
    sessionStorage.setItem('districtName', this.inputFormGroup.get('districtName').value);
    sessionStorage.setItem('streetName', this.inputFormGroup.get('streetName').value);
    sessionStorage.setItem('roomFlat', this.inputFormGroup.get('roomFlat').value);
    sessionStorage.setItem('estateName', this.inputFormGroup.get('estateName').value);
    sessionStorage.setItem('buildingPhase', this.inputFormGroup.get('buildingPhase').value);
    sessionStorage.setItem('otherInfo1', this.inputFormGroup.get('otherInfo1').value);
    sessionStorage.setItem('otherInfo2', this.inputFormGroup.get('otherInfo2').value);
    sessionStorage.setItem('floor', this.inputFormGroup.get('floor').value);
    sessionStorage.setItem('block', this.inputFormGroup.get('block').value);
    sessionStorage.setItem('otherDistrict', this.inputFormGroup.get('otherDistrict').value);
    sessionStorage.setItem('othersDisplay', this.othersDisplay);
    sessionStorage.setItem('addLang', this.inputFormGroup.get('addLang').value);

  }

  removeSession() {
    sessionStorage.removeItem('addTypeRadio');
    sessionStorage.removeItem('area');
    sessionStorage.removeItem('districtName');
    sessionStorage.removeItem('streetName');
    sessionStorage.removeItem('roomFlat');
    sessionStorage.removeItem('estateName');
    sessionStorage.removeItem('buildingPhase');
    sessionStorage.removeItem('otherInfo1');
    sessionStorage.removeItem('otherInfo2');
    sessionStorage.removeItem('floor');
    sessionStorage.removeItem('block');
    sessionStorage.removeItem('otherDistrict');
    sessionStorage.removeItem('othersDisplay');
  }


  getSession() {

    if (sessionStorage.getItem('addTypeRadio') !== 'null' && sessionStorage.getItem('addTypeRadio') !== ''
      && sessionStorage.getItem('addTypeRadio') !== undefined) {
      this.inputFormGroup.get('addTypeRadio').setValue(sessionStorage.getItem('addTypeRadio'));
    }
    if (sessionStorage.getItem('area') !== 'null' && sessionStorage.getItem('area') !== ''
      && sessionStorage.getItem('area') !== undefined) {
      const regionName = this.getTranslated(sessionStorage.getItem('area'));
      this.inputFormGroup.get('area').setValue(regionName);
    }

    if (sessionStorage.getItem('districtName') !== 'null' && sessionStorage.getItem('districtName') !== ''
      && sessionStorage.getItem('districtName') !== undefined) {
      const distName = this.getTranslated(sessionStorage.getItem('districtName'));
      this.processSelected(sessionStorage.getItem('area'));
      this.inputFormGroup.get('districtName').setValue(sessionStorage.getItem('districtName'));
    }

    if (sessionStorage.getItem('streetName') !== 'null' && sessionStorage.getItem('streetName') !== ''
      && sessionStorage.getItem('streetName') !== undefined) {
      this.inputFormGroup.get('streetName').setValue(sessionStorage.getItem('streetName'));
    }

    if (sessionStorage.getItem('roomFlat') !== 'null' && sessionStorage.getItem('roomFlat') !== ''
      && sessionStorage.getItem('roomFlat') !== undefined) {
      this.inputFormGroup.get('roomFlat').setValue(sessionStorage.getItem('roomFlat'));
    }

    if (sessionStorage.getItem('estateName') !== 'null' && sessionStorage.getItem('estateName') !== ''
      && sessionStorage.getItem('estateName') !== undefined) {
      this.inputFormGroup.get('estateName').setValue(sessionStorage.getItem('estateName'));
    }

    if (sessionStorage.getItem('buildingPhase') !== 'null' && sessionStorage.getItem('buildingPhase') !== ''
      && sessionStorage.getItem('buildingPhase') !== undefined) {
      this.inputFormGroup.get('buildingPhase').setValue(sessionStorage.getItem('buildingPhase'));
    }

    if (sessionStorage.getItem('otherInfo1') !== 'null' && sessionStorage.getItem('otherInfo1') !== ''
      && sessionStorage.getItem('otherInfo1') !== undefined) {
      this.inputFormGroup.get('otherInfo1').setValue(sessionStorage.getItem('otherInfo1'));
    }

    if (sessionStorage.getItem('otherInfo2') !== 'null' && sessionStorage.getItem('otherInfo2') !== ''
      && sessionStorage.getItem('otherInfo2') !== undefined) {
      this.inputFormGroup.get('otherInfo2').setValue(sessionStorage.getItem('otherInfo2'));
    }

    if (sessionStorage.getItem('floor') !== 'null' && sessionStorage.getItem('floor') !== ''
      && sessionStorage.getItem('floor') !== undefined) {
      this.inputFormGroup.get('floor').setValue(sessionStorage.getItem('floor'));
    }

    if (sessionStorage.getItem('block') !== 'null' && sessionStorage.getItem('block') !== ''
      && sessionStorage.getItem('block') !== undefined) {
      this.inputFormGroup.get('block').setValue(sessionStorage.getItem('block'));
    }

    if (sessionStorage.getItem('block') !== 'null' && sessionStorage.getItem('block') !== ''
      && sessionStorage.getItem('block') !== undefined) {
      this.inputFormGroup.get('block').setValue(sessionStorage.getItem('block'));
    }
    if (sessionStorage.getItem('otherDistrict') !== 'null' && sessionStorage.getItem('otherDistrict') !== ''
      && sessionStorage.getItem('block') !== undefined) {
      this.inputFormGroup.get('otherDistrict').setValue(sessionStorage.getItem('otherDistrict'));
    }

    if (sessionStorage.getItem('othersDisplay') !== 'null' && sessionStorage.getItem('othersDisplay') !== ''
      && sessionStorage.getItem('othersDisplay') !== undefined) {
      this.othersDisplay = sessionStorage.getItem('othersDisplay');
    }

    if (sessionStorage.getItem('addLang') !== 'null' && sessionStorage.getItem('addLang') !== ''
      && sessionStorage.getItem('addLang') !== undefined) {
      this.inputFormGroup.get('addLang').setValue(sessionStorage.getItem('addLang'));
    }

  }

  // ? To set the value of address 1 to 6 in session inorder to retain while coming back.
  setAllAddressSession() {
    sessionStorage.setItem('address1', this.inputFormGroup.get('address1').value);
    sessionStorage.setItem('address2', this.inputFormGroup.get('address2').value);
    sessionStorage.setItem('address3', this.inputFormGroup.get('address3').value);
    sessionStorage.setItem('address4', this.inputFormGroup.get('address4').value);
    sessionStorage.setItem('address5', this.inputFormGroup.get('address5').value);
    sessionStorage.setItem('address6', this.inputFormGroup.get('address6').value);
  }

  getAllAddressSession() {
    if (sessionStorage.getItem('address1')) {
      this.inputFormGroup.get('address1').setValue(sessionStorage.getItem('address1'));
    }
    if (sessionStorage.getItem('address2')) {
      this.inputFormGroup.get('address2').setValue(sessionStorage.getItem('address2'));
    }
    if (sessionStorage.getItem('address3')) {
      this.inputFormGroup.get('address3').setValue(sessionStorage.getItem('address3'));
    }
    if (sessionStorage.getItem('address4')) {
      this.inputFormGroup.get('address4').setValue(sessionStorage.getItem('address4'));
    }
    if (sessionStorage.getItem('address5')) {
      this.inputFormGroup.get('address5').setValue(sessionStorage.getItem('address5'));
    }
    if (sessionStorage.getItem('address6')) {
      this.inputFormGroup.get('address6').setValue(sessionStorage.getItem('address6'));
    }
  }

  // ? To get the valud on init.

  hideAddressModal() {
    this.modal.setAttribute('style', 'display:none');
    this.hasAddress = true;

    if (sessionStorage.getItem('addTypeRadio') === 'withinHK') {
      this.inputFormGroup.get('area').enable();
      this.inputFormGroup.get('districtName').enable();
      this.inputFormGroup.get('roomFlat').enable();
      this.inputFormGroup.get('floor').enable();
      this.inputFormGroup.get('block').enable();
      this.inputFormGroup.get('buildingPhase').enable();
      this.inputFormGroup.get('estateName').enable();
      this.inputFormGroup.get('streetName').enable();
      this.inputFormGroup.get('otherInfo2').disable();
      this.inputFormGroup.setErrors(null);
    } else if (sessionStorage.getItem('addTypeRadio') === 'outsideHK') {

      this.inputFormGroup.get('area').disable();
      this.inputFormGroup.get('districtName').disable();

      this.inputFormGroup.get('roomFlat').enable();
      this.inputFormGroup.get('floor').enable();
      this.inputFormGroup.get('block').enable();
      this.inputFormGroup.get('buildingPhase').enable();
      this.inputFormGroup.get('estateName').enable();
      this.inputFormGroup.get('streetName').enable();
      this.inputFormGroup.get('otherInfo2').enable();
      this.inputFormGroup.setErrors(null);
    } else if (sessionStorage.getItem('addTypeRadio') === 'hkPB') {

      this.inputFormGroup.get('area').disable();
      this.inputFormGroup.get('districtName').disable();
      this.inputFormGroup.get('roomFlat').disable();
      this.inputFormGroup.get('floor').disable();
      this.inputFormGroup.get('block').disable();
      this.inputFormGroup.get('buildingPhase').disable();
      this.inputFormGroup.get('estateName').disable();
      this.inputFormGroup.get('streetName').disable();
      this.inputFormGroup.get('otherInfo2').enable();
      this.inputFormGroup.setErrors(null);
    }

    this.resetFormErrors();
    // ? Fix for first time cancell - Prevent user to move forward without entering address.
    if (!sessionStorage.getItem('totalAddress')) {
      this.inputFormGroup.setErrors({ 'error': true });
      // clear all entered address fields from session storage
      this.removeSession();
      // clear all entered address fields from form
      this.resetOnRadioLangChange(this.popUpLang);
    }
  }

  // ------------------ ADDRESS LOOK UP START ------------------- //

  // tslint:disable-next-line: member-ordering
  public areaListEN: any[] = [
    { label: 'HONG KONG', value: 'HK' },
    { label: 'KOWLOON', value: 'KLN' },
    { label: 'NEW TERRITORIES', value: 'NT' },
    { label: 'OUTLYING ISLANDS', value: 'OI' }
  ];

  // tslint:disable-next-line: member-ordering
  public areaListHK = [
    { label: '香港', value: 'HK' },
    { label: '九龍', value: 'KLN' },
    { label: '新界', value: 'NT' },
    { label: '離島', value: 'OI' }
  ];

  // tslint:disable-next-line: member-ordering
  private DistrictListEN: any[] = [
    { label: 'HONG KONG--', value: '0' },
    { label: 'ABERDEEN', value: 'H01' },
    { label: 'ADMIRALTY', value: 'H02' },
    { label: 'AP LEI CHAU', value: 'H03' },
    { label: 'CAUSEWAY BAY', value: 'H04' },
    { label: 'CENTRAL', value: 'H05' },
    { label: 'CHAI WAN', value: 'H06' },
    { label: 'CHUNG HOM KOK', value: 'H07' },
    { label: 'DEEP WATER BAY', value: 'H08' },
    { label: 'HAPPY VALLEY', value: 'H09' },
    { label: 'KENNEDY TOWN', value: 'H10' },
    { label: 'MID-LEVELS', value: 'H11' },
    { label: 'NORTH POINT', value: 'H12' },
    { label: 'POK FU LAM', value: 'H13' },
    { label: 'QUARRY BAY', value: 'H14' },
    { label: 'REPULSE BAY', value: 'H15' },
    { label: 'SAI WAN HO', value: 'H16' },
    { label: 'SAI YING PUN', value: 'H17' },
    { label: 'SHAU KEI WAN', value: 'H18' },
    { label: 'SHEK O', value: 'H19' },
    { label: 'SHEK TONG TSUI', value: 'H20' },
    { label: 'SHEUNG WAN', value: 'H21' },
    { label: 'STANLEY', value: 'H22' },
    { label: 'TAI HANG', value: 'H23' },
    { label: 'TAI TAM', value: 'H24' },
    { label: 'THE PEAK', value: 'H25' },
    { label: 'WAN CHAI', value: 'H26' },
    { label: 'WONG CHUK HANG', value: 'H27' },
    { label: 'KOWLOON--', value: '28' },
    { label: 'CHA KWO LING', value: 'K01' },
    { label: 'CHEUNG SHA WAN', value: 'K02' },
    { label: 'CHOI HUNG', value: 'K03' },
    { label: 'DIAMOND HILL', value: 'K04' },
    { label: 'HO MAN TIN', value: 'K05' },
    { label: 'HUNG HOM', value: 'K06' },
    { label: 'KOWLOON BAY', value: 'K07' },
    { label: 'KOWLOON CITY', value: 'K08' },
    { label: 'KOWLOON TONG', value: 'K09' },
    { label: 'KWUN TONG', value: 'K10' },
    { label: 'LAI CHI KOK', value: 'K11' },
    { label: 'LAM TIN', value: 'K12' },
    { label: 'LOK FU', value: 'K13' },
    { label: 'MA TAU WAI', value: 'K14' },
    { label: 'MONG KOK', value: 'K15' },
    { label: 'NGAU CHI WAN', value: 'K16' },
    { label: 'NGAU TAU KOK', value: 'K17' },
    { label: 'SAN PO KONG', value: 'K18' },
    { label: 'SAU MAU PING', value: 'K19' },
    { label: 'SHAM SHUI PO', value: 'K20' },
    { label: 'SHEK KIP MEI', value: 'K21' },
    { label: 'TAI KOK TSUI', value: 'K22' },
    { label: 'TO KWA WAN', value: 'K23' },
    { label: 'TSIM SHA TSUI', value: 'K24' },
    { label: 'TSZ WAN SHAN', value: 'K25' },
    { label: 'WANG TAU HOM', value: 'K26' },
    { label: 'WONG TAI SIN', value: 'K27' },
    { label: 'YAU MA TEI', value: 'K28' },
    { label: 'YAU TONG', value: 'K29' },
    { label: 'YAU YAT CHUEN', value: 'K30' },
    { label: 'NEW TERRITORIES--', value: '59' },
    { label: 'CLEAR WATER BAY', value: 'N01' },
    { label: 'FANLING', value: 'N02' },
    { label: 'FO TAN SHA TIN', value: 'N03' },
    { label: 'FU TEI TUEN MUN', value: 'N04' },
    { label: 'HA TSUEN YUEN LONG', value: 'N05' },
    { label: 'HANG HAU SAI KUNG', value: 'N06' },
    { label: 'HUNG SHUI KIU', value: 'N07' },
    { label: 'KAM TIN YUEN LONG', value: 'N08' },
    { label: 'KAU TO SHAN', value: 'N09' },
    { label: 'KWAI CHUNG', value: 'N10' },
    { label: 'KWAN TEI FANLING', value: 'N11' },
    { label: 'KWU TUNG', value: 'N12' },
    { label: 'LAM TEI TUEN MUN', value: 'N13' },
    { label: 'LAM TSUEN TAI PO', value: 'N14' },
    { label: 'LAU FAU SHAN', value: 'N15' },
    { label: 'LO WAI TSUEN WAN', value: 'N16' },
    { label: 'MA LIU SHUI', value: 'N17' },
    { label: 'MA ON SHAN', value: 'N18' },
    { label: 'PAT HEUNG YUEN LONG', value: 'N19' },
    { label: 'PING CHE', value: 'N20' },
    { label: 'PING SHAN YUEN LONG', value: 'N21' },
    { label: 'SAI KUNG', value: 'N22' },
    { label: 'SAN HUI TUEN MUN', value: 'N23' },
    { label: 'SAN TIN YUEN LONG', value: 'N24' },
    { label: 'SHA TAU KOK', value: 'N25' },
    { label: 'SHA TIN', value: 'N26' },
    { label: 'SHAM TSENG', value: 'N27' },
    { label: 'SHEK KONG YUEN LONG', value: 'N28' },
    { label: 'SHEUNG SHUI', value: 'N29' },
    { label: 'SHUEN WAN TAI PO', value: 'N30' },
    { label: 'SIU LAM TUEN MUN', value: 'N31' },
    { label: 'SIU LEK YUEN SHA TIN', value: 'N32' },
    { label: 'SO KWUN WAT', value: 'N33' },
    { label: 'TA KWU LING', value: 'N34' },
    { label: 'TAI LAM', value: 'N35' },
    { label: 'TAI PO KAU', value: 'N37' },
    { label: 'TAI PO', value: 'N36' },
    { label: 'TAI TONG YUEN LONG', value: 'N38' },
    { label: 'TAI WAI SHA TIN', value: 'N39' },
    { label: 'TAI WO', value: 'N40' },
    { label: 'TAM MEI YUEN LONG', value: 'N41' },
    { label: 'TIN SHUI WAI', value: 'N42' },
    { label: 'TING KAU', value: 'N43' },
    { label: 'TING KOK TAI PO', value: 'N44' },
    { label: 'TSEUNG KWAN O', value: 'N45' },
    { label: 'TSING YI', value: 'N46' },
    { label: 'TSUEN WAN', value: 'N47' },
    { label: 'TUEN MUN', value: 'N48' },
    { label: 'YUEN LONG', value: '108' },
    { label: 'OUTLYING ISLANDS--', value: 'Z' },
    { label: 'CHEK LAP KOK LANTAU ISLAND', value: 'I01' },
    { label: 'CHEUNG CHAU', value: 'I02' },
    { label: 'CHEUNG SHA LANTAU ISLAND', value: 'I03' },
    { label: 'CHI MA WAN LANTAU ISLAND', value: 'I04' },
    { label: 'DISCOVERY BAY LANTAU ISLAND', value: 'I05' },
    { label: 'HEILING CHAU', value: 'I06' },
    { label: 'LAMMA ISLAND', value: 'I07' },
    { label: 'LANTAU ISLAND', value: 'I08' },
    { label: 'MA WAN', value: 'I09' },
    { label: 'MUI WO LANTAU ISLAND', value: 'I10' },
    { label: 'NGONG PING LANTAU ISLAND', value: 'I11' },
    { label: 'PENG CHAU', value: 'I12' },
    { label: 'SHEK PIK LANTAU ISLAND', value: 'I13' },
    { label: 'TAI O LANTAU ISLAND', value: 'I14' },
    { label: 'TONG FUK LANTAU ISLAND', value: 'I15' },
    { label: 'TUNG CHUNG LANTAU ISLAND', value: 'I16' },
    { label: 'OTHERS', value: 'Q' }
  ];

  // tslint:disable-next-line: member-ordering
  private DistrictListHK: any[] = [
    { label: '香港--', value: '0' },
    { label: '上環', value: 'H01' },
    { label: '大坑', value: 'H02' },
    { label: '大潭', value: 'H03' },
    { label: '山頂', value: 'H04' },
    { label: '中環', value: 'H05' },
    { label: '北角', value: 'H06' },
    { label: '半山', value: 'H07' },
    { label: '石塘咀', value: 'H08' },
    { label: '石澳', value: 'H09' },
    { label: '西營盤', value: 'H10' },
    { label: '西灣河', value: 'H11' },
    { label: '赤柱', value: 'H12' },
    { label: '金鐘', value: 'H13' },
    { label: '香港仔', value: 'H14' },
    { label: '柴灣', value: 'H15' },
    { label: '堅尼地城', value: 'H16' },
    { label: '淺水灣', value: 'H17' },
    { label: '深水灣', value: 'H18' },
    { label: '舂坎角', value: 'H19' },
    { label: '跑馬地', value: 'H20' },
    { label: '黃竹坑', value: 'H21' },
    { label: '筲箕灣', value: 'H22' },
    { label: '銅鑼灣', value: 'H23' },
    { label: '鴨脷洲', value: 'H24' },
    { label: '薄扶林', value: 'H25' },
    { label: '灣仔', value: 'H26' },
    { label: '鰂魚涌', value: 'H27' },
    { label: '九龍--', value: '28' },
    { label: '九龍城', value: 'K01' },
    { label: '九龍塘', value: 'K02' },
    { label: '九龍灣', value: 'K03' },
    { label: '又一村', value: 'K04' },
    { label: '土瓜灣', value: 'K05' },
    { label: '大角咀', value: 'K06' },
    { label: '牛池灣', value: 'K07' },
    { label: '牛頭角', value: 'K08' },
    { label: '石硤尾', value: 'K09' },
    { label: '尖沙咀', value: 'K10' },
    { label: '何文田', value: 'K11' },
    { label: '秀茂坪', value: 'K12' },
    { label: '旺角', value: 'K13' },
    { label: '油麻地', value: 'K14' },
    { label: '油塘', value: 'K15' },
    { label: '長沙灣', value: 'K16' },
    { label: '紅磡', value: 'K17' },
    { label: '荔枝角', value: 'K18' },
    { label: '茶果嶺', value: 'K19' },
    { label: '馬頭圍', value: 'K20' },
    { label: '彩虹', value: 'K21' },
    { label: '深水埗', value: 'K22' },
    { label: '黃大仙', value: 'K23' },
    { label: '慈雲山', value: 'K24' },
    { label: '新蒲崗', value: 'K25' },
    { label: '樂富', value: 'K26' },
    { label: '橫頭磡', value: 'K27' },
    { label: '藍田', value: 'K28' },
    { label: '觀塘', value: 'K29' },
    { label: '鑽石山', value: 'K30' },
    { label: '新界--', value: '59' },
    { label: '九肚山', value: 'N01' },
    { label: '上水', value: 'N02' },
    { label: '大埔', value: 'N03' },
    { label: '大埔汀角', value: 'N04' },
    { label: '大埔林村', value: 'N05' },
    { label: '大埔船灣', value: 'N06' },
    { label: '大埔滘', value: 'N07' },
    { label: '大欖', value: 'N08' },
    { label: '元朗', value: 'N09' },
    { label: '元朗八鄉', value: 'N10' },
    { label: '元朗大棠', value: 'N11' },
    { label: '元朗石崗', value: 'N12' },
    { label: '元朗屏山', value: 'N13' },
    { label: '元朗廈村', value: 'N14' },
    { label: '元朗新田', value: 'N15' },
    { label: '元朗潭尾', value: 'N16' },
    { label: '元朗錦田', value: 'N17' },
    { label: '天水圍', value: 'N18' },
    { label: '太和', value: 'N19' },
    { label: '屯門', value: 'N20' },
    { label: '屯門小欖', value: 'N21' },
    { label: '屯門虎地', value: 'N22' },
    { label: '屯門新墟', value: 'N23' },
    { label: '屯門藍地', value: 'N24' },
    { label: '古洞', value: 'N25' },
    { label: '打鼓嶺', value: 'N26' },
    { label: '汀九', value: 'N27' },
    { label: '西貢', value: 'N28' },
    { label: '西貢坑口', value: 'N29' },
    { label: '沙田', value: 'N30' },
    { label: '沙田大圍', value: 'N31' },
    { label: '沙田小瀝源', value: 'N32' },
    { label: '沙田火炭', value: 'N33' },
    { label: '沙頭角', value: 'N34' },
    { label: '坪輋', value: 'N35' },
    { label: '青衣', value: 'N37' },
    { label: '洪水橋', value: 'N36' },
    { label: '流浮山', value: 'N38' },
    { label: '粉嶺', value: 'N39' },
    { label: '粉嶺軍地', value: 'N40' },
    { label: '荃灣', value: 'N41' },
    { label: '荃灣老圍', value: 'N42' },
    { label: '馬料水', value: 'N43' },
    { label: '馬鞍山', value: 'N44' },
    { label: '將軍澳', value: 'N45' },
    { label: '掃管笏', value: 'N46' },
    { label: '清水灣', value: 'N47' },
    { label: '深井', value: 'N48' },
    { label: '葵涌', value: '108' },
    { label: '離島--', value: 'Z' },
    { label: '大嶼山赤鱲角', value: 'I01' },
    { label: '長洲', value: 'I02' },
    { label: '大嶼山長沙', value: 'I03' },
    { label: '大嶼山芝麻灣', value: 'I04' },
    { label: '大嶼山愉景灣', value: 'I05' },
    { label: '喜靈洲', value: 'I06' },
    { label: '南丫島', value: 'I07' },
    { label: '大嶼山', value: 'I08' },
    { label: '馬灣', value: 'I09' },
    { label: '大嶼山梅窩', value: 'I10' },
    { label: '大嶼山昂坪', value: 'I11' },
    { label: '坪洲', value: 'I12' },
    { label: '大嶼山石壁', value: 'I13' },
    { label: '大嶼山大澳', value: 'I14' },
    { label: '大嶼山塘福', value: 'I15' },
    { label: '大嶼山東涌', value: 'I16' },
    { label: '其他', value: 'Q' }
  ];



  processSelected(data: string) {
    this.othersDisplay = '0';
    this.inputFormGroup.get('otherDistrict').reset();
    if (data !== '') {
      if (this.inputFormGroup.get('addLang').value === 'en') {
        this.subDistList = this.DistrictListEN;
      } else {
        this.subDistList = this.DistrictListHK;
      }
      this.subDistList.forEach((obj) => {
        if (data === 'OI' && obj.value === 'Z') {
          this.translate.get(obj.label).subscribe((value: string) => {
            this.inputFormGroup.get('districtName').setValue(obj.value);
          });
        } else if (data === 'HK' && obj.value === '0') {
          this.translate.get(obj.label).subscribe((value: string) => {
            this.inputFormGroup.get('districtName').setValue(obj.value);
          });
        } else if (data === 'KLN' && obj.value === '28') {
          this.translate.get(obj.label).subscribe((value: string) => {
            this.inputFormGroup.get('districtName').setValue(obj.value);
          });
        } else if (data === 'NT' && obj.value === '59') {
          this.translate.get(obj.label).subscribe((value: string) => {
            this.inputFormGroup.get('districtName').setValue(obj.value);
          });
        }
      });
    }
  }

  public getTranslated(data: string) {
    let res: string;
    this.translate.get(data).subscribe(response => {
      res = response;
    });
    return res;
  }

  public translateReg(data: string) {
    const lang = this.inputFormGroup.get('addLang').value;
    if (lang === 'en') {
      if (data === 'HK') {
        this.regionName = 'HONG KONG';
      } else if (data === 'KLN') {
        this.regionName = 'KOWLOON';
      } else if (data === 'NT') {
        this.regionName = 'NEW TERRITORIES';
      } else {
        this.regionName = 'OUTLYING ISLANDS';
      }
    } else {
      if (data === 'HK') {
        this.regionName = '香港';
      } else if (data === 'KLN') {
        this.regionName = '九龍';
      } else if (data === 'NT') {
        this.regionName = '新界';
      } else if (data === 'OI') {
        this.regionName = '離島';
      }
    }
  }

  changeToOthers(data: string) {
    if (data === 'Q') {
      this.othersDisplay = '1';
      this.inputFormGroup.controls['otherDistrict'].setValidators([Validators.required]);
      this.setOthersDefaultValue();
      this.inputFormGroup.controls['otherDistrict'].updateValueAndValidity();
    } else {
      this.othersDisplay = '0';
      this.inputFormGroup.controls['otherDistrict'].clearValidators();
      this.inputFormGroup.controls['otherDistrict'].updateValueAndValidity();
    }

    const districtName = this.inputFormGroup.get('districtName').value;
    if (districtName == null ||
      districtName === '' ||
      districtName === '28' ||
      districtName === '0' ||
      districtName === '59' ||
      districtName === 'Z') {
      if (districtName === '0') {
        this.inputFormGroup.get("area").setValue('HK');
      } else if (districtName === '28') {
        this.inputFormGroup.get("area").setValue('KLN');
      } else if (districtName === '59') {
        this.inputFormGroup.get("area").setValue('NT');
      } else if (districtName === 'Z') {
        this.inputFormGroup.get("area").setValue('OI');
      }
    } else {
      this.strIdentifier = districtName.charAt(0);
      if (this.strIdentifier === 'H') {
        this.inputFormGroup.get("area").setValue('HK');
      } else if (this.strIdentifier === 'K') {
        this.inputFormGroup.get("area").setValue('KLN');
      } else if (this.strIdentifier === 'N') {
        this.inputFormGroup.get("area").setValue('NT');
      } else if (this.strIdentifier === 'I') {
        this.inputFormGroup.get("area").setValue('OI');
      }
    }
  }

  // ? If district is chosen as Others then it changes to text with default value as 'OTHERS' or '其他' based on language.
  setOthersDefaultValue() {
    if (this.popUpLang === 'en') {
      this.inputFormGroup.controls['otherDistrict'].setValue('OTHERS');
    } else {
      this.inputFormGroup.controls['otherDistrict'].setValue('其他');
    }
  }

  concatEngAddress() {

    let districtName: any;
    this.addSession();
    let address = this.inputFormGroup.get('totalAddress').value;
    const floor = this.inputFormGroup.get('floor').value;
    const block = this.inputFormGroup.get('block').value;
    const estateName = this.inputFormGroup.get('estateName').value;
    const buildingPhase = this.inputFormGroup.get('buildingPhase').value;
    const roomFlat = this.inputFormGroup.get('roomFlat').value;
    const otherInfo1 = this.inputFormGroup.get('otherInfo1').value;
    const otherInfo2 = this.inputFormGroup.get('otherInfo2').value;
    districtName = this.inputFormGroup.get('districtName');
    const area = this.inputFormGroup.get('area').value;
    const streetName = this.inputFormGroup.get('streetName').value;
    const addTypeRadio = this.inputFormGroup.get('addTypeRadio').value;
    let otherDistrict = this.inputFormGroup.get('otherDistrict').value;
    let address1 = '';
    let address2 = '';
    let address3 = '';
    let address4 = '';
    let address5 = '';
    let address6 = '';

    address = '';
    if (addTypeRadio === 'withinHK') {


      if ((roomFlat !== '' && roomFlat != null) && (floor === '' || !floor) && (block === '' || !block)) {
        address1 = 'RM/FLAT ' + roomFlat.trim() + '\n';
      } else if (floor !== '' && floor !== null && (roomFlat !== '' && roomFlat != null) && (block !== '' && block != null)) {
        address1 = 'RM/FLAT ' + roomFlat.trim() + ', ';
      } else if (floor !== '' && floor !== null && (roomFlat !== '' && roomFlat != null) && (block === '' || !block)) {
        address1 = 'RM/FLAT ' + roomFlat.trim() + ', ';
      } else if (floor === '' && (roomFlat !== '' && roomFlat != null) && (block !== '' && block != null)) {
        address1 = 'RM/FLAT ' + roomFlat.trim() + ', ';
      }

      if (floor !== '' && floor !== null && (roomFlat !== '' && roomFlat != null) && (block !== '' && block != null)) {
        address1 += floor.trim() + '/F, ';
      } else if (floor !== '' && floor !== null && (roomFlat === '' || roomFlat === null) && (block === '' || !block)) {
        address1 += floor.trim() + '/F' + '\n';
      } else if (floor !== '' && floor !== null && (block !== '' && block != null) && roomFlat === '') {
        address1 += floor.trim() + '/F, ';
      } else if (floor !== '' && floor !== null && (roomFlat !== '' && roomFlat != null) && (block === '' || !block)) {
        address1 += floor.trim() + '/F' + '\n';
      }

      if ((block !== '' && block != null)) {
        address1 += 'BLK ' + block.trim() + '\n';
      }

      if ((buildingPhase !== '' && buildingPhase != null)) {
        address2 += buildingPhase.trim() + '\n';
      }

      if (estateName !== '' && estateName !== null) {
        address3 = estateName.trim() + '\n';
      }

      if ((streetName !== '' && streetName != null)) {
        address4 += streetName.trim() + '\n';
      }
      if (districtName != null && (otherDistrict === '' || otherDistrict === null)) {
        var DropdownList = (document.getElementById('district')) as HTMLSelectElement;
        const text = DropdownList.options[DropdownList.selectedIndex].innerHTML;
        if (text) {
          const dist = this.getTranslated(text);
          if (dist) {
            address5 = dist.trimLeft();
            otherDistrict = address5;
          }

        }

      } else {
        address5 = otherDistrict;
      }
      if ((area !== '' && area != null)) {
        this.translateReg(area);
      }
      if (area !== 'OI') {
        address5 += ', ';
      } else {
        address5 += '\n';
      }
      if (this.regionName !== '' && this.regionName != null && area !== 'OI') {
        address5 += this.regionName + '\n';
      }
      if ((otherInfo1 !== '' && otherInfo1 != null)) {
        address6 = otherInfo1.trim();
      }

      if (address5 && address5.trim().length > 35) {

        switch (area.substring(0, 1)) {
          case 'H': {
            otherDistrict += ', HK ';
            address5 = otherDistrict;
            break;
          }
          case 'K': {
            otherDistrict += ', KLN ';
            address5 = otherDistrict;
            break;
          }
          case 'N': {
            otherDistrict += ', NT ';
            address5 = otherDistrict;
            break;
          }
          default: {
            otherDistrict = otherDistrict;
            break;
          }
        }
      }
      if (address1 === '' && address2 === '' && address3 === '' && address4 === '') {
        address2 = address5;
        address5 = '';
      } else if (address2 === '' && address1 !== '') {
        address2 = address1;
        address1 = '';
      } else if (address2 === '' && address3 !== '') {
        address2 = address3;
        address3 = '';
      } else if (address2 === '' && address4 !== '') {
        address2 = address4;
        address4 = '';
      }

    } else if ((this.inputFormGroup.get('addTypeRadio').value === 'outsideHK')) {
      if ((roomFlat !== '' && roomFlat != null) && (floor === '' || floor === null) && (block === '' || !block)) {
        address1 = 'RM/FLAT ' + roomFlat.trim() + '\n';
      } else if (floor !== '' && floor !== null && (roomFlat !== '' && roomFlat != null) && (block !== '' && block != null)) {
        address1 = 'RM/FLAT ' + roomFlat.trim() + ', ';
      } else if (floor !== '' && floor !== null && (roomFlat !== '' && roomFlat != null) && (block === '' || !block)) {
        address1 = 'RM/FLAT ' + roomFlat.trim() + ', ';
      } else if ((floor === '' || floor === null) && (roomFlat !== '' && roomFlat != null) && (block !== '' && block != null)) {
        address1 = 'RM/FLAT ' + roomFlat.trim() + ', ';
      }

      if (floor !== '' && floor !== null && (roomFlat !== '' && roomFlat != null) && (block !== '' && block != null)) {
        address1 += floor.trim() + '/F, ';
      } else if (floor !== '' && floor !== null && (roomFlat === '' || roomFlat === null) && (block === '' || !block)) {
        address1 += floor.trim() + '/F' + '\n';
      } else if (floor !== '' && floor !== null && (block !== '' && block != null) && roomFlat === '') {
        address1 += floor.trim() + '/F, ';
      } else if (floor !== '' && floor !== null && (roomFlat !== '' && roomFlat != null) && (block === '' || !block)) {
        address1 += floor.trim() + '/F' + '\n';
      }

      if ((block !== '' && block != null)) {
        address1 += 'BLK ' + block.trim() + '\n';
      }

      if ((buildingPhase !== '' && buildingPhase != null)) {
        address2 = buildingPhase.trim() + '\n';
      }
      if (estateName !== '' && estateName !== null) {
        address3 += estateName.trim() + '\n';
      }

      if ((streetName !== '' && streetName != null)) {
        address4 = streetName.trim() + '\n';
      }
      if ((otherInfo1 !== '' && otherInfo1 != null)) {
        address5 = otherInfo1.trim() + '\n';
      }

      if ((otherInfo2 !== '' && otherInfo2 != null)) {
        address6 = otherInfo2.trim();
      }

      if (address2 === '' && address1 !== '') {
        address2 = address1;
        address1 = '';
      } else if (address2 === '' && address3 !== '') {
        address2 = address3;
        address3 = '';
      } else if (address2 === '' && address4 !== '') {
        address2 = address4;
        address4 = '';
      }

      if (address2 === '' && address5 !== '' && address5 !== null && address6 === '' && address1 === ''
        && address3 === '' && address4 === '') {
        address2 = address5;
        address5 = '';
      }

      if (address2 === '' && address6 !== '' && address6 !== null && address5 === '' && address1 === ''
        && address3 === '' && address4 === '') {
        address2 = address6;
        address6 = '';
      }


    } else if (this.inputFormGroup.get('addTypeRadio').value === 'hkPB') {

      if ((otherInfo1 !== '' && otherInfo1 != null)) {
        address1 = otherInfo1.trim() + '\n';
      }

      if ((otherInfo2 !== '' && otherInfo2 != null)) {
        address2 = otherInfo2.trim();
      }

      if (address2 === '') {
        address2 = address1;
        address1 = '';
      }
    }

    address = address1 + address2 + address3 + address4 + address5 + address6;
    this.inputFormGroup.get('address1').setValue(address1);
    this.inputFormGroup.get('address2').setValue(address2);
    this.inputFormGroup.get('address3').setValue(address3);
    this.inputFormGroup.get('address4').setValue(address4);
    this.inputFormGroup.get('address5').setValue(address5);
    this.inputFormGroup.get('address6').setValue(address6);
    this.inputFormGroup.get('totalAddress').setValue(address);
    this.totalAddress = address;
    sessionStorage.setItem('totalAddress', this.totalAddress);

    this.setAllAddressSession();
  }


  concatCnhAddress() {
    let districtName: any;
    this.addSession();
    let address = this.inputFormGroup.get('totalAddress').value;
    const floor = this.inputFormGroup.get('floor').value;
    const block = this.inputFormGroup.get('block').value;
    const estateName = this.inputFormGroup.get('estateName').value;
    const buildingPhase = this.inputFormGroup.get('buildingPhase').value;
    const roomFlat = this.inputFormGroup.get('roomFlat').value;
    const otherInfo1 = this.inputFormGroup.get('otherInfo1').value;
    const otherInfo2 = this.inputFormGroup.get('otherInfo2').value;
    districtName = this.inputFormGroup.get('districtName');
    const area = this.inputFormGroup.get('area').value;
    const streetName = this.inputFormGroup.get('streetName').value;
    const addTypeRadio = this.inputFormGroup.get('addTypeRadio').value;
    const otherDistrict = this.inputFormGroup.get('otherDistrict').value;
    let address1 = '';
    let address2 = '';
    let address3 = '';
    let address4 = '';
    let address5 = '';
    let address6 = '';
    address = '';
    if (addTypeRadio === 'withinHK') {

      if ((otherInfo1 !== '' && otherInfo1 != null)) {
        address1 = otherInfo1.trim() + '\n';
      }

      if ((area !== '' && area != null)) {
        this.translateReg(area);
      }

      if ((this.regionName !== '' && this.regionName != null && area !== 'OI')) {
        address2 = this.getTranslated(this.regionName) + ' ';
      }
      if (districtName && area !== 'OI' && this.othersDisplay === '0') {
        var DropdownList = (document.getElementById('district')) as HTMLSelectElement;
        var text = DropdownList.options[DropdownList.selectedIndex].innerHTML;
        if (text) {
          address2 += this.getTranslated(text) + '\n';
        }
      } else if (districtName && area !== 'OI' && this.othersDisplay === '1' && otherDistrict) {
        address2 += otherDistrict + '\n';
      }

      if (area === 'OI') {
        if (otherDistrict != null) {
          address2 += otherDistrict + '\n';
        } else {
          address2 = this.getTranslated(this.regionName) + ' ';
          var DropdownList = (document.getElementById('district')) as HTMLSelectElement;
          var text = DropdownList.options[DropdownList.selectedIndex].innerHTML;
          address2 = this.getTranslated(text) + '\n';
        }

      }

      if ((streetName !== '' && streetName != null)) {
        address3 += streetName.trim() + '\n';
      }

      if (estateName !== '' && estateName !== null) {
        address4 = estateName.trim() + '\n';
      }

      if ((buildingPhase !== '' && buildingPhase != null)) {
        address5 = buildingPhase.trim() + '\n';
      }

      if ((block !== '' && block != null)) {
        address6 = block.trim() + '座' + ' ';
      }

      if (floor !== '' && floor !== null && (roomFlat !== '' && roomFlat != null) && (block !== '' && block != null)) {
        address6 += floor.trim() + '樓 ';
      } else if (floor !== '' && floor !== null && (roomFlat === '' || roomFlat === null) && (block === '' || !block)) {
        address6 += floor.trim() + '樓 ';
      } else if (floor !== '' && floor !== null && (block !== '' && block != null) && (roomFlat === '' || roomFlat === null)) {
        address6 += floor.trim() + '樓 ';
      } else if (floor !== '' && floor !== null && (roomFlat !== '' && roomFlat != null) && (block === '' || !block)) {
        address6 += floor.trim() + '樓 ';
      }

      if ((roomFlat !== '' && roomFlat != null) && (floor === '' || floor === null) && (block === '' || !block)) {
        address6 += roomFlat.trim() + '室/號';
      } else if (floor !== '' && floor !== null && (roomFlat !== '' && roomFlat != null) && (block !== '' && block != null)) {
        address6 += roomFlat.trim() + '室/號';
      } else if (floor !== '' && floor !== null && (roomFlat !== '' && roomFlat != null) && (block === '' || !block)) {
        address6 += roomFlat.trim() + '室/號';
      } else if ((floor === '' || floor === null) && (roomFlat !== '' && roomFlat != null) && (block !== '' && block != null)) {
        address6 += roomFlat.trim() + '室/號';
      }

      if (address1 === '' && address2 === '' && address3 === '' && address4 === '') {
        address2 = address5;
        address5 = '';
      } else if (address2 === '' && address1 !== '') {
        address2 = address1;
        address1 = '';
      } else if (address2 === '' && address3 !== '') {
        address2 = address3;
        address3 = '';
      } else if (address2 === '' && address4 !== '') {
        address2 = address4;
        address4 = '';
      }

    } else if ((this.inputFormGroup.get('addTypeRadio').value === 'outsideHK')) {

      if ((otherInfo1 !== '' && otherInfo1 != null)) {
        address1 = otherInfo1.trim() + '\n';
      }
      if ((otherInfo2 !== '' && otherInfo2 != null)) {
        address2 = otherInfo2.trim() + '\n';
      }

      if ((streetName !== '' && streetName != null)) {
        address3 = streetName.trim() + '\n';
      }

      if (estateName !== '' && estateName !== null) {
        address4 = estateName.trim() + '\n';
      }

      if ((buildingPhase !== '' && buildingPhase != null)) {
        address5 = buildingPhase.trim() + '\n';
      }

      if ((block !== '' && block != null)) {
        address6 = block.trim() + '座' + ' ';
      }

      if (floor !== '' && floor !== null && (roomFlat !== '' && roomFlat != null) && (block !== '' && block != null)) {
        address6 += floor.trim() + '樓 ';
      } else if (floor !== '' && floor !== null && (roomFlat === '' || roomFlat === null) && (block === '' || !block)) {
        address6 += floor.trim() + '樓 ';
      } else if (floor !== '' && floor !== null && (block !== '' && block != null) && (roomFlat === '' || roomFlat === null)) {
        address6 += floor.trim() + '樓 ';
      } else if (floor !== '' && floor !== null && (roomFlat !== '' && roomFlat != null) && (block === '' || !block)) {
        address6 += floor.trim() + '樓 ';
      }

      if ((roomFlat !== '' && roomFlat != null) && (floor === '' || floor === null) && (block === '' || !block)) {
        address6 += roomFlat.trim() + '室/號';
      } else if (floor !== '' && floor !== null && (roomFlat !== '' && roomFlat != null) && (block !== '' && block != null)) {
        address6 += roomFlat.trim() + '室/號';
      } else if (floor !== '' && floor !== null && (roomFlat !== '' && roomFlat != null) && (block === '' || !block)) {
        address6 += roomFlat.trim() + '室/號';
      } else if ((floor === '' || floor === null) && (roomFlat !== '' && roomFlat != null) && (block !== '' && block != null)) {
        address6 += roomFlat.trim() + '室/號';
      }

      if (address2 === '' && address1 !== '') {
        address2 = address1;
        address1 = '';
      } else if (address2 === '' && address3 !== '') {
        address2 = address3;
        address3 = '';
      } else if (address2 === '' && address4 !== '') {
        address2 = address4;
        address4 = '';
      }

      if (address2 === '' && address5 !== '' && address5 !== null && address6 === '' &&
        address1 === '' && address3 === '' && address4 === '') {
        address2 = address5;
        address5 = '';
      }

      if (address2 === '' && address6 !== '' && address6 !== null && address5 === '' &&
        address1 === '' && address3 === '' && address4 === '') {
        address2 = address6;
        address6 = '';
      }

    } else if (this.inputFormGroup.get('addTypeRadio').value === 'hkPB') {

      if ((otherInfo1 !== '' && otherInfo1 != null)) {
        address1 = otherInfo1.trim() + '\n';
      }

      if ((otherInfo2 !== '' && otherInfo2 != null)) {
        address2 = otherInfo2.trim();
      }

      if (address2 === '') {
        address2 = address1;
        address1 = '';
      }
    }
    address = address1 + address2 + address3 + address4 + address5 + address6;
    this.inputFormGroup.get('totalAddress').setValue(address);
    this.inputFormGroup.get('address1').setValue(address1);
    this.inputFormGroup.get('address2').setValue(address2);
    this.inputFormGroup.get('address3').setValue(address3);
    this.inputFormGroup.get('address4').setValue(address4);
    this.inputFormGroup.get('address5').setValue(address5);
    this.inputFormGroup.get('address6').setValue(address6);
    this.totalAddress = address;
    sessionStorage.setItem('totalAddress', this.totalAddress);

    this.setAllAddressSession();
  }

  // ------------------- ADDRESS LOOK UP END -------------------- //
  setLanguageValidation(string: string) {
    if (this.inputFormGroup.get('addLang').value != 'en') {
      this.isSimplifiedChineseCheck(string);
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

          console.log("Error: " + err);

        });
    }
  }

  cutValues(key: any, field: string) {
    this.inputFormGroup.get(field).setValue(this.addressField(key));
  }

  addressField(value): string {
    if (this.inputFormGroup.get('addLang').value === 'en') {
      // const regex = /[^\ a-z,0-9,-.()*&^%$#@!' ]/gi;
      const regex = /^(?=.*[a-z0-9])[a-z0-9!@#$%&*.]{}$/gi;
      const regex2 = /(  )/gi;
      const chinregex = /[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]/;
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
      if (chinregex.test(value)) {
        return '';
      }
      value = value.replace(regex2, " ");
      return value.replace(regex, "");

    } else {
      const regex = /^(?=.*[a-z0-9])[a-z0-9!@#$%&*.]{}$/gi;
      // const regex = /[^\ a-z,0-9,-.()*&^%$#@!'\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]/gi;
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
      value = value.replace(regex2, " ");
      return value.replace(regex, "");

    }
  }

  // ? To reset all the errors in the form.
  public resetFormErrors() {
    let control: AbstractControl = null;

    Object.keys(this.inputFormGroup.controls).forEach((name) => {
      control = this.inputFormGroup.controls[name];
      control.setErrors(null);
    });
    this.inputFormGroup.setErrors(null);
  }

}


function validateDistrict(form: FormGroup) {
  const districtName = form.get('districtName').value;
  const addTypeRadio = form.get('addTypeRadio').value;
  const otherDistrict = form.get('otherDistrict').value;

  if (addTypeRadio === 'withinHK') {
    if (districtName == null ||
      districtName === '' ||
      districtName === '28' ||
      districtName === '0' ||
      districtName === '59' ||
      districtName === 'Z') {
      return { districtEmpty: true };
    }
  }
  if (otherDistrict && (otherDistrict === 'OTHERS' || otherDistrict === '其他')) {
    return { districtEmpty: true };
  }
}

function validateOtherInfo(form: FormGroup) {
  const otherInfo1 = form.get('otherInfo1').value;
  const otherInfo2 = form.get('otherInfo2').value;
  const addTypeRadio = form.get('addTypeRadio').value;
  if (addTypeRadio === 'outsideHK' || addTypeRadio === 'hkPB') {
    if (((otherInfo1 === '' || otherInfo1 == null) && (otherInfo2 === '' || otherInfo2 == null))) {
      return { otherInfoEmpty: true };
    }
  }
}
