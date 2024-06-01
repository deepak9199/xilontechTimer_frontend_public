import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerAssignProjectEmployeeComponent } from './timer-assign-project-employee.component';

describe('TimerAssignProjectEmployeeComponent', () => {
  let component: TimerAssignProjectEmployeeComponent;
  let fixture: ComponentFixture<TimerAssignProjectEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerAssignProjectEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerAssignProjectEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
