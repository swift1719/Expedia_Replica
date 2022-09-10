import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityResultsComponent } from './activity-results/activity-results.component';

const routes: Routes = [
  {
    path:'activity',
    component:ActivityResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
