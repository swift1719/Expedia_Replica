import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-results',
  templateUrl: './activity-results.component.html',
  styleUrls: ['./activity-results.component.css']
})
export class ActivityResultsComponent implements OnInit {

  res_state:any=null;

  activities:Activity[]=[];
  constructor(private router:Router) {
    this.res_state=this.router.getCurrentNavigation()?.extras.state;

    this.activities = this.res_state?.activities.map((activity:any)=>{
      return {
        "id":activity.id,
        "name":activity.name,
        "image_url":activity.content.media.primaryImage.url,
        "rating":activity.content.rating,
        "duration":activity.content.duration ,
        "totalFare":activity.displayFare.totalFareStartsFrom,
        "summary":activity.content.summary
      }
    });
   }

  ngOnInit(): void {
  }
}
interface Activity{
  "id":string,
  "name":string,
  "image_url":string,
  "rating":number,
  "duration":string ,
  "totalFare":number,
  "summary":string
}