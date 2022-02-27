import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveShipmentFormComponent } from './receive-shipment-form.component';

describe('ReceiveShipmentFormComponent', () => {
  let component: ReceiveShipmentFormComponent;
  let fixture: ComponentFixture<ReceiveShipmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveShipmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveShipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
