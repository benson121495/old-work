import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './shared/shared.module';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

import { ButtonModule } from 'primeng/primeng';

import { DialogModule } from 'primeng/dialog';
import { TicketInterceptorService } from './interceptors/ticket-interceptor.service';
import { LoaderComponent } from './shared/loader/loader.component';
import { CsrfInterceptorService } from './interceptors/csrf-interceptor.service';

import localehk from '@angular/common/locales/zh-Hant-HK';
import localecn from '@angular/common/locales/zh-Hans';
import { HotkeyModule } from 'angular2-hotkeys';
import { CustomTranslationPipe } from './shared/customized-translation-pipe/custom-translation.pipe';

registerLocaleData(localehk, 'zh-HK');
registerLocaleData(localecn, 'zh-CN');

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new MultiTranslateHttpLoader(httpClient, [
    { prefix: './assets/i18n/common/', suffix: '.json' }, // To be removed
    { prefix: './assets/i18n/application/', suffix: '.json' },
    { prefix: './assets/i18n/errormessages/', suffix: '.json' },
    { prefix: './assets/i18n/faq/', suffix: '.json' },
    { prefix: "./assets/i18n/rminfo/", suffix: ".json" },
    { prefix: "./assets/i18n/coe/", suffix: ".json" },
    { prefix: "./assets/i18n/signpad/", suffix: ".json" },
    { prefix: './assets/i18n/pnv-termEmp/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-invEntry/', suffix: ".json" },
    { prefix: './assets/i18n/assg/', suffix: ".json" },
    { prefix: './assets/i18n/fdhes/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-travelPassFreq/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-qmasVisit/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-workHolidayVisa/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-termStud/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-changeAddr/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-transEndorseDH/', suffix: ".json" },
    { prefix: './assets/i18n/roa-endorseTD/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-changeEmp/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-apec/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-entryTwnMulti/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-chnResident2twn/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-entryTwnSingle/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-empEntry/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-cies/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-noObjectLetter/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-statusMainlandOfficial/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-visaHkStudy/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-teResident/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-trainEntry/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-mfds/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-sls/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-extendTechtas/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-ciesEntry/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-qmasEntry/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-changeEmpDH/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-techtas/', suffix: ".json" },
    { prefix: './assets/i18n/pnv-visa/', suffix: ".json" },
    // { prefix: './assets/i18n/birthsearch/', suffix: '.json' }, //To be removed
  ]);
}

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    HotkeyModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TicketInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
