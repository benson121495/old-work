
import { AssgRoutingModule } from './assg-routing.module';
import { SharedModule } from '../shared/shared.module';
import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BotDetectCaptchaModule } from 'angular-captcha';

import { AssgForm997SponsorComponent } from './pages/form997-sponsor/form997-sponsor.component';
import { AssgForm997DependantComponent } from './pages/form997-dependant/form997-dependant.component';
import { AssgForm1017Component } from './pages/form1017/form1017.component';
import { AssgDeclarationComponent } from './pages/declaration/declaration.component';
import { AssgDeclarationForm997SponsorComponent } from './pages/declaration-form997-sponsor/declaration-form997-sponsor.component';
import { AssgDocumentsComponent } from './pages/documents/documents.component';
import { AssgFlowSelectComponent } from './pages/flow-select/flow-select.component';
import { AssgAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';
import { DocInputComponent } from 'src/app/coe/component/doc-input/doc-input.component';

import { AssgForm1017BComponent } from './pages/form1017B/form1017B.component';

import { TicketInterceptorService } from '../interceptors/ticket-interceptor.service';
import { CsrfInterceptorService } from '../interceptors/csrf-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AssgForm997SponsorComponent,
    AssgForm997DependantComponent,
	  AssgForm1017Component,
    AssgDeclarationComponent,
    AssgDeclarationForm997SponsorComponent,
    AssgFlowSelectComponent,
    AssgDocumentsComponent,
    AssgAcknowledgementComponent,
    DocInputComponent,
    AssgForm1017BComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AssgRoutingModule,
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
export class AssgModule { }
