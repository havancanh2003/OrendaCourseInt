import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

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

  updateUser(u: User): Observable<any> {
    const url = `${this._BASEURL}/api/app/account/update-account-info`;
    const body = {
      userId: u.id,
      avatarDocumentId: null,
      email: u.email,
      phoneNumber: u.phoneNumber,
      name: u.fullName,
      ngaySinh: u.birthDay,
      gioiTinh: u.gender,
      diaChi: null,
      maTinh: null,
      maHuyen: null,
      maXa: null,
    };
    return this.http.post(url, body);
  }

  // private users = [
  //   { username: 'admin', password: '123', role: 'Admin' },
  //   { username: 'user', password: '123', role: 'User' },
  // ];
  // private sessionTimeout: any;
  // private readonly SESSION_KEY = 'authSession';
  // private readonly EXPIRY_KEY = 'authExpiry';
  // login(username: string, password: string): boolean {
  //   const user = this.users.find(
  //     (u) => u.username === username && u.password === password
  //   );
  //   if (user) {
  //     const expiryTime = new Date().getTime() + 5000; //Thời gian hết hạn: 2 phút từ hiện tại
  //     localStorage.setItem(this.SESSION_KEY, JSON.stringify({ username }));
  //     localStorage.setItem(this.EXPIRY_KEY, expiryTime.toString());
  //     this.startSessionTimer(expiryTime);
  //     return true;
  //   }
  //   return false;
  // }
  // logout(): void {
  //   localStorage.removeItem(this.SESSION_KEY);
  //   localStorage.removeItem(this.EXPIRY_KEY);
  //   clearTimeout(this.sessionTimeout);
  // }
  // isLoggedIn(): boolean {
  //   const session = localStorage.getItem(this.SESSION_KEY);
  //   const expiry = localStorage.getItem(this.EXPIRY_KEY);
  //   if (!session || !expiry) return false;
  //   const now = new Date().getTime();
  //   if (now > parseInt(expiry, 10)) {
  //     this.logout(); // Phiên đã hết hạn
  //     return false;
  //   }
  //   return true;
  // }
  // private startSessionTimer(expiryTime: number): void {
  //   const timeRemaining = expiryTime - Date.now();
  //   if (this.sessionTimeout) {
  //     clearTimeout(this.sessionTimeout);
  //   }
  //   this.sessionTimeout = setTimeout(() => {
  //     this.logout();
  //     alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
  //     window.location.reload();
  //   }, timeRemaining);
  // }
}
