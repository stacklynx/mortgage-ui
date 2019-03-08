import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { CustomerHeaderService } from '../../services/customer-header.service';
import { CustomerService } from '../../services/customer.service';
import { CustomerProfile } from '../../models/CustomerProfile';
import { Constants } from '../../Constants';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

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

  isDisabled: boolean = true;
  isPass: boolean = false;

  old_password: string = '';
  new_password: string = '';
  conf_password: string = '';

  constructor(private customerService: CustomerService, private customerHeaderService: CustomerHeaderService) { }

  ngOnInit() {
    this.customerHeaderService.checkAuthentication();
    this.loadProfile();
  }

  loadProfile() {
    var id = JSON.parse(localStorage.getItem('user-info')).id;
    this.customerService.getCustomerById(id).subscribe(
      (resp) => {
        this.customer = resp;
      },
      (err) => {
        this.customerHeaderService.unauthorize(err.status);
        console.log(err)
      }
    );
  }

  edit() {
    this.isDisabled = false;
  }

  update() {
    if (this.customer.first_name && this.customer.last_name && this.customer.gender) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update your profile?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Update it!',
        cancelButtonText: 'Keep it'
      }).then((result) => {

        this.customerService.updateUserData(this.customer).subscribe(
          (resp) => {
            Swal.fire({ type: 'success', title: 'Successfully Updated!', text: '' })
            this.loadProfile();
            this.isDisabled = true;
            this.isPass = false;
          },
          (err) => {
            this.customerHeaderService.unauthorize(err.status);
            console.log(err);
          }
        );
      })
    } else {
      Swal.fire({ type: 'error', title: Constants.ERROR_TITLE_MSG, text: Constants.ERROR_ALL_FIELD_MSG })
    }
  }

  cancel() {
    this.isDisabled = true;
    this.isPass = false;
    this.loadProfile();
  }

  passwordEdit() {
    this.isPass = true;
  }

  cancelPwd() {
    this.isPass = false;
  }

  updatePwd() {
    if (this.old_password && this.new_password && this.conf_password) {
      if (this.new_password == this.conf_password) {
        let data = {
          oldPassword: this.old_password,
          newPassword: this.new_password
        }
        this.customerService.changePassword(this.customer.id, data).subscribe(
          (resp) => {
            Swal.fire({ type: 'success', title: 'Successfully Updated!', text: '' })
            this.loadProfile();
            this.isDisabled = true;
            this.isPass = false;
          },
          (err) => {
            this.customerHeaderService.unauthorize(err.status);
            Swal.fire({ type: 'error', title: Constants.ERROR_TITLE_MSG, text: err.error.message })
          }
        );
      } else {
        Swal.fire({ type: 'error', title: Constants.ERROR_TITLE_MSG, text: Constants.ERROR_PWD_MSG })
      }
    } else {
      Swal.fire({ type: 'error', title: Constants.ERROR_TITLE_MSG, text: Constants.ERROR_ALL_FIELD_MSG })
    }
  }

}
