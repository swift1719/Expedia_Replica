import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarSearchComponent } from './car-search/car-search.component';
import { FormsModule } from '@angular/forms';
import { CarResultsComponent } from './car-results/car-results.component';


@NgModule({
  declarations: [
    CarSearchComponent,
    CarResultsComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    FormsModule
  ],
  exports:[
    CarSearchComponent
  ]
})
export class CarsModule { }
