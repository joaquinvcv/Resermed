import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetHorarioComponent } from './set-horario.component';

describe('SetHorarioComponent', () => {
  let component: SetHorarioComponent;
  let fixture: ComponentFixture<SetHorarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetHorarioComponent]
    });
    fixture = TestBed.createComponent(SetHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
