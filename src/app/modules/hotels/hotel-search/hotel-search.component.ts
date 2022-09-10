import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { AutosuggestService } from 'src/app/services/autosuggest-service.service';
import { HotelsService } from 'src/app/services/hotels-service.service';
@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.css'],
})
export class HotelSearchComponent implements OnInit {

  constructor(private router:Router,private autoSuggestService:AutosuggestService, private hotelSearchService:HotelsService) { }

  ngOnInit(): void {
  }

  results:any=null;
  locations:LocationObject[]=[];
  locations_loaded:boolean=false;

  async getSuggestedPlaces(){
    let location=this.hotelSearchInput;
    if(location.length>2){
      (await this.autoSuggestService.fetchLocations(location,'Hotels')).subscribe(rs=>{
        this.results=rs;
        let i=0;
        this.locations=this.results.s.map((place:any)=>{
          return {
            "key":i++,
            "city_name":place.cn,
            "latitude":place.lat,
            "longitude":place.lng,
            "country":place.c,
            "airport_name":place.d,
            "airport_code":place.n,
          }
        });
        // console.log(this.locations);
        this.locations_loaded=true;
      });;

      
    }
  }

  hotelSearchInput:string='';
  selectedLocationId:any;

  chooseLocation(data:any){
    this.locations_loaded=false;
    this.selectedLocationId=data.id;
    this.hotelSearchInput=this.locations[data.id].city_name;
  }

  hotels:any=null;

  async onSubmit(data:any){

    let {latitude,longitude,city_name} = this.locations[this.selectedLocationId];
    let request_data = {
      "from_date":data.check_in,
      "to_date":data.check_out,
      "latitude":latitude,
      "longitude":longitude
    };
    (await this.hotelSearchService.SearchInit(request_data))
    .subscribe(async (rs:any)=>{

      delay(3000)(await this.hotelSearchService.SearchStatus(rs))
      .subscribe(async (res:any)=>{
        if(res.status!='Completed'){
          delay(5000);
        }
        (await this.hotelSearchService.SearchResult(res))
        .subscribe((response:any)=>{
          this.hotels=response.hotels;
          console.log(response);
          var stateData={
            hotels:this.hotels,
            "fromDate":data.check_in,
            "toDate":data.check_out,
            "city_name":city_name
          }
          this.router.navigateByUrl('/hotel',{state:stateData});

        })        
      })
    })
  }
}
interface LocationObject{
  key:string,
  city_name:string,
  latitude:number,
  longitude:number,
  country:string,
  airport_name:string,
  airport_code:string
}