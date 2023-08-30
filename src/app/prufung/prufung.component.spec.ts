import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrufungComponent } from './prufung.component';

describe('PruefungComponent', () => {
  let component: PrufungComponent;
  let fixture: ComponentFixture<PrufungComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrufungComponent]
    });
    fixture = TestBed.createComponent(PrufungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
