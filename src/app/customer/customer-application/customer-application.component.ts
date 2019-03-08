import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import $ from "jquery";

import { CustomerHeaderService } from '../../services/customer-header.service';
import { CustomerService } from '../../services/customer.service';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/Application';
import { Constants } from '../../Constants';

@Component({
  selector: 'app-customer-application',
  templateUrl: './customer-application.component.html',
  styleUrls: ['./customer-application.component.css']
})
export class CustomerApplicationComponent implements OnInit {

  app: Application = {
    id: '',
    first_name: '',
    last_name: '',
    dob: '',
    email: '',
    phone: null,
    address: '',
    driving_license: '',
    employer_name: '',
    employer_address: '',
    job_title: '',
    annual_salary: null,
    monthly_inhand_salary: null,
    bank_name: '',
    account_number: '',
    accout_type: '',
    status: 1,
    status_name: '',
    status_changed_by: '',
    read: false,
    assigned: false,
    customer_id: null,
    delete: false,
    modified_by: '',
    assigned_to: '',
    assigned_name:''
  }

  constructor(private applicationService: ApplicationService, private customerService: CustomerService, private customerHeaderService: CustomerHeaderService, private router: Router) { }

  ngOnInit() {
    this.customerHeaderService.checkAuthentication();
    if(localStorage.getItem('reload')) {
      localStorage.removeItem('reload')
      location.reload();
    }
  }

  submitApplication() {
    this.app.customer_id = JSON.parse(localStorage.getItem('user-info')).id;
    console.log(this.app.customer_id);
    this.app.dob = $('#dateOfBirth').val();
    if(
      this.app.first_name && this.app.last_name && this.app.dob && this.app.email && this.app.phone &&
      this.app.address && this.app.driving_license && this.app.employer_name && this.app.employer_address &&
      this.app.job_title && this.app.monthly_inhand_salary && this.app.annual_salary && this.app.bank_name &&
      this.app.account_number && this.app.accout_type && this.app.customer_id
      ) {
        console.log(this.app);
        if(Constants.REGEXP.test(this.app.email)) {
          Swal.fire({
            title: Constants.APP_WARNING_TITLE,
            text: Constants.APP_WARNING_MSG,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Verified!',
            cancelButtonText: 'Need changes'
          }).then((result) => {
            this.applicationService.createApplication(this.app).subscribe(
              (resp) => {
                Swal.fire({ type: 'success', title: Constants.APP_SUCCESS_TITLE, text: Constants.APP_SUCCESS_MSG })
                this.router.navigate(['/customer/dashboard']);
              },
              (err) => {
                this.customerHeaderService.unauthorize(err.status);
                console.log(err)
              }
            );
          })

        } else {
          Swal.fire({ type: 'error', title: Constants.ERROR_TITLE_MSG, text: Constants.ERROR_EMAIL_VALID })
        }

    } else {
      Swal.fire({ type: 'error', title: Constants.ERROR_TITLE_MSG, text: Constants.ERROR_ALL_FIELD_MSG })
    }
  }

}
