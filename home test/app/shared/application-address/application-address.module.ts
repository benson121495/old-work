import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAddressListComponent } from './app-address-list/app-address-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslationPipe } from '../customized-translation-pipe/custom-translation.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TextMaskModule,
    TranslateModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [AppAddressListComponent, CustomTranslationPipe],
  exports: [AppAddressListComponent]
})
export class ApplicationAddressModule { }
