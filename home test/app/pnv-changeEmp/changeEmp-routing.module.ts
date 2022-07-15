import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChangeEmpFormComponent } from './pages/form/form.component';
//import { changeEmpRequirementsComponent } from './pages/requirements/requirements.component';
//import { changeEmpDeclarationComponent } from './pages/declaration/declaration.component';
//import { changeEmpDocumentsComponent } from './pages/documents/documents.component';
//import { changeEmpAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'requirements'
      },/*
      {
        path: 'requirements',
        component: ChangeEmpRequirementsComponent
      },*/
      {
        path: 'form',
        component: ChangeEmpFormComponent
      }/*,
      {
        path: 'declaration',
        component: ChangeEmpDeclarationComponent
      },
      {
        path: 'documents',
        component: ChangeEmpDocumentsComponent
      },
      {
        path: 'acknowledgement',
        component: ChangeEmpAcknowledgementComponent
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeEmpRoutingModule { }
