
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HotelSearchComponent } from './hotel-search.component';
import { HotelsService } from 'src/app/services/hotels-service.service';
import { AutosuggestService } from 'src/app/services/autosuggest-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router} from '@angular/router';
import { routes } from '../hotels-routing.module';
import { HotelResultsComponent } from '../hotel-results/hotel-results.component';

describe('Hotel Search Component', () => {
  let component: HotelSearchComponent;
  let resultComponent:HotelResultsComponent;
  let searchFixture: ComponentFixture<HotelSearchComponent>;
  let resultFixture:ComponentFixture<HotelResultsComponent>;
  let autosuggestService: AutosuggestService;
  let hotelService: HotelsService;
  let router :Router;
  let location:Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelSearchComponent,HotelResultsComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        AutosuggestService,
        HotelsService,
        Location
      ]
    })
    .compileComponents();


    router = TestBed.inject(Router);
    // location = TestBed.inject(Location);

    searchFixture = TestBed.createComponent(HotelSearchComponent);
    component = searchFixture.componentInstance;
    searchFixture.detectChanges();
    // router = searchFixture.debugElement.injector.get(router);
    autosuggestService = searchFixture.debugElement.injector.get(AutosuggestService);
    hotelService = searchFixture.debugElement.injector.get(HotelsService);

    // resultFixture = TestBed.createComponent(HotelResultsComponent);
    // resultComponent = resultFixture.componentInstance;
    // router.initialNavigation();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getSuggestedPlaces() should fill autosuggested values in #locations', () => {
    const comp = new HotelSearchComponent(router,autosuggestService, hotelService);
    
    expect(comp.locations.length == 0)
      .withContext('initially empty')
      .toBe(true);

    var location = 'New';
    spyOn(autosuggestService,'fetchLocations').and.callFake(() => {
      return of({
        "s": [
          
          {
            "n": "New York City",
            "lat": 40.75605,
            "lng": -73.98695,
            "nbc": {}
          },
          {
            "n": "Newark",
            "lat": 40.73558,
            "lng": -74.17225,
            "nbc": {}
          }
        ],
        "wrn": []
      });
    });
    comp.getSuggestedPlaces(location);
    expect(comp.locations.length !== 0)
      .withContext('not empty after change in input')
      .toBe(true);
  });

  it('chooseLocation() should update pickup latitude and longitude', () => {
    const comp = new HotelSearchComponent(router,autosuggestService, hotelService);
    
    expect(comp.selectedLocationId==null)
      .withContext('initially no autosuggested choices loaded')
      .toBe(true);

    var choice = {"id":0};
    comp.chooseLocation(choice);
    expect(comp.selectedLocationId!=null)
      .withContext('updated after clicking on autosuggested choices')
      .toBe(true);
  });

  


  it('onSubmit() should initiate call to search init ', () => {
    const comp = new HotelSearchComponent(router,autosuggestService, hotelService);
    expect(comp.locations.length == 0)
      .withContext('initially #sessionId is empty')
      .toBe(true);

    var formData = {
        "location":'Las Vegas',
        "check_in":'2022-09-18',
        "check_out":'2022-09-19',
        "no-of-persons":1,
    }

    spyOn(hotelService,'SearchInit').and.callFake(() => {
      return of({'sessionId': 'f15722db-eaad-4bf0-bb68-a7acba80e15c'});
    })

    comp.onSubmit(formData);

    expect(comp.searchInitResponse?.sessionId === 'f15722db-eaad-4bf0-bb68-a7acba80e15c')
    .withContext('not empty after calling #searchElements')
    .toBe(true);
      
  });

  it('getStatus() should call for status and update #searchStatusResponse', () => {
    const comp = new HotelSearchComponent(router,autosuggestService, hotelService);
    
    spyOn(hotelService, 'SearchStatus').and.callFake(() => {
        return of({
          "status": "Completed",
          "resultCount": 53,
        "errors": []
    });
    })

    comp.getStatus();
    // console.log(comp.searchStatusResponse)
    expect(comp.searchStatusResponse.status=='Completed')
      .withContext('statusResponse not null afterwards')
      .toBe(true);
  });

  it('getResults() should fetch search results into #hotels', () => {
    const comp = new HotelSearchComponent(router,autosuggestService, hotelService);
    expect(comp.hotels?.length == 0)
      .withContext('initially #elements is empty')
      .toBe(true);
    
    spyOn(hotelService, 'SearchResult').and.callFake(() => {
      return of({
        "sessionId": "79287bd8-3cbc-4c7c-998e-67f0f85c29ae-ACNXT$1371",
        "hotels": [1, 2, 3, 4]
      });
    });
    comp.getResults();
    expect(comp.hotels?.length >0)
      .withContext('not empty after calling searchResults()')
      .toBe(true);
  });
});
