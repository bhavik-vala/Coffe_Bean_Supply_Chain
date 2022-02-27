import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingFormComponent } from './packaging-form.component';

describe('PackagingFormComponent', () => {
  let component: PackagingFormComponent;
  let fixture: ComponentFixture<PackagingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
