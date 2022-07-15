import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EndorseTDFormComponent } from './pages/form/form.component';
//import { EndorseTDRequirementsComponent } from './pages/requirements/requirements.component';
//import { EndorseTDDeclarationComponent } from './pages/declaration/declaration.component';
//import { EndorseTDDocumentsComponent } from './pages/documents/documents.component';
//import { EndorseTDAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';

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
        component: EndorseTDRequirementsComponent
      },*/
      {
        path: 'form',
        component: EndorseTDFormComponent
      }/*,
      {
        path: 'declaration',
        component: EndorseTDDeclarationComponent
      },
      {
        path: 'documents',
        component: EndorseTDDocumentsComponent
      },
      {
        path: 'acknowledgement',
        component: EndorseTDAcknowledgementComponent
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndorseTDRoutingModule { }
