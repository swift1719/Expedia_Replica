import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { HotelsService } from './hotels-service.service';
import { of } from 'rxjs';


describe('Hotel Service Tests', () => {
  let service: HotelsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let hotelBaseUrl=environment.HOTELS_API_BASE_URL;
  let hotelTestSessionId = "cb32cfaf-0adb-4ceb-9a37-29707d3a37b8-HLNXT$1371";
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HotelsService]
    });
    service = TestBed.inject(HotelsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  var request_data = {
    'from_date': '2022-09-23',
    'to_date': '2022-09-25',
    'latitude': 36.083333333333336,
    'longitude': -115.16666666666669
  }

  it('should send post request to search init api',()=>{
    service.SearchInit(request_data).subscribe()
    const req = httpTestingController.expectOne(hotelBaseUrl + '/init');
    expect(req.request.method).toEqual('POST');
    expect(req.request.responseType).toEqual('json');
    req.flush(request_data);
  })

  it('should return valid response from search init api', () => {

    let searchResponseExpected:any={
      "sessionId": "cf450fa5-72cd-4387-a378-74a542fe6eba-ACNXT$1371"
    }
    
    spyOn(service,'SearchInit').and.callFake(()=>{
      return (of(searchResponseExpected))
    })

    
    service.SearchInit(request_data).subscribe((rs:any)=>{
      expect(rs).toEqual(searchResponseExpected);
    })
  });

  

  it('should send post request to  search status api', () => {
    service.SearchStatus({"sessionId":hotelTestSessionId}).subscribe();
    const req = httpTestingController.expectOne(hotelBaseUrl + '/status');
    expect(req.request.method).toEqual('POST');
    expect(req.request.responseType).toEqual('json');
    req.flush(hotelTestSessionId);
  });

  it('should recieve a valid response from search status api',()=>{

    let expected={
      "status": "Completed",
      "resultCount": 89
    }

    spyOn(service,'SearchStatus').and.callFake(()=>{
      return (of(expected))
    })
    service.SearchStatus({"sessionId":hotelTestSessionId}).subscribe((rs:any)=>{
      expect(rs).toEqual(expected);
    });
  })

  it('should send a post request to search result api', () => {
    service.SearchResult({'sessionId': hotelTestSessionId}).subscribe();
    const req = httpTestingController.expectOne(hotelBaseUrl + '/results');
    expect(req.request.method).toEqual('POST');
    expect(req.request.responseType).toEqual('json');
    req.flush({'sessionId': hotelTestSessionId});
  });

  it('should receive a valid response from search result api',()=>{

    let expected={
      "sessionId":'',
      "hotels":[],
      "paging":{}
    }
    spyOn(service,'SearchResult').and.callFake(()=>{
      return (of(expected));
    })
    service.SearchResult({'sessionId': hotelTestSessionId}).subscribe((rs:any)=>{
      expect(rs).toEqual(expected);
    });

  })
});
