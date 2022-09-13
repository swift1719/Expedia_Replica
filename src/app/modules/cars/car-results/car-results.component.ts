import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-results',
  templateUrl: './car-results.component.html',
  styleUrls: ['./car-results.component.css']
})
export class CarResultsComponent implements OnInit {
  res_state:any=null;
  cars_results:any=null;
  cars:CarResult[]=[];
  rentals:Rental[]=[];
  constructor(private router:Router) {
    this.res_state=this.router.getCurrentNavigation()?.extras.state;
    this.rentals=this.getRentals();
    this.cars=this.getResultToDisplay();
   }

  ngOnInit(): void {
  }

  getRentals(){
    return this.res_state?.cars.carRentals.map((carRental:any)=>{
      return {
        "totalFare":carRental.displayFare.totalFare,
        "fareType":carRental.displayFare.type,
        "cancellationPolicy":carRental.cancellationPolicy.text,
        "freeCancellationEndDate":carRental.freeCancellationEndDate,
        "id":carRental.id,
        "inventoryType":carRental.inventoryType,
        "vehicleRefId":carRental.vehicleRefId
      }
    });
  }

  getResultToDisplay(){

    let i =0;
    return this.res_state?.cars.vehicles.map((vehicle:any)=>{
      return{
        "airConditioned":vehicle.airConditioned,
        "category":vehicle.category,
        "desc":vehicle.desc,
        "imageUrl":vehicle.images[0],
        "vehicleName":vehicle.name,
        "passengerCapacity":vehicle.passengerCapacity,
        "transmission":vehicle.transmission,
        "vehicleType":vehicle.type,
        "totalFare":this.rentals[i].totalFare,
        "fareType":this.rentals[i].fareType,
        "cancellationPolicy":this.rentals[i].cancellationPolicy,
        "freeCancellationEndDate":this.rentals[i].freeCancellationEndDate,
        "id":this.rentals[i].id,
        "inventoryType":this.rentals[i].inventoryType,
        "vehicleRefId":this.rentals[i++].vehicleRefId
      }
    });
    
  }
}

export interface Rental{
  "totalFare":number,
        "fareType":string,
        "cancellationPolicy":string,
        "freeCancellationEndDate":string,
        "id":string,
        "inventoryType":string,
        "vehicleRefId":string
}

export interface CarResult{
  "airConditioned":boolean,
  "category":string,
  "desc":string,
  "imageUrl":string,
  "vehicleName":string,
  "passengerCapacity":string,
  "transmission":string,
  "vehicleType":string,
  "totalFare":number,
  "fareType":string,
  "cancellationPolicy":string,
  "freeCancellationEndDate":string,
  "id":string,
  "inventoryType":string,
  "vehicleRefId":string

}