import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerApplicationViewComponent } from './customer-application-view.component';

describe('CustomerApplicationViewComponent', () => {
  let component: CustomerApplicationViewComponent;
  let fixture: ComponentFixture<CustomerApplicationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerApplicationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerApplicationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
