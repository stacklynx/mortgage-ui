import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrl } from '../baseUrl';
import { EmployeeHeaderService } from './employee-header.service';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private URL : string = BaseUrl.API_URL + 'task/';

  constructor(private http: HttpClient, private employeeHeader: EmployeeHeaderService) { }

  create(task) : Observable<any> {
    var url = this.URL + '/create';

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeader.getHeader();

    return this.http.post(url, task, {headers});
  }

  loadAllTask() : Observable<any> {
    var url = this.URL + '/all';

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeader.getHeader();

    return this.http.get(url, {headers});
  }

  getTaskEmpById(empId) : Observable<any> {
    var url = this.URL + '/all/emp/' + empId;

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeader.getHeader();

    return this.http.get(url, {headers});
  }

  changeStatus(id)  : Observable<any> {
    var url = this.URL + 'change/status/' + id;
    var task = {};

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeader.getHeader();

    return this.http.put(url, task, {headers});
  }
}
