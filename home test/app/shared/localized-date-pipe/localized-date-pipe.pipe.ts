import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment-timezone';


const EN_HKTIME = ' HK Time';
const TRC_HKTIME = '\u9999\u6E2F\u6642\u9593';
const SC_HKTIME = '\u9999\u6E2F\u65F6\u95F4 ';

@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe extends DatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) {
    super(translateService.currentLang);
  }

  transform(value: any, format?: string): string {
    const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
    if ('en-US' !== this.translateService.currentLang) {
      const weekday = 'EEE', hourAndSec1 = 'hh:mm a', hourAndSec2 = 'HH:mm a';
      if (format.indexOf(weekday) >= 0) {
        if (format.indexOf(hourAndSec1) >= 0 || format.indexOf(hourAndSec2) >= 0) {
          if ('zh-CN' === this.translateService.currentLang) {
            return SC_HKTIME + this.formatDate(value, ' yyyy年M月d日 (www)') + ' ' + this.formatChineseTime(value);
          } else if ('zh-HK' === this.translateService.currentLang) {
            return TRC_HKTIME + this.formatDate(value, ' yyyy年M月d日 (www)') + ' ' + this.formatChineseTime(value);
          }
          return this.formatDate(value, ' yyyy年M月d日 (www)') + ' ' + this.formatChineseTime(value);
        }
        return this.formatDate(value, 'yyyy年M月d日 (www)');
      } else {
        return this.formatDate(value, 'yyyy年M月d日');
      }
    } else {
      const timeZone = 'a';
      if (format.indexOf(timeZone) >= 0) {
        return datePipe.transform(value, format, '+0800') + EN_HKTIME;
      }
      return datePipe.transform(value, format, '+0800');
    }
  }

  private formatChineseTime(date: any) {
    if (new RegExp(/\d{1,4}-\d{1,2}-\d{1,2}[T ]\d{1,2}:\d{1,2}:\d{1,2}/).test(date)) {
      const dt = date.split(/[- :.TZ]/);
      date = new Date(+dt[0], +dt[1] - 1, +dt[2], +dt[3], +dt[4], +dt[5]);
    }
    date = date === undefined ? new Date() : date;
    date = typeof date === 'number' ? new Date(date) : date;
    date = typeof date === 'string' ? new Date(date) : date;
    date = moment(date).tz('Asia/Shanghai');
    const hour24 = date.hour();
    const hour12 = date.hour() % 12 == 0 ? 12 : date.hour() % 12;
    let min = date.minutes();
    if (min < 10) {
      min = '0' + min;
    }
    if (hour24 > 13) {
      return '下午' + hour12 + ':' + min;
    } else {
      return '上午' + hour12 + ':' + min;
    }
  }

  private formatDate(date: any, fmt) {
    if (new RegExp(/\d{1,4}-\d{1,2}-\d{1,2}[T ]\d{1,2}:\d{1,2}:\d{1,2}/).test(date)) {
      const dt = date.split(/[- :.TZ]/);
      date = new Date(+dt[0], +dt[1] - 1, +dt[2], +dt[3], +dt[4], +dt[5]);
    }
    date = date === undefined ? new Date() : date;
    date = typeof date === 'number' ? new Date(date) : date;
    date = typeof date === 'string' ? new Date(date) : date;
    date = moment(date).tz('Asia/Shanghai');
    fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
    const obj = {
      'y': date.year(), // 年份，注意必须用getFullYear
      'M': date.month() + 1, // 月份，注意是从0-11
      'd': date.date(), // 日期
      'q': Math.floor((date.month() + 3) / 3), // 季度
      'w': date.day(), // 星期，注意是0-6
      // 'H': date.getHours(), // 24小时制
      // 'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
      // 'm': date.getMinutes(), // 分钟
      // 's': date.getSeconds(), // 秒
      // 'S': date.getMilliseconds() // 毫秒
    };
    const week = ['日', '一', '二', '三', '四', '五', '六'];
    if (obj !== undefined) {
      for (let i in obj) {
        fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
          var val = obj[i] + '';
          if (i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
          for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
          return m.length == 1 ? val : val.substring(val.length - m.length);
        });
      }
    }
    return fmt;
  }
}

