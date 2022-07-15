import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PnvTeResidentAFormComponent } from './pages/formA/formA.component';
import { PnvTeResidentBFormComponent } from './pages/formB/formB.component';

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
        component:  PnvTeResidentAFormComponent
      },
      {
        path: 'formB',
        component:  PnvTeResidentBFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  PnvTeResidentRoutingModule { }
