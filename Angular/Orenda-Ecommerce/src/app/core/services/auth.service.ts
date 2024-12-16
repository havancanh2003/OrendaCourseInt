import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { signupModel, User, UserUpdate } from '../models/user.model';

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
  forgotPassword(
    email: string,
    newPassword: string,
    confirmPassword: string
  ): Observable<any> {
    const url = `${this._BASEURL}/api/auth/forgot-password`;

    const body = {
      email: email,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    return this.http.post(url, body, { responseType: 'text' as 'json' });
  }
  confirmOTP(email: string, OTP: string): Observable<any> {
    const url = `${this._BASEURL}/api/auth/confirm-OTP`;

    const body = {
      email: email,
      otp: OTP,
    };

    return this.http.post(url, body);
  }
  signUp(body: signupModel): Observable<any> {
    const url = `${this._BASEURL}/api/auth/signup`;
    return this.http.post(url, body);
  }

  getInfo(): Observable<any> {
    const url = `${this._BASEURL}/api/app/account/get-account-bootstrap`;
    return this.http.get(url);
  }

  updateUser(body: UserUpdate): Observable<any> {
    const url = `${this._BASEURL}/api/app/account/update-account-info`;
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(url, body, { headers });
  }
}
