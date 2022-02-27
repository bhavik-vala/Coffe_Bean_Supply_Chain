import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifyFormComponent } from './certify-form.component';

describe('CertifyFormComponent', () => {
  let component: CertifyFormComponent;
  let fixture: ComponentFixture<CertifyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertifyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
