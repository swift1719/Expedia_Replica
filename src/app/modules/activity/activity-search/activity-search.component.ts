import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, timer } from 'rxjs';
import { ActivityService } from 'src/app/services/activity-service.service';
import { AutosuggestService } from 'src/app/services/autosuggest-service.service';

@Component({
  selector: 'app-activity-search',
  templateUrl: './activity-search.component.html',
  styleUrls: ['./activity-search.component.css']
})
export class ActivitySearchComponent implements OnInit {

  constructor(private router:Router,private searchService:ActivityService, private autoSuggestService:AutosuggestService) { }

  ngOnInit(): void {
    
  }

  results:any=null;
  locations:LocationObject[]=[];
  locations_loaded:boolean=false;
  dummy:any=[
    {
      "c": "United States",
      "cc": "US",
      "cd": "LAS",
      "cn": "Las Vegas",
      "d": "McCarran Int'l Airport",
      "iaa": false,
      "lId": "110360833011516670",
      "lat": 36.083333333333336,
      "lng": -115.16666666666669,
      "n":"LAS - Las Vegas, NV"
    },
    {
      "c": "United States",
      "cc": "US",
      "cd": "LAS",
      "cn": "Las Vegas",
      "d": "McCarran Int'l Airport",
      "iaa": false,
      "lId": "110360833011516670",
      "lat": 36.083333333333336,
      "lng": -115.16666666666669,
      "n":"LAS - Las Vegas, NV"
    },
    {
      "c": "United States",
      "cc": "US",
      "cd": "LAS",
      "cn": "Las Vegas",
      "d": "McCarran Int'l Airport",
      "iaa": false,
      "lId": "110360833011516670",
      "lat": 36.083333333333336,
      "lng": -115.16666666666669,
      "n":"LAS - Las Vegas, NV"
    }
  ]

  async getSuggestedPlaces(){
    let location=this.activitySearchInput;
    if(location.length>2){
      (await this.autoSuggestService.fetchLocations(location,'Activities')).subscribe(rs=>{
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


  activities:any=null;
  async onSubmit(data:any){
    // console.log(data);
    let {latitude,longitude,city_name} = this.locations[this.selectedLocationId];

    let request_data = {
      "from_date":data.from_date,
      "to_date":data.to_date,
      "latitude":latitude,
      "longitude":longitude
    };

    (await this.searchService.SearchInit(request_data))
    .subscribe(async (res:any)=>{
      // console.log(res);
      delay(3000)(await this.searchService.SearchStatus(res))
      .subscribe(async (rs:any)=>{
        if(rs.status!='Completed'){
          delay(5000);
        }
        // console.log(rs);

        (await this.searchService.SearchResult(res))
        .subscribe((res:any)=>{
          this.activities=res.activities;
          // console.log(this.activities);
          var res_state = {
            activities:this.activities,
            "cityName":city_name,
            "fromDate":data.from_date,
            "toDate":data.to_date
          }
          this.router.navigateByUrl('/activity',{state:res_state});
        })
      })
    })
    
  }

  

  activitySearchInput:string='';
  selectedLocationId:any;
  chooseLocation(data:any){
    this.locations_loaded=false;
    this.selectedLocationId=data.id;
    this.activitySearchInput=this.locations[data.id].city_name;
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