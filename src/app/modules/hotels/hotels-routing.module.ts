import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelResultsComponent } from './hotel-results/hotel-results.component';

export const routes: Routes = [
  {
    path:'hotel',
    component:HotelResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelsRoutingModule { }
