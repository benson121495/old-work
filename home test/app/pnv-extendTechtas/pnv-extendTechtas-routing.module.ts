import { ContainerComponent } from '../shared/container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { pnvExtendTechtasADeclarationComponent } from './pages/declarationA/declarationA.component';
import { pnvExtendTechtasBDeclarationComponent } from './pages/declarationB/declarationB.component';


const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'form'
      },
      {
        path: 'declarationA',
        component: pnvExtendTechtasADeclarationComponent
      },
      {
        path: 'declarationB',
        component: pnvExtendTechtasBDeclarationComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class pnvExtendTechtasRoutingModule { }
