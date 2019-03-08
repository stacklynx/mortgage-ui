import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { Login } from '../models/Login';
import { EmployeeHeaderService } from '../services/employee-header.service';
import { EmployeeService } from '../services/employee.service';
import { Constants } from '../Constants';

@Component({
  selector: 'app-emp-login',
  templateUrl: './emp-login.component.html',
  styleUrls: ['./emp-login.component.css']
})
export class EmpLoginComponent implements OnInit {

  login: Login = {
    email : '',
    password : ''
  }

  constructor(private employeeService : EmployeeService, private employeeHeaderService : EmployeeHeaderService, private router: Router) { }

  ngOnInit() {
    this.employeeHeaderService.removeData();
    if(localStorage.getItem('reload')) {
        localStorage.removeItem('reload');
        window.location.reload();
    }
  }

  sigin() {
    if(this.login.email && this.login.password) {
      this.employeeService.login(this.login).subscribe(
        (resp) => {
          localStorage.setItem('x-token', resp.headers.get('x-token'));
          localStorage.setItem('info', JSON.stringify(resp.body.info));
          localStorage.setItem('reload', 'reload');
          this.router.navigate(['/emp/dashboard']);
        },
        (error) => {
          Swal.fire({
            type: 'error',
            title: 'Error!',
            text: 'Invalid email and password'
          })
        }
      );
    } else {
      Swal.fire({
        type: 'error',
        title: 'Error!',
        text: 'Invalid email and password'
      })
    }

  }

}
