import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedRegulatorComponent } from './selected-regulator.component';

describe('SelectedRegulatorComponent', () => {
  let component: SelectedRegulatorComponent;
  let fixture: ComponentFixture<SelectedRegulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedRegulatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedRegulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
