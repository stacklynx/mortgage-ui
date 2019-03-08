import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { CustomerHeaderService } from '../../services/customer-header.service';
import { CustomerService } from '../../services/customer.service';
import { StatusService } from '../../services/status.service';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/Application';
import { Status } from '../../models/Status';
import { Constants } from '../../Constants';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  app : Application[];
  appSize : number = 0;
  status : Status[];
  customerId : number;
  statusSize : number = 0;

  constructor(private applicationService: ApplicationService, private statusService: StatusService, private customerService: CustomerService, private customerHeaderService: CustomerHeaderService, private router: Router) { }

  ngOnInit() {
    this.customerHeaderService.checkAuthentication();
    this.customerId = JSON.parse(localStorage.getItem('user-info')).id;
    this.getAllStatus();
    this.getAllApplications();
  }

  getAllStatus() {
    this.statusService.getAllStatus().subscribe(
      (resp) => {
        this.status = resp;

      },
      (err) => {
        this.customerHeaderService.unauthorize(err.status);
      }
    );
  }

  getAllApplications() {
    this.applicationService.getAllApplication(this.customerId).subscribe(
      (resp) => {
        this.app = resp;
        this.appSize  = this.app.length;
        console.clear();
        // this.statusSize = this.app.length;
        // for(var i=0; i<this.statusSize; i++) {
        //   for(var j=0; j<this.appSize; j++) {
        //     if(this.app[j].status == this.status[i].id) {
        //       this.app[j].status_name = this.status[i].name;
        //     }
        //   }
        // }
      },
      (err) => {
        this.customerHeaderService.unauthorize(err.status);
      }
    );
  }

  viewApplication(application) {
    this.router.navigate(['/customer/view/' + application.id]);
  }

  applicationApply() {
    localStorage.setItem('reload', 'reload');
    this.router.navigate(['/customer/application']);
  }

}
