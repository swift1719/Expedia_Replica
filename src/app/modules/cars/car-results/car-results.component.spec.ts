import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CarResult, CarResultsComponent, Rental } from './car-results.component';

describe('CarResultsComponent', () => {
  let component: CarResultsComponent;
  let fixture: ComponentFixture<CarResultsComponent>;
  let router : Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarResultsComponent ]
    })
    .compileComponents();
    
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(CarResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
