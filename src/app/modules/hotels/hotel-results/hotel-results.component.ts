import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-results',
  templateUrl: './hotel-results.component.html',
  styleUrls: ['./hotel-results.component.css']
})
export class HotelResultsComponent implements OnInit {
  res_state:any=null;
  hotels_results:any=null;
  hotels:HotelResult[]=[];
  constructor(private router:Router) {
    this.res_state=this.router.getCurrentNavigation()?.extras.state;

    this.hotels= this.res_state.hotels.map((hotel:any)=>{
      return {
        "name":hotel.name,
        "id":hotel.id,
        "totalFare":hotel.displayFare.totalFare,
        "rating":hotel.content.rating,
        "stateName":hotel.content.contact.address.state.name,
        "cityName":hotel.content.contact.address.city.name,
        "address":hotel.content.contact.address.line1,
        "image_url":hotel.content.heroImage.url,
        "distance":hotel.distanceKm,
        "refundability":hotel.refundability        
      }
    });
    
   }

  ngOnInit(): void {
  }

}

interface HotelResult{
  "name":string,
  "id":string,
  "totalFare":number,
  "rating":number,
  "stateName":string,
  "cityName":string,
  "address":string,
  "image_url":string,
  "distance":number,
  "refundability":string 
}