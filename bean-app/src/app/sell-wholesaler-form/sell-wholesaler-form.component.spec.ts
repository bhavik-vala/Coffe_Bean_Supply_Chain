import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellWholesalerFormComponent } from './sell-wholesaler-form.component';

describe('SellWholesalerFormComponent', () => {
  let component: SellWholesalerFormComponent;
  let fixture: ComponentFixture<SellWholesalerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellWholesalerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellWholesalerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
