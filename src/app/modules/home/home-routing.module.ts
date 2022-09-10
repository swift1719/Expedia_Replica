import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityResultsComponent } from '../activity/activity-results/activity-results.component';
import { CarSearchComponent } from '../cars/car-search/car-search.component';
import { HotelSearchComponent } from '../hotels/hotel-search/hotel-search.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
