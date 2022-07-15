
import { Component, OnInit , EventEmitter, Output, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/common.service';
import { FormGroupName, FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
  displayWithinHK: boolean;
  displayOutsideHK: boolean;
  displayHkPB: boolean;
  prefix: string;

  @Input() inputFormGroup: FormGroup;
  @Input() set ObjInput({withinHK, outsideHK, hkPB, prefix}) {
    this.displayWithinHK = withinHK;
    this.displayOutsideHK = outsideHK;
    this.displayHkPB = hkPB;
    this.prefix = prefix;
 }

  totalAddress: string ;
  errorMessageRegion: any;
  errorMessageCountry: any;
  errorMessageMainlandSelectedLocation: any;
  errorMessageOverseasSelectedLocation: any;
  errorObject: Error; selectedTerritory: string;
  selectedTerritoryLoc: string;
  selectedCountry: any;
  selectedLocation: string;
  selectedOffice: string = '0';
  collectionList = [];
  collectionListAbroad = [];
  collectionOfficesOfSelected: any;
  collectionOfficesOfMainland: any;
  collectionOfficesOfSelectedCountry: any;
  collectionOfficesAndTerritories = [];
  listOfCountries = [];
  selectedMailMethod: string;
  mailMethods = [];
  inputMailMethods = [];


  listOfRegionsAndCountries = [];

  prefSCK: boolean = false;
  showCheckbox: boolean = false;
  showCountryDropDown: boolean = false;
  showRegionDropDown: boolean = false;
  countryCde: string;
  telephoneNum: string;
  showMailMethod = false;
  showDeliveryAmount = false;
  isHk: boolean = false;
  amount: number;
  sckDiv: HTMLElement;
  email = "";
  isEmailFieldDisabled: boolean = false;
  collectionNoticeBy: string = "EMAIL";
  ofcAddress: string = '';
  ofcTime: string;
  ofcPhone: string;
  isSckEnabled: boolean = false;
  age: number;
  isOverseas: boolean = false;

  //address
  modal: HTMLElement;
  unitNum: string = '';
  unitValue: string = '';
  houseNumber: string = '';
  floor: string = '';
  bldgName: string = '';
  block: string = '';
  blockValue: string = '';
  phase: string = '';
  streetName: string = '';
  estateName: string = '';
  districtName: {
    districtCd: string,
    districtFullName: string
  };
  provinceName: string = '';
  regionCd: string = '';
  regionName: string = '';
  address: string = '';
  otherCountry: string = '';
  errorAddress = [];
  errorAddress2 = [];
  errorAddress3 = [];
  errorAddress4 = [];
  add1: string = '';
  add2: string = '';
  add3: string = '';
  hasAddress: boolean = false;
  territory: any[];
  office: any[];

  //ADI
  finalDistList: any[];
  //distList: any[];
  subDistList: any[];
  streetList: any[];
  bldgList: any[];
  estateList: any[];
  selectedRegion: any = "";
  subDistrictSelected: string;

  //misc
  travelDocType: string;


  errorMessageEmail: string;
  errorMessageMailMethod: string;
  errorMessageAddress: string;
  errorMessageContact: string;
  errorMessageCollectionOffice: string;
  isSckEnableAtAdmin: boolean
  isCdcmEnableAtAdmin: boolean
  isETOEnableAtAdmin: boolean
  errorCount: number;
  // tslint:disable-next-line:max-line-length
  addressMask = [/[.'/@#!$%^&*()(a-zA-Z0-9]/, /[.'/@#!$%^&* ()(a-zA-Z0-9]/, /[.'/@#!$%^&* ()(a-zA-Z0-9]/, /[.'/@#!$%^&* ()(a-zA-Z0-9]/, /[.'/@#!$%^&*()(a-zA-Z0-9]/];
  addressDisplay: string;
  submitted = false;
  addressRegx = '^[a-zA-Z]?([a-zA-Z] ?){0,3}[a-zA-Z]+$';
  returnArr: any[];
  otherInfoMan = 0;

  @Output() navEvent = new EventEmitter();

  constructor(
    private translate: TranslateService,
    public commonService: CommonService) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.addressDisplay = this.inputFormGroup.controls.addressDisplay.value;
    this.createControls();
    this.setAddressType();
  }


  createControls() {
    this.inputFormGroup.addControl('totalAddress',new FormControl({value: '', disabled: true}));
    this.inputFormGroup.addControl('addressType',new FormControl(''));
    this.inputFormGroup.addControl('regionCd',new FormControl(''));
    this.inputFormGroup.addControl('districtName', new FormControl(''));
    this.inputFormGroup.addControl('streetName',new FormControl(''));
    this.inputFormGroup.addControl('houseNumber',new FormControl(''));
    this.inputFormGroup.addControl('estateName',new FormControl(''));
    this.inputFormGroup.addControl('phase',new FormControl(''));
    this.inputFormGroup.addControl('bldgName',new FormControl(''));
    this.inputFormGroup.addControl('block',new FormControl(''));
    this.inputFormGroup.addControl('blockValue',new FormControl(''));
    this.inputFormGroup.addControl('floor',new FormControl(''));
    this.inputFormGroup.addControl('unitNum',new FormControl(''));
    this.inputFormGroup.addControl('unitValue',new FormControl(''));
    this.inputFormGroup.addControl('add1',new FormControl(''));
    this.inputFormGroup.addControl('add2',new FormControl(''));
    this.inputFormGroup.addControl('add3',new FormControl(''));

    this.inputFormGroup.addControl('address1', new FormControl(''));
    this.inputFormGroup.addControl('address2', new FormControl(''));
    this.inputFormGroup.addControl('address3', new FormControl(''));

    this.inputFormGroup.addControl('addTypeRadio', new FormControl(''));
    if (this.addressDisplay !== undefined && this.addressDisplay !== null && this.addressDisplay !== '' ) {
      this.hasAddress = true;
      this.inputFormGroup.get('totalAddress').setValue(this.addressDisplay);
    }
  }

 private setAddressType () {
   var editAddType = '';
   
   if (this.addressDisplay !== undefined && this.addressDisplay !== null && this.addressDisplay !== '') { 
     this.getSession();
     editAddType = sessionStorage.getItem('addTypeRadio');
     if (editAddType === 'withinHK') {
      this.otherInfoMan = 0;
      this.inputFormGroup.get('add2').disable();
     }
     if (editAddType === 'outsideHK') {
      this.otherInfoMan = 1;
      this.inputFormGroup.get('regionCd').disable();
      this.inputFormGroup.get('districtName').disable();
     } if (editAddType === 'hkPB') {
      this.otherInfoMan = 1;
      this.inputFormGroup.get('regionCd').disable();
      this.inputFormGroup.get('districtName').disable();
      this.inputFormGroup.get('houseNumber').disable();
      this.inputFormGroup.get('floor').disable();
      this.inputFormGroup.get('block').disable();
      this.inputFormGroup.get('phase').disable();
      this.inputFormGroup.get('estateName').disable();
      this.inputFormGroup.get('streetName').disable();
     }
   } else {
    this.otherInfoMan = 0;
    this.inputFormGroup.patchValue({ addTypeRadio: 'withinHK' });
    this.inputFormGroup.get('add2').disable();
   }
   
  this.inputFormGroup.get('addTypeRadio').valueChanges.subscribe(
    (mode: string) => {

  if (mode === 'withinHK') {
    this.otherInfoMan = 0;
    this.inputFormGroup.get('regionCd').enable();
    this.inputFormGroup.get('districtName').enable();
    this.inputFormGroup.get('houseNumber').enable();
    this.inputFormGroup.get('floor').enable();
    this.inputFormGroup.get('block').enable();
    this.inputFormGroup.get('phase').enable();
    this.inputFormGroup.get('estateName').enable();
    this.inputFormGroup.get('streetName').enable();
    this.inputFormGroup.get('add2').disable();
    if (editAddType === 'withinHK') {
      if (sessionStorage.getItem('regionCd') !== 'null' && sessionStorage.getItem('regionCd') !== '') {
        const regionName = this.getTranslated(sessionStorage.getItem('regionCd'));
        this.inputFormGroup.get('regionCd').setValue(regionName);
      }
  
      if (sessionStorage.getItem('districtName') !== 'null' && sessionStorage.getItem('districtName') !== '') {
        const distName = this.getTranslated(sessionStorage.getItem('districtName'));
        this.processSelected(sessionStorage.getItem('regionCd'));
        this.inputFormGroup.get('districtName').setValue(sessionStorage.getItem('districtName'));
      }
      this.inputFormGroup.get('add2').disable();
      if (sessionStorage.getItem('houseNumber') !== 'null' && sessionStorage.getItem('houseNumber') !== '') {
        this.inputFormGroup.get('houseNumber').setValue(sessionStorage.getItem('houseNumber'));
      }
  
      if (sessionStorage.getItem('estateName') !== 'null' && sessionStorage.getItem('estateName') !== '') {
        this.inputFormGroup.get('estateName').setValue(sessionStorage.getItem('estateName'));
      }
  
      if (sessionStorage.getItem('phase') !== 'null' && sessionStorage.getItem('phase') !== '') {
        this.inputFormGroup.get('phase').setValue(sessionStorage.getItem('phase'));
      }
  
      if (sessionStorage.getItem('add1') !== 'null' && sessionStorage.getItem('add1') !== '') {
        this.inputFormGroup.get('add1').setValue(sessionStorage.getItem('add1'));
      }
  
      if (sessionStorage.getItem('streetName') !== 'null' && sessionStorage.getItem('streetName') !== '') {
        this.inputFormGroup.get('streetName').setValue(sessionStorage.getItem('streetName'));
      }
  
      if (sessionStorage.getItem('floor') !== 'null' && sessionStorage.getItem('floor') !== '') {
        this.inputFormGroup.get('floor').setValue(sessionStorage.getItem('floor'));
      }
  
      if (sessionStorage.getItem('block') !== 'null' && sessionStorage.getItem('block') !== '') {
        this.inputFormGroup.get('block').setValue(sessionStorage.getItem('block'));
      }
  
    } else {
    this.inputFormGroup.get('regionCd').reset();
    this.inputFormGroup.get('districtName').reset();
    this.inputFormGroup.get('houseNumber').reset();
    this.inputFormGroup.get('floor').reset();
    this.inputFormGroup.get('block').reset();
    this.inputFormGroup.get('phase').reset();
    this.inputFormGroup.get('estateName').reset();
    this.inputFormGroup.get('streetName').reset();
    this.inputFormGroup.get('add1').reset();
    this.inputFormGroup.get('add2').reset();
    this.resetError();
    }
  } else if (mode === 'outsideHK') {
    this.otherInfoMan = 1;
    this.inputFormGroup.get('regionCd').disable();
    this.inputFormGroup.get('districtName').disable();

    this.inputFormGroup.get('houseNumber').enable();
    this.inputFormGroup.get('floor').enable();
    this.inputFormGroup.get('block').enable();
    this.inputFormGroup.get('phase').enable();
    this.inputFormGroup.get('estateName').enable();
    this.inputFormGroup.get('streetName').enable();
    this.inputFormGroup.get('add2').enable();
    if (editAddType === 'outsideHK') {
     
      if (sessionStorage.getItem('houseNumber') !== 'null' && sessionStorage.getItem('houseNumber') !== '') {
        this.inputFormGroup.get('houseNumber').setValue(sessionStorage.getItem('houseNumber'));
      }
  
      if (sessionStorage.getItem('estateName') !== 'null' && sessionStorage.getItem('estateName') !== '') {
        this.inputFormGroup.get('estateName').setValue(sessionStorage.getItem('estateName'));
      }
  
      if (sessionStorage.getItem('phase') !== 'null' && sessionStorage.getItem('phase') !== '') {
        this.inputFormGroup.get('phase').setValue(sessionStorage.getItem('phase'));
      }
  
      if (sessionStorage.getItem('add1') !== 'null' && sessionStorage.getItem('add1') !== '') {
        this.inputFormGroup.get('add1').setValue(sessionStorage.getItem('add1'));
      }
  
      if (sessionStorage.getItem('add2') !== 'null' && sessionStorage.getItem('add2') !== '') {
        this.inputFormGroup.get('add2').setValue(sessionStorage.getItem('add2'));
      }
  
      if (sessionStorage.getItem('floor') !== 'null' && sessionStorage.getItem('floor') !== '') {
        this.inputFormGroup.get('floor').setValue(sessionStorage.getItem('floor'));
      }
  
      if (sessionStorage.getItem('block') !== 'null' && sessionStorage.getItem('block') !== '') {
        this.inputFormGroup.get('block').setValue(sessionStorage.getItem('block'));
      }

      if (sessionStorage.getItem('streetName') !== 'null' && sessionStorage.getItem('streetName') !== '') {
        this.inputFormGroup.get('streetName').setValue(sessionStorage.getItem('streetName'));
      }
  
    } else {
      this.inputFormGroup.get('regionCd').reset();
      this.inputFormGroup.get('districtName').reset();
      this.inputFormGroup.get('houseNumber').reset();
      this.inputFormGroup.get('floor').reset();
      this.inputFormGroup.get('block').reset();
      this.inputFormGroup.get('phase').reset();
      this.inputFormGroup.get('estateName').reset();
      this.inputFormGroup.get('streetName').reset();
      this.inputFormGroup.get('add1').reset();
      this.inputFormGroup.get('add2').reset();
    }
    

    this.resetError();
   } else if ( mode === 'hkPB') {
    this.otherInfoMan = 1;
    this.inputFormGroup.get('regionCd').disable();
    this.inputFormGroup.get('districtName').disable();
    this.inputFormGroup.get('houseNumber').disable();
    this.inputFormGroup.get('floor').disable();
    this.inputFormGroup.get('block').disable();
    this.inputFormGroup.get('phase').disable();
    this.inputFormGroup.get('estateName').disable();
    this.inputFormGroup.get('streetName').disable();
    this.inputFormGroup.get('add2').enable();
    if (editAddType === 'hkPB') {
      if (sessionStorage.getItem('add1') !== 'null' && sessionStorage.getItem('add1') !== '') {
        this.inputFormGroup.get('add1').setValue(sessionStorage.getItem('add1'));
      }
  
      if (sessionStorage.getItem('add2') !== 'null' && sessionStorage.getItem('add2') !== '') {
        this.inputFormGroup.get('add2').setValue(sessionStorage.getItem('add2'));
      }

    } else {
      this.inputFormGroup.get('regionCd').reset();
      this.inputFormGroup.get('districtName').reset();
      this.inputFormGroup.get('houseNumber').reset();
      this.inputFormGroup.get('floor').reset();
      this.inputFormGroup.get('block').reset();
      this.inputFormGroup.get('phase').reset();
      this.inputFormGroup.get('estateName').reset();
      this.inputFormGroup.get('streetName').reset();
      this.inputFormGroup.get('add1').reset();
      this.inputFormGroup.get('add2').reset();
    }

    this.resetError();

  }
});

}
  get f() {
    return this.inputFormGroup.controls;
  }

  get g() {
    return this.inputFormGroup;
  }
  generateArray(obj) {
    return Object.keys(obj).map((key) => { return { key: key, value: obj[key] } });
  }

  territorySelected(data: any) {
    this.errorMessageCollectionOffice = null;
    this.collectionOfficesOfSelected = [];
    this.collectionOfficesOfSelectedCountry = [];
    this.collectionOfficesOfMainland = [];
    this.selectedRegion = '';
    this.selectedMailMethod = '';
    this.selectedCountry = '';
    this.isSckEnabled = false;
    this.collectionNoticeBy = 'EMAIL';
    this.errorMessageMainlandSelectedLocation = "";
    this.errorMessageOverseasSelectedLocation = "";
    if (data.length > 1) {

      if (data[0].territory.id == 4) {

        this.selectedTerritory = "4";
        this.selectedTerritoryLoc = data.territory;
        this.ofcAddress = '';
        this.collectionOfficesOfMainland = data;
      } else {
        this.selectedTerritory = "5";
        this.collectionNoticeBy = 'POST'
        this.errorMessageAddress = null;
      }

    } else {

      this.selectedTerritory = data.territory.id;
      this.selectedTerritoryLoc = data.territory.territory;
      this.selectedLocation = data.code;
      this.ofcAddress = "address-" + data.code;
      this.ofcPhone = data.phone;
      this.ofcTime = data.officeHours;
      if (data.isSCKEnabled == 'Y') {
        this.isSckEnabled = true;
      } else {
        this.isSckEnabled = false;
      }
    }

    this.showCheckbox = false;
    this.showMailMethod = false
    this.showCountryDropDown = false;
    this.showRegionDropDown = false;
    // this.selectedMailMethod = "";
    this.showDeliveryAmount = false;
    this.showMailMethod = false;

    if (this.selectedTerritory == "5") {
      this.showMailMethod = false;
      this.ofcAddress = '';
    } else {
      this.selectedCountry = "";
      this.showCountryDropDown = false;
    }
  }


  regionSelected(data: any) {
    this.selectedLocation = "";
    this.selectedCountry = 0;
    this.collectionOfficesOfSelectedCountry = [];
    this.listOfRegionsAndCountries.forEach((key) => {
      if (key.code == data) {
        this.listOfCountries = key.countries;
      }
    });
    this.showCountryDropDown = true;
  }


  getCollectionOfficeList() {
    for (let i = 0; i < this.collectionOfficesAndTerritories.length; i++) {
      let territory = this.collectionOfficesAndTerritories[i];
      if (territory.id == this.selectedTerritory) {
        return territory.collectionOffice.sort(function (o1, o2) {
          if (o1.id > o2.id) {
            return 1;
          }
          if (o1.id > o2.id) {
            return -1;
          }
          return 0;
        });
      }
    }
  }


  sortCollOffices(collOffices) {
    return collOffices.collectionOffice.sort(function (o1, o2) {
      if (o1.id > o2.id) {
        return 1;
      }
      if (o1.id > o2.id) {
        return -1;
      }
      return 0;
    });
  }

  // ADDRESS START

  showAddressModal() {
    this.modal = document.getElementById(this.prefix+'pdfAddressModal');
    this.modal.setAttribute('style', 'display:block');

  }
  continueAddress() {
    this.errorAddress = [];
    this.errorAddress2 = [];
    this.errorAddress3 = [];
    this.errorAddress4 = [];
    this.submitted = true;
    
     this.validateAddress();
    //  if (this.inputFormGroup.invalid) {
    //   return;
    // }
     if (this.errorAddress.length === 0 && this.errorAddress2.length === 0 && this.errorAddress4.length === 0) {
      this.concatAddress();
      // this.hideAddressModal();
      this.errorMessageAddress = null;
      this.hasAddress = true;
      this.modal.setAttribute('style', 'display:none');

      
     }
  }

  addSession() {
    sessionStorage.setItem('addTypeRadio', this.inputFormGroup.get('addTypeRadio').value);
    sessionStorage.setItem('regionCd', this.inputFormGroup.get('regionCd').value);
    sessionStorage.setItem('districtName', this.inputFormGroup.get('districtName').value);
    sessionStorage.setItem('streetName', this.inputFormGroup.get('streetName').value);
    sessionStorage.setItem('houseNumber', this.inputFormGroup.get('houseNumber').value);
    sessionStorage.setItem('estateName', this.inputFormGroup.get('estateName').value);
    sessionStorage.setItem('phase', this.inputFormGroup.get('phase').value);
    sessionStorage.setItem('add1', this.inputFormGroup.get('add1').value);
    sessionStorage.setItem('add2', this.inputFormGroup.get('add2').value);
    sessionStorage.setItem('floor', this.inputFormGroup.get('floor').value);
    sessionStorage.setItem('block', this.inputFormGroup.get('block').value);

  }

  getSession() {

    if (sessionStorage.getItem('addTypeRadio') !== 'null' && sessionStorage.getItem('addTypeRadio') !== '') {
      this.inputFormGroup.get('addTypeRadio').setValue(sessionStorage.getItem('addTypeRadio'));
    }
    if (sessionStorage.getItem('regionCd') !== 'null' && sessionStorage.getItem('regionCd') !== '') {
      const regionName = this.getTranslated(sessionStorage.getItem('regionCd'));
      this.inputFormGroup.get('regionCd').setValue(regionName);
    }

    if (sessionStorage.getItem('districtName') !== 'null' && sessionStorage.getItem('districtName') !== '') {
      const distName = this.getTranslated(sessionStorage.getItem('districtName'));
      this.processSelected(sessionStorage.getItem('regionCd'));
      this.inputFormGroup.get('districtName').setValue(sessionStorage.getItem('districtName'));
    }

    if (sessionStorage.getItem('streetName') !== 'null' && sessionStorage.getItem('streetName') !== '') {
      this.inputFormGroup.get('streetName').setValue(sessionStorage.getItem('streetName'));
    }

    if (sessionStorage.getItem('houseNumber') !== 'null' && sessionStorage.getItem('houseNumber') !== '') {
      this.inputFormGroup.get('houseNumber').setValue(sessionStorage.getItem('houseNumber'));
    }

    if (sessionStorage.getItem('estateName') !== 'null' && sessionStorage.getItem('estateName') !== '') {
      this.inputFormGroup.get('estateName').setValue(sessionStorage.getItem('estateName'));
    }

    if (sessionStorage.getItem('phase') !== 'null' && sessionStorage.getItem('phase') !== '') {
      this.inputFormGroup.get('phase').setValue(sessionStorage.getItem('phase'));
    }

    if (sessionStorage.getItem('add1') !== 'null' && sessionStorage.getItem('add1') !== '') {
      this.inputFormGroup.get('add1').setValue(sessionStorage.getItem('add1'));
    }

    if (sessionStorage.getItem('add2') !== 'null' && sessionStorage.getItem('add2') !== '') {
      this.inputFormGroup.get('add2').setValue(sessionStorage.getItem('add2'));
    }

    if (sessionStorage.getItem('floor') !== 'null' && sessionStorage.getItem('floor') !== '') {
      this.inputFormGroup.get('floor').setValue(sessionStorage.getItem('floor'));
    }

    if (sessionStorage.getItem('block') !== 'null' && sessionStorage.getItem('block') !== '') {
      this.inputFormGroup.get('block').setValue(sessionStorage.getItem('block'));
    }


  }
  hideAddressModal() {
    this.modal.setAttribute('style', 'display:none');
    this.hasAddress = true;
    this.errorAddress = [];
    this.errorAddress2 = [];
    this.errorAddress3 = [];
    this.errorAddress4 = [];
    this.resetError();
    if (sessionStorage.getItem('addTypeRadio') === 'withinHK') {
      this.inputFormGroup.get('regionCd').enable();
      this.inputFormGroup.get('districtName').enable();
      this.inputFormGroup.get('houseNumber').enable();
      this.inputFormGroup.get('floor').enable();
      this.inputFormGroup.get('block').enable();
      this.inputFormGroup.get('phase').enable();
      this.inputFormGroup.get('estateName').enable();
      this.inputFormGroup.get('streetName').enable();
      this.inputFormGroup.get('add2').disable();
  

      this.resetError();
    } else if (sessionStorage.getItem('addTypeRadio') === 'outsideHK') {
      this.inputFormGroup.get('regionCd').disable();
      this.inputFormGroup.get('districtName').disable();
  
      this.inputFormGroup.get('houseNumber').enable();
      this.inputFormGroup.get('floor').enable();
      this.inputFormGroup.get('block').enable();
      this.inputFormGroup.get('phase').enable();
      this.inputFormGroup.get('estateName').enable();
      this.inputFormGroup.get('streetName').enable();
      this.inputFormGroup.get('add2').enable();
  
     
  
      this.resetError();
     } else if (sessionStorage.getItem('addTypeRadio') === 'hkPB') {
      this.inputFormGroup.get('regionCd').disable();
      this.inputFormGroup.get('districtName').disable();
      this.inputFormGroup.get('houseNumber').disable();
      this.inputFormGroup.get('floor').disable();
      this.inputFormGroup.get('block').disable();
      this.inputFormGroup.get('phase').disable();
      this.inputFormGroup.get('estateName').disable();
      this.inputFormGroup.get('streetName').disable();
      this.inputFormGroup.get('add2').enable();
  
     
  
      this.resetError();
  
    }
 
  }

  // ------------------ ADDRESS LOOK UP START ------------------- //

  // tslint:disable-next-line:member-ordering
  public regionList: any[] = [
    { label: 'ADDRESS_LOOKUP_SUBREG.REGION.HK', value: 'HK' },
    { label: 'ADDRESS_LOOKUP_SUBREG.REGION.KLN', value: 'KLN' },
    { label: 'ADDRESS_LOOKUP_SUBREG.REGION.NT', value: 'NT' },
    { label: 'ADDRESS_LOOKUP_SUBREG.REGION.OI', value: 'OI' }
  ];

  private blkDescptrList: any[] = [
    { label: 'ADDRESS_LOOKUP_SUBREG.BLOCK.BLOCK', value: 1 },
    { label: 'ADDRESS_LOOKUP_SUBREG.BLOCK.TOWER', value: 2 },
    { label: 'ADDRESS_LOOKUP_SUBREG.BLOCK.HOUSE', value: 3 },
    { label: 'ADDRESS_LOOKUP_SUBREG.BLOCK.OTHER', value: 5 }
  ];

  private unitDescptrList: any[] = [
    { label: 'ADDRESS_LOOKUP_SUBREG.UNIT.FLAT', value: 1 },
    { label: 'ADDRESS_LOOKUP_SUBREG.UNIT.SHOP', value: 2 },
    { label: 'ADDRESS_LOOKUP_SUBREG.UNIT.UNIT', value: 3 },
    { label: 'ADDRESS_LOOKUP_SUBREG.UNIT.SUITE', value: 4 },
    { label: 'ADDRESS_LOOKUP_SUBREG.UNIT.ROOM', value: 5 },
    { label: 'ADDRESS_LOOKUP_SUBREG.UNIT.OTHER', value: 6 }
  ]


  // tslint:disable-next-line:member-ordering
  private distList: any[] = [ {
    "districtCd" : "CW",
    "engName" : "CENTRAL & WESTERN DISTRICT",
    //"chiName" : "中西區",
    "region" : "HK",
    "dataProvider" : "REO",
    "tmstmplstupd" : "1997-07-01 00:00:00.0"
  }, {
    "districtCd" : "EST",
    "engName" : "EASTERN DISTRICT",
    //"chiName" : "東區",
    "region" : "HK",
    "dataProvider" : "REO",
    "tmstmplstupd" : "1997-07-01 00:00:00.0"
  }, {
    "districtCd" : "STH",
    "engName" : "SOUTHERN DISTRICT",
    //"chiName" : "南區",
    "region" : "HK",
    "dataProvider" : "REO",
    "tmstmplstupd" : "1997-07-01 00:00:00.0"
  }, {
    "districtCd" : "WC",
    "engName" : "WAN CHAI DISTRICT",
    //"chiName" : "灣仔區",
    "region" : "HK",
    "dataProvider" : "REO",
    "tmstmplstupd" : "1997-07-01 00:00:00.0"
  } ];

   // tslint:disable-next-line:member-ordering
   private klnDistList: any[] = [ {
    "districtCd" : "KLC",
    "engName" : "KOWLOON CITY DISTRICT",
    //"chiName" : "九龍城區",
    "region" : "KLN",
    "dataProvider" : "REO",
    "tmstmplstupd" : "1997-07-01 00:00:00.0"
  }, {
    "districtCd" : "KT",
    "engName" : "KWUN TONG DISTRICT",
    //"chiName" : "觀塘區",
    "region" : "KLN",
    "dataProvider" : "REO",
    "tmstmplstupd" : "1997-07-01 00:00:00.0"
  }, {
    "districtCd" : "SSP",
    "engName" : "SHAM SHUI PO DISTRICT",
    //"chiName" : "深水埗區",
    "region" : "KLN",
    "dataProvider" : "REO",
    "tmstmplstupd" : "1997-07-01 00:00:00.0"
  }, {
    "districtCd" : "WTS",
    "engName" : "WONG TAI SIN DISTRICT",
   // "chiName" : "黃大仙區",
    "region" : "KLN",
    "dataProvider" : "REO",
    "tmstmplstupd" : "1997-07-01 00:00:00.0"
  }, {
    "districtCd" : "YTM",
    "engName" : "YAU TSIM MONG DISTRICT",
    //"chiName" : "油尖旺區",
    "region" : "KLN",
    "dataProvider" : "REO",
    "tmstmplstupd" : "1997-07-01 00:00:00.0"
  } ];

  // tslint:disable-next-line:member-ordering
  private ntDistList: any[] = [ {
    "districtCd" : "ILD",
    "engName" : "ISLANDS DISTRICT",
   // "chiName" : "離島區",
    "region" : "NT",
    "dataProvider" : "REO",
    "tmstmplstupd" : "1997-07-01 00:00:00.0"
  }, {
    "districtCd" : "KC",
    "engName" : "KWAI TSING DISTRICT",
   // "chiName" : "葵青區",
    "region" : "NT",
    "dataProvider" : "REO",
    "tmstmplstupd" : "1997-07-01 00:00:00.0"
  }, {
    "districtCd" : "NTH",
    "engName" : "NORTH DISTRICT",
   // "chiName" : "北區",
    "region" : "NT",
    "dataProvider" : "REO",
    "tmstmplstupd" : "1997-07-01 00:00:00.0"
  }, {
    "districtCd" : "SK",
    "engName" : "SAI KUNG DISTRICT",
    //"chiName" : "西貢區",
    "region" : "NT",
    "dataProvider" : "REO",
    "tmstmplstupd" : "1997-07-01 00:00:00.0"
  }, {
    "districtCd" : "ST",
    "engName" : "SHA TIN DISTRICT",
    //"chiName" : "沙田區",
    "region" : "NT",
    "dataProvider" : "REO",
    "tmstmplstupd" : "1997-07-01 00:00:00.0"
  }, {
    "districtCd" : "TP",
    "engName" : "TAI PO DISTRICT",
   // "chiName" : "大埔區",
    "region" : "NT",
    "dataProvider" : "REO",
    "tmstmplstupd" : "1997-07-01 00:00:00.0"
  }, {
    "districtCd" : "TW",
    "engName" : "TSUEN WAN DISTRICT",
   // "chiName" : "荃灣區",
    "region" : "NT",
    "dataProvider" : "REO",
    "tmstmplstupd" : "1997-07-01 00:00:00.0"
  }, {
    "districtCd" : "TM",
    "engName" : "TUEN MUN DISTRICT",
    //"chiName" : "屯門區",
    "region" : "NT",
    "dataProvider" : "REO",
    "tmstmplstupd" : "1997-07-01 00:00:00.0"
  }, {
    "districtCd" : "YL",
    "engName" : "YUEN LONG DISTRICT",
   // "chiName" : "元朗區",
    "region" : "NT",
    "dataProvider" : "REO",
    "tmstmplstupd" : "1997-07-01 00:00:00.0"
  } ];

    // tslint:disable-next-line:member-ordering
    private OUTlYdistList: any[] = [ {
      "districtCd" : "OI",
      "engName" : "OUTLYING ISLANDS",
     // "chiName" : "中西區",
      "region" : "OI"
    }];

// tslint:disable-next-line:member-ordering
private subCWDistrictList: any[] = [
  { label: 'DISTRICT_LOOKUP_SUBREG.CWSUBDISTRICT.0', value: '0' },
  { label: 'DISTRICT_LOOKUP_SUBREG.CWSUBDISTRICT.1', value: '1' },
  { label: 'DISTRICT_LOOKUP_SUBREG.CWSUBDISTRICT.2', value: '2' },
  { label: 'DISTRICT_LOOKUP_SUBREG.CWSUBDISTRICT.3', value: '3' },
  { label: 'DISTRICT_LOOKUP_SUBREG.CWSUBDISTRICT.4', value: '4' },
  { label: 'DISTRICT_LOOKUP_SUBREG.CWSUBDISTRICT.5', value: '5' },
  { label: 'DISTRICT_LOOKUP_SUBREG.CWSUBDISTRICT.6', value: '6' },
  { label: 'DISTRICT_LOOKUP_SUBREG.CWSUBDISTRICT.7', value: '7' },
  { label: 'DISTRICT_LOOKUP_SUBREG.CWSUBDISTRICT.8', value: '8' }
];

// tslint:disable-next-line:member-ordering
private subESTDistrictList: any[] = [
  { label: 'DISTRICT_LOOKUP_SUBREG.ESTSUBDISTRICT.20', value: '20' },
  { label: 'DISTRICT_LOOKUP_SUBREG.ESTSUBDISTRICT.21', value: '21' },
  { label: 'DISTRICT_LOOKUP_SUBREG.ESTSUBDISTRICT.22', value: '22' },
  { label: 'DISTRICT_LOOKUP_SUBREG.ESTSUBDISTRICT.23', value: '23' },
  { label: 'DISTRICT_LOOKUP_SUBREG.ESTSUBDISTRICT.24', value: '24' }
];

// tslint:disable-next-line:member-ordering
private subSTHDistrictList: any[] = [
  { label: 'DISTRICT_LOOKUP_SUBREG.STHSUBDISTRICT.31', value: '31' },
  { label: 'DISTRICT_LOOKUP_SUBREG.STHSUBDISTRICT.32', value: '32' },
  { label: 'DISTRICT_LOOKUP_SUBREG.STHSUBDISTRICT.33', value: '33' },
  { label: 'DISTRICT_LOOKUP_SUBREG.STHSUBDISTRICT.34', value: '34' },
  { label: 'DISTRICT_LOOKUP_SUBREG.STHSUBDISTRICT.36', value: '36' },
  { label: 'DISTRICT_LOOKUP_SUBREG.STHSUBDISTRICT.37', value: '37' },
  { label: 'DISTRICT_LOOKUP_SUBREG.STHSUBDISTRICT.38', value: '38' },
  { label: 'DISTRICT_LOOKUP_SUBREG.STHSUBDISTRICT.39', value: '39' },
  { label: 'DISTRICT_LOOKUP_SUBREG.STHSUBDISTRICT.40', value: '40' },
  { label: 'DISTRICT_LOOKUP_SUBREG.STHSUBDISTRICT.46', value: '46' }
];

// tslint:disable-next-line:member-ordering
private subWCDistrictList: any[] = [
  { label: 'DISTRICT_LOOKUP_SUBREG.WCSUBDISTRICT.12', value: '12' },
  { label: 'DISTRICT_LOOKUP_SUBREG.WCSUBDISTRICT.13', value: '13' },
  { label: 'DISTRICT_LOOKUP_SUBREG.WCSUBDISTRICT.14', value: '14' },
  { label: 'DISTRICT_LOOKUP_SUBREG.WCSUBDISTRICT.15', value: '15' }
];

// tslint:disable-next-line:member-ordering
private subKLCDistrictList: any[] = [
  { label: 'DISTRICT_LOOKUP_SUBREG.KLCSUBDISTRICT.100', value: '100' },
  { label: 'DISTRICT_LOOKUP_SUBREG.KLCSUBDISTRICT.76', value: '76' },
  { label: 'DISTRICT_LOOKUP_SUBREG.KLCSUBDISTRICT.77', value: '77' },
  { label: 'DISTRICT_LOOKUP_SUBREG.KLCSUBDISTRICT.79', value: '79' },
  { label: 'DISTRICT_LOOKUP_SUBREG.KLCSUBDISTRICT.81', value: '81' },
  { label: 'DISTRICT_LOOKUP_SUBREG.KLCSUBDISTRICT.82', value: '82' },
  { label: 'DISTRICT_LOOKUP_SUBREG.KLCSUBDISTRICT.83', value: '83' }
];

// tslint:disable-next-line:member-ordering
private subKTDistrictList: any[] = [
  { label: 'DISTRICT_LOOKUP_SUBREG.KTSUBDISTRICT.106', value: '106' },
  { label: 'DISTRICT_LOOKUP_SUBREG.KTSUBDISTRICT.107', value: '107' },
  { label: 'DISTRICT_LOOKUP_SUBREG.KTSUBDISTRICT.109', value: '109' },
  { label: 'DISTRICT_LOOKUP_SUBREG.KTSUBDISTRICT.110', value: '110' },
  { label: 'DISTRICT_LOOKUP_SUBREG.KTSUBDISTRICT.111', value: '111' },
  { label: 'DISTRICT_LOOKUP_SUBREG.KTSUBDISTRICT.112', value: '112' },
  { label: 'DISTRICT_LOOKUP_SUBREG.KTSUBDISTRICT.126', value: '126' }
];

// tslint:disable-next-line:member-ordering
private subSSPDistrictList: any[] = [
  { label: 'DISTRICT_LOOKUP_SUBREG.SSPSUBDISTRICT.64', value: '64' },
  { label: 'DISTRICT_LOOKUP_SUBREG.SSPSUBDISTRICT.65', value: '65' },
  { label: 'DISTRICT_LOOKUP_SUBREG.SSPSUBDISTRICT.66', value: '66' },
  { label: 'DISTRICT_LOOKUP_SUBREG.SSPSUBDISTRICT.67', value: '67' },
  { label: 'DISTRICT_LOOKUP_SUBREG.SSPSUBDISTRICT.68', value: '68' },
  { label: 'DISTRICT_LOOKUP_SUBREG.SSPSUBDISTRICT.69', value: '69' }
];

// tslint:disable-next-line:member-ordering
private subWTSDistrictList: any[] = [
  { label: 'DISTRICT_LOOKUP_SUBREG.WTSSUBDISTRICT.90', value: '90' },
  { label: 'DISTRICT_LOOKUP_SUBREG.WTSSUBDISTRICT.91', value: '91' },
  { label: 'DISTRICT_LOOKUP_SUBREG.WTSSUBDISTRICT.93', value: '93' },
  { label: 'DISTRICT_LOOKUP_SUBREG.WTSSUBDISTRICT.94', value: '94' },
  { label: 'DISTRICT_LOOKUP_SUBREG.WTSSUBDISTRICT.95', value: '95' },
  { label: 'DISTRICT_LOOKUP_SUBREG.WTSSUBDISTRICT.96', value: '96' },
  { label: 'DISTRICT_LOOKUP_SUBREG.WTSSUBDISTRICT.97', value: '97' },
  { label: 'DISTRICT_LOOKUP_SUBREG.WTSSUBDISTRICT.99', value: '99' }
];

// tslint:disable-next-line:member-ordering
private subYTMDistrictList: any[] = [
  { label: 'DISTRICT_LOOKUP_SUBREG.YTMSUBDISTRICT.52', value: '52' },
  { label: 'DISTRICT_LOOKUP_SUBREG.YTMSUBDISTRICT.53', value: '53' },
  { label: 'DISTRICT_LOOKUP_SUBREG.YTMSUBDISTRICT.56', value: '56' },
  { label: 'DISTRICT_LOOKUP_SUBREG.YTMSUBDISTRICT.57', value: '57' },
  { label: 'DISTRICT_LOOKUP_SUBREG.YTMSUBDISTRICT.60', value: '60' }
];

// tslint:disable-next-line:member-ordering
private subKCDistrictList: any[] = [
  { label: 'DISTRICT_LOOKUP_SUBREG.KCSUBDISTRICT.200', value: '200' },
  { label: 'DISTRICT_LOOKUP_SUBREG.KCSUBDISTRICT.128', value: '128' },
  { label: 'DISTRICT_LOOKUP_SUBREG.KCSUBDISTRICT.129', value: '129' },
];

// tslint:disable-next-line:member-ordering
private subNTHDistrictList: any[] = [
  { label: 'DISTRICT_LOOKUP_SUBREG.NTHSUBDISTRICT.269', value: '269' },
  { label: 'DISTRICT_LOOKUP_SUBREG.NTHSUBDISTRICT.271', value: '271' },
  { label: 'DISTRICT_LOOKUP_SUBREG.NTHSUBDISTRICT.273', value: '273' },
  { label: 'DISTRICT_LOOKUP_SUBREG.NTHSUBDISTRICT.285', value: '285' },
  { label: 'DISTRICT_LOOKUP_SUBREG.NTHSUBDISTRICT.288', value: '288' },
  { label: 'DISTRICT_LOOKUP_SUBREG.NTHSUBDISTRICT.289', value: '289' },
  { label: 'DISTRICT_LOOKUP_SUBREG.NTHSUBDISTRICT.293', value: '293' }
];

// tslint:disable-next-line:member-ordering
private subSKDistrictList: any[] = [
  { label: 'DISTRICT_LOOKUP_SUBREG.SKSUBDISTRICT.395', value: '395' },
  { label: 'DISTRICT_LOOKUP_SUBREG.SKSUBDISTRICT.396', value: '396' },
  { label: 'DISTRICT_LOOKUP_SUBREG.SKSUBDISTRICT.398', value: '398' },
  { label: 'DISTRICT_LOOKUP_SUBREG.SKSUBDISTRICT.399', value: '399' }
];

// tslint:disable-next-line:member-ordering
private subSTDistrictList: any[] = [
  { label: 'DISTRICT_LOOKUP_SUBREG.STSUBDISTRICT.353', value: '353' },
  { label: 'DISTRICT_LOOKUP_SUBREG.STSUBDISTRICT.354', value: '354' },
  { label: 'DISTRICT_LOOKUP_SUBREG.STSUBDISTRICT.355', value: '355' },
  { label: 'DISTRICT_LOOKUP_SUBREG.STSUBDISTRICT.356', value: '356' },
  { label: 'DISTRICT_LOOKUP_SUBREG.STSUBDISTRICT.358', value: '358' },
  { label: 'DISTRICT_LOOKUP_SUBREG.STSUBDISTRICT.361', value: '361' },
  { label: 'DISTRICT_LOOKUP_SUBREG.STSUBDISTRICT.369', value: '369' }
];

// tslint:disable-next-line:member-ordering
private subILDDistrictList: any[] = [
  { label: 'DISTRICT_LOOKUP_SUBREG.ILDSUBDISTRICT.452', value: '452' },
  { label: 'DISTRICT_LOOKUP_SUBREG.ILDSUBDISTRICT.470', value: '470' },
  { label: 'DISTRICT_LOOKUP_SUBREG.ILDSUBDISTRICT.450', value: '450' },
  { label: 'DISTRICT_LOOKUP_SUBREG.ILDSUBDISTRICT.474', value: '474' },
  { label: 'DISTRICT_LOOKUP_SUBREG.ILDSUBDISTRICT.451', value: '451' },
  { label: 'DISTRICT_LOOKUP_SUBREG.ILDSUBDISTRICT.462', value: '462' },
  { label: 'DISTRICT_LOOKUP_SUBREG.ILDSUBDISTRICT.471', value: '471' },
  { label: 'DISTRICT_LOOKUP_SUBREG.ILDSUBDISTRICT.456', value: '456' },
  { label: 'DISTRICT_LOOKUP_SUBREG.ILDSUBDISTRICT.453', value: '453' },
  { label: 'DISTRICT_LOOKUP_SUBREG.ILDSUBDISTRICT.459', value: '459' },
  { label: 'DISTRICT_LOOKUP_SUBREG.ILDSUBDISTRICT.469', value: '469' },
  { label: 'DISTRICT_LOOKUP_SUBREG.ILDSUBDISTRICT.472', value: '472' },
  { label: 'DISTRICT_LOOKUP_SUBREG.ILDSUBDISTRICT.460', value: '460' },
  { label: 'DISTRICT_LOOKUP_SUBREG.ILDSUBDISTRICT.466', value: '466' },
  { label: 'DISTRICT_LOOKUP_SUBREG.ILDSUBDISTRICT.449', value: '449' }
];

// tslint:disable-next-line:member-ordering
private subTPDistrictList: any[] = [
  { label: 'DISTRICT_LOOKUP_SUBREG.TPSUBDISTRICT.324', value: '324' },
  { label: 'DISTRICT_LOOKUP_SUBREG.TPSUBDISTRICT.325', value: '325' },
  { label: 'DISTRICT_LOOKUP_SUBREG.TPSUBDISTRICT.327', value: '327' },
  { label: 'DISTRICT_LOOKUP_SUBREG.TPSUBDISTRICT.336', value: '336' },
  { label: 'DISTRICT_LOOKUP_SUBREG.TPSUBDISTRICT.341', value: '341' }
];

// tslint:disable-next-line:member-ordering
private subTWDistrictList: any[] = [
  { label: 'DISTRICT_LOOKUP_SUBREG.TWSUBDISTRICT.150', value: '150' },
  { label: 'DISTRICT_LOOKUP_SUBREG.TWSUBDISTRICT.152', value: '152' },
  { label: 'DISTRICT_LOOKUP_SUBREG.TWSUBDISTRICT.153', value: '153' },
  { label: 'DISTRICT_LOOKUP_SUBREG.TWSUBDISTRICT.155', value: '155' },
  { label: 'DISTRICT_LOOKUP_SUBREG.TWSUBDISTRICT.162', value: '162' }
];

// tslint:disable-next-line:member-ordering
private subTMDistrictList: any[] = [
  { label: 'DISTRICT_LOOKUP_SUBREG.TMSUBDISTRICT.171', value: '171' },
  { label: 'DISTRICT_LOOKUP_SUBREG.TMSUBDISTRICT.172', value: '172' },
  { label: 'DISTRICT_LOOKUP_SUBREG.TMSUBDISTRICT.173', value: '173' },
  { label: 'DISTRICT_LOOKUP_SUBREG.TMSUBDISTRICT.179', value: '179' },
  { label: 'DISTRICT_LOOKUP_SUBREG.TMSUBDISTRICT.181', value: '181' },
  { label: 'DISTRICT_LOOKUP_SUBREG.TMSUBDISTRICT.184', value: '184' },
  { label: 'DISTRICT_LOOKUP_SUBREG.TMSUBDISTRICT.202', value: '202' }
];

// tslint:disable-next-line:member-ordering
private subYLDistrictList: any[] = [
  { label: 'DISTRICT_LOOKUP_SUBREG.YLSUBDISTRICT.207', value: '207' },
  { label: 'DISTRICT_LOOKUP_SUBREG.YLSUBDISTRICT.208', value: '208' },
  { label: 'DISTRICT_LOOKUP_SUBREG.YLSUBDISTRICT.209', value: '209' },
  { label: 'DISTRICT_LOOKUP_SUBREG.YLSUBDISTRICT.210', value: '210' },
  { label: 'DISTRICT_LOOKUP_SUBREG.YLSUBDISTRICT.211', value: '211' },
  { label: 'DISTRICT_LOOKUP_SUBREG.YLSUBDISTRICT.212', value: '212' },
  { label: 'DISTRICT_LOOKUP_SUBREG.YLSUBDISTRICT.214', value: '214' },
  { label: 'DISTRICT_LOOKUP_SUBREG.YLSUBDISTRICT.215', value: '215' },
  { label: 'DISTRICT_LOOKUP_SUBREG.YLSUBDISTRICT.216', value: '216' },
  { label: 'DISTRICT_LOOKUP_SUBREG.YLSUBDISTRICT.223', value: '223' },
  { label: 'DISTRICT_LOOKUP_SUBREG.YLSUBDISTRICT.224', value: '224' },
  { label: 'DISTRICT_LOOKUP_SUBREG.YLSUBDISTRICT.263', value: '263' }
];

// tslint:disable-next-line:member-ordering
private subOUTLYDistrictList: any[] = [
  { label: 'DISTRICT_LOOKUP_SUBREG.OUTLYINGISLANDS.Z', value: 'Z' },
  { label: 'DISTRICT_LOOKUP_SUBREG.OUTLYINGISLANDS.A', value: 'A' },
  { label: 'DISTRICT_LOOKUP_SUBREG.OUTLYINGISLANDS.B', value: 'B' },
  { label: 'DISTRICT_LOOKUP_SUBREG.OUTLYINGISLANDS.C', value: 'C' },
  { label: 'DISTRICT_LOOKUP_SUBREG.OUTLYINGISLANDS.D', value: 'D' },
  { label: 'DISTRICT_LOOKUP_SUBREG.OUTLYINGISLANDS.E', value: 'E' },
  { label: 'DISTRICT_LOOKUP_SUBREG.OUTLYINGISLANDS.F', value: 'F' },
  { label: 'DISTRICT_LOOKUP_SUBREG.OUTLYINGISLANDS.G', value: 'G' },
  { label: 'DISTRICT_LOOKUP_SUBREG.OUTLYINGISLANDS.H', value: 'H' },
  { label: 'DISTRICT_LOOKUP_SUBREG.OUTLYINGISLANDS.I', value: 'I' },
  { label: 'DISTRICT_LOOKUP_SUBREG.OUTLYINGISLANDS.J', value: 'J' },
  { label: 'DISTRICT_LOOKUP_SUBREG.OUTLYINGISLANDS.K', value: 'K' },
  { label: 'DISTRICT_LOOKUP_SUBREG.OUTLYINGISLANDS.L', value: 'L' },
  { label: 'DISTRICT_LOOKUP_SUBREG.OUTLYINGISLANDS.M', value: 'M' },
  { label: 'DISTRICT_LOOKUP_SUBREG.OUTLYINGISLANDS.N', value: 'N' },
  { label: 'DISTRICT_LOOKUP_SUBREG.OUTLYINGISLANDS.O', value: 'O' },
  { label: 'DISTRICT_LOOKUP_SUBREG.OUTLYINGISLANDS.P', value: 'P' },
  { label: 'DISTRICT_LOOKUP_SUBREG.OUTLYINGISLANDS.Q', value: 'Q' }
];

processDistrict(inData: string) {
    this.inputFormGroup.get('districtName').setValue('');
     this.inputFormGroup.get('districtName').setValue(inData);

}
  processSelected(data: string) {
      if (data === 'HK') {
        this.resetError();
      this.subDistList = this.distList;
      this.subDistList.forEach((obj) => {
        obj.children = [];
          if (obj.districtCd === 'CW') {
            this.resetError();
            obj.children = this.subCWDistrictList;
          } else if (obj.districtCd === 'EST') {
            this.resetError();
            obj.children = this.subESTDistrictList;
          } else if (obj.districtCd === 'STH') {
            this.resetError();
            obj.children = this.subSTHDistrictList;
          } else if (obj.districtCd === 'WC') {
            this.resetError();
            obj.children = this.subWCDistrictList;
          }
           let list: any[];
           list = obj.children;
           list.forEach((resul) => {
             if (resul.value === '0') {
              this.inputFormGroup.get('districtName').setValue(resul.label);
             }
           });
      });
    } else if (data === 'KLN') {
      this.resetError();
      this.subDistList = this.klnDistList;
      this.subDistList.forEach((obj) => {
        obj.children = [];
          if (obj.districtCd === 'KLC') {
            obj.children = this.subKLCDistrictList;
          } else if (obj.districtCd === 'KT') {
            obj.children = this.subKTDistrictList;
          } else if (obj.districtCd === 'SSP') {
            obj.children = this.subSSPDistrictList;
          } else if (obj.districtCd === 'WTS') {
            obj.children = this.subWTSDistrictList;
          } else if (obj.districtCd === 'YTM') {
            obj.children = this.subYTMDistrictList;
          }
          let list: any[];
          list = obj.children;
          list.forEach((resul) => {
            if (resul.value === '100') {
             this.inputFormGroup.get('districtName').setValue(resul.label);
            }
          });
      });
    }  else if (data === 'NT') {
      this.resetError();
      this.subDistList = this.ntDistList;
      this.subDistList.forEach((obj) => {
        obj.children = [];
          if (obj.districtCd === 'ILD') {
            obj.children = this.subILDDistrictList;
          } else if (obj.districtCd === 'KC') {
            obj.children = this.subKCDistrictList;
          } else if (obj.districtCd === 'NTH') {
            obj.children = this.subNTHDistrictList;
          } else if (obj.districtCd === 'SK') {
            obj.children = this.subSKDistrictList;
          } else if (obj.districtCd === 'ST') {
            obj.children = this.subSTDistrictList;
          } else if (obj.districtCd === 'TP') {
            obj.children = this.subTPDistrictList;
          } else if (obj.districtCd === 'TW') {
            obj.children = this.subTWDistrictList;
          } else if (obj.districtCd === 'TM') {
            obj.children = this.subTMDistrictList;
          } else if (obj.districtCd === 'YL') {
            obj.children = this.subYLDistrictList;
          }
          let list: any[];
          list = obj.children;
          list.forEach((resul) => {
            if (resul.value === '200') {
             this.inputFormGroup.get('districtName').setValue(resul.label);
            }
          });
      });
    } else {
      this.resetError();
      this.subDistList = this.OUTlYdistList;
      this.subDistList.forEach((obj) => {
        obj.children = [];
          if (obj.districtCd === 'OI') {
            obj.children = this.subOUTLYDistrictList;
          }
          let list: any[];
          list = obj.children;
          list.forEach((resul) => {
            if (resul.value === 'Z') {
             this.inputFormGroup.get('districtName').setValue(resul.label);
            }
          });
      });
    }
  }

  clearFields() {
    this.streetName = '';
    this.houseNumber = '';
    this.estateName = '';
    this.phase = '';
    this.bldgName = '';
    this.block = '';
    this.blockValue = '';
    this.floor = '';
    this.unitNum = '';
    this.unitValue = '';
  }

  private langCode() {
    return 'eng';
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

  validateAddress() {

    const unitValue = this.inputFormGroup.get('unitValue').value;
    const floor=this.inputFormGroup.get('floor').value;
    const blockValue =this.inputFormGroup.get('blockValue').value;
    const bldgName=this.inputFormGroup.get('bldgName').value;
    const estateName=this.inputFormGroup.get('estateName').value;
    const phase=this.inputFormGroup.get('phase').value;
    const houseNumber = this.inputFormGroup.get('houseNumber').value;
    const add1 = this.inputFormGroup.get('add1').value;
    const add2 = this.inputFormGroup.get('add2').value;
    const districtName = this.inputFormGroup.get('districtName').value;
    const regionName = this.inputFormGroup.get('regionCd').value;
    const streetName = this.inputFormGroup.get('streetName').value;
    
    this.errorAddress = [];
    this.errorAddress2 = [];
    this.errorAddress3 = [];
    this.errorAddress4 = [];
    var dist = '';
    if (districtName !== null && districtName !== '') {
      dist = this.getTranslated(districtName);
    }

    if (this.inputFormGroup.get('addTypeRadio').value === 'withinHK') {
      if ((regionName === '' || regionName == null)) {
        this.errorAddress.push('Please select a Area');
      } else if (districtName == null || districtName === '' || dist === 'OUTLYING ISLANDS' || dist === 'HONG KONG' || dist === 'KOWLOON' || dist === 'NEW TERRITORIES') {
        this.errorAddress2.push('Please select a District');
      }

      this.inputFormGroup.controls['districtName'].valueChanges.subscribe(val => {
        this.errorAddress2 = [];
      });

    }
     if (this.inputFormGroup.get('addTypeRadio').value === 'outsideHK') {
      if (((add1 === '' || add1 == null) && (add2 === '' || add2 == null))) {
        this.errorAddress4.push('Please input other information ( e.g. country name, Zip code, P.O. Box).');
      }
      this.inputFormGroup.controls['add1'].valueChanges.subscribe(val => {
        this.errorAddress4 = [];
      });
      this.inputFormGroup.controls['add2'].valueChanges.subscribe(val => {
        this.errorAddress4 = [];
      });
    }
  }

  showMailDiv(data) {
    this.showMailMethod = true;
    if (data == 'Y') {
      this.isSckEnabled = true;
    } else {
      this.isSckEnabled = false;
    }
    this.errorMessageOverseasSelectedLocation = null;
  }

  showDeliveryMethod(index, type) {
    if (type == 'mainland') {
      for (let i = 0; i < this.collectionOfficesOfMainland.length; i++) {
        if (i == index) {
          this.inputMailMethods[i] = true;
          this.showDeliveryAmount = false;
          this.selectedMailMethod = '';
        } else {
          this.inputMailMethods[i] = false;
        }
      }
    } else {
      for (let i = 0; i < this.collectionOfficesOfSelectedCountry.length; i++) {
        if (i == index) {
          this.inputMailMethods[i] = true;
          this.showDeliveryAmount = false;

          this.selectedMailMethod = '';

        } else {
          this.inputMailMethods[i] = false;
        }
      }
    }

  }

  concatAddress() {


    this.addSession();
    let address  =  this.inputFormGroup.get('totalAddress').value;
    const addressType = this.inputFormGroup.get('addressType').value;
    const unitValue = this.inputFormGroup.get('unitValue').value;
    const unitNum    = this.inputFormGroup.get('unitNum').value;
    const floor = this.inputFormGroup.get('floor').value;
    const blockValue = this.inputFormGroup.get('blockValue').value;
    const block = this.inputFormGroup.get('block').value;
    const bldgName = this.inputFormGroup.get('bldgName').value;
    const estateName = this.inputFormGroup.get('estateName').value;
    const phase = this.inputFormGroup.get('phase').value;
    const houseNumber = this.inputFormGroup.get('houseNumber').value;
    const add1 = this.inputFormGroup.get('add1').value;
    const add2 = this.inputFormGroup.get('add2').value;
    const add3 = this.inputFormGroup.get('add3').value;
    const districtName = this.inputFormGroup.get('districtName');
    const regionCd = this.inputFormGroup.get('regionCd').value;
    const streetName = this.inputFormGroup.get('streetName').value;
    const addTypeRadio = this.inputFormGroup.get('addTypeRadio').value;
    let address1  = '' ;
    let address2  = '' ;
    let address3  = '' ;

    address = '';
    if (addTypeRadio === 'withinHK') {
      if ((houseNumber !== '' && houseNumber != null)) {
                address = 'RM/FLAT ' + houseNumber.trim() + ', ';
      }  if (floor !== '' && floor !== null) {
          address += floor.trim() + '/F, ';
      }
      if ((block !== '' && block != null) ) {
        address += 'BLK ' + block.trim() + ',';
      }
      if ((phase !== '' && phase != null)  ) {
          address += phase.trim() + '\n';
      }
      address1 = address;
       if (estateName !== '' && estateName !== null) {
          address += estateName.trim() + ',';
          address2 += estateName.trim() + ',';
      }
      if ((streetName !== '' && streetName != null) ) {
        address += streetName.trim() + '\n';
        address2 += streetName.trim() + '\n';
      }
      if (districtName != null) {
       address += this.getTranslated(districtName.value) + ', ';
       address3 += this.getTranslated(districtName.value) + ', ';
      }
      if ((regionCd !== '' && regionCd != null) ) {
        this.translateReg(regionCd);
      }
      if ((this.regionName !== '' && this.regionName != null) ) {
        address += this.getTranslated(this.regionName) + ',';
        address3 += this.getTranslated(this.regionName) + ',';
      }
      if ((add1 !== '' && add1 != null) ) {
        address += add1.trim();
        address3 += add1.trim();
        }
      address = address.replace(/,\s*$/, "");
      address3 = address3.replace(/,\s*$/, "");

      if((houseNumber === '' || houseNumber === null) &&
        (floor === '' || floor === null) &&
        (block === '' || block === null) &&
        (phase === '' || phase === null) &&
        (estateName === '' || estateName === null) &&
        (streetName === '' || streetName === null) &&
        (add1 === '' || add1 === null) &&
        (districtName != null) &&
        (this.regionName !== '' && this.regionName != null)){
          address1 = address3
          address3 = '';
      }
    } else if ((this.inputFormGroup.get('addTypeRadio').value === 'outsideHK')) {
            if ((houseNumber !== '' && houseNumber != null)) {
                address = 'RM/FLAT ' + houseNumber.trim() + ', ';

            }  if (floor !== '' && floor !== null) {
              address += floor.trim() + '/F, ';

            }
            if ((block !== '' && block != null) ) {
            address += 'BLK ' + block.trim() + ',';
            }

            if ((phase !== '' && phase != null)  ) {
              address += phase.trim() + '\n';
            }
            address1 = address;
             if (estateName !== '' && estateName !== null) {
              address += estateName.trim() + ',';
              address2 += estateName.trim() + ',';
            }

            if ((streetName !== '' && streetName != null) ) {
            address += streetName.trim() + '\n';
            address2 += streetName.trim() + '\n';
            }
            if ((add1 !== '' && add1 != null) ) {
              address += add1.trim() + ',';
              address2 += add1.trim() + ',';
              }

              if ((add2 !== '' && add2 != null) ) {
                address += add2.trim();
                address2 += add2.trim();
                }

                address = address.replace(/,\s*$/, "");
                address2 = address2.replace(/,\s*$/, "");
    } else if (this.inputFormGroup.get('addTypeRadio').value === 'hkPB') {

      if ((add1 !== '' && add1 != null) ) {
        address += add1.trim() + '\n';
        address1 += add1.trim() + '\n';
        }

        if ((add2 !== '' && add2 != null)) {
          address += add2.trim();
          address2 += add2.trim();
          }

          address = address.replace(/,\s*$/, "");
          address1 = address1.replace(/,\s*$/, "");
    }


    this.inputFormGroup.get('totalAddress').setValue(address);
    this.inputFormGroup.get('address1').setValue(address1);
    this.inputFormGroup.get('address2').setValue(address2);
    this.inputFormGroup.get('address3').setValue(address3);
    this.totalAddress = address;

    sessionStorage.setItem('totalAddress',this.totalAddress);
  }


  resetError() {
    this.errorAddress = [];
    this.errorAddress2 = [];
    this.errorAddress3 = [];
    this.errorAddress4 = [];
  }



  // ------------------- ADDRESS LOOK UP END -------------------- //



  upperCaseFirstLetterOfWord(string: any) {
    let newString = string.split(" ");
    let result = "";
    if (newString.length > 1) {
      newString.forEach(element => {
        result += element.charAt(0).toUpperCase() + element.slice(1);
      });
    } else {
      result += newString[0].charAt(0).toUpperCase() + newString[0].slice(1);
    }

    return result;
  }

  cutValues(key: any, field: string) {
      this.inputFormGroup.get(field).setValue(this.addressField(key));
  }

  addressField(value): string {
   
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
      value = value.replace(regex2, " ");
      return value.replace(regex, "");
  }

}



