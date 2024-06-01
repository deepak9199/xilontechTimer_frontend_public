import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerReportEmployeeComponent } from './timer-report-employee.component';

describe('TimerReportEmployeeComponent', () => {
  let component: TimerReportEmployeeComponent;
  let fixture: ComponentFixture<TimerReportEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerReportEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerReportEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
