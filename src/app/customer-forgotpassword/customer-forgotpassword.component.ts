import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { CustomerService } from '../services/customer.service';
import { CustomerHeaderService } from '../services/customer-header.service';
import { Constants } from '../Constants';

@Component({
  selector: 'app-customer-forgotpassword',
  templateUrl: './customer-forgotpassword.component.html',
  styleUrls: ['./customer-forgotpassword.component.css']
})
export class CustomerForgotpasswordComponent implements OnInit {

  email : string = '';

  constructor(private customerService : CustomerService, private customerHeaderService : CustomerHeaderService, private router: Router) { }

  ngOnInit() {
    this.customerHeaderService.removeData();
  }

  sendPassword() {
    if(this.email && Constants.REGEXP.test(this.email)) {
      this.customerService.forgotPassword(this.email).subscribe(
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
