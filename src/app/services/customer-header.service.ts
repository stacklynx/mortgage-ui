import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerHeaderService {

  constructor(private router: Router) { }

  getHeader(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();

    headers = headers.append('x-token', localStorage.getItem('user-token'));
    headers = headers.append('info', JSON.parse(localStorage.getItem('user-info')).email);

    return headers;
  }

  removeData() {
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-info');
  }

  checkAuthentication() {
    if(!localStorage.getItem('user-token') && !localStorage.getItem('user-info')) {
      this.router.navigate(['/login']);
    }
  }

  unauthorize(status) {
    if(status == '401') {
      this.router.navigate(['/login']);
    }
  }
}
