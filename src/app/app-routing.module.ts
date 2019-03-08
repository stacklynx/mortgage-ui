import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CustomerComponent } from './customer/customer.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerSignupComponent } from './customer-signup/customer-signup.component';
import { CustomerForgotpasswordComponent } from './customer-forgotpassword/customer-forgotpassword.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { CustomerProfileComponent } from './customer/customer-profile/customer-profile.component';
import { CustomerApplicationComponent } from './customer/customer-application/customer-application.component';
import { CustomerApplicationViewComponent } from './customer/customer-application-view/customer-application-view.component';
import { EmpLoginComponent } from './emp-login/emp-login.component';
import { EmpSignupComponent } from './emp-signup/emp-signup.component';
import { EmpForgetpasswordComponent } from './emp-forgetpassword/emp-forgetpassword.component';
import { EmpComponent } from './emp/emp.component';
import { DashboardComponent } from './emp/dashboard/dashboard.component';
import { ProfileComponent } from './emp/profile/profile.component';
import { TaskComponent } from './emp/task/task.component';
import { TasklistComponent } from './emp/tasklist/tasklist.component';
import { EmployeeDataComponent } from './emp/employee-data/employee-data.component';
import { CustomersComponent } from './emp/customers/customers.component';
import { EmployeeViewComponent } from './emp/employee-view/employee-view.component';
import { CustomersViewComponent } from './emp/customers-view/customers-view.component';
import { ApplicationDetailsComponent } from './emp/application-details/application-details.component';

const routes : Routes = [
  {path: '', redirectTo:'/login', pathMatch: 'full'},
  {path: 'login', component: CustomerLoginComponent},
  {path: 'signup', component: CustomerSignupComponent},
  {path: 'forgot-password', component: CustomerForgotpasswordComponent},
  {
    path: 'customer',
    component : CustomerComponent,
    children : [
      {path: 'dashboard', component: CustomerDashboardComponent},
      {path: 'application', component: CustomerApplicationComponent},
      {path: 'view/:id', component: CustomerApplicationViewComponent},
      {path: 'profile', component: CustomerProfileComponent}
    ]
  },
  {path: 'emp-login', component: EmpLoginComponent},
  {path: 'emp-signup', component: EmpSignupComponent},
  {path: 'emp-forgot-password', component: EmpForgetpasswordComponent},
  {
    path: 'emp',
    component : EmpComponent,
    children : [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'application/:id', component: ApplicationDetailsComponent},
      {path: 'emp-list', component: EmployeeDataComponent},
      {path: 'emp-view/:id', component: EmployeeViewComponent},
      {path: 'customers', component: CustomersComponent},
      {path: 'customers/:id', component: CustomersViewComponent},
      {path: 'task-create', component: TaskComponent},
      {path: 'task-list', component: TasklistComponent},
      {path: 'profile', component: ProfileComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
