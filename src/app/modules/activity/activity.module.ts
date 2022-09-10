import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityRoutingModule } from './activity-routing.module';
import { ActivitySearchComponent } from './activity-search/activity-search.component';
import { FormsModule } from '@angular/forms';
import { ActivityResultsComponent } from './activity-results/activity-results.component';


@NgModule({
  declarations: [
    ActivitySearchComponent,
    ActivityResultsComponent,
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    FormsModule
  ],
  exports:[
    ActivitySearchComponent
  ]
})
export class ActivityModule { }
