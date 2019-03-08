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
export class StatusService {

  private URL: string = BaseUrl.API_URL + 'status/';

  constructor(private http: HttpClient, private customerHeader: CustomerHeaderService, private employeeHeaderService: EmployeeHeaderService) { }

  getAllStatus() : Observable<any> {
    var url = this.URL + 'all';

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.customerHeader.getHeader();

    return this.http.get(url, {headers});
  }

  getAllStatusEmp() : Observable<any> {
    var url = this.URL + 'all';
    
    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeaderService.getHeader();

    return this.http.get(url, {headers});
  }

  getStatusById(id) : Observable<any> {
    var url = this.URL + 'get/' + id;

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.customerHeader.getHeader();

    return this.http.get(url, {headers});
  }

  getStatusByIdEmp(id) : Observable<any> {
    var url = this.URL + 'get/' + id;

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeaderService.getHeader();

    return this.http.get(url, {headers});
  }
}
