import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { CustomerHeaderService } from '../../services/customer-header.service';
import { CustomerService } from '../../services/customer.service';
import { EmployeeService } from '../../services/employee.service';
import { StatusService } from '../../services/status.service';
import { ApplicationService } from '../../services/application.service';
import { CommentService } from '../../services/comment.service';
import { Application } from '../../models/Application';
import { Status } from '../../models/Status';
import { Constants } from '../../Constants';
import { Comment } from '../../models/Comment';
import { Employee } from '../../models/Employee';

@Component({
  selector: 'app-customer-application-view',
  templateUrl: './customer-application-view.component.html',
  styleUrls: ['./customer-application-view.component.css']
})
export class CustomerApplicationViewComponent implements OnInit {

  app : Application;
  paramId : number;
  commentList : Comment[];
  employeeAllList: Employee[];
  commentSize : number = 0;

  constructor(private applicationService: ApplicationService, private employeeService: EmployeeService, private activeRoute : ActivatedRoute, private statusService: StatusService, private customerService: CustomerService, private customerHeaderService: CustomerHeaderService, private router: Router, private commentService: CommentService) { }

  ngOnInit() {
    console.clear();
    this.customerHeaderService.checkAuthentication();
    this.paramId = this.activeRoute.snapshot.params['id'];
    this.getApplicationById(this.paramId);
    this.getAllEmployee();
    this.getCommentList();
    console.clear();
  }

  getApplicationById(id) {
    this.applicationService.getApplicationById(id).subscribe(
      (resp) => {
        this.app = resp;
        this.getStatusById();
        console.clear();
      },
      (err) => {
        this.customerHeaderService.unauthorize(err.status);
      }
    );
  }

  getStatusById() {
    this.statusService.getStatusById(this.app.status).subscribe(
      (resp) => {
        this.app.status_name = resp.name;
        console.clear();
      },
      (err) => {
        this.customerHeaderService.unauthorize(err.status);
      }
    );
  }

  getAllEmployee() {
    this.employeeService.getAllEmpCust().subscribe(
      (resp) => {
        this.employeeAllList = resp;
        console.clear();
      },
      (err) => {
        this.customerHeaderService.unauthorize(err.status);
      }
    );
  }

  getCommentList() {
    this.commentService.getAllComment(this.paramId).subscribe(
      (resp) => {
        this.commentList = resp;
        this.commentSize = this.commentList.length;
        for(let i=0; i<this.commentList.length; i++) {
          for(let j=0; j<this.employeeAllList.length; j++) {
            if(this.commentList[i].employee_id == Number(this.employeeAllList[j].id)) {
              this.commentList[i].employee_name = this.employeeAllList[j].first_name + ' ' + this.employeeAllList[j].last_name;
            }
          }
        }
        console.clear();
      },
      (err) => {
        this.customerHeaderService.unauthorize(err.status);
      }
    );
  }

}
