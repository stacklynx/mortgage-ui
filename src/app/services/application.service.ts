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
export class ApplicationService {

  private URL: string = BaseUrl.API_URL + 'application/';

  constructor(private http: HttpClient, private customerHeader: CustomerHeaderService, private employeeHeaderService: EmployeeHeaderService) { }

  createApplication(data): Observable<any> {
    var url = this.URL + 'create';

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.customerHeader.getHeader();

    return this.http.post(url, data, {headers});
  }

  getAllApplication(id) : Observable<any> {
    var url = this.URL + 'all/customer/' + id;

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.customerHeader.getHeader();

    return this.http.get(url, {headers});
  }

  getApplicationById(id) : Observable<any> {
    var url = this.URL + 'get/' + id;

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.customerHeader.getHeader();

    return this.http.get(url, {headers});
  }

  getApplicationByIdEmp(id) : Observable<any> {
    var url = this.URL + 'get/' + id;

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeaderService.getHeader();

    return this.http.get(url, {headers});
  }

  getApplicationByEmpId(id) : Observable<any> {
    var url = this.URL + 'all/assigned/' + id;

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeaderService.getHeader();

    return this.http.get(url, {headers});
  }

  getAllNonDeletedApplication() : Observable<any> {
    var url = this.URL + 'non-deleted/all';
    
    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeaderService.getHeader();

    return this.http.get(url, {headers});
  }

  getByStatus(statusId) : Observable<any> {
    var url = this.URL + 'status/' + statusId;

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeaderService.getHeader();

    return this.http.get(url, {headers});
  }

  getApplicationsByStatusIdAndEmpId(statusId, empId) : Observable<any> {
    var url = this.URL + 'status/' + statusId + '/' + empId;

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeaderService.getHeader();

    return this.http.get(url, {headers});
  }

  assignTo(app)  : Observable<any> {
    var url = this.URL + 'assign/to';

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeaderService.getHeader();

    return this.http.put(url, app, {headers});
  }

  readRow(id) :  Observable<any> {
    var data = {};
    var url = this.URL + 'read/' + id;

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeaderService.getHeader();

    return this.http.put(url, data, {headers});
  }

  statusChanged(app) : Observable<any>  {
    var url = this.URL + 'change/status';

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeaderService.getHeader();

    return this.http.put(url, app, {headers});
  }

  search(app) : Observable<any>  {
    var url = this.URL + 'search';

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeaderService.getHeader();

    return this.http.post(url, app, {headers});
  }

  searchByEmpId(app) : Observable<any>  {
    var url = this.URL + 'search/empid';

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeaderService.getHeader();

    return this.http.post(url, app, {headers});
  }

}
