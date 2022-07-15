import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StructuralAddressListComponent } from './structural-address-list/structural-address-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TextMaskModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  declarations: [StructuralAddressListComponent],
  exports: [StructuralAddressListComponent]
})
export class StructuralAddressModule { }
