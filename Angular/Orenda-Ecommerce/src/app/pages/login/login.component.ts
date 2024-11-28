import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

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

  constructor(private authService: AuthService) {}

  submitlogin(): void {
    if (this.authService.login(this.username, this.password)) {
      this.errorMessage = '';
      this.isSucces.emit(true);
    } else {
      this.errorMessage = 'Invalid username or password!';
    }
  }
}
