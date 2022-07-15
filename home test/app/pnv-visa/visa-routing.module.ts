import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VisaFormBComponent } from './pages/formB/formB.component';
//import { VisaRequirementsComponent } from './pages/requirements/requirements.component';
//import { VisaDeclarationComponent } from './pages/declaration/declaration.component';
//import { VisaDocumentsComponent } from './pages/documents/documents.component';
//import { VisaAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';

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
        component: VisaRequirementsComponent
      },*/
      {
        path: 'formB',
        component: VisaFormBComponent
      }/*,
      {
        path: 'declaration',
        component: VisaDeclarationComponent
      },
      {
        path: 'documents',
        component: VisaDocumentsComponent
      },
      {
        path: 'acknowledgement',
        component: VisaAcknowledgementComponent
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisaRoutingModule { }
