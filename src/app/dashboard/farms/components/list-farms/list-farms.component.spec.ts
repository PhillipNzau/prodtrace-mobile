import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFarmsComponent } from './list-farms.component';

describe('ListFarmsComponent', () => {
  let component: ListFarmsComponent;
  let fixture: ComponentFixture<ListFarmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFarmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
