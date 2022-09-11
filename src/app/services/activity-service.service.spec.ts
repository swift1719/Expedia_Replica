import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { ActivityService } from './activity-service.service';

describe('Activity Service Tests', () => {
  let service: ActivityService;
  let http:HttpClient;
  let httpController:HttpTestingController;
  let url = environment.ACTIVITY_API_BASE_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports:[HttpClientTestingModule],
        providers:[HttpClient]
    });
    service = TestBed.inject(ActivityService);
    http=TestBed.inject(HttpClient);
    httpController=TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
      expect(service).toBeTruthy();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send post request to Activity Search Init',async ()=>{
      let searchInitResponseReceived: any = {};

      let request_data = {
        "from_date":"2023-02-01",
        "to_date":"2023-02-20",
        "latitude":18.52047,
        "longitude":73.85662
      };

      (await service.SearchInit(request_data)).subscribe((data:any)=>{
          searchInitResponseReceived = data;
      });
      
      let req = httpController.expectOne(`${url}/init`);
      req.flush(searchInitResponseReceived);
      expect(req.request.method).toBe("POST");
  });
  
  let searchInitResponseExpected : any = {
    "sessionId" : ""
  };

  it('should receive a valid response calling Activity Search Init',async ()=>{
    (await service.SearchInit(searchInitResponseExpected))
    .subscribe((data:any)=>{
        expect(data.hasOwnProperty('sessionId')).toBe(true);
    });

    let req = httpController.expectOne(`${url}/init`);
    req.flush(searchInitResponseExpected);
  });

  let searchStatusResponseExpected : any = {
    "status" : "",
    "resultCount" : ""
  };

  it('should send a post request calling Activity Search Status',async ()=>{
    (await service.SearchStatus(searchInitResponseExpected)).subscribe((data:any)=>{
      searchStatusResponseExpected = data;
    });
    let req = httpController.expectOne(`${url}/status`)

    req.flush(searchStatusResponseExpected);
    expect(req.request.method).toBe("POST");
  })

  it('should receive a valid response calling Activity search status api',async ()=>{
    (await service.SearchStatus(searchStatusResponseExpected)).subscribe((data:any)=>{
      expect(data.hasOwnProperty('status')).toBe(true);
      expect(data.hasOwnProperty('resultCount')).toBe(true);
    });
    let req = httpController.expectOne(`${url}/status`)
    req.flush(searchStatusResponseExpected);
  });


  let searchResultResponseExpected : any = {
    "activities" : []
  };

  it('should send a post request calling Activity search result api',async ()=>{
    
    (await service.SearchResult(searchInitResponseExpected))
    .subscribe((data:any)=>{
      searchResultResponseExpected = data;
    });
    //creating mock request
    let req = httpController.expectOne(`${url}/result`);
    expect(req.request.method).toBe("POST");
    
    req.flush(searchResultResponseExpected);
  });

  it('should receive a valid response calling Activity search result api',async ()=>{
    (await service.SearchResult(searchInitResponseExpected)).subscribe((data:any)=>{
      expect(data.hasOwnProperty('activities')).toBe(true);
    });
    //creating mock request
    let req = httpController.expectOne(`${url}/result`)

    //after this only subscribe part is executed
    req.flush(searchResultResponseExpected);
  });

});
