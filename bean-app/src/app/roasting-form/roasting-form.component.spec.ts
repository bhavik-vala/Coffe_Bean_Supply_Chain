import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoastingFormComponent } from './roasting-form.component';

describe('RoastingFormComponent', () => {
  let component: RoastingFormComponent;
  let fixture: ComponentFixture<RoastingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoastingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoastingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
