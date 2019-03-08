import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery';

import { ApplicationService } from '../../services/application.service';
import { EmployeeService } from '../../services/employee.service';
import { TaskService } from '../../services/task.service';
import { StatusService } from '../../services/status.service';
import { CommentService } from '../../services/comment.service';
import { Application } from '../../models/Application';
import { CustomerService } from '../../services/customer.service';
import { EmployeeHeaderService } from '../../services/employee-header.service';
import { Employee } from '../../models/Employee';
import { Status } from '../../models/Status';
import { Comment } from '../../models/Comment';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit {

  app: Application;
  empData;
  closeResult: string;
  employeeList: Employee[];
  employeeAllList: Employee[];
  selectedEmp: number;
  statusList: Status[];
  selectedStatus : number;
  commentList : Comment[];
  commentText: string;
  paramId: number;
  com : Comment =  {
    id : null,
    comment : null,
    application_id : null, 
    employee_id : null,
    employee_name : null,
    created_on : null,
    delete : false
}

  constructor(private modalService: NgbModal, private router: Router, private activeRoute: ActivatedRoute, private applicationService: ApplicationService, private employeeService: EmployeeService, private employeeHeaderService: EmployeeHeaderService, private taskService: TaskService, private customerService: CustomerService, private statusService: StatusService, private commentService: CommentService) { }

  ngOnInit() {
    this.employeeHeaderService.checkAuthentication();
    this.empData = JSON.parse(localStorage.getItem('info'));
    this.paramId = this.activeRoute.snapshot.params['id'];
    this.getApplicationById(this.paramId);
    this.getEmployee();
    this.getAllEmployee();
    this.getStatus();
    this.getCommentList();
  }

  getStatus() {
    this.statusService.getAllStatusEmp().subscribe(
      (resp) => {
        this.statusList = resp;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
      })
  }

  getApplicationById(id) {
    this.applicationService.getApplicationByIdEmp(id).subscribe(
      (resp) => {
        this.app = resp;
        this.getStatusById();
        if (this.app.assigned) {
          this.getAssignTo();
        }
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
      }
    );
  }

  getAssignTo() {
    this.employeeService.getEmployeeById(this.app.assigned_to).subscribe(
      (resp) => {
        this.app.assigned_name = resp.first_name + ' ' + resp.last_name;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
      })
  }

  getEmployee() {
    this.employeeService.findAllNonDeleted().subscribe(
      (resp) => {
        this.employeeList = resp;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
      }
    );
  }

  getAllEmployee() {
    this.employeeService.getAllEmp().subscribe(
      (resp) => {
        this.employeeAllList = resp;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
      }
    );
  }

  getStatusById() {
    this.statusService.getStatusByIdEmp(this.app.status).subscribe(
      (resp) => {
        this.app.status_name = resp.name;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
      }
    );
  }

  viewCustomer() {
    this.router.navigate(['/emp/customers/' + this.app.customer_id]);
  }

  saveData() {
    if (this.selectedEmp) {
      this.app.read = false;
      this.app.assigned_to = this.selectedEmp + '';
      this.applicationService.assignTo(this.app).subscribe(
        (resp) => {
          location.reload();
        },
        (err) => {
          this.employeeHeaderService.unauthorize(err.status);
        }
      );
    }
  }

  saveStatus() {
    if(this.selectedStatus) {
      this.app.status = this.selectedStatus;
      this.app.status_changed_by = this.empData.id;
      this.applicationService.statusChanged(this.app).subscribe(
        (resp) => {
          location.reload();
        },
        (err) => {
          this.employeeHeaderService.unauthorize(err.status);
        }
      );
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  openStatus(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  getCommentList() {
    this.commentService.getAllCommentEmp(this.paramId).subscribe(
      (resp) => {
        this.commentList = resp;
        for(let i=0; i<this.commentList.length; i++) {
          for(let j=0; j<this.employeeAllList.length; j++) {
            if(this.commentList[i].employee_id == Number(this.employeeAllList[j].id)) {
              this.commentList[i].employee_name = this.employeeAllList[j].first_name + ' ' + this.employeeAllList[j].last_name;
            }
          }
        }
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
      }
    );
  }

  saveCommet() {
    if(this.com.comment) {
      this.com.application_id = this.paramId;
      this.com.employee_id = Number(this.empData.id);

      this.commentService.create(this.com).subscribe(
        (resp) => {
          this.com.comment = '';
          this.getCommentList();
        },
        (err) => {
          this.employeeHeaderService.unauthorize(err.status);
        }
      );

    }
  }
}
