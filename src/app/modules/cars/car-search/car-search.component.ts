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
  
  async getSuggestedPlaces(location_type:string){
    let location:string='';
    let locations:LocationObject[];

    if(location_type=='drop'){
      location=this.drop_location_input;
    }else{
      location=this.pickup_location_input;
    }
    if(location.length>2){
      (await this.autoSuggestService.fetchLocations(location,'Hotels')).subscribe(rs=>{
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

  pickup_location_input:string='';
  drop_location_input:string='';
  selected_drop_locationId:any;
  selected_pickup_locationId:any;

  chooseLocation(data:any,location_type:string){
    if(location_type=='drop'){
      this.drop_locations_loaded=false;
      this.selected_drop_locationId=data.id;
      this.drop_location_input=this.drop_locations[data.id].city_name;
    }else{
      this.pickup_locations_loaded=false;
      this.selected_pickup_locationId=data.id;
      this.pickup_location_input=this.pickup_locations[data.id].city_name;  
    }
  }

  cars_rental:any=null;

  async onSubmit(data:any){

    let {latitude:drop_latitude,longitude:drop_longitude,city_name:pickupCity} = this.drop_locations[this.selected_drop_locationId];
    let {latitude:pickup_latitude,longitude:pickup_longitude,city_name:dropCity} = this.pickup_locations[this.selected_pickup_locationId];
    let request_data = {
      "from_date":data.from_date,
      "to_date":data.to_date,
      "drop_latitude":drop_latitude,
      "drop_longitude":drop_longitude,
      "pickup_latitude":pickup_latitude,
      "pickup_longitude":pickup_longitude
    };

    (await this.carSearchService.SearchInit(request_data))
    .subscribe(async (rs:any)=>{
      // console.log(rs);
      delay(3000)(await this.carSearchService.SearchStatus(rs))
      .subscribe(async (res:any)=>{
        // console.log(res);
        if(res.status!='Completed'){
          delay(5000);
        }
        (await this.carSearchService.SearchResult())
        .subscribe((response:any)=>{
          // console.log(response);
          this.cars_rental=response;

          var res_state={
            cars:this.cars_rental,
            "fromDate":data.from_date,
            "toDate":data.to_date,
            "from":pickupCity,
            "to":dropCity
          }
          this.router.navigateByUrl('/car',{state:res_state});

        })
      })
    });
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