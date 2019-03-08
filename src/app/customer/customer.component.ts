import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerHeaderService } from '../services/customer-header.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  dasboardActiveClass : number = 0;
  profileActiveClass : number = 0;

  constructor(private router: Router, private customerHeaderService : CustomerHeaderService) { }

  ngOnInit() {
    this.customerHeaderService.checkAuthentication();
    this.dasboardActiveClass = 1; 
  }

  logOut() {
    this.customerHeaderService.removeData();
    localStorage.setItem('reload', 'reload');
    this.router.navigate(['/login']);
  }

  navDashborad() {
    this.dasboardActiveClass = 1;
    this.profileActiveClass = 0;
  }

  navProfile() {
    this.profileActiveClass = 1;
    this.dasboardActiveClass = 0;
  }

}
