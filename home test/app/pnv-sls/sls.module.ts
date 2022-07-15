
import { SlsRoutingModule } from './sls-routing.module';
import { SharedModule } from '../shared/shared.module';
import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BotDetectCaptchaModule } from 'angular-captcha';
import { ApplicationAddressModule } from '../shared/application-address/application-address.module';
import { StructuralAddressModule } from '../shared/structural-address/structural-address.module';
import { HospitalOptionModule } from '../shared/hospital-option/hospital-option.module';
//import { SlsRequirementsComponent } from './pages/requirements/requirements.component';

import { SlsFormAComponent } from './pages/formA/formA.component';
import { SlsFormBComponent } from './pages/formB/formB.component';
import { TicketInterceptorService } from '../interceptors/ticket-interceptor.service';
import { CsrfInterceptorService } from '../interceptors/csrf-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
//import { SlsDeclarationComponent } from './pages/declaration/declaration.component';
//import { SlsDocumentsComponent } from './pages/documents/documents.component';
//import { DocInputComponent } from './component/doc-input/doc-input.component';
//import { SlsAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';

@NgModule({
  declarations: [
    //SlsRequirementsComponent,
    SlsFormAComponent,
    SlsFormBComponent,
    //SlsDeclarationComponent,
    //SlsDocumentsComponent,
    //DocInputComponent,
    //SlsAcknowledgementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SlsRoutingModule,
    TextMaskModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    ApplicationAddressModule,
    StructuralAddressModule,
    HospitalOptionModule,
    BotDetectCaptchaModule.forRoot({
      captchaEndpoint: environment.captchaUrl + 'botdetectcaptcha',
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TicketInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptorService, multi: true }
  ]
})
export class SlsModule { }
