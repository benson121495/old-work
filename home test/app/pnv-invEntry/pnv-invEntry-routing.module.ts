import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PnvInvEntryAFormComponent } from './pages/formA/formA.component';
import { PnvInvEntryBFormComponent } from './pages/formB/formB.component';
//import { CoeRequirementsComponent } from './pages/requirements/requirements.component';
//import { CoeDeclarationComponent } from './pages/declaration/declaration.component';
//import { CoeDocumentsComponent } from './pages/documents/documents.component';
//import { CoeAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
     {
        path: '', pathMatch: 'full', redirectTo: 'formA'
      },
  /**    {
        path: 'requirements',
        component: CoeRequirementsComponent
      },*/
      {
        path: 'formA',
        component: PnvInvEntryAFormComponent
      },
      {
        path: 'formB',
        component: PnvInvEntryBFormComponent
      }/**,
      {
        path: 'declaration',
        component: CoeDeclarationComponent
      },
      {
        path: 'documents',
        component: CoeDocumentsComponent
      },
      {
        path: 'acknowledgement',
        component: CoeAcknowledgementComponent
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PnvInvEntryRoutingModule { }
