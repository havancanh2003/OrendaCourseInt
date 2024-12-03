import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { clearToken } from '../../helpers/helpers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}
  submitLogout() {
    this.authService.logoutUser().subscribe(() => {
      clearToken();
      this.router.navigate(['/login']);
    });
  }
}
