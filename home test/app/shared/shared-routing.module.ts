import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionTimeoutComponent } from './session-timeout/session-timeout.component';

const routes: Routes = [
  {path: 'session-timeout', component: SessionTimeoutComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
