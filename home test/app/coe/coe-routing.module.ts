import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoeFormComponent } from './pages/form/form.component';
import { CoeRequirementsComponent } from './pages/requirements/requirements.component';
import { CoeDeclarationComponent } from './pages/declaration/declaration.component';
import { CoeDocumentsComponent } from './pages/documents/documents.component';
import { CoeAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'requirements'
      },
      {
        path: 'requirements',
        component: CoeRequirementsComponent
      },
      {
        path: 'form',
        component: CoeFormComponent
      },
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoeRoutingModule { }
