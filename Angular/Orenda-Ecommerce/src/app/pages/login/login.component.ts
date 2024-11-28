import { Component, EventEmitter } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  submitlogin(): void {
    //@Output() isSucces = new EventEmitter<boolean>();
    console.log(1);
    // if (this.authService.login(this.username, this.password)) {
    //   this.errorMessage = '';
    //   //this.router.navigate(['/home']); // Điều hướng đến trang Home
    // } else {
    //   this.errorMessage = 'Invalid username or password!';
    // }
  }
}
