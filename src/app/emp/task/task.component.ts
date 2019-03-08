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
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  private task: Task = {
    id: null,
    read: false,
    assign_to: null,
    task_date: null,
    task_description: null,
    application_id: null,
    created_by: null,
    modified_by: null,
    delete: false,
    assign_fname : null,
    assign_lname : null,
    assign_by_fname : null,
    assign_by_lname : null,
    status : null
  }
  private employeeList: Employee[];
  private currentLogedInEmp: number;

  ckeditorContent: string = '';

  constructor(private employeeHeaderService: EmployeeHeaderService, private taskService: TaskService, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.employeeHeaderService.checkAuthentication();
    if(localStorage.getItem('reload')) {
      localStorage.removeItem('reload');
      location.reload();
    }
    $('#taskList').addClass('active');
    $('#dasbordTask').removeClass('active');
    
    this.currentLogedInEmp = JSON.parse(localStorage.getItem("info")).id;
    this.loadAllEmployee();
  }

  loadAllEmployee() {
    this.employeeService.getAllEmp().subscribe(
      (resp) => {
        this.employeeList = resp;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
        console.log(err)
      }
    );
  }

  saveTask() {
    this.task.task_description = this.ckeditorContent;
    this.task.task_date = $('#taskDate').val();
    this.task.created_by = this.currentLogedInEmp+'';
    this.task.modified_by = this.currentLogedInEmp+'';

    if(this.task.task_description && this.task.task_date && this.task.assign_to) {
      this.taskService.create(this.task).subscribe(
        (resp) => {
          Swal.fire({ type: 'success', title: Constants.TASK_SUCCESS_TITLE, text: Constants.TASK_SUCCESS_MSG });
          $('#task').removeClass('active');
          $('#taskList').addClass('active');
          this.router.navigate(['/emp/task-list']);
        },
        (err) => {
          this.employeeHeaderService.unauthorize(err.status);
          console.log(err)
        }
      );
    } else {
      Swal.fire({ type: 'error', title: Constants.ERROR_TITLE_MSG, text: Constants.ERROR_ALL_FIELD_MSG })
    }
  }

}
