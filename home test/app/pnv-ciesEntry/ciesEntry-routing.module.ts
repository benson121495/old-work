import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CiesEntryFormComponent } from './pages/form/form.component';
//import { CiesEntryRequirementsComponent } from './pages/requirements/requirements.component';
//import { CiesEntryDeclarationComponent } from './pages/declaration/declaration.component';
//import { CiesEntryDocumentsComponent } from './pages/documents/documents.component';
//import { CiesEntryAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';

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
        component: CiesEntryRequirementsComponent
      },*/
      {
        path: 'form',
        component: CiesEntryFormComponent
      }/*,
      {
        path: 'declaration',
        component: CiesEntryDeclarationComponent
      },
      {
        path: 'documents',
        component: CiesEntryDocumentsComponent
      },
      {
        path: 'acknowledgement',
        component: CiesEntryAcknowledgementComponent
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CiesEntryRoutingModule { }
