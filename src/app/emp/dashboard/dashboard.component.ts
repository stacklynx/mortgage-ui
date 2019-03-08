import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApplicationService } from '../../services/application.service';
import { EmployeeService } from '../../services/employee.service';
import { TaskService } from '../../services/task.service';
import { StatusService } from '../../services/status.service';
import { Application } from '../../models/Application';
import { CustomerService} from '../../services/customer.service';
import { EmployeeHeaderService } from '../../services/employee-header.service';
import { Employee } from '../../models/Employee';
import { Status } from '../../models/Status';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  empData;
  totalApplicationsCount : number = 0;
  totalInProgressApplicationCount : number = 0;
  totalCustomersCount : number = 0;
  totalEmployeeCount : number = 0;
  totalApplicationForEmployeeCount : number = 0;
  totalApplicationForEmployeeSearchCount : number = 0;
  totalTaskForEmployeeCount : number = 0;
  totalApprovedApplicationCount : number = 0;
  totalRejectedApplicationCount : number = 0;

  app : Application[];
  status : Status[];
  emp : Employee[];
  a: Application = {
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

  constructor(private router: Router, private applicationService : ApplicationService, private employeeService: EmployeeService, private employeeHeaderService: EmployeeHeaderService, private taskService: TaskService, private customerService : CustomerService, private statusService : StatusService) { }

  ngOnInit() {
    this.employeeHeaderService.checkAuthentication();
    if(localStorage.getItem('reload')) {
      localStorage.removeItem('reload');
      location.reload();
    }
    this.empData = JSON.parse(localStorage.getItem('info'));
    
    this.getAllStatus();
    this.getAllEmpoyee();

    if(this.empData.role == 1) {
      //Admin View
      this.totalApplications();
      this.totalCustomers();
      this.totalEmployee();
      this.totalInProgressApplication();
    } else {
      //Employee view
      this.totalApplicationForEmployee();
      this.totalTaskAssigned();
      this.totalApprovedApplicationByEmp();
      this.totalRejectedApplicationByEmp();    
    }    
  }

  getAllStatus() {
    this.statusService.getAllStatusEmp().subscribe(
      (resp) => {
        this.status = resp;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
      }
    );
  }

  getAllEmpoyee() {
    this.employeeService.getAllEmp().subscribe(
      (resp) => {
        this.emp = resp;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
      }
    );
  }

  totalApplications() {
    this.applicationService.getAllNonDeletedApplication().subscribe(
      (resp) => {
        this.totalApplicationsCount = resp.length;
        this.app = resp;
        // for(var i=0; i<this.status.length; i++) {
        //   for(var j=0; j<this.app.length; j++) {
        //     if(this.app[j].status == this.status[i].id) {
        //       this.app[j].status_name = this.status[i].name;
        //     }
        //   }
        // }

        // for(var i=0; i<this.app.length; i++) {
        //  if(this.emp) {
        //     for(var j=0; j<this.emp.length; j++) {
        //       if(this.app[i].assigned_to == this.emp[j].id) {
        //         this.app[i].assigned_to = this.emp[j].first_name + ' ' + this.emp[j].last_name;
        //       }
        //     }
        //   }
        // }

        console.log(this.app);
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
        console.log(err)
      }
    );
  }

  totalCustomers() {
    this.customerService.findAllNonDeleted().subscribe(
      (resp) => {
        this.totalCustomersCount = resp.length;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
        console.log(err)
      }
    );

  }

  totalEmployee() {
    this.employeeService.findAllNonDeleted().subscribe(
      (resp) => {
        this.totalEmployeeCount = resp.length;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
        console.log(err)
      }
    );
  }

  totalInProgressApplication() {
    this.applicationService.getByStatus(2).subscribe(
      (resp) => {
        this.totalInProgressApplicationCount = resp.length;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
        console.log(err)
      }
    );
  }

  totalApplicationForEmployee() {
    this.applicationService.getApplicationByEmpId(this.empData.id).subscribe(
      (resp) => {
        if(resp.length) {
          this.app = resp;
          this.totalApplicationForEmployeeCount = resp.length;
          this.totalApplicationForEmployeeSearchCount = resp.length;
          // for(var i=0; i<this.app.length; i++) {
          //   for(var j=0; j<this.status.length; j++) {
          //     if(this.app[i].status == this.status[j].id) {
          //       this.app[i].status_name = this.status[j].name;
          //     }
          //   }
          // }
        }
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
        console.log(err)
      }
    );
  }

  totalTaskAssigned() {
    this.taskService.getTaskEmpById(this.empData.id).subscribe(
      (resp) => {
        this.totalTaskForEmployeeCount = resp.length;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
        console.log(err)
      }
    );
  }

  totalApprovedApplicationByEmp() {
    this.applicationService.getApplicationsByStatusIdAndEmpId(3, this.empData.id).subscribe(
      (resp) => {
        this.totalApprovedApplicationCount = resp.length;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
        console.log(err)
      }
    );
  }

  totalRejectedApplicationByEmp() {
    this.applicationService.getApplicationsByStatusIdAndEmpId(4, this.empData.id).subscribe(
      (resp) => {
        this.totalRejectedApplicationCount = resp.length;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
        console.log(err)
      }
    );
  }

  viewApplication(app) {
    this.applicationService.readRow(app.id).subscribe(
      (resp) => {
        this.router.navigate(['/emp/application/' + app.id]);
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
        console.log(err)
      }
    );
  }

  search() {
    if(this.a.first_name || this.a.last_name || this.a.email || this.a.phone) {
      this.applicationService.search(this.a).subscribe(
        (resp) => {
          this.app = resp;
          // for(var i=0; i<this.status.length; i++) {
          //   for(var j=0; j<this.app.length; j++) {
          //     if(this.app[j].status == this.status[i].id) {
          //       this.app[j].status_name = this.status[i].name;
          //     }
          //   }
          // }
  
          // for(var i=0; i<this.app.length; i++) {
          //  if(this.emp) {
          //     for(var j=0; j<this.emp.length; j++) {
          //       if(this.app[i].assigned_to == this.emp[j].id) {
          //         this.app[i].assigned_to = this.emp[j].first_name + ' ' + this.emp[j].last_name;
          //       }
          //     }
          //   }
          // }
        },
        (err) => {
          this.employeeHeaderService.unauthorize(err.status);
          console.log(err)
        }
      );
    } else {
      this.ngOnInit();
    }
  }

  searchByEmpId() {
    if(this.a.first_name || this.a.last_name || this.a.email || this.a.phone) {
      this.a.assigned_to = this.empData.id;
      this.applicationService.searchByEmpId(this.a).subscribe(
        (resp) => {
          if(resp.length) {
            this.app = resp;
            this.totalApplicationForEmployeeSearchCount = resp.length;
            // for(var i=0; i<this.app.length; i++) {
            //   for(var j=0; j<this.status.length; j++) {
            //     if(this.app[i].status == this.status[j].id) {
            //       this.app[i].status_name = this.status[j].name;
            //     }
            //   }
            // }
          } else {
            this.totalApplicationForEmployeeSearchCount = 0;
          }
        },
        (err) => {
          this.employeeHeaderService.unauthorize(err.status);
          console.log(err)
        }
      );
    } else {
      this.ngOnInit();
    }
  }

  clear() {
    this.a.first_name = '';
    this.a.last_name = '';
    this.a.email = '';
    this.a.phone = null;
    this.ngOnInit();
  }

}
