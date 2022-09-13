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

  getSuggestedPlaces(data:any){
    let location=data;
    if(location.length>2){
      (this.autoSuggestService.fetchLocations(location,'Hotels')).subscribe(rs=>{
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
        this.locations_loaded=true;
      });;
    }
  }

  hotelSearchInput:string='';
  selectedLocationId:any=null;

  chooseLocation(data:any){
    this.locations_loaded=false;
    this.selectedLocationId=data.id;
    this.hotelSearchInput=this.locations[data.id]?.city_name;
  }

  formData:any=null;
  searchInitResponse:any=null;
  city_name='';

  onSubmit(data:any){
    this.formData=data;
    // console.log(data);
    let latitude = this.locations[this.selectedLocationId]?.latitude;
    let longitude = this.locations[this.selectedLocationId]?.longitude;
    this.city_name= this.locations[this.selectedLocationId]?.city_name;

    let request_data = {
      "from_date":
      data.check_in,
      // "2022-09-19",
      "to_date":
      data.check_out,
      // "2022-09-21",
      "latitude": 
      latitude,
      // 36.08333206176758,
      "longitude": 
      longitude
      // -115.16666412353516
    };
    ( this.hotelSearchService.SearchInit(request_data))
    .subscribe( (rs:any)=>{
      this.searchInitResponse=rs;
      this.getStatus();
    })
  }

  searchStatusResponse:any=null;

  getStatus(){
    ( this.hotelSearchService.SearchStatus(this.searchInitResponse))
      .subscribe((res:any)=>{
        // console.log(res);
        this.searchStatusResponse=res;
        
        this.getResults();        
      })
  }

  hotels:any=[];
  searchResultResponse:any=null;

  getResults(){
    (this.hotelSearchService.SearchResult(this.searchInitResponse)).subscribe((response:any)=>{
      this.hotels=response.hotels;
      // console.log(response);
      this.searchResultResponse={
        hotels:this.hotels,
        "fromDate":this.formData?.check_in,
        "toDate":this.formData?.check_out,
        "city_name":this.city_name
      }
      this.router.navigateByUrl('/hotel',{state:this.searchResultResponse});

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