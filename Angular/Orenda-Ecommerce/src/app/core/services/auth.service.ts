import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserUpdate } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _BASEURL: string = 'http://test.nghiencuukhoahoc.com.vn';

  constructor(private http: HttpClient) {}

  loginUser(username: string, password: string): Observable<any> {
    const url = `${this._BASEURL}/api/app/account/login`;
    const body = new HttpParams()
      .set('userName', username)
      .set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(url, body.toString(), { headers });
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
    return this.http.post(url, body);
  }
}
