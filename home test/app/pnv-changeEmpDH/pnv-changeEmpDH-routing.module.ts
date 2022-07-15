import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PnvChangeEmpDHAFormComponent } from './pages/formA/formA.component';
import { PnvChangeEmpDHBFormComponent } from './pages/formB/formB.component';
import { PnvChangeEmpDHCFormComponent } from './pages/formC/formC.component';

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
        component:  PnvChangeEmpDHAFormComponent
      },
      {
        path: 'formB',
        component:  PnvChangeEmpDHBFormComponent
      },
      {
        path: 'formC',
        component:  PnvChangeEmpDHCFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  PnvChangeEmpDHRoutingModule { }
