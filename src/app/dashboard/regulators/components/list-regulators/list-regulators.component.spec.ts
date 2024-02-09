import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRegulatorsComponent } from './list-regulators.component';

describe('ListRegulatorsComponent', () => {
  let component: ListRegulatorsComponent;
  let fixture: ComponentFixture<ListRegulatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRegulatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRegulatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
