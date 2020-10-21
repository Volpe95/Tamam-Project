import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageRecordsComponent } from './percentage-records.component';

describe('PercentageRecordsComponent', () => {
  let component: PercentageRecordsComponent;
  let fixture: ComponentFixture<PercentageRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercentageRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
