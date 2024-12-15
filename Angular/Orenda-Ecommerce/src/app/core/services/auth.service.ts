import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserUpdate } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _BASEURL: string = 'https://localhost:7227';

  constructor(private http: HttpClient) {}

  loginUser(email: string, password: string): Observable<any> {
    const url = `${this._BASEURL}/api/auth/signin`;

    const body = {
      email: email,
      password: password,
    };

    return this.http.post(url, body);
  }

  getInfo(): Observable<any> {
    const url = `${this._BASEURL}/api/app/account/get-account-bootstrap`;
    return this.http.get(url);
  }
  logoutUser(): Observable<any> {
    const url = `${this._BASEURL}/api/app/account/logout`;
    return this.http.post(url, {});
  }

  updateUser(body: UserUpdate): Observable<any> {
    const url = `${this._BASEURL}/api/app/account/update-account-info`;
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(url, body, { headers });
  }
}
