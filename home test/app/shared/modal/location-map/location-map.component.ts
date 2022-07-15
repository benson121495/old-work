import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'eservice2-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.css']
})
export class LocationMapComponent implements OnInit {

  browserLang: string;
  offHrWdStart1Msg: string;
  offHrWdStart2Msg: string;
  offHrSatStart1Msg: string;
  offHrSatStart2Msg: string;
  offHrSunStart1Msg: string;
  offHrSunStart2Msg: string;
  offHrPhStart1Msg: string;
  offHrPhStart2Msg: string;
  amChinese: string;
  pmChinese: string;
  to: string;

  constructor(public commonService: CommonService, public translateservice: TranslateService) {
    this.browserLang = this.translateservice.currentLang;
    this.translateservice.get('COMMON.AM').subscribe((value: string) => {
      this.amChinese = value;
    });
    this.translateservice.get('COMMON.PM').subscribe((value: string) => {
      this.pmChinese = value;
   });
   this.translateservice.get('appointment.makeshowsteps.within3months.to').subscribe((value: string) => {
    this.to = value;
 });
   }

  ngOnInit() {
    this.buildWorkingHoursMsgs();

  }

   buildWorkingHoursMsgs(): void {

      this.offHrWdStart1Msg = this.buildWorkingHoursMsg(this.commonService.officeLocation.offHrWdStart1,
            this.commonService.officeLocation.offHrWdEnd1);
      this.offHrWdStart2Msg = this.buildWorkingHoursMsg(this.commonService.officeLocation.offHrWdStart2,
             this.commonService.officeLocation.offHrWdEnd2);
      this.offHrSatStart1Msg = this.buildWorkingHoursMsg(this.commonService.officeLocation.offHrSatStart1,
                this.commonService.officeLocation.offHrSatEnd1);
      this.offHrSatStart2Msg = this.buildWorkingHoursMsg(this.commonService.officeLocation.offHrSatStart2,
                  this.commonService.officeLocation.offHrSatEnd2);
      this.offHrSunStart1Msg = this.buildWorkingHoursMsg(this.commonService.officeLocation.offHrSunStart1,
                    this.commonService.officeLocation.offHrSunEnd1);
      this.offHrSunStart2Msg = this.buildWorkingHoursMsg(this.commonService.officeLocation.offHrSunStart2,
                      this.commonService.officeLocation.offHrSunEnd2);
      this.offHrPhStart1Msg = this.buildWorkingHoursMsg(this.commonService.officeLocation.offHrPhStart1,
                        this.commonService.officeLocation.offHrPhEnd1);
      this.offHrPhStart2Msg = this.buildWorkingHoursMsg(this.commonService.officeLocation.offHrPhStart2,
                          this.commonService.officeLocation.offHrPhEnd2);

   }

   buildWorkingHoursMsg(startTime: string, endTime: string): string {
     let builtMsg: string;
     let startTimeArray: string[];
     let endTimeArray: string[];
     let startAmPm: string;
     let endAmPm: string;
     let startHour: number;
     let endHour: number;
     if (startTime) {
       startTimeArray  = startTime.match(/.{1,2}/g);
       startAmPm = this.findAmOrPm(startTimeArray[0], this.browserLang);
       startHour = this.getFormattedHour(startTimeArray[0]);
     }
     if (endTime) {
      endTimeArray  = endTime.match(/.{1,2}/g);
      endAmPm =  this.findAmOrPm(endTimeArray[0], this.browserLang);
      endHour = this.getFormattedHour(endTimeArray[0]);
     }


    if (this.browserLang === 'en-US' ) {
      if (startTime) {
        builtMsg = startHour + ':' + startTimeArray[1] + ' ' + startAmPm
                   + ' - '
                   + endHour + ':' + endTimeArray[1] + ' ' + endAmPm;
      }
    } else {
      if (startTime) {
        builtMsg = startAmPm + ' ' + startHour + ':' + startTimeArray[1]
        + ' ' + this.to + ' ' + endAmPm + ' ' + endHour + ':' + endTimeArray[1] ;
      }
    }
    return builtMsg;
   }

   getFormattedHour(hour: string): number {
    const hourNumber = Number(hour);
    if (hourNumber > 12) {
     return  hourNumber - 12;
    } else {
      return hourNumber;
    }
   }

   findAmOrPm(hour: string, language: string): string {
    const hourNumber = Number(hour);
    if (12 <= hourNumber ) {
      if ( language === 'en-US') {
        return 'pm';
      } else {
         return this.pmChinese;
      }
    } else {
      if ( language === 'en-US') {
        return 'am';
      } else {
         return this.amChinese;
      }
    }
   }



  onCloseHandled(type: boolean){
    document.body.style.overflow = 'auto';
    this.commonService.showOfficeLocationMap = type;
  }

}
