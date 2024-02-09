import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropDetailComponent } from './crop-detail.component';

describe('CropDetailComponent', () => {
  let component: CropDetailComponent;
  let fixture: ComponentFixture<CropDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
