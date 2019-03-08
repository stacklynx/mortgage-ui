import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
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

import { CustomerService } from './services/customer.service';
import { CustomerHeaderService } from './services/customer-header.service';
import { EmployeeService } from './services/employee.service';
import { EmployeeHeaderService } from './services/employee-header.service';
import { ApplicationService } from './services/application.service';
import { StatusService } from './services/status.service';
import { TaskService } from './services/task.service';
import { CommentService } from './services/comment.service';

@NgModule({
  declarations: [
    AppComponent,
    CustomerLoginComponent,
    CustomerForgotpasswordComponent,
    CustomerComponent,
    CustomerDashboardComponent,
    CustomerProfileComponent,
    CustomerApplicationComponent,
    CustomerApplicationViewComponent,
    EmpLoginComponent,
    EmpSignupComponent,
    EmpForgetpasswordComponent,
    EmpComponent,
    DashboardComponent,
    ProfileComponent,
    TaskComponent,
    CustomerSignupComponent,
    TasklistComponent,
    EmployeeDataComponent,
    CustomersComponent,
    EmployeeViewComponent,
    CustomersViewComponent,
    ApplicationDetailsComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CKEditorModule,
    NgbModule
  ],
  providers: [CustomerService, EmployeeService, CustomerHeaderService, EmployeeHeaderService, ApplicationService, StatusService, TaskService, CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
