import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelsRoutingModule } from './hotels-routing.module';
import { HotelSearchComponent } from './hotel-search/hotel-search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HotelResultsComponent } from './hotel-results/hotel-results.component';


@NgModule({
  declarations: [
    HotelSearchComponent,
    HotelResultsComponent,
  ],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    NgbModule,
    FormsModule
  ],
  exports:[
    HotelSearchComponent
  ]
})
export class HotelsModule { }
