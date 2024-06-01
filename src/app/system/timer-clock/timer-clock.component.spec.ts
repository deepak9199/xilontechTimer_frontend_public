import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerClockComponent } from './timer-clock.component';

describe('TimerClockComponent', () => {
  let component: TimerClockComponent;
  let fixture: ComponentFixture<TimerClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerClockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
