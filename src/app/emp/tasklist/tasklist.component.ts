import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import $ from 'jquery';

import { Task } from '../../models/Task';
import { EmployeeHeaderService } from '../../services/employee-header.service';
import { TaskService } from '../../services/task.service';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';
import { Constants } from '../../Constants';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  private employeeList: Employee[];
  private taskList : Task[];

  constructor(private router: Router, private employeeHeaderService: EmployeeHeaderService, private taskService: TaskService, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeHeaderService.checkAuthentication();
    $('#taskList').addClass('active');
    $('#dasbordTask').removeClass('active');
    this.getAllTask();
  }

  getAllTask() {
    this.taskService.loadAllTask().subscribe(
      (resp) => {
        this.taskList = resp;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
        console.log(err)
      })
  }

  createTask() {
    localStorage.setItem('reload', 'reload');
    this.router.navigate(['/emp/task-create']);
  }

  changeStatus(id) {
    this.taskService.changeStatus(id).subscribe(
      (resp) => {
        location.reload();
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
        console.log(err)
      })
  }

}
