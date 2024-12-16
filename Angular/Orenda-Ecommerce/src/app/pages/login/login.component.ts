import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  formLogin!: UntypedFormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmitLogin(): void {
    const userName = this.formLogin.controls['email'];
    const passWord = this.formLogin.controls['password'];
    if (userName.invalid || passWord.invalid) {
      return;
    }
    this.authService
      .loginUser(userName.value.trim(), passWord.value)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          if (res && res.token) {
            // Lưu token vào cookie
            document.cookie = `token=${res.token}; max-age=30000; path=/; secure; samesite=strict`;

            this.router.navigate(['']);
            this.errorMessage = '';
          } else {
            this.errorMessage = 'Đăng nhập không thành công, vui lòng thử lại!';
            this.toastr.error(this.errorMessage);
          }
        },
        error: (err: any) => {
          console.error('Lỗi khi đăng nhập:', err);
          this.errorMessage = 'Lỗi kết nối, vui lòng thử lại!';
          this.toastr.error(this.errorMessage);
        },
      });
  }
}
