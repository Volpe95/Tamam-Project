import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Geza2atRecordsComponent } from './geza2at-records.component';

describe('Geza2atRecordsComponent', () => {
  let component: Geza2atRecordsComponent;
  let fixture: ComponentFixture<Geza2atRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Geza2atRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Geza2atRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
