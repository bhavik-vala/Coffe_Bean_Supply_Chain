import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellDistributorFormComponent } from './sell-distributor-form.component';

describe('SellDistributorFormComponent', () => {
  let component: SellDistributorFormComponent;
  let fixture: ComponentFixture<SellDistributorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellDistributorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellDistributorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
