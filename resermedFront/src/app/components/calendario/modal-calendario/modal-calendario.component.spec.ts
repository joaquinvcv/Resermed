import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCalendarioComponent } from './modal-calendario.component';

describe('ModalCalendarioComponent', () => {
  let component: ModalCalendarioComponent;
  let fixture: ComponentFixture<ModalCalendarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCalendarioComponent]
    });
    fixture = TestBed.createComponent(ModalCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
