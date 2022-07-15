
import { FdhesRoutingModule } from './fdhes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BotDetectCaptchaModule } from 'angular-captcha';

import { FdhesDeclarationAComponent } from './pages/declarationA/declarationA.component';
import { FdhesDeclarationBComponent } from './pages/declarationB/declarationB.component';
import { FdhesFlowSelectComponent } from './pages/flow-select/flow-select.component';
import { FdhesFormAComponent } from './pages/formA/formA.component';
import { FdhesFormBComponent } from './pages/formB/formB.component';
import { FdhesDocumentsComponent } from './pages/documents/documents.component';
import { FdhesAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';

import { DocInputComponent } from 'src/app/coe/component/doc-input/doc-input.component';

import { TicketInterceptorService } from '../interceptors/ticket-interceptor.service';
import { CsrfInterceptorService } from '../interceptors/csrf-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  declarations: [
	FdhesAcknowledgementComponent,
    FdhesDeclarationAComponent,
    FdhesDeclarationBComponent,
    FdhesFormAComponent,
    FdhesFormBComponent,
	FdhesDocumentsComponent,
    FdhesFlowSelectComponent,
    DocInputComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FdhesRoutingModule,
    TextMaskModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    BotDetectCaptchaModule.forRoot({
      captchaEndpoint: environment.captchaUrl + 'botdetectcaptcha',
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TicketInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptorService, multi: true }
  ]
})
export class FdhesModule { }
