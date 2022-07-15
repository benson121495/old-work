import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedRoutingModule } from './shared-routing.module';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { OfficeListComponent } from './office-list/office-list.component';
import { ModalComponent } from './modal/exit-modal/modal.component';
import { AddressListComponent } from './address-list/address-list.component';
import { DialogModule } from 'primeng/primeng';
import { ErrorModalComponent } from './modal/error-modal/error-modal.component';
import { InfoModalComponent } from './modal/info-modal/info-modal.component';
import { LocationMapComponent } from './modal/location-map/location-map.component';
import { SessionTimeoutComponent } from './session-timeout/session-timeout.component';
import { PreventParentScrollModule } from 'ngx-prevent-parent-scroll';
import { FaqComponent } from '../faq/faq.component';
import { LocalizedDatePipe } from './localized-date-pipe/localized-date-pipe.pipe';
import { SignaturePadComponent } from './signature-pad/signature-pad.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ContainerComponent } from '../shared/container/container.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    TopbarComponent,
    OfficeListComponent,
    ModalComponent,
    AddressListComponent,
    ErrorModalComponent,
	InfoModalComponent,
    LocationMapComponent,
    SessionTimeoutComponent,
    LocalizedDatePipe,
    FaqComponent,
    SignaturePadComponent,
    ContainerComponent
  ],
  entryComponents: [SignaturePadComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    TextMaskModule,
    HttpClientModule,
    TranslateModule,
    ReactiveFormsModule,
    DialogModule,
    PreventParentScrollModule,
    SignaturePadModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    TopbarComponent,
    OfficeListComponent,
    ModalComponent,
    AddressListComponent,
    ErrorModalComponent,
	InfoModalComponent,
    LocationMapComponent,
    LocalizedDatePipe,
    SignaturePadComponent,
    ContainerComponent
  ]
})
export class SharedModule { }
