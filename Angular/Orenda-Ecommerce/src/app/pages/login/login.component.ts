import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Output() isSucces = new EventEmitter<boolean>();
  username: string = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  submitlogin(): void {
    const userName = this.username.trim();
    const passWord = this.password.trim();

    if (!userName || !passWord) {
      this.errorMessage = 'Username và password không hợp lệ!';
      return;
    }

    this.authService.loginUser(userName, passWord).subscribe(
      (res: any) => {
        if (res && res.access_token) {
          // Lưu access_token vào cookie
          document.cookie = `access_token=${res.access_token}; max-age=300000; path=/; secure; samesite=strict`;

          //this.isSucces.emit(true);
          this.router.navigate(['']);
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Đăng nhập không thành công, vui lòng thử lại!';
        }
      },
      (err: any) => {
        console.error('Lỗi khi đăng nhập:', err);
        this.errorMessage = 'Lỗi kết nối, vui lòng thử lại!';
      }
    );
  }
}
