import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { pnvVisaHkStudyCFormComponent } from './pages/formC/formC.component';
import { pnvVisaHkStudyDFormComponent } from './pages/formD/formD.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: 'formC',
        component: pnvVisaHkStudyCFormComponent
      },
      {
        path: 'formD',
        component: pnvVisaHkStudyDFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class pnvVisaHkStudyRoutingModule { }
