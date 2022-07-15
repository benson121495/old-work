import { PipeTransform, Pipe, Injectable } from '@angular/core';
import { TranslateStore, TranslateLoader, TranslateCompiler, TranslateParser, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'customTranslate',
  pure: true
})
@Injectable()
export class CustomTranslationPipe extends TranslateService implements PipeTransform {

  constructor(
    store: TranslateStore,
    currentLoader: TranslateLoader,
    compiler: TranslateCompiler,
    parser: TranslateParser,
    missingTranslationHandler: MissingTranslationHandler) {
    super(store, currentLoader, compiler, parser, missingTranslationHandler);

  }


  transform(value: string, langCode?: string): string {
    console.log('lang code ', typeof (langCode));
    let result: any;
    const availableLanguages = this.getLanguageJson(langCode);
    const tr = new TranslateService(this.store,
      this.currentLoader, this.compiler, this.parser, this.missingTranslationHandler);
    tr.setTranslation(langCode, availableLanguages, true);
    tr.store.currentLang = langCode;
    tr.get(value).subscribe((res: string) => {
      result = res;
    });
    console.log('result : ', result);
    console.log('tr.store.currentLang  ', tr.store.currentLang);

    return result;
  }

  getLanguageJson(langCode) {
    if (langCode === 'zh-HK') {
      const HKJson: JSON = <JSON><unknown>{
        'ADDRESS_LOOKUP': {
          'DEFAULT_SELECT': '請選擇',
          'REGION': {
            'HK': '香港',
            'KLN': '九龍',
            'NT': '新界',
            'OI': '離島',
            'OT': '其他'
          }
        }
      };
      return HKJson;
    } else {
      const ENJson: JSON = <JSON><unknown>{
        'ADDRESS_LOOKUP': {
          'DEFAULT_SELECT': 'Please Select',
          'REGION': {
            'HK': 'HONG KONG',
            'KLN': 'KOWLOON',
            'NT': 'NEW TERRITORIES',
            'OI': 'OUTLYING ISLANDS',
            'OT': 'OTHERS'
          }
        }
      };
      return ENJson;
    }

  }
}
