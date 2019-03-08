import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrl } from '../baseUrl';
import { CustomerHeaderService } from './customer-header.service';
import { EmployeeHeaderService } from './employee-header.service';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private URL : string = BaseUrl.API_URL + 'user/';
  private URL_CTR : string = BaseUrl.API_URL_AUTH + 'user-ctr/';

  constructor(private http: HttpClient, private customerHeader: CustomerHeaderService, private employeeHeader : EmployeeHeaderService) { }

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
    var url = this.URL_CTR + '/login';
    return this.http.post(url, login, 
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        observe: 'response'
      }).map((res) => res);
  }

  getCustomerById(id) : Observable<any> {
    var url = this.URL + '/get/' + id;
    let headers: HttpHeaders = new HttpHeaders();
    headers = this.customerHeader.getHeader();
    return this.http.get(url, {headers});
  }

  getCustomerByIdEmp(id) : Observable<any> {
    var url = this.URL + '/get/' + id;
    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeader.getHeader();
    return this.http.get(url, {headers});
  }

  updateUserData(data) : Observable<any> {
    var url = this.URL + '/update';

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.customerHeader.getHeader();

    return this.http.put(url, data, {headers});
  }

  changePassword(id, data) : Observable<any> {
    var url = this.URL_CTR + 'change-password/' + id;

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.customerHeader.getHeader();

    return this.http.post(url, data, {headers});
  }

  findAllNonDeleted() :  Observable<any> {
    var url = this.URL + 'non-delete/all';

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeader.getHeader();
    
    return this.http.get(url, {headers});
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
