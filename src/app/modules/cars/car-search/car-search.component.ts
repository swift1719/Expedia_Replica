import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { AutosuggestService } from 'src/app/services/autosuggest-service.service';
import { CarsService } from 'src/app/services/cars-service.service';

@Component({
  selector: 'app-car-search',
  templateUrl: './car-search.component.html',
  styleUrls: ['./car-search.component.css']
})
export class CarSearchComponent implements OnInit {

  constructor(private router:Router,private autoSuggestService:AutosuggestService, private carSearchService:CarsService) { }

  ngOnInit(): void {
  }
  
  results:any=null;
  drop_locations:LocationObject[]=[];
  pickup_locations:LocationObject[]=[];
  drop_locations_loaded:boolean=false;
  pickup_locations_loaded:boolean=false;
  pickup_location_input:string='';
  drop_location_input:string='';
  selected_drop_locationId:any;
  selected_pickup_locationId:any;

 

  getSuggestedPlaces(location_type:string,location:string){
    let locations:LocationObject[];
    let location_input;
    if(location_type=='drop'){
      location_input=location;
    }else{
      location_input=location;
    }
    if(location_input.length>2){
      ( this.autoSuggestService.fetchLocations(location_input,'Hotels')).subscribe(rs=>{
        this.results=rs;
        let i=0;

        locations=this.results.s.map((place:any)=>{
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

        if(location_type=='drop'){
          this.drop_locations=locations;
          this.drop_locations_loaded=true;
        }else{
          this.pickup_locations=locations;
          this.pickup_locations_loaded=true;
        }
      });
    }
  }

  
  chooseLocation(data:any,location_type:string){
    if(location_type=='drop'){
      this.drop_locations_loaded=false;
      this.selected_drop_locationId=data.id;
      this.drop_location_input=this.drop_locations[data.id]?.city_name;
    }else{
      this.pickup_locations_loaded=false;
      this.selected_pickup_locationId=data.id;
      this.pickup_location_input=this.pickup_locations[data.id]?.city_name;  
    }
  }

  formData:any=null;
  searchInitResponse:any=null;
  pickup_city='';
  drop_city='';
  onSubmit(data:any){
    this.formData=data;
    // console.log(data)
    let drop_latitude = this.drop_locations[this.selected_drop_locationId]?.latitude;
    let drop_longitude = this.drop_locations[this.selected_drop_locationId]?.longitude;
    this.drop_city=this.drop_locations[this.selected_drop_locationId]?.city_name;

    let pickup_latitude = this.pickup_locations[this.selected_pickup_locationId]?.latitude;
    let pickup_longitude = this.pickup_locations[this.selected_pickup_locationId]?.longitude;

    this.pickup_city=this.pickup_locations[this.selected_pickup_locationId]?.city_name;

    let request_data = {
      "from_date":data.from_date,
      "to_date":data.to_date,
      "drop_latitude":
      drop_latitude,
      // 36.1147,
      "drop_longitude":
      drop_longitude,
      // -115.1728,
      "pickup_latitude":
      pickup_latitude,
      // 34.0103,
      "pickup_longitude":
      pickup_longitude
      // -118.4963
    };

    (this.carSearchService.SearchInit(request_data))
    .subscribe( (rs:any)=>{
      // console.log(rs);
      this.searchInitResponse=rs;
      this.getStatus();
    });
  }

  searchStatusResponse:any=null;

  getStatus(){
    (this.carSearchService.SearchStatus(this.searchInitResponse))
      .subscribe( (res:any)=>{
        // console.log(res);
        this.searchStatusResponse=res;
        this.getResults();
      })
  }

  cars_rental:any=null;

  getResults(){
    (this.carSearchService.SearchResult(this.searchInitResponse))
        .subscribe((response:any)=>{
          // console.log(response);
          this.cars_rental=response;

          var res_state={
            cars:this.cars_rental,
            "fromDate":this.formData?.from_date,
            "toDate":this.formData?.to_date,
            "from":this.pickup_city,
            "to":this.drop_city
          }
          this.router.navigateByUrl('/car',{state:res_state});

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