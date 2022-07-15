import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EntryTwnMultiFormComponent } from './pages/form/form.component';
//import { EntryTwnMultiRequirementsComponent } from './pages/requirements/requirements.component';
//import { EntryTwnMultiDeclarationComponent } from './pages/declaration/declaration.component';
//import { EntryTwnMultiDocumentsComponent } from './pages/documents/documents.component';
//import { EntryTwnMultiAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';

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
        component: EntryTwnMultiRequirementsComponent
      },*/
      {
        path: 'form',
        component: EntryTwnMultiFormComponent
      }/*,
      {
        path: 'declaration',
        component: EntryTwnMultiDeclarationComponent
      },
      {
        path: 'documents',
        component: EntryTwnMultiDocumentsComponent
      },
      {
        path: 'acknowledgement',
        component: EntryTwnMultiAcknowledgementComponent
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryTwnMultiRoutingModule { }
