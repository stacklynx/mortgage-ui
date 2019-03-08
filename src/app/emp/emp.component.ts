import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeHeaderService } from '../services/employee-header.service';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class EmpComponent implements OnInit {

  dasboardActiveClass : number = 0;
  profileActiveClass : number = 0;
  taskActiveClass : number = 0;
  taskListActiveClass : number = 0;
  empListActiveClass : number = 0;
  custActiveClass : number = 0;
  empData;

  constructor(private router: Router, private employeeHeaderService : EmployeeHeaderService) { }

  ngOnInit() {
    this.employeeHeaderService.checkAuthentication();
    this.empData = JSON.parse(localStorage.getItem('info'));
    if(localStorage.getItem('reload')) {
      this.taskActiveClass = 1;
    } else {
      this.dasboardActiveClass = 1;
    }
  }

  logOut() {
    this.employeeHeaderService.removeData();
    localStorage.setItem('reload', 'reload');
    this.router.navigate(['/emp-login']);
  }

  navDashborad() {
    this.dasboardActiveClass = 1;
    this.profileActiveClass = 0;
    this.taskActiveClass = 0;
    this.taskListActiveClass = 0;
    this.empListActiveClass = 0;
    this.custActiveClass = 0;
  }

  navProfile() {
    this.profileActiveClass = 1;
    this.dasboardActiveClass = 0;
    this.taskActiveClass = 0;
    this.taskListActiveClass = 0;
    this.empListActiveClass = 0;
    this.custActiveClass = 0;
  }

  // navTask() {
  //   localStorage.setItem('reload', 'reload');
  //   window.location.href="/emp/task";
  //   this.profileActiveClass = 0;
  //   this.dasboardActiveClass = 0;
  //   this.taskActiveClass = 1;
  //   this.taskListActiveClass = 0;
  //   this.empListActiveClass = 0;
  //   this.custActiveClass = 0;
  // }

  navTaskList() {
    this.profileActiveClass = 0;
    this.dasboardActiveClass = 0;
    this.taskActiveClass = 0;
    this.taskListActiveClass = 1;
    this.empListActiveClass = 0;
    this.custActiveClass = 0;
  }

  navEmp() {
    this.profileActiveClass = 0;
    this.dasboardActiveClass = 0;
    this.taskActiveClass = 0;
    this.taskListActiveClass = 0;
    this.empListActiveClass = 1;
    this.custActiveClass = 0;
  }

  navCust() {
    this.profileActiveClass = 0;
    this.dasboardActiveClass = 0;
    this.taskActiveClass = 0;
    this.taskListActiveClass = 0;
    this.empListActiveClass = 0;
    this.custActiveClass = 1;
  }

}
