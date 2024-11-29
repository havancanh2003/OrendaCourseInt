import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { clearToken } from '../../helpers/helpers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() isLogOut = new EventEmitter<boolean>();
  constructor(private authService: AuthService) {}
  submitLogout() {
    this.authService.logoutUser().subscribe(() => {
      clearToken();
      this.isLogOut.emit(true);
    });
  }
}
