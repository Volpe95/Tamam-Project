import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableEntryComponent } from './time-table-entry.component';

describe('TimeTableEntryComponent', () => {
  let component: TimeTableEntryComponent;
  let fixture: ComponentFixture<TimeTableEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTableEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTableEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
