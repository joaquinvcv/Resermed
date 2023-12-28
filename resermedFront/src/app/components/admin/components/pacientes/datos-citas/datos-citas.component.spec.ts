import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosCitasComponent } from './datos-citas.component';

describe('DatosCitasComponent', () => {
  let component: DatosCitasComponent;
  let fixture: ComponentFixture<DatosCitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosCitasComponent]
    });
    fixture = TestBed.createComponent(DatosCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
