import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PnvMfdsAFormComponent } from './pages/formA/formA.component';
import { PnvMfdsBFormComponent } from './pages/formB/formB.component';
const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
     {
        path: '', pathMatch: 'full', redirectTo: 'formA'
      },
      {
        path: 'formA',
        component:  PnvMfdsAFormComponent
      },
      {
        path: 'formB',
        component:  PnvMfdsBFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  PnvMfdsRoutingModule { }
