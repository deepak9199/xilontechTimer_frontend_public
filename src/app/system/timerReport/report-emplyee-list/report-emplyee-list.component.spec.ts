import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEmplyeeListComponent } from './report-emplyee-list.component';

describe('ReportEmplyeeListComponent', () => {
  let component: ReportEmplyeeListComponent;
  let fixture: ComponentFixture<ReportEmplyeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportEmplyeeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEmplyeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
