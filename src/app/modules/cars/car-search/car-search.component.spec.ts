import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AutosuggestService } from 'src/app/services/autosuggest-service.service';
import { CarsService } from 'src/app/services/cars-service.service';
import { CarResultsComponent } from '../car-results/car-results.component';
import { routes } from '../cars-routing.module';

import { CarSearchComponent } from './car-search.component';

describe('CarSearchComponent', () => {
  let component: CarSearchComponent;
  let searchFixture: ComponentFixture<CarSearchComponent>;
  let router :Router;
  let autosuggestService: AutosuggestService;
  let carService : CarsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports:[
            FormsModule,
            HttpClientTestingModule,
            RouterTestingModule.withRoutes(routes)
        ],
        declarations: [ 
            CarSearchComponent, 
            CarResultsComponent
        ],
        providers:[
          AutosuggestService,
          CarsService,
        ]
    })
    .compileComponents();

    router = TestBed.inject(Router);

    searchFixture = TestBed.createComponent(CarSearchComponent);
    component = searchFixture.componentInstance;
    searchFixture.detectChanges();
    autosuggestService = searchFixture.debugElement.injector.get(AutosuggestService);
    carService = searchFixture.debugElement.injector.get(CarsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('getSuggestedPlaces() should fill autosuggested values in #drop_locations & #pickup_locations', () => {
    const comp = new CarSearchComponent(router,autosuggestService, carService);
    
    expect( comp.drop_locations.length==0 && comp.pickup_locations.length==0)
      .withContext('initially empty')
      .toBe(true);
    let location = 'New';
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
    comp.getSuggestedPlaces('drop',location);
    comp.getSuggestedPlaces('pickup',location);
    expect(comp.drop_locations.length > 0 && comp.pickup_locations.length>0)
      .withContext('not empty after change in input')
      .toBe(true);
  });

    it('chooseLocation() should update pickup latitude and longitude', () => {
    const comp = new CarSearchComponent(router,autosuggestService, carService);
    
    expect(comp.selected_pickup_locationId==null || comp.selected_drop_locationId==null)
      .withContext('initially no autosuggested choices loaded')
      .toBe(true);

    var choice = {"id":0};
    comp.chooseLocation(choice,'drop');
    comp.chooseLocation(choice,'pickup');
    expect(comp.selected_drop_locationId!=null)
      .withContext('updated after clicking on autosuggested choices')
      .toBe(true);
  });


  it('onSubmit() should initiate call to search init',()=>{
    const comp = new CarSearchComponent(router,autosuggestService, carService);
    expect(comp.searchInitResponse == null)
      .withContext('initially #sessionId is empty')
      .toBe(true);

    var formData = {
        "location":'Las Vegas',
        "check_in":'2022-09-18',
        "check_out":'2022-09-19',
        "no-of-persons":1,
    }

    spyOn(carService,'SearchInit').and.callFake(() => {
      return of({'sessionId': 'f15722db-eaad-4bf0-bb68-a7acba80e15c'});
    })

    comp.onSubmit(formData);

    expect(comp.searchInitResponse?.sessionId === 'f15722db-eaad-4bf0-bb68-a7acba80e15c')
    .withContext('not empty after calling #searchElements')
    .toBe(true);
  })

  it('getStatus() should call for status and update #searchStatusResponse', () => {
    const comp = new CarSearchComponent(router,autosuggestService, carService);
    
    spyOn(carService, 'SearchStatus').and.callFake(() => {
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
    const comp = new CarSearchComponent(router,autosuggestService, carService);
    expect(comp.cars_rental == null)
      .withContext('initially #elements is empty')
      .toBe(true);
    
    spyOn(carService, 'SearchResult').and.callFake(() => {
      return of({
        "sessionId": "79287bd8-3cbc-4c7c-998e-67f0f85c29ae-ACNXT$1371",
        "carRentals": [1, 2, 3, 4],
        "vendors":[1,2,3,4],
        "rentalLocations":[1,2,3],
        "vehicles":[1,2,3,4],
        "paging":{}
      });
    });
    comp.getResults();
    expect(comp.cars_rental!=null)
      .withContext('not empty after calling searchResults()')
      .toBe(true);
  });
});
