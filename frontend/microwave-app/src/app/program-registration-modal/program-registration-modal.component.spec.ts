import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramRegistrationModalComponent } from './program-registration-modal.component';

describe('ProgramRegistrationModalComponent', () => {
  let component: ProgramRegistrationModalComponent;
  let fixture: ComponentFixture<ProgramRegistrationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramRegistrationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramRegistrationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
