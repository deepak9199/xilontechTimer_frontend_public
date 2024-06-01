import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeClockAppoveUserDetailComponent } from './time-clock-appove-user-detail.component';

describe('TimeClockAppoveUserDetailComponent', () => {
  let component: TimeClockAppoveUserDetailComponent;
  let fixture: ComponentFixture<TimeClockAppoveUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeClockAppoveUserDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeClockAppoveUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
