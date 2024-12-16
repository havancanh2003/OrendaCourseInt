import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnInit {
  errorMessage = '';
  formForgotPassword!: UntypedFormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private fb: UntypedFormBuilder
  ) {}
  ngOnInit(): void {
    this.formForgotPassword = this.fb.group(
      {
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required]],
        confirmPassword: [null, [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(
    group: UntypedFormGroup
  ): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword
      ? { mismatch: true }
      : null;
  }

  onSubmit(): void {
    const email = this.formForgotPassword.controls['email'];
    const password = this.formForgotPassword.controls['password'];
    const cpassWord = this.formForgotPassword.controls['confirmPassword'];

    if (email.invalid || password.invalid || cpassWord.invalid) {
      return;
    }
    this.authService
      .forgotPassword(
        email.value.trim(),
        password.value.trim(),
        cpassWord.value.trim()
      )
      .subscribe({
        next: (res: string) => {
          this.toastr.success(res);
          this.router.navigate(['forgot-password', 'confirm-otp'], {
            queryParams: { email: email.value.trim() },
          });
        },
        error: (err: any) => {
          console.log(err);
          this.errorMessage = 'Xảy ra lỗi trong quá trình thao tác!';
          this.toastr.error(this.errorMessage);
        },
      });
  }
}
