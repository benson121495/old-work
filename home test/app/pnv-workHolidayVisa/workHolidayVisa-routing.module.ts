import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { WorkHolidayVisaFormComponent } from './pages/form/form.component';
//import { WorkHolidayVisaRequirementsComponent } from './pages/requirements/requirements.component';
//import { WorkHolidayVisaDeclarationComponent } from './pages/declaration/declaration.component';
//import { WorkHolidayVisaDocumentsComponent } from './pages/documents/documents.component';
//import { WorkHolidayVisaAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      /*{
        path: '', pathMatch: 'full', redirectTo: 'requirements'
      },
      {
        path: 'requirements',
        component: WorkHolidayVisaRequirementsComponent
      },*/
      {
        path: 'form',
        component: WorkHolidayVisaFormComponent
      }/*,
      {
        path: 'declaration',
        component: WorkHolidayVisaDeclarationComponent
      },
      {
        path: 'documents',
        component: WorkHolidayVisaDocumentsComponent
      },
      {
        path: 'acknowledgement',
        component: WorkHolidayVisaAcknowledgementComponent
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkHolidayVisaRoutingModule { }
