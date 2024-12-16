import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  submitlogin(): void {
    const userName = this.username.trim();
    const passWord = this.password.trim();

    if (!userName || !passWord) {
      this.errorMessage = 'Username và password không hợp lệ!';
      return;
    }

    this.authService.loginUser(userName, passWord).subscribe(
      (res: any) => {
        console.log(res);
        if (res && res.token) {
          // Lưu access_token vào cookie
          document.cookie = `token=${res.token}; max-age=30000; path=/; secure; samesite=strict`;

          this.router.navigate(['']);
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Đăng nhập không thành công, vui lòng thử lại!';
          this.toastr.error(this.errorMessage);
        }
      },
      (err: any) => {
        console.error('Lỗi khi đăng nhập:', err);
        this.errorMessage = 'Lỗi kết nối, vui lòng thử lại!';
        this.toastr.error(this.errorMessage);
      }
    );
  }
}
