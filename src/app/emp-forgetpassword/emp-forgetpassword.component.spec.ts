import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpForgetpasswordComponent } from './emp-forgetpassword.component';

describe('EmpForgetpasswordComponent', () => {
  let component: EmpForgetpasswordComponent;
  let fixture: ComponentFixture<EmpForgetpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpForgetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpForgetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
