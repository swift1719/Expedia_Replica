import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  url = environment.ACTIVITY_API_BASE_URL;
  transitCode = "c0e59310-81b9-45e9-b11d-b3b53903c0c2";
  globalTenantId = "2o9o3ae99ts";
  globalEnviromentToken = "T3";
  globalMock = 'false';
  headers:any =null;
  sessionId:any=null;
  searchStatus:any=null;

  constructor(private myClient:HttpClient) { }
  
  searchStatusResponse:any=null;

  fromDate:string='';
  toDate:string='';
  lat:any;
  long:any;

  async SearchInit(data:any) {
    
    this.fromDate=data.from_date;
    this.toDate=data.to_date;
    this.lat=data.latitude;
    this.long=data.longitude;
    var body = 
    {
      "searchQuery": {
          "dateRange": {
              "from": `${this.fromDate}T00:00:00.714Z`,
              "to": `${this.toDate}T00:00:00.714Z`
          },
          "bounds": {
              "circle": {
                  "center": {
                      "lat": this.lat,
                      "long": this.long
                  },
                  "radiusKm": 48
              }
          },
          "paxNationality": "IN",
          "filters": {
              "price": {},
              "categories": [
                  "16",
                  "12",
                  "4",
                  "9"
              ]
          }
      },
      "customerInfo": {
          "id": "AutoUser",
          "availablePointBalance": 50000,
          "transitCode": this.transitCode,
          "eligibilityInfo": {
              "programCurrency": "Points",
              "purchaseAllowed": true,
              "redemptionAllowed": true,
              "displayProgramCurrencyAsDecimal": false,
              "useVariableMilesFormula": false,
              "shortfallAllowed": true
          }
      },
      "programId": "1371",
      "currency": "USD"
    };


    this.headers = new HttpHeaders({
      'Content-Type':'application/json',
      'cnx-tenantId':this.globalTenantId,
      'Accept-Language':'en-US',
      'cnx-userip':'127.128.128.128',
      'cnx-environment-token':this.globalEnviromentToken,
      'cnx-correlationId':'a80e8621-510e-4686-{{timestamp}}-ap17',
      'cnx-mock':this.globalMock,
    });

    let options= {headers:this.headers};
    
    return this.myClient.post(this.url + "/init", body, options);
    
  }


  async SearchStatus(data:any){
    this.sessionId=data.sessionId;
    // console.log(this.sessionId)
    let body={
      "sessionId":this.sessionId
    };

    return this.myClient.post(this.url+"/status",body,{headers:this.headers})
  }
  async SearchResult(data:any){

      let body = {
        "paging": {
          "pageNo": 1,
          "pageSize": 30,
          "orderBy": "price"
        },
        "sessionId": data.sessionId,
        "currency": "USD"
      };
      return this.myClient.post(this.url + "/result", body, { headers: this.headers });
  }
    
}


