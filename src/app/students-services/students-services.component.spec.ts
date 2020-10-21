import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsServicesComponent } from './students-services.component';

describe('StudentsServicesComponent', () => {
  let component: StudentsServicesComponent;
  let fixture: ComponentFixture<StudentsServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
