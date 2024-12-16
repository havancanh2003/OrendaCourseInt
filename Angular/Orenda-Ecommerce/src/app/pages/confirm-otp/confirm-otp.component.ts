import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirm-otp',
  templateUrl: './confirm-otp.component.html',
  styleUrl: './confirm-otp.component.scss',
})
export class ConfirmOtpComponent implements OnInit {
  formConfirmOTP!: UntypedFormGroup;
  email!: string;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder
  ) {}
  ngOnInit(): void {
    this.formConfirmOTP = this.fb.group({
      OTP: [],
    });
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || null;
    });
  }
  onSubmit() {
    const OTP = this.formConfirmOTP.controls['OTP'].value;
    this.authService.confirmOTP(this.email, OTP).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.isOk) {
          this.toastr.success(res.mes);
          this.router.navigate(['/login']);
        } else {
          console.log();
          this.toastr.error(res.mes);
        }
      },
      error: (res) => {
        this.toastr.error(res.Message);
      },
    });
  }
}
