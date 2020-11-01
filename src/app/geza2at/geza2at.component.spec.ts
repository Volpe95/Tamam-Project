import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Geza2atComponent } from './geza2at.component';

describe('Geza2atComponent', () => {
  let component: Geza2atComponent;
  let fixture: ComponentFixture<Geza2atComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Geza2atComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Geza2atComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
