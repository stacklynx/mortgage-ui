import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { CustomerProfile } from '../models/CustomerProfile';
import { CustomerHeaderService } from '../services/customer-header.service';
import { CustomerService } from '../services/customer.service';
import { Constants } from '../Constants';

@Component({
  selector: 'app-customer-signup',
  templateUrl: './customer-signup.component.html',
  styleUrls: ['./customer-signup.component.css']
})
export class CustomerSignupComponent implements OnInit {

  private customer: CustomerProfile = {
    id: "",
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    password: "",
    created_by: "",
    modified_by: "",
    is_delete: false
  };

  private isEmailExist : boolean = false;
  private isEmailNotExist : boolean = false;
  private isInvalidEmail : boolean = false;

  constructor(private customerService : CustomerService, private customerHeaderService : CustomerHeaderService, private router: Router) { }

  ngOnInit() {
    this.customerHeaderService.removeData();
  }

  checkEmail(event) {
    if(Constants.REGEXP.test(this.customer.email)) {
      this.isInvalidEmail = false;
      this.customerService.checkEmail(this.customer.email).subscribe(
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
    if(this.customer.first_name && this.customer.last_name && !this.isInvalidEmail && this.isEmailExist && this.customer.gender) {
      this.customerService.register(this.customer).subscribe(
        (resp) => {
          Swal.fire(
            'Successfully Registered!',
            'Password sent to your email. Please check your email.',
            'success'
          )
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      Swal.fire({
        type: 'error',
        title: 'Error!',
        text: 'All * fields are mandatory and email should be valid'
      })
    }
  }

}
