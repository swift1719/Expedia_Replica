import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { CarsService } from './cars-service.service';
import { of } from 'rxjs';


describe('Car Service Tests', () => {
  let service: CarsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let carsBaseURL=environment.CARS_API_BASE_URL;
  let carsTestSessionId = "33e7c5d5-e15d-4a93-9d2c-5c70a7e8e9aa-CLNXT|1371";
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarsService]
    });
    service = TestBed.inject(CarsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  var request_data = {
    'from_date': '2022-09-23',
    'to_date': '2022-09-25',
    'pickup_latitude': 34.0103,
    'pickup_longitude': -118.4963,
    'drop_latitude':36.1147,
    'drop_longitude': -115.1728
  }

  it('should send post request to search init api', () => {
    
    service.SearchInit(request_data).subscribe();
    const req = httpTestingController.expectOne(carsBaseURL + '/init');
    expect(req.request.method).toEqual('POST');
    expect(req.request.responseType).toEqual('json');
    req.flush(request_data);
  });
  
  it('should receive valid response from search init api', () => {
    let expected={
      "sessionId": "de9c2b68-bd1b-4763-a155-5851e3bea811-CLNXT|1371"
    };
    spyOn(service,'SearchInit').and.callFake(()=>{
      return (of(expected));
    })
    service.SearchInit(request_data).subscribe((rs:any)=>{
      expect(rs).toEqual(expected);
    });
  });
  
  it('should send post request to search status api', () => {
    service.SearchStatus({"sessionId":carsTestSessionId}).subscribe();
    const req = httpTestingController.expectOne(carsBaseURL + '/status');
    expect(req.request.method).toEqual('POST');
    expect(req.request.responseType).toEqual('json');
    req.flush(carsTestSessionId);
  });

  it('should receive a valid response from search status api', () => {
    
    let expected={
      "status": "Completed",
      "resultsCount": 153,
      "errors": []
    };

    spyOn(service,'SearchStatus').and.callFake(()=>{
      return (of(expected));
    })

    service.SearchStatus({"sessionId":carsTestSessionId}).subscribe((rs:any)=>{
      expect(rs).toEqual(expected);
    });
    
  });

  it('should send post request to search result api', () => {
    service.SearchResult({'sessionId': carsTestSessionId}).subscribe();
    const req = httpTestingController.expectOne(carsBaseURL + '/results');
    expect(req.request.method).toEqual('POST');
    expect(req.request.responseType).toEqual('json');
    req.flush({'sessionId': carsTestSessionId});
  });

  it('should receive a valid response from search result api', () => {
    
    let expected={
      "sessionId":'',
      "cars":'',
      "paging":''
    };

    spyOn(service,'SearchResult').and.callFake(()=>{
      return (of(expected))
    })
    
    service.SearchResult({'sessionId': carsTestSessionId}).subscribe((rs:any)=>{
      expect(rs).toEqual(expected);
    });
    
  });

});
