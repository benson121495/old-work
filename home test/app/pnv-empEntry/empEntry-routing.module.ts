import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmpEntryFormAComponent } from './pages/formA/formA.component';
import { EmpEntryFormBComponent } from './pages/formB/formB.component';
//import { EmpEntryFormRequirementsComponent } from './pages/requirements/requirements.component';
//import { EmpEntryFormDeclarationComponent } from './pages/declaration/declaration.component';
//import { EmpEntryFormDocumentsComponent } from './pages/documents/documents.component';
//import { EmpEntryFormAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';

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
        path: 'formA',
        component: EmpEntryFormAComponent
      },
      {
        path: 'formB',
        component: EmpEntryFormBComponent
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
export class EmpEntryRoutingModule { }
