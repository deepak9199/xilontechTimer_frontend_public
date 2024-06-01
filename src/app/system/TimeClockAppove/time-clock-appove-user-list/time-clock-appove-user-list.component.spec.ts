import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeClockAppoveUserListComponent } from './time-clock-appove-user-list.component';

describe('TimeClockAppoveUserListComponent', () => {
  let component: TimeClockAppoveUserListComponent;
  let fixture: ComponentFixture<TimeClockAppoveUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeClockAppoveUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeClockAppoveUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
