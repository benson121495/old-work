import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TechtasFormAComponent } from './pages/formA/formA.component';
import { TechtasFormBComponent } from './pages/formB/formB.component';
//import { TechtasRequirementsComponent } from './pages/requirements/requirements.component';
//import { TechtasDeclarationComponent } from './pages/declaration/declaration.component';
//import { TechtasDocumentsComponent } from './pages/documents/documents.component';
//import { TechtasAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';

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
        component: TechtasRequirementsComponent
      },*/
      {
        path: 'formA',
        component: TechtasFormAComponent
      },
      {
        path: 'formB',
        component: TechtasFormBComponent
      }/*,
      {
        path: 'declaration',
        component: TechtasDeclarationComponent
      },
      {
        path: 'documents',
        component: TechtasDocumentsComponent
      },
      {
        path: 'acknowledgement',
        component: TechtasAcknowledgementComponent
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechtasRoutingModule { }
