import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { signupModel } from '../../core/models/user.model';
import { delay } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  formRegister!: UntypedFormGroup;
  model!: signupModel;
  // isAgree: boolean = true;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      description: [''],
      dateOfBirth: [Date],
      isAgree: [false, Validators.requiredTrue],
    });
  }
  onSubmit() {
    if (this.formRegister.valid) {
      this.model = {
        FullName: this.formRegister.controls['fullName'].value.trim(),
        Description: this.formRegister.controls['description'].value.trim(),
        Password: this.formRegister.controls['password'].value.trim(),
        Email: this.formRegister.controls['email'].value.trim(),
        DateOfBirth: this.formRegister.controls['dateOfBirth'].value,
      };
      this.authService.signUp(this.model).subscribe({
        next: (res: any) => {
          if (res.isAuthenticated) {
            this.toastr.success(res.message);
            this.router.navigate(['/login']);
          } else {
            this.toastr.error(res.message);
          }
        },
        error: (err: any) => {
          console.error(err);
          const errorMessage = 'Xảy ra lỗi trong quá trình thao tác!';
          this.toastr.error(errorMessage);
        },
      });
    }
  }
}
