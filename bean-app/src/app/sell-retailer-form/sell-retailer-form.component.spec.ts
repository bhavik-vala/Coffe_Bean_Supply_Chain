import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellRetailerFormComponent } from './sell-retailer-form.component';

describe('SellRetailerFormComponent', () => {
  let component: SellRetailerFormComponent;
  let fixture: ComponentFixture<SellRetailerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellRetailerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellRetailerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
