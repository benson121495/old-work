import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FdhesDeclarationAComponent } from './pages/declarationA/declarationA.component';
import { FdhesDeclarationBComponent } from './pages/declarationB/declarationB.component';
import { FdhesFlowSelectComponent } from './pages/flow-select/flow-select.component';
import { FdhesFormAComponent } from './pages/formA/formA.component';
import { FdhesFormBComponent } from './pages/formB/formB.component';

import { FdhesDocumentsComponent } from './pages/documents/documents.component';

import { FdhesAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'flowSelect'
      }, {
        path: 'flowSelect',
        component: FdhesFlowSelectComponent
      },
	  {
        path: 'declarationA',
        component: FdhesDeclarationAComponent
      },
	  {
        path: 'declarationB',
        component: FdhesDeclarationBComponent
      },
      {
        path: 'formA',
        component: FdhesFormAComponent
      },
      {
        path: 'formB',
        component: FdhesFormBComponent
      },

      {
        path: 'documents',
        component: FdhesDocumentsComponent
      },

      {
        path: 'acknowledgement',
        component: FdhesAcknowledgementComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FdhesRoutingModule { }
