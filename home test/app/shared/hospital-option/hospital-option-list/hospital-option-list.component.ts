import { Component, OnInit, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hospital-option-list',
  templateUrl: './hospital-option-list.component.html',
  styleUrls: ['./hospital-option-list.component.css']
})
export class HospitalOptionListComponent implements OnInit {

  @Input() formGroupname: FormGroup;
  public hospitalList: any[];

  browserLang: string;
  language = 'en-US';

  constructor(
    public translateservice: TranslateService
  ) {
    this.browserLang = this.translateservice.currentLang;
  }

  ngOnInit() {

    this.getHospitals();

    this.translateservice.onLangChange.subscribe((event: LangChangeEvent) => {
      this.browserLang = event.lang;
      this.getHospitals();

    });
  }

  getHospitals() {

    if (this.browserLang === 'en-US') {
      this.hospitalList = this.hospitalListEng;
    } else if (this.browserLang === 'zh-HK') {
      this.hospitalList = this.hospitalListHK;
    } else if (this.browserLang === 'zh-CN') {
      this.hospitalList = this.hospitalListCN;
    }

  }

  hospChange() {
    const selectedHospital = this.formGroupname.get('placeOfBirth').value;
    if (selectedHospital && selectedHospital !== 'HNIL') {
      let hospCode: any;
      let chineseHosp: any;
      let englishHosp: any;
      if (this.translateservice.currentLang === 'en-US') {
        hospCode = this.hospitalListEng.find(obj => obj.hospitalName === selectedHospital).hospitalCode;
        chineseHosp = this.hospitalListHK.find(obj => obj.hospitalCode === hospCode).hospitalName;
        englishHosp = selectedHospital;
      } else {
        hospCode = this.hospitalListHK.find(obj => obj.hospitalName === selectedHospital).hospitalCode;
        englishHosp = this.hospitalListEng.find(obj => obj.hospitalCode === hospCode).hospitalName;
        chineseHosp = selectedHospital;
      }
      this.formGroupname.controls.fullHospital.setValue(englishHosp + ' ' + chineseHosp);
      console.log('Full hospital value inside hospital component : ', this.formGroupname.get('fullHospital').value);
    }
  }

  // tslint:disable-next-line: member-ordering
  private hospitalListEng: any[] = [
    { hospitalCode: 'H1', hospitalName: 'Alice Ho Miu Ling Nethersole Hospital' },
    { hospitalCode: 'H2', hospitalName: 'Bradbury Hospice' },
    { hospitalCode: 'H3', hospitalName: 'Canossa Hospital (Caritas)' },
    { hospitalCode: 'H4', hospitalName: 'Caritas Medical Centre' },
    { hospitalCode: 'H5', hospitalName: 'Castle Peak Hospital' },
    { hospitalCode: 'H6', hospitalName: 'Cheshire Home, Chung Hom Kok' },
    { hospitalCode: 'H7', hospitalName: 'Cheshire Home, Shatin' },
    { hospitalCode: 'H8', hospitalName: 'Evangel Hospital' },
    { hospitalCode: 'H9', hospitalName: 'Gleneagles Hong Kong Hospital' },
    { hospitalCode: 'H10', hospitalName: 'Grantham Hospital' },
    { hospitalCode: 'H11', hospitalName: 'Haven of Hope Hospital' },
    { hospitalCode: 'H12', hospitalName: 'Hong Kong Adventist Hospital - Stubbs Road' },
    { hospitalCode: 'H13', hospitalName: 'Hong Kong Adventist Hospital - Tsuen Wan' },
    { hospitalCode: 'H14', hospitalName: 'Hong Kong Baptist Hospital' },
    { hospitalCode: 'H15', hospitalName: 'Hong Kong Buddhist Hospital' },
    { hospitalCode: 'H16', hospitalName: 'Hong Kong Central Hospital' },
    { hospitalCode: 'H17', hospitalName: 'Hong Kong Eye Hospital' },
    { hospitalCode: 'H18', hospitalName: 'Hong Kong Sanatorium & Hospital' },
    { hospitalCode: 'H19', hospitalName: 'Kowloon Hospital' },
    { hospitalCode: 'H20', hospitalName: 'Kwai Chung Hospital' },
    { hospitalCode: 'H21', hospitalName: 'Kwong Wah Hospital' },
    { hospitalCode: 'H22', hospitalName: 'MacLehose Medical Rehabilitation Centre' },
    { hospitalCode: 'H23', hospitalName: 'Matilda International Hospital' },
    { hospitalCode: 'H24', hospitalName: 'North District Hospital' },
    { hospitalCode: 'H25', hospitalName: 'North Lantau Hospital' },
    { hospitalCode: 'H26', hospitalName: 'Our Lady of Maryknoll Hospital' },
    { hospitalCode: 'H27', hospitalName: 'Pamela Youde Nethersole Eastern Hospital' },
    { hospitalCode: 'H28', hospitalName: 'Pok Oi Hospital' },
    { hospitalCode: 'H29', hospitalName: 'Precious Blood Hospital (Caritas)' },
    { hospitalCode: 'H30', hospitalName: 'Prince of Wales Hospital' },
    { hospitalCode: 'H31', hospitalName: 'Princess Margaret Hospital' },
    { hospitalCode: 'H32', hospitalName: 'Queen Elizabeth Hospital' },
    { hospitalCode: 'H33', hospitalName: 'Queen Mary Hospital' },
    { hospitalCode: 'H34', hospitalName: 'Rehabaid Centre' },
    { hospitalCode: 'H35', hospitalName: 'Ruttonjee Hospital' },
    { hospitalCode: 'H36', hospitalName: 'Shatin Hospital' },
    { hospitalCode: 'H37', hospitalName: 'Siu Lam Hospital' },
    { hospitalCode: 'H38', hospitalName: 'St. John Hospital' },
    { hospitalCode: 'H39', hospitalName: 'St. Paul\'s Hospital' },
    { hospitalCode: 'H40', hospitalName: 'St. Teresa\'s Hospital' },
    { hospitalCode: 'H41', hospitalName: 'Tai Po Hospital' },
    { hospitalCode: 'H42', hospitalName: 'Tang Shiu Kin Hospital' },
    { hospitalCode: 'H43', hospitalName: 'The Duchess of Kent Children\'s Hospital at Sandy Bay' },
    { hospitalCode: 'H44', hospitalName: 'Tin Shui Wai Hospital' },
    { hospitalCode: 'H45', hospitalName: 'Tsan Yuk Hospital' },
    { hospitalCode: 'H46', hospitalName: 'Tseung Kwan O Hospital' },
    { hospitalCode: 'H47', hospitalName: 'Tuen Mun Hospital' },
    { hospitalCode: 'H48', hospitalName: 'Tung Wah Eastern Hospital' },
    { hospitalCode: 'H49', hospitalName: 'Tung Wah Group of Hospitals - Fung Yiu King Hospital' },
    { hospitalCode: 'H50', hospitalName: 'Tung Wah Group of Hospitals - Wong Tai Sin Hospital' },
    { hospitalCode: 'H51', hospitalName: 'Tung Wah Hospital' },
    { hospitalCode: 'H52', hospitalName: 'Union Hospital' },
    { hospitalCode: 'H53', hospitalName: 'United Christian Hospital' },
    { hospitalCode: 'H54', hospitalName: 'Wong Chuk Hang Hospital' },
    { hospitalCode: 'H55', hospitalName: 'Yan Chai Hospital' },
    { hospitalCode: 'HNIL', hospitalName: 'Other address/hospital in Hong Kong' }
  ];

  // tslint:disable-next-line: member-ordering
  private hospitalListHK: any[] = [
    { hospitalCode: 'H1', hospitalName: '雅麗氏何妙齡那打素醫院' },
    { hospitalCode: 'H2', hospitalName: '白普理寧養中心' },
    { hospitalCode: 'H3', hospitalName: '嘉諾撒醫院' },
    { hospitalCode: 'H4', hospitalName: '明愛醫院' },
    { hospitalCode: 'H5', hospitalName: '青山醫院' },
    { hospitalCode: 'H6', hospitalName: '舂磡角慈氏護養院' },
    { hospitalCode: 'H7', hospitalName: '沙田慈氏護養院' },
    { hospitalCode: 'H8', hospitalName: '播道醫院' },
    { hospitalCode: 'H9', hospitalName: '港怡醫院' },
    { hospitalCode: 'H10', hospitalName: '葛量洪醫院' },
    { hospitalCode: 'H11', hospitalName: '靈實醫院' },
    { hospitalCode: 'H12', hospitalName: '香港港安醫院 - 司徒拔道' },
    { hospitalCode: 'H13', hospitalName: '香港港安醫院 - 荃灣' },
    { hospitalCode: 'H14', hospitalName: '香港浸信會醫院' },
    { hospitalCode: 'H15', hospitalName: '香港佛教醫院' },
    { hospitalCode: 'H16', hospitalName: '港中醫院' },
    { hospitalCode: 'H17', hospitalName: '香港眼科醫院' },
    { hospitalCode: 'H18', hospitalName: '養和醫院' },
    { hospitalCode: 'H19', hospitalName: '九龍醫院' },
    { hospitalCode: 'H20', hospitalName: '葵涌醫院' },
    { hospitalCode: 'H21', hospitalName: '廣華醫院' },
    { hospitalCode: 'H22', hospitalName: '麥理浩復康院' },
    { hospitalCode: 'H23', hospitalName: '明德國際醫院' },
    { hospitalCode: 'H24', hospitalName: '北區醫院' },
    { hospitalCode: 'H25', hospitalName: '北大嶼山醫院' },
    { hospitalCode: 'H26', hospitalName: '聖母醫院' },
    { hospitalCode: 'H27', hospitalName: '東區尤德夫人那打素醫院' },
    { hospitalCode: 'H28', hospitalName: '博愛醫院' },
    { hospitalCode: 'H29', hospitalName: '寶血醫院 (明愛)' },
    { hospitalCode: 'H30', hospitalName: '威爾斯親王醫院' },
    { hospitalCode: 'H31', hospitalName: '瑪嘉烈醫院' },
    { hospitalCode: 'H32', hospitalName: '伊利沙伯醫院' },
    { hospitalCode: 'H33', hospitalName: '瑪麗醫院' },
    { hospitalCode: 'H34', hospitalName: '復康專科及資源中心' },
    { hospitalCode: 'H35', hospitalName: '律敦治醫院' },
    { hospitalCode: 'H36', hospitalName: '沙田醫院' },
    { hospitalCode: 'H37', hospitalName: '小欖醫院' },
    { hospitalCode: 'H38', hospitalName: '長洲醫院' },
    { hospitalCode: 'H39', hospitalName: '聖保祿醫院' },
    { hospitalCode: 'H40', hospitalName: '聖德肋撒醫院' },
    { hospitalCode: 'H41', hospitalName: '大埔醫院' },
    { hospitalCode: 'H42', hospitalName: '鄧肇堅醫院' },
    { hospitalCode: 'H43', hospitalName: '大口環根德公爵夫人兒童醫院' },
    { hospitalCode: 'H44', hospitalName: '天水圍醫院' },
    { hospitalCode: 'H45', hospitalName: '贊育醫院' },
    { hospitalCode: 'H46', hospitalName: '將軍澳醫院' },
    { hospitalCode: 'H47', hospitalName: '屯門醫院' },
    { hospitalCode: 'H48', hospitalName: '東華東院' },
    { hospitalCode: 'H49', hospitalName: '東華三院馮堯敬醫院' },
    { hospitalCode: 'H50', hospitalName: '東華三院黃大仙醫院' },
    { hospitalCode: 'H51', hospitalName: '東華醫院' },
    { hospitalCode: 'H52', hospitalName: '仁安醫院' },
    { hospitalCode: 'H53', hospitalName: '基督教聯合醫院' },
    { hospitalCode: 'H54', hospitalName: '黃竹坑醫院' },
    { hospitalCode: 'H55', hospitalName: '仁濟醫院' },
    { hospitalCode: 'HNIL', hospitalName: '其他在香港的地址/醫院' }
  ];

