import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparionRecordsComponent } from './comparion-records.component';

describe('ComparionRecordsComponent', () => {
  let component: ComparionRecordsComponent;
  let fixture: ComponentFixture<ComparionRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparionRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparionRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
