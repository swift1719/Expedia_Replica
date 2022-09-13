import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AutosuggestService } from 'src/app/services/autosuggest-service.service';
import { HotelSearchComponent } from '../../hotels/hotel-search/hotel-search.component';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[FormsModule],
      declarations: [ SearchComponent, HotelSearchComponent ],
      providers:[AutosuggestService,HttpClient,HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change tab',()=>{
    let initial_id=component.id;
    component.switchTab('cars');
    expect(component.id!=initial_id && component.id=='cars').toBe(true);
  })
});
