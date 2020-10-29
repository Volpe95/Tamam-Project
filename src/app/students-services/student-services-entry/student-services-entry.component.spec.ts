import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentServicesEntryComponent } from './student-services-entry.component';

describe('StudentServicesEntryComponent', () => {
  let component: StudentServicesEntryComponent;
  let fixture: ComponentFixture<StudentServicesEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentServicesEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentServicesEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
