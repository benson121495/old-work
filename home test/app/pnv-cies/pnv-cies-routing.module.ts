import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { pnvCiesFormComponent } from './pages/form/form.component';
import { CiesDeclarationComponent } from './pages/declaration/declaration.component';
import { pnvCiesFlowSelectComponent } from './pages/flow-select/flow-select.component';
import { CiesAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';
import { CiesDocumentsComponent } from './pages/documents/documents.component';


const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'form'
      },
      {
        path: 'form',
        component: pnvCiesFormComponent
      },
      {
        path: 'declaration',
        component: CiesDeclarationComponent 
      },  
      {
        path: 'flowSelect',
        component: pnvCiesFlowSelectComponent 
      },
      {
        path: 'acknowledgement',
        component: CiesAcknowledgementComponent 
      },
      {
        path: 'documents',
        component: CiesDocumentsComponent 
      }
        
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class pnvCiesRoutingModule { }
