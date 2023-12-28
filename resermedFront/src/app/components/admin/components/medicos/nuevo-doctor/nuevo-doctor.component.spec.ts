import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDoctorComponent } from './nuevo-doctor.component';

describe('NuevoDoctorComponent', () => {
  let component: NuevoDoctorComponent;
  let fixture: ComponentFixture<NuevoDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoDoctorComponent]
    });
    fixture = TestBed.createComponent(NuevoDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
