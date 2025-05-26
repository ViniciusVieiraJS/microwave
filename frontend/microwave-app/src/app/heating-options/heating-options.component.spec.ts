import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatingOptionsComponent } from './heating-options.component';

describe('HeatingOptionsComponent', () => {
  let component: HeatingOptionsComponent;
  let fixture: ComponentFixture<HeatingOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeatingOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeatingOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
