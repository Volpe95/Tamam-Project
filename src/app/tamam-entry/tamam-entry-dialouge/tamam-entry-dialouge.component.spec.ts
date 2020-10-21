import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TamamEntryDialougeComponent } from './tamam-entry-dialouge.component';

describe('TamamEntryDialougeComponent', () => {
  let component: TamamEntryDialougeComponent;
  let fixture: ComponentFixture<TamamEntryDialougeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TamamEntryDialougeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TamamEntryDialougeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
