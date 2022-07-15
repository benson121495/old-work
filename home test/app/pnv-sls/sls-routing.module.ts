import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SlsFormAComponent } from './pages/formA/formA.component';
import { SlsFormBComponent } from './pages/formB/formB.component';
//import { SlsRequirementsComponent } from './pages/requirements/requirements.component';
//import { SlsDeclarationComponent } from './pages/declaration/declaration.component';
//import { SlsDocumentsComponent } from './pages/documents/documents.component';
//import { SlsAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';

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
        component: SlsRequirementsComponent
      },*/
      {
        path: 'formA',
        component: SlsFormAComponent
      },
      {
        path: 'formB',
        component: SlsFormBComponent
      }/*,
      {
        path: 'declaration',
        component: SlsDeclarationComponent
      },
      {
        path: 'documents',
        component: SlsDocumentsComponent
      },
      {
        path: 'acknowledgement',
        component: SlsAcknowledgementComponent
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlsRoutingModule { }
