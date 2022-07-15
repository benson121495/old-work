import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { pnvTermStudFormComponent } from './pages/form/form.component';

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
        component: pnvTermStudFormComponent
      }     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class pnvTermStudRoutingModule { }
