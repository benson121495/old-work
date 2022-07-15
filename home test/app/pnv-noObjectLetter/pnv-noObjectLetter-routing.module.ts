import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { pnvNoObjectLetterAFormComponent } from './pages/formA/formA.component';
import { pnvNoObjectLetterBFormComponent } from './pages/formB/formB.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: 'formA',
        component: pnvNoObjectLetterAFormComponent
      },
      {
        path: 'formB',
        component: pnvNoObjectLetterBFormComponent
      }     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class pnvNoObjectLetterRoutingModule { }
