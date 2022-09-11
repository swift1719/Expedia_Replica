import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule , HttpTestingController} from '@angular/common/http/testing'
import { HotelsService } from './hotels-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('Hotels Service Tests', () => {
  let service: HotelsService;
  let http  : HttpClient;
  let httpControler : HttpTestingController;
  let url = environment.HOTELS_API_BASE_URL;

  let searchInitResponseExpected : any = {
    "sessionId" : ""
  };

  let searchStatusResponseExpected : any = {
    "status" : "",
    "resultCount" : ""
  };

  let searchResultResponseExpected : any = {
    "hotels" : []
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers : [HotelsService]
    });
    service = TestBed.inject(HotelsService);                //creating instance
    http = TestBed.inject(HttpClient);
    httpControler = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpControler.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('send post request to Hotel Search Init',async ()=>{
    let searchInitResponseReceived : any = {};
    let request_data = {
      "from_date":"2022-09-16",
      "to_date":"2022-09-21",
      "latitude":36.08333206176758,
      "longitude":-115.16666412353516
    };
    (await service.SearchInit(request_data)).subscribe((data:any)=>{
      searchInitResponseReceived = data;
    });
    let req = httpControler.expectOne(`${url}/init`)

    req.flush(searchInitResponseExpected);
    expect(req.request.method).toBe("POST");
  })

  it('should receive a valid response calling hotel search init api',async ()=>{
    (await service.SearchInit(searchInitResponseExpected)).subscribe((data:any)=>{
      expect(data.hasOwnProperty('sessionId')).toBe(true);
    });
    let req = httpControler.expectOne(`${url}/init`)

    req.flush(searchInitResponseExpected);
  })

  it('should send a post request calling Search Status',async ()=>{
    (await service.SearchStatus(searchInitResponseExpected)).subscribe((data:any)=>{
      searchStatusResponseExpected = data;
    });
    let req = httpControler.expectOne(`${url}/status`)

    req.flush(searchStatusResponseExpected);
    expect(req.request.method).toBe("POST");
  })

  it('should receive a valid response calling hotel search status api',async ()=>{
    (await service.SearchStatus(searchStatusResponseExpected)).subscribe((data:any)=>{
      expect(data.hasOwnProperty('status')).toBe(true);
      expect(data.hasOwnProperty('resultCount')).toBe(true);
    });
    let req = httpControler.expectOne(`${url}/status`)
    req.flush(searchStatusResponseExpected);
  });

  it('should send a post request calling hotel search result api',async ()=>{
    (await service.SearchResult(searchResultResponseExpected)).subscribe((data:any)=>{
      searchResultResponseExpected = data;
    });
    let req = httpControler.expectOne(`${url}/results`);
    expect(req.request.method).toBe("POST");
    
    req.flush(searchResultResponseExpected);
  });

  it('should receive a valid response calling hotel search result api',async ()=>{
    (await service.SearchResult(searchStatusResponseExpected)).subscribe((data:any)=>{
      expect(data.hasOwnProperty('hotels')).toBe(true);
    });
    let req = httpControler.expectOne(`${url}/results`)

    req.flush(searchResultResponseExpected);
  });


});
