import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerApplicationComponent } from './customer-application.component';

describe('CustomerApplicationComponent', () => {
  let component: CustomerApplicationComponent;
  let fixture: ComponentFixture<CustomerApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
