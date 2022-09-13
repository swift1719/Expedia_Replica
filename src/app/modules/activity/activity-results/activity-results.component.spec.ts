import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ActivityResultsComponent } from './activity-results.component';

describe('ActivityResultsComponent', () => {
  let component: ActivityResultsComponent;
  let fixture: ComponentFixture<ActivityResultsComponent>;
  let router:Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityResultsComponent ]
    })
    .compileComponents();
    router=TestBed.inject(Router);
    fixture = TestBed.createComponent(ActivityResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
