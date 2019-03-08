import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { EmployeeHeaderService } from '../../services/employee-header.service';
import { CustomerService } from '../../services/customer.service';
import { CustomerProfile } from '../../models/CustomerProfile';
import { Constants } from '../../Constants';

@Component({
  selector: 'app-customers-view',
  templateUrl: './customers-view.component.html',
  styleUrls: ['./customers-view.component.css']
})
export class CustomersViewComponent implements OnInit {

  c: CustomerProfile;
  currentId : number;

  constructor(private router: Router, private activeRoute : ActivatedRoute, private customerService: CustomerService, private employeeHeaderService: EmployeeHeaderService) { }

  ngOnInit() {
    this.employeeHeaderService.checkAuthentication();
    this.currentId = this.activeRoute.snapshot.params['id'];
    this.getCustomerById(this.currentId);
  }

  getCustomerById(custId) {
    this.customerService.getCustomerByIdEmp(custId).subscribe(
      (resp) => {
        this.c = resp;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
        console.log(err)
      }
    );
  }

  remove() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this customer?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remove',
      cancelButtonText: 'Keep it'
    }).then((result) => {
      this.customerService.remove(this.currentId).subscribe(
        (resp) => {
          this.router.navigate(['/emp/customers']);
        },
        (err) => {
          this.employeeHeaderService.unauthorize(err.status);
          console.log(err)
        }
      );
    })
  }

}
