import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { EmployeeHeaderService } from '../../services/employee-header.service';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';
import { Constants } from '../../Constants';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.css']
})
export class EmployeeDataComponent implements OnInit {

  private employeeList : Employee[];
  private emp : Employee = {
    id: '',
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
    password: '',
    created_by: '',
    modified_by: '',
    delete: false,
    role: null
  }

  constructor(private router: Router, private employeeService: EmployeeService, private employeeHeaderService: EmployeeHeaderService) { }

  ngOnInit() {
    this.employeeHeaderService.checkAuthentication();
    this.loadEmployeeList();
  }

  loadEmployeeList() {
    this.employeeService.findAllNonDeleted().subscribe(
      (resp) => {
        this.employeeList = resp;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
        console.log(err)
      }
    );
  }

  viewEmp(emp) {
    this.router.navigate(['/emp/emp-view/' + emp.id]);
  }

  search() {
    if(this.emp.first_name || this.emp.last_name || this.emp.email) {
      this.employeeService.search(this.emp).subscribe(
        (resp) => {
          this.employeeList = resp;
        },
        (err) => {
          this.employeeHeaderService.unauthorize(err.status);
          console.log(err)
        }
      );
    } else {
      this.loadEmployeeList();
    }
  }

  clear() {
    this.emp.first_name = '';
    this.emp.last_name = '';
    this.emp.email = '';
    this.loadEmployeeList();
  }

}
