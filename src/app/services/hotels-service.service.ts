import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  url=environment.HOTELS_API_BASE_URL;
  transitCode= "e213c3e9-8376-4505-b413-adf0de74a6fd";

  constructor(private httpClient:HttpClient) { }

  fromDate:string='';
  toDate:string='';
  lat:any;
  long:any;

  async SearchInit(data:any){

    this.fromDate=data.from_date;
    this.toDate=data.to_date;
    this.lat=data.latitude;
    this.long=data.longitude;

    var body ={
      "currency": "USD",  
      "searchQuery": {
          "roomOccupancy": {
              "occupants": [
                  {
                      "type": "Adult",
                      "age": 25
                  }
              ]
          },
          "stayPeriod": {
              "start": `${this.fromDate}T00:00:00`,
              "end": `${this.toDate}T00:00:00`
          },
          "bounds": {
              "circle": {
                  "center": {
                      "lat": this.lat,
                      "long": this.long
                  },
                  "radiusKm": 50
              }
          }
      },
      "customerInfo": {
          "id": "123_UT",
          "transitCode": this.transitCode,
          "availablePointBalance": 1000000.0,
          "eligibilityInfo": {
              "programCurrency": "Points",
              "purchaseAllowed": true,
              "redemptionAllowed": true,
              "displayProgramCurrencyAsDecimal": false,
              "useVariableMilesFormula": false,
              "shortfallAllowed": true
          }
      },
      "programId": "1371"
    }

    var myHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "loyalty-userIp": "127.0.0.1",
      "loyalty-clientId": "123",
      "loyalty-correlationId": "cid1123",
      "cnx-userIp": "127.0.0.1",
      "cnx-clientId": "123",
      "cnx-correlationId": "65380986-6f09-46c9-ae61-790fd71baa9c",
      "cnx-tenantId": "2pq3iaipudc",
      "cnx-environment-token": "SG",
      "Accept-Language": "en-US"
    });
    
    return this.httpClient.post(this.url+"/init",body,{headers:myHeaders});
  }

  sessionId:any=null;

  async SearchStatus(data:any){
    this.sessionId=data.sessionId;
    var myHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "loyalty-userIp": "127.0.0.1",
      "loyalty-clientId": "123",
      "loyalty-correlationId": "cid1123",
      "cnx-userIp": "127.0.0.1",
      "cnx-clientId": "123",
      "cnx-correlationId": "65380986-6f09-46c9-ae61-790fd71baa9c",
      "cnx-tenantId": "2pq3iaipudc",
      "cnx-environment-token": "SG",
    });

    var body ={ 
      "sessionId" : this.sessionId
    }
    return this.httpClient.post(this.url+"/status",body,{headers:myHeaders});
  }

  searchStatusResponse:any=null;
  async SearchResult(data:any){
    this.searchStatusResponse=data;

    // if(this.searchStatusResponse.status=='InProgress'){
    //   delay(10000);
    // }
    // console.log(this.searchStatusResponse);
      var body={  
        "sessionId":this.sessionId,
        "paging":{  
          "pageNo":1,
          "pageSize":20,
          "orderBy":"price asc"
        },
        "filters":{  
            "minHotelPrice": 1,
                "maxHotelPrice": 10000,
                "minHotelRating": 1,
                "maxHotelRating": 5,
                "hotelChains": []
        },
        "currency":"USD",
        "contentPrefs":[  
          "All"
        ]
    }


    var headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      "correlationId": "hotelloyaltytest3",
      "Accept-Language": "en-US",
      "loyalty-userIp": "127.0.0.1",
      "loyalty-clientId": "123",
      "cnx-userIp": "127.0.0.1",
      "cnx-clientId": "123",
      "cnx-correlationId": "a7d28514-486a-4e8b-8c93-1b2899ba9209",
      "cnx-tenantId": "2pq3iaipudc",
      "cnx-environment-token": "SG",      
    });

    return this.httpClient.post(this.url+"/results",body,{headers:headers});
  }

}
