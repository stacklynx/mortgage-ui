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
export class CommentService {

  private URL: string = BaseUrl.API_URL + 'comment/';

  constructor(private http: HttpClient, private customerHeader: CustomerHeaderService, private employeeHeaderService: EmployeeHeaderService) { }

  getAllCommentEmp(id) : Observable<any> {
    var url = this.URL + 'get/comment/application/' + id;

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeaderService.getHeader();

    return this.http.get(url, {headers});
  }

  getAllComment(id) : Observable<any> {
    var url = this.URL + 'get/comment/application/' + id;

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.customerHeader.getHeader();

    return this.http.get(url, {headers});
  }

  create(comment) : Observable<any>{
    var url = this.URL + 'create';

    let headers: HttpHeaders = new HttpHeaders();
    headers = this.employeeHeaderService.getHeader();

    return this.http.post(url, comment, {headers});
  }

}
