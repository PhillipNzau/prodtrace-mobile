import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrdataPageComponent } from './qrdata-page.component';

describe('QrdataPageComponent', () => {
  let component: QrdataPageComponent;
  let fixture: ComponentFixture<QrdataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrdataPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrdataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
