import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { EmployeeService } from '../services/employee.service';
import { EmployeeHeaderService } from '../services/employee-header.service';
import { Constants } from '../Constants';

@Component({
  selector: 'app-emp-forgetpassword',
  templateUrl: './emp-forgetpassword.component.html',
  styleUrls: ['./emp-forgetpassword.component.css']
})
export class EmpForgetpasswordComponent implements OnInit {

  email : string = '';

  constructor(private employeeService : EmployeeService, private employeeHeaderService : EmployeeHeaderService, private router: Router) { }

  ngOnInit() {
    this.employeeHeaderService.removeData();
  }

  sendPassword() {
    if(this.email && Constants.REGEXP.test(this.email)) {
      this.employeeService.forgotPassword(this.email).subscribe(
        (resp) => {
          Swal.fire(
            'Successfully Sent!',
            'Password sent to your email. Please check your email.',
            'success'
          );
        },
        (error) => {
          Swal.fire({
            type: 'error',
            title: 'Error!',
            text: 'Email is not registered.'
          })
        }
      );
    } else {
      Swal.fire({
        type: 'error',
        title: 'Error!',
        text: 'Invalid Email'
      })
    }
  }
 
}
