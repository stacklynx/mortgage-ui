import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrl } from '../baseUrl';
import { EmployeeHeaderService } from './employee-header.service';
import { CustomerHeaderService } from './customer-header.service';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private URL : string = BaseUrl.API_URL + 'employee/';
  private URL_CTR : string = BaseUrl.API_URL_AUTH + 'employee-ctr/';

  constructor(private http: HttpClient, private employeeHeader: EmployeeHeaderService, private customerHeaderService : CustomerHeaderService) { }

  checkEmail(email) : Observable<any> {
    var url = this.URL_CTR + 'check-email/' + email;
    return this.http.get(url);
  }

  forgotPassword(email) : Observable<any> {
    var url = this.URL_CTR + 'forgot-password/' + email;
    return this.http.get(url);
  }

  register(data) : Observable<any> {
    var url = this.URL + '/create';
    return this.http.post(url, data);
  }

  login(login) : Observable<any> {
    var url = this.URL_CTR + 'login';
    return this.http.post(url, login, 
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        observe: 'response'
      }).map((res) => res);
  }

  getEmployeeById(id) : Observable<any> {
    var url = this.URL + 'get/' + id;
    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeader.getHeader();
    return this.http.get(url, {headers});
  }

  getAllEmp() :  Observable<any> {
    var url = this.URL + 'all';
    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeader.getHeader();
    return this.http.get(url, {headers});
  }

  getAllEmpCust() :  Observable<any> {
    var url = this.URL + 'all';
    let headers: HttpHeaders = new HttpHeaders();
    headers = this.customerHeaderService.getHeader();
    return this.http.get(url, {headers});
  }

  findAllNonDeleted() :  Observable<any> {
    var url = this.URL + 'non-delete/all';
    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeader.getHeader();
    return this.http.get(url, {headers});
  }

  updateUserData(data) : Observable<any> {
    var url = this.URL + 'update';

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeader.getHeader();

    return this.http.put(url, data, {headers});
  }

  changePassword(id, data) : Observable<any> {
    var url = this.URL_CTR + 'change-password/' + id;

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeader.getHeader();

    return this.http.post(url, data, {headers});
  }

  changeRole(id, role) :  Observable<any> {
    var url = this.URL + 'change-role/' + id + '/' + role;

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeader.getHeader();

    return this.http.put(url, {headers});
  }

  remove(id) :  Observable<any> {
    var url = this.URL + 'remove/' + id;

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeader.getHeader();

    return this.http.delete(url, {headers});
  }

  search(emp) : Observable<any> {
    var url = this.URL + 'search';

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeader.getHeader();

    return this.http.post(url, emp, {headers});
  }
}
