import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TamamEntryComponent } from './tamam-entry.component';

describe('TamamEntryComponent', () => {
  let component: TamamEntryComponent;
  let fixture: ComponentFixture<TamamEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TamamEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TamamEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
