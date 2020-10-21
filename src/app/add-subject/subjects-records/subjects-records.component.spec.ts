import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsRecordsComponent } from './subjects-records.component';

describe('SubjectsRecordsComponent', () => {
  let component: SubjectsRecordsComponent;
  let fixture: ComponentFixture<SubjectsRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectsRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
