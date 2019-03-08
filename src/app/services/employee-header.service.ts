import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeHeaderService {

  constructor(private router: Router) { }

  getHeader(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();

    headers = headers.append('x-token', localStorage.getItem('x-token'));
    headers = headers.append('info', JSON.parse(localStorage.getItem('info')).email);

    return headers;
  }

  removeData() {
    localStorage.removeItem('x-token');
    localStorage.removeItem('info');
  }

  checkAuthentication() {
    if(!localStorage.getItem('x-token') && !localStorage.getItem('info')) {
      this.router.navigate(['/emp-login']);
    }
  }

  unauthorize(status) {
    if(status == '401') {
      this.router.navigate(['/emp-login']);
    }
  }
}
