import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { CarsService } from './cars-service.service';


describe('Cars Service Tests', () => {
  let service: CarsService;
  let http:HttpClient;
  let httpController:HttpTestingController;
  let url = environment.CARS_API_BASE_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports:[HttpClientTestingModule],
        providers:[HttpClient]
    });
    service = TestBed.inject(CarsService);
    http=TestBed.inject(HttpClient);
    httpController=TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
      expect(service).toBeTruthy();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send post request to Cars Search Init',async ()=>{
      let searchInitResponseReceived: any = {};

      let request_data = {
        "from_date":"2022-10-03",
        "to_date":"2022-10-07",
        "drop_latitude":36.1147,
        "drop_longitude":-115.1728,
        "pickup_latitude":34.0103,
        "pickup_longitude":-118.4963
      };
      (await service.SearchInit(request_data))
      .subscribe((data:any)=>{
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
    "resultsCount" : ""
  };

  it('should send a post request calling Activity Search Status',async ()=>{
    (await service.SearchStatus(searchInitResponseExpected))
    .subscribe((data:any)=>{
      searchStatusResponseExpected = data;
    });
    let req = httpController.expectOne(`${url}/status`)

    req.flush(searchStatusResponseExpected);
    expect(req.request.method).toBe("POST");
  })

  it('should receive a valid response calling Activity search status api',async ()=>{
    (await service.SearchStatus(searchInitResponseExpected))
    .subscribe((data:any)=>{
      expect(data.hasOwnProperty('status')).toBe(true);
      expect(data.hasOwnProperty('resultsCount')).toBe(true);
    });
    let req = httpController.expectOne(`${url}/status`)
    req.flush(searchStatusResponseExpected);
  });


  let searchResultResponseExpected : any = {
    "carRentals" : []
  };

  it('should send a post request calling Car search result api',async ()=>{
    
    (await service.SearchResult(searchInitResponseExpected))
    .subscribe((data:any)=>{
      searchResultResponseExpected = data;
    });
    //creating mock request
    let req = httpController.expectOne(`${url}/results`);
    expect(req.request.method).toBe("POST");
    
    req.flush(searchResultResponseExpected);
  });

  it('should receive a valid response calling Car search result api',async ()=>{
    (await service.SearchResult(searchInitResponseExpected))
    .subscribe((data:any)=>{
      expect(data.hasOwnProperty('carRentals')).toBe(true);
    });
    //creating mock request
    let req = httpController.expectOne(`${url}/results`)

    //after this only subscribe part is executed
    req.flush(searchResultResponseExpected);
  });

});
