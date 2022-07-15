import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalOptionListComponent } from './hospital-option-list/hospital-option-list.component';
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
  declarations: [HospitalOptionListComponent],
  exports: [HospitalOptionListComponent]
})
export class HospitalOptionModule { }
