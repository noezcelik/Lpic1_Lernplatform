import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErgebnisComponent } from './ergebnis.component';

describe('ErgebnisComponent', () => {
  let component: ErgebnisComponent;
  let fixture: ComponentFixture<ErgebnisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErgebnisComponent]
    });
    fixture = TestBed.createComponent(ErgebnisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
