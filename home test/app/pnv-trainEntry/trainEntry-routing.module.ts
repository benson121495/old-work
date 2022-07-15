import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TrainEntryFormAComponent } from './pages/formA/formA.component';
import { TrainEntryFormBComponent } from './pages/formB/formB.component';
//import { TrainEntryFormRequirementsComponent } from './pages/requirements/requirements.component';
//import { TrainEntryFormDeclarationComponent } from './pages/declaration/declaration.component';
//import { TrainEntryFormDocumentsComponent } from './pages/documents/documents.component';
//import { TrainEntryFormAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';

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
        component: TrainEntryRequirementsComponent
      },*/
      {
        path: 'formA',
        component: TrainEntryFormAComponent
      },
      {
        path: 'formB',
        component: TrainEntryFormBComponent
      }/*,
      {
        path: 'declaration',
        component: TrainEntryDeclarationComponent
      },
      {
        path: 'documents',
        component: TrainEntryDocumentsComponent
      },
      {
        path: 'acknowledgement',
        component: TrainEntryAcknowledgementComponent
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainEntryRoutingModule { }
