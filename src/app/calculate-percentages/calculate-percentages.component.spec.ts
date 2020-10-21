import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatePercentagesComponent } from './calculate-percentages.component';

describe('CalculatePercentagesComponent', () => {
  let component: CalculatePercentagesComponent;
  let fixture: ComponentFixture<CalculatePercentagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatePercentagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatePercentagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
