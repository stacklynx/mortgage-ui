import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerForgotpasswordComponent } from './customer-forgotpassword.component';

describe('CustomerForgotpasswordComponent', () => {
  let component: CustomerForgotpasswordComponent;
  let fixture: ComponentFixture<CustomerForgotpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerForgotpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerForgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
