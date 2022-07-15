
import { pnvCiesRoutingModule } from './pnv-cies-routing.module';
import { SharedModule } from '../shared/shared.module';
import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BotDetectCaptchaModule } from 'angular-captcha';
import { CiesDeclarationComponent } from './pages/declaration/declaration.component';
import { pnvCiesFlowSelectComponent } from './pages/flow-select/flow-select.component';
import { CiesAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';
import { CiesDocumentsComponent } from './pages/documents/documents.component';
import { ApplicationAddressModule } from '../shared/application-address/application-address.module';
import { StructuralAddressModule } from '../shared/structural-address/structural-address.module';
import { HospitalOptionModule } from '../shared/hospital-option/hospital-option.module';
import { pnvCiesFormComponent } from './pages/form/form.component';
import { TicketInterceptorService } from '../interceptors/ticket-interceptor.service';
import { CsrfInterceptorService } from '../interceptors/csrf-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DocInputComponent } from 'src/app/coe/component/doc-input/doc-input.component';


@NgModule({
  declarations: [
    pnvCiesFormComponent,
    CiesDeclarationComponent,
    pnvCiesFlowSelectComponent,
    CiesAcknowledgementComponent,
    CiesDocumentsComponent,
    DocInputComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    pnvCiesRoutingModule,
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
export class pnvCiesModule { }
