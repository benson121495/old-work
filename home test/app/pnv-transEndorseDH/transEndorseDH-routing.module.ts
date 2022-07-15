import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TransEndorseDHFormComponent } from './pages/form/form.component';
//import {TransEndorseDHRequirementsComponent } from './pages/requirements/requirements.component';
//import { TransEndorseDHDeclarationComponent } from './pages/declaration/declaration.component';
//import { TransEndorseDHDocumentsComponent } from './pages/documents/documents.component';
//import { TransEndorseDHAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';

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
        component: TransEndorseDHRequirementsComponent
      },*/
      {
        path: 'form',
        component: TransEndorseDHFormComponent
      }/*,
      {
        path: 'declaration',
        component: TransEndorseDHDeclarationComponent
      },
      {
        path: 'documents',
        component: TransEndorseDHDocumentsComponent
      },
      {
        path: 'acknowledgement',
        component: TransEndorseDHAcknowledgementComponent
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransEndorseDHRoutingModule { }
