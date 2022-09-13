import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  url=environment.CARS_API_BASE_URL;

  constructor(private httpClient:HttpClient) { }

  fromDate:any=null;
  toDate:any=null;
  pickup_latitude:any=null;
  pickup_longitude:any=null;
  drop_latitude:any=null;
  drop_longitude:any=null;

  SearchInit(data:any){
    this.fromDate=data?.from_date;
    this.toDate=data?.to_date;
    this.pickup_latitude=data?.pickup_latitude;
    this.pickup_longitude=data?.pickup_longitude;
    this.drop_latitude=data?.drop_latitude;
    this.drop_longitude=data?.drop_longitude;

    var body ={
      "currency": "USD",
      "searchQuery":{
      "criteria": {
         "pickUp": {
          "circle": {
            "center": {
              "lat": this.pickup_latitude,
              "long": this.pickup_longitude
            },
            "radiusKms": 10.5
          },
          "date": this.fromDate,
          "time": "10:30"
        },
        "dropOff": {
          "sameAsPickup": false,
          "circle": {
            "center": {
              "lat": this.drop_latitude,
              "long": this.drop_longitude
            },
            "radiusKms": 10.5
          },
          "date": this.toDate,
          "time": "17:30"
        },
        "driverInfo": {
          "age": 25,
          "nationality": "US"
        }
      },
      "filters": {
        "vendor": {
          "allow": [],
          "disallow": []
        },
        "vehicleType": {
          "allow": [],
          "disallow": []
        },
        "vehicleCategory": {
          "allow": [],
          "disallow": []
        },
        "price": {
          "min": 20,
          "max": 10000
        },
        "transmission": "Automatic",
        "airConditionedOnly": true
      }
      },
     "customerInfo":
      {
        "id":"Test",
        "availablePointBalance":100000,
        "transitCode":"5e1fa6c2-44d8-d015-8d07-f58c331aa0f2",
        "eligibilityInfo" : 
        {
          "programCurrency" : "Points", 
            "purchaseAllowed" : true,
            "redemptionAllowed" :true, 
            "displayProgramCurrencyAsDecimal" : false, 
            "useVariableMilesFormula" : false,  
            "shortfallAllowed" : true
        }
      },
      "programId":"1371"
    }

    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      "cnx-userip": "127.0.0.1",
      "cnx-tenantId": "2pu5zh4e9kw",
      "cnx-environment-token": "T3"
    })
    return this.httpClient.post<any>(this.url+'/init',body,{headers:headers});
  }

  sessionId:any=null;

  SearchStatus(data:any){
    this.sessionId=data?.sessionId;
    var body={
      "sessionId": this.sessionId
    }
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      "cnx-userip": "127.0.0.1",
      "cnx-tenantId": "2pu5zh4e9kw",
      "cnx-environment-token": "T2",
      "cnx-correlationId":"8f6aeee6-5575-4a5a-8387-ab8052641b17"
    })
    return this.httpClient.post<any>(this.url+'/status',body,{headers:headers})
  }

  SearchResult(data:any){

    var body={
      "sessionId": data?.sessionId,
      "currency": "USD",
      "paging": {
        "pageNo": 1,
        "pageSize": 15,
        "orderBy": "rentalCompany asc,price asc"    
      },
      "contentPrefs": [
        "All"
      ],
      "filters": {
          "airConditionedOnly": false,
        "vendor": {
          "allow": [],
          "disallow": []
        },
        "vehicleType": {
          "allow": [],
          "disallow": []
        },
        "vehicleCategory": {
          "allow": [],
          "disallow": []
        },
        "rentalIds":[],
         "pickUpLocationType":["Neighborhood","Airport"],
      "dropOffLocationType": ["Airport","Neighborhood"]   
      },
      "returnType":"Immediate"
    }

    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      "cnx-userip": "127.0.0.1",
      "cnx-tenantId": "2pu5zh4e9kw",
      "cnx-environment-token": "T2",
      "cnx-correlationId":"8f6aeee6-5575-4a5a-8387-ab8052641b17"
    });

    return this.httpClient.post<any>(this.url+'/results',body,{headers:headers});
  }
}
