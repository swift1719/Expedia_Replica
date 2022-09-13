import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AutosuggestService } from './autosuggest-service.service';

describe('Autosuggest Service Test', () => {
  let service: AutosuggestService;
  let http: HttpClient;
  let httpTestingController:HttpTestingController;
  let url = environment.AUTOSUGGEST_API_BASE_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[HttpClient]
    });
    service = TestBed.inject(AutosuggestService);
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  let query='los';
  let consumerType='cars';

  it('should send post request to Autosuggest API',async ()=>{
    
    let searchInitResponseReceived:any={};

    (service.fetchLocations(query,consumerType))
    .subscribe((data:any)=>{
        searchInitResponseReceived=data;
    });

    let mock = httpTestingController.expectOne(url);
    mock.flush(searchInitResponseReceived);
    expect(mock.request.method).toBe("POST");
  })

  

  it('should receive a valid response from Autosuggest API',async ()=>{
    let searchResponseExpected:any={
      "s":[],
      "wrn":[]
    }
    
    spyOn(service,'fetchLocations').and.callFake(()=>{
      return (of(searchResponseExpected))
    })
    service.fetchLocations('las','Activities').subscribe((data:any)=>{
      expect(data).toEqual(searchResponseExpected);
    });

  })

});
