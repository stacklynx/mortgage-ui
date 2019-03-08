import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { EmployeeHeaderService } from '../../services/employee-header.service';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';
import { Constants } from '../../Constants';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {

  emp: Employee;
  currentId : number;

  constructor(private router: Router, private activeRoute : ActivatedRoute, private employeeService: EmployeeService, private employeeHeaderService: EmployeeHeaderService) { }

  ngOnInit() {
    this.employeeHeaderService.checkAuthentication();
    this.currentId = this.activeRoute.snapshot.params['id'];
    this.getEmployeeById(this.currentId);
  }

  getEmployeeById(empId) {
    this.employeeService.getEmployeeById(empId).subscribe(
      (resp) => {
        this.emp = resp;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
        console.log(err)
      }
    );
  }

  changeRole() {
    if(this.emp.role == 1) {
      this.emp.role = 0;
    } else {
      this.emp.role = 1;
    }

    this.employeeService.changeRole(this.currentId, this.emp.role).subscribe(
      (resp) => {
        this.ngOnInit();
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
        this.ngOnInit();
        console.log(err)
      }
    );
  }

  remove() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this employee?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remove',
      cancelButtonText: 'Keep it'
    }).then((result) => {
      this.employeeService.remove(this.currentId).subscribe(
        (resp) => {
          this.router.navigate(['/emp/emp-list']);
        },
        (err) => {
          this.employeeHeaderService.unauthorize(err.status);
          console.log(err)
        }
      );
    })
  }

}
