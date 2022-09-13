import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
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

  getSuggestedPlaces(data:any){
    let location=data;
    if(location.length>2){  
      (this.autoSuggestService.fetchLocations(location,'Activities')).subscribe(rs=>{
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
  activitySearchInput:string='';
  selectedLocationId:any;
  chooseLocation(data:any){
    this.locations_loaded=false;
    this.selectedLocationId=data.id;
    this.activitySearchInput=this.locations[data.id]?.city_name;
  }

  formData:any=null;
  searchInitResponse:any=null;
  city_name='';

  onSubmit(data:any){
    this.formData=data;
    // console.log(data);
    let latitude = this.locations[this.selectedLocationId]?.latitude;
    let longitude = this.locations[this.selectedLocationId]?.longitude;
    this.city_name=this.locations[this.selectedLocationId]?.city_name;
    let request_data = {
      "from_date":
      data.from_date,
      // "2023-02-01",
      "to_date":
      data.to_date,
      // "2023-02-02",
      "latitude":
      latitude,
      // 36.083333333333336,
      "longitude":
      longitude
      // -115.16666666666669
    };

    (this.searchService.SearchInit(request_data))
    .subscribe((res:any)=>{
      this.searchInitResponse=res;
      this.getStatus();
    })
    
  }

  searchStatusResponse:any=null;

  getStatus(){
    (this.searchService.SearchStatus(this.searchInitResponse))
    .subscribe((rs:any)=>{
      this.searchStatusResponse=rs;
      this.getResults();
    })
  }

  activities:any=null;
  searchResultResponse:any=null;

  getResults(){
    (this.searchService.SearchResult(this.searchInitResponse))
    .subscribe((res:any)=>{
      this.activities=res.activities;
      // console.log(this.activities);
      var res_state = {
        activities:this.activities,
        "cityName":this.city_name,
        "fromDate":this.formData?.from_date,
        "toDate":this.formData?.to_date
      }
      this.router.navigateByUrl('/activity',{state:res_state});
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