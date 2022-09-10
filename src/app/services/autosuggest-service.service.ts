import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutosuggestService {


  url = environment.AUTOSUGGEST_API_BASE_URL;
  bearerToken = `Bearer ${environment.AUTOSUGGEST_API_AUTH_TOKEN}`;
  sessionId = environment.AUTOSUGGEST_API_SESSION_ID;
  result:any=null;

  constructor(private myClient:HttpClient){}


  async fetchLocations(query:string,consumerType:string) {
    var body = 
      {
        sq: {
            st: query,
            sf: [
                "city"
            ],
        },
        sel: true,
        rec: 20,
        c: consumerType
    };


    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'cnx-sessionId':this.sessionId,
      'cnx-tenantId':'3e1go4ilxq8',
      'Authorization':this.bearerToken,
    });

    let options= {headers:headers};
    
    return this.myClient.post(this.url, body, options)
      
  }
  
}
