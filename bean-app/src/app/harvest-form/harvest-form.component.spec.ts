import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestFormComponent } from './harvest-form.component';

describe('HarvestFormComponent', () => {
  let component: HarvestFormComponent;
  let fixture: ComponentFixture<HarvestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HarvestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HarvestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
