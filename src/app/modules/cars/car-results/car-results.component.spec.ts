import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarResultsComponent } from './car-results.component';

describe('CarResultsComponent', () => {
  let component: CarResultsComponent;
  let fixture: ComponentFixture<CarResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
