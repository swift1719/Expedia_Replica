import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { AutosuggestService } from './autosuggest-service.service';

describe('Autosuggest Service Test', () => {
  let service: AutosuggestService;
  let http: HttpClient;
  let httpController:HttpTestingController;
  let url = environment.AUTOSUGGEST_API_BASE_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[HttpClient]
    });
    service = TestBed.inject(AutosuggestService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  let query='los';
  let consumerType='cars';

  it('should send post request to Autosuggest API',async ()=>{
    
    let searchInitResponseReceived:any={};

    (await service.fetchLocations(query,consumerType))
    .subscribe((data:any)=>{
        searchInitResponseReceived=data;
    });

    let req = httpController.expectOne(url);
    req.flush(searchInitResponseReceived);
    expect(req.request.method).toBe("POST");
  })

  let searchResponseExpected:any={
    "s":[]
  }

  it('should receive a valid response from Autosuggest API',async ()=>{

    (await service.fetchLocations(query,consumerType))
    .subscribe((data:any)=>{
      expect(data.hasOwnProperty('s')).toBe(true);
    });

    let mock = httpController.expectOne(url);
    mock.flush(searchResponseExpected);
  })

});
