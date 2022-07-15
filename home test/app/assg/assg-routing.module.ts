import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AssgForm997DependantComponent } from './pages/form997-dependant/form997-dependant.component';
import { AssgForm997SponsorComponent } from './pages/form997-sponsor/form997-sponsor.component';
import { AssgForm1017Component } from './pages/form1017/form1017.component';
import { AssgDeclarationComponent } from './pages/declaration/declaration.component';
import { AssgDeclarationForm997SponsorComponent } from './pages/declaration-form997-sponsor/declaration-form997-sponsor.component';
import { AssgFlowSelectComponent } from './pages/flow-select/flow-select.component';
import { AssgDocumentsComponent } from './pages/documents/documents.component';
import { AssgAcknowledgementComponent } from './pages/acknowledgement/acknowledgement.component';
import { AssgForm1017BComponent } from './pages/form1017B/form1017B.component';



const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'flowSelect'
      }, {
        path: 'flowSelect',
        component: AssgFlowSelectComponent
      }, {
        path: 'form1017',
        component: AssgForm1017Component
      }, {
        path: 'form997-dependant',
        component: AssgForm997DependantComponent
      }, {
        path: 'form997-sponsor',
        component: AssgForm997SponsorComponent
      }, {
        path: 'declaration',
        component: AssgDeclarationComponent
      }, {
        path: 'declaration-form997-sponsor',
        component: AssgDeclarationForm997SponsorComponent
      }, {
        path: 'documents',
        component: AssgDocumentsComponent
      }, {
        path: 'acknowledgement',
        component: AssgAcknowledgementComponent
      }, {
        path: 'form1017B',
        component: AssgForm1017BComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssgRoutingModule { }
