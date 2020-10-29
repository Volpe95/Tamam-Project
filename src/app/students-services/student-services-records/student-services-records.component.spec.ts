import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentServicesRecordsComponent } from './student-services-records.component';

describe('StudentServicesRecordsComponent', () => {
  let component: StudentServicesRecordsComponent;
  let fixture: ComponentFixture<StudentServicesRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentServicesRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentServicesRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
