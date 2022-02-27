import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeanDetailsComponent } from './bean-details.component';

describe('BeanDetailsComponent', () => {
  let component: BeanDetailsComponent;
  let fixture: ComponentFixture<BeanDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeanDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