  // tslint:disable-next-line: member-ordering
  private hospitalListCN: any[] = [
    { hospitalCode: '雅麗氏何妙齡那打素醫院', hospitalName: '雅丽氏何妙龄那打素医院' },
    { hospitalCode: '白普理寧養中心', hospitalName: '白普理宁养中心' },
    { hospitalCode: '嘉諾撒醫院', hospitalName: '嘉诺撒医院' },
    { hospitalCode: '明愛醫院', hospitalName: '明爱医院' },
    { hospitalCode: '青山醫院', hospitalName: '青山医院' },
    { hospitalCode: '舂磡角慈氏護養院', hospitalName: '舂磡角慈氏护养院' },
    { hospitalCode: '沙田慈氏護養院', hospitalName: '沙田慈氏护养院' },
    { hospitalCode: '播道醫院', hospitalName: '播道医院' },
    { hospitalCode: '港怡醫院', hospitalName: '港怡医院' },
    { hospitalCode: '葛量洪醫院', hospitalName: '葛量洪医院' },
    { hospitalCode: '靈實醫院', hospitalName: '灵实医院' },
    { hospitalCode: '香港港安醫院 - 司徒拔道', hospitalName: '香港港安医院 - 司徒拔道' },
    { hospitalCode: '香港港安醫院 - 荃灣', hospitalName: '香港港安医院 - 荃湾' },
    { hospitalCode: '香港浸信會醫院', hospitalName: '香港浸信会医院' },
    { hospitalCode: '香港佛教醫院', hospitalName: '香港佛教医院' },
    { hospitalCode: '港中醫院', hospitalName: '港中医院' },
    { hospitalCode: '香港眼科醫院', hospitalName: '香港眼科医院' },
    { hospitalCode: '養和醫院', hospitalName: '养和医院' },
    { hospitalCode: '九龍醫院', hospitalName: '九龙医院' },
    { hospitalCode: '葵涌醫院', hospitalName: '葵涌医院' },
    { hospitalCode: '廣華醫院', hospitalName: '广华医院' },
    { hospitalCode: '麥理浩復康院', hospitalName: '麦理浩复康院' },
    { hospitalCode: '明德國際醫院', hospitalName: '明德国际医院' },
    { hospitalCode: '北區醫院', hospitalName: '北区医院' },
    { hospitalCode: '北大嶼山醫院', hospitalName: '北大屿山医院' },
    { hospitalCode: '聖母醫院', hospitalName: '圣母医院' },
    { hospitalCode: '東區尤德夫人那打素醫院', hospitalName: '东区尤德夫人那打素医院' },
    { hospitalCode: '博愛醫院', hospitalName: '博爱医院' },
    { hospitalCode: '寶血醫院 (明愛)', hospitalName: '宝血医院 (明爱)' },
    { hospitalCode: '威爾斯親王醫院', hospitalName: '威尔斯亲王医院' },
    { hospitalCode: '瑪嘉烈醫院', hospitalName: '玛嘉烈医院' },
    { hospitalCode: '伊利沙伯醫院', hospitalName: '伊利沙伯医院' },
    { hospitalCode: '瑪麗醫院', hospitalName: '玛丽医院' },
    { hospitalCode: '復康專科及資源中心', hospitalName: '复康专科及资源中心' },
    { hospitalCode: '律敦治醫院', hospitalName: '律敦治医院' },
    { hospitalCode: '沙田醫院', hospitalName: '沙田医院' },
    { hospitalCode: '小欖醫院', hospitalName: '小榄医院' },
    { hospitalCode: '長洲醫院', hospitalName: '长洲医院' },
    { hospitalCode: '聖保祿醫院', hospitalName: '圣保禄医院' },
    { hospitalCode: '聖德肋撒醫院', hospitalName: '圣德肋撒医院' },
    { hospitalCode: '大埔醫院', hospitalName: '大埔医院' },
    { hospitalCode: '鄧肇堅醫院', hospitalName: '邓肇坚医院' },
    { hospitalCode: '大口環根德公爵夫人兒童醫院', hospitalName: '大口环根德公爵夫人儿童医院' },
    { hospitalCode: '天水圍醫院', hospitalName: '天水围医院' },
    { hospitalCode: '贊育醫院', hospitalName: '赞育医院"' },
    { hospitalCode: '將軍澳醫院', hospitalName: '将军澳医院' },
    { hospitalCode: '屯門醫院', hospitalName: '屯门医院' },
    { hospitalCode: '東華東院', hospitalName: '东华东院' },
    { hospitalCode: '東華三院馮堯敬醫院', hospitalName: '东华三院冯尧敬医院' },
    { hospitalCode: '東華三院黃大仙醫院', hospitalName: '东华三院黄大仙医院' },
    { hospitalCode: '東華醫院', hospitalName: '东华医院' },
    { hospitalCode: '仁安醫院', hospitalName: '仁安医院' },
    { hospitalCode: '基督教聯合醫院', hospitalName: '基督教联合医院' },
    { hospitalCode: '黃竹坑醫院', hospitalName: '黄竹坑医院' },
    { hospitalCode: '仁濟醫院', hospitalName: '仁济医院' },
    { hospitalCode: 'HNIL', hospitalName: '其他在香港的地址/医院' },
  ];



}
