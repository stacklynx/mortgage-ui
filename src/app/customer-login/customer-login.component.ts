import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { Login } from '../models/Login';
import { CustomerHeaderService } from '../services/customer-header.service';
import { CustomerService } from '../services/customer.service';
import { Constants } from '../Constants';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {

  login: Login = {
    email : '',
    password : ''
  }

  constructor(private customerService : CustomerService, private customerHeaderService : CustomerHeaderService, private router: Router) { }

  ngOnInit() {
    this.customerHeaderService.removeData();
    if(localStorage.getItem('reload')) {
      localStorage.removeItem('reload');
      window.location.reload();
    }
  }

  sigin() {
    if(this.login.email && this.login.password) {
      this.customerService.login(this.login).subscribe(
        (resp) => {
          localStorage.setItem('user-token', resp.headers.get('x-token'));
          localStorage.setItem('user-info', JSON.stringify(resp.body.userInfo));
          this.router.navigate(['/customer/dashboard']);
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
