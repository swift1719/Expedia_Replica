import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { ActivityService } from './activity-service.service';
import { of } from 'rxjs';


describe('Activity Service Tests', () => {
  let service: ActivityService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let activityBaseURL=environment.ACTIVITY_API_BASE_URL;
  let activityTestSessionId = "9e25109c-a198-4268-9247-7459dacfd7d9-ACNXT$1371";
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActivityService]
    });
    service = TestBed.inject(ActivityService);
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
  it('should send  a post request to search init api', () => {
    
    service.SearchInit(request_data).subscribe();
    const req = httpTestingController.expectOne(activityBaseURL + '/init');
    expect(req.request.method).toEqual('POST');
    expect(req.request.responseType).toEqual('json');
    req.flush(request_data);
  });

  it('should receive a valid response from search init api', () => {
    
    let expected = {
      "sessionId": "7cb63d19-5825-4afb-911b-5b9c49ab8acb-ACNXT$1371"
    }

    spyOn(service,'SearchInit').and.callFake(()=>{
      return (of(expected))
    })
    
    service.SearchInit(request_data).subscribe((rs:any)=>{
      expect(rs).toEqual(expected)
    });
    
  });

  it('should send a post request to search status api', () => {
    service.SearchStatus({"sessionId":activityTestSessionId}).subscribe();
    const req = httpTestingController.expectOne(activityBaseURL + '/status');
    expect(req.request.method).toEqual('POST');
    expect(req.request.responseType).toEqual('json');
    req.flush(activityTestSessionId);
  });

  it('should receive a valid response from search status api', () => {
    let expected ={
      "status": "Completed",
      "resultCount": 0,
      "errors": []
    }

    spyOn(service,'SearchStatus').and.callFake(()=>{
      return (of(expected))
    })
    service.SearchStatus({"sessionId":activityTestSessionId}).subscribe((rs:any)=>{
      expect(rs).toEqual(expected)
    });
    
  });

  it('should send a post request to search result api', () => {
    service.SearchResult({'sessionId': activityTestSessionId}).subscribe();
    const req = httpTestingController.expectOne(activityBaseURL + '/result');
    expect(req.request.method).toEqual('POST');
    expect(req.request.responseType).toEqual('json');
    req.flush({'sessionId': activityTestSessionId});
  });

  it('should receive a valid response from search result api', () => {
    
    let expected = {
      "sessionId":"",
      "activities":'',
      "paging":''
    }

    spyOn(service,'SearchResult').and.callFake(()=>{
      return (of(expected))
    })
    
    service.SearchResult({'sessionId': activityTestSessionId}).subscribe((rs:any)=>{
      expect(rs).toEqual(expected)
    });
    
  });
});
