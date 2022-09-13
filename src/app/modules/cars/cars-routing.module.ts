import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarResultsComponent } from './car-results/car-results.component';

export const routes: Routes = [
  {
    path:'car',
    component:CarResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
