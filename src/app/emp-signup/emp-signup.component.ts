import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { Employee } from '../models/Employee';
import { EmployeeHeaderService } from '../services/employee-header.service';
import { EmployeeService } from '../services/employee.service';
import { Constants } from '../Constants';

@Component({
  selector: 'app-emp-signup',
  templateUrl: './emp-signup.component.html',
  styleUrls: ['./emp-signup.component.css']
})
export class EmpSignupComponent implements OnInit {

  private emp: Employee = {
    id: "",
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    password: "",
    created_by: "",
    modified_by: "",
    delete: false,
    role: 0
  };

  confPwd: string = '';

  private isEmailExist : boolean = false;
  private isEmailNotExist : boolean = false;
  private isInvalidEmail : boolean = false;

  constructor(private employeeService : EmployeeService, private employeeHeader : EmployeeHeaderService, private router: Router) { }

  ngOnInit() {
    this.employeeHeader.removeData();
  }

  checkEmail(event) {
    if(Constants.REGEXP.test(this.emp.email)) {
      this.isInvalidEmail = false;
      this.employeeService.checkEmail(this.emp.email).subscribe(
        (resp) => {
          if(resp.message == Constants.NOT_FOUND_EMAIL) {
            this.isEmailExist = true;
            this.isEmailNotExist = false;
          } else {
            this.isEmailExist = false;
            this.isEmailNotExist = true;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.isInvalidEmail = true;
      this.isEmailExist = false;
    }
  }

  register() {
    if(this.emp.first_name && this.emp.last_name && !this.isInvalidEmail && this.isEmailExist && this.emp.gender && this.emp.password && this.confPwd) {
      if(this.emp.password == this.confPwd) {
        this.employeeService.register(this.emp).subscribe(
          (resp) => {
            Swal.fire(
              'Successfully Registered!',
              'Password sent to your email. Please check your email.',
              'success'
            )
            this.router.navigate(['/emp-login']);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        Swal.fire({
          type: 'error',
          title: 'Error!',
          text: 'Confirm password is not correct.'
        })
      }
    } else {
      Swal.fire({
        type: 'error',
        title: 'Error!',
        text: 'All * fields are mandatory and email should be valid'
      })
    }
  }

}
