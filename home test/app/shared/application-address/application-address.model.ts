export class ApplicationsAddress {
    roomFlat: string = '';
    floor: string = '';
    block: string = '';
    buildingPhase: string = '';
    estateName: string = '';
    streetName: string = '';
    area: string = '';
    districtName: string = '';
    otherInfo1: string = '';
    otherInfo2: string = '';
    otherDistrict: string = '';

    totalAddress: string = '';
    address1: string = '';
    address2: string = '';
    address3: string = '';
    address4: string = '';
    address5: string = '';
    address6: string = '';

    addTypeRadio: boolean;

    addLang: any;

    static newInstance(): ApplicationsAddress {
        return new ApplicationsAddress();
    }
 }
