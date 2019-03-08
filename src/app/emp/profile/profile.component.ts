import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { EmployeeHeaderService } from '../../services/employee-header.service';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';
import { Constants } from '../../Constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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

  isDisabled: boolean = true;
  isPass: boolean = false;

  old_password: string = '';
  new_password: string = '';
  conf_password: string = '';

  constructor(private employeeService: EmployeeService, private employeeHeaderService: EmployeeHeaderService) { }

  ngOnInit() {
    this.employeeHeaderService.checkAuthentication();
    this.loadProfile();
  }

  loadProfile() {
    var id = JSON.parse(localStorage.getItem('info')).id;
    this.employeeService.getEmployeeById(id).subscribe(
      (resp) => {
        this.emp = resp;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
        console.log(err)
      }
    );
  }

  edit() {
    this.isDisabled = false;
  }

  update() {
    if (this.emp.first_name && this.emp.last_name && this.emp.gender) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update your profile?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Update it!',
        cancelButtonText: 'Keep it'
      }).then((result) => {

        this.employeeService.updateUserData(this.emp).subscribe(
          (resp) => {
            Swal.fire({ type: 'success', title: 'Successfully Updated!', text: '' })
            this.loadProfile();
            this.isDisabled = true;
            this.isPass = false;
          },
          (err) => {
            this.employeeHeaderService.unauthorize(err.status);
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
        this.employeeService.changePassword(this.emp.id, data).subscribe(
          (resp) => {
            Swal.fire({ type: 'success', title: 'Successfully Updated!', text: '' })
            this.loadProfile();
            this.isDisabled = true;
            this.isPass = false;
          },
          (err) => {
            this.employeeHeaderService.unauthorize(err.status);
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
