import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { EmployeeHeaderService } from '../../services/employee-header.service';
import { CustomerService } from '../../services/customer.service';
import { CustomerProfile } from '../../models/CustomerProfile';
import { Constants } from '../../Constants';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  private customerList : CustomerProfile[];
  private cust : CustomerProfile = {
    id: '',
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
    password: '',
    created_by: '',
    modified_by: '',
    is_delete : false
  }

  constructor(private router: Router, private customerService: CustomerService, private employeeHeaderService: EmployeeHeaderService) { }

  ngOnInit() {
    this.employeeHeaderService.checkAuthentication();
    this.loadCustomerList();
  }

  loadCustomerList() {
    this.customerService.findAllNonDeleted().subscribe(
      (resp) => {
        this.customerList = resp;
      },
      (err) => {
        this.employeeHeaderService.unauthorize(err.status);
        console.log(err)
      }
    );
  }

  viewCustomer(c) {
    this.router.navigate(['/emp/customers/' + c.id]);
  }

  search() {
    if(this.cust.first_name || this.cust.last_name || this.cust.email) {
      this.customerService.search(this.cust).subscribe(
        (resp) => {
          this.customerList = resp;
        },
        (err) => {
          this.employeeHeaderService.unauthorize(err.status);
          console.log(err)
        }
      );
    } else {
      this.loadCustomerList();
    }
  }

  clear() {
    this.cust.first_name = '';
    this.cust.last_name = '';
    this.cust.email = '';
    this.loadCustomerList();
  }

}
