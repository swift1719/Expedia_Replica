import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SearchComponent } from './search/search.component';
import { CarsModule } from '../cars/cars.module';
import { HotelsModule } from '../hotels/hotels.module';
import { ActivityModule } from '../activity/activity.module';


@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarsModule,
    HotelsModule,
    ActivityModule
  ],
  exports:[
    HomeComponent,
    SearchComponent
  ]
})
export class HomeModule { }
