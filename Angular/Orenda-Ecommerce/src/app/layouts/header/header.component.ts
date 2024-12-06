import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { clearToken } from '../../helpers/helpers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.initializeOffcanvasToggle();
  }
  submitLogout() {
    this.authService.logoutUser().subscribe(() => {
      clearToken();
      this.router.navigate(['/login']);
    });
  }

  private initializeOffcanvasToggle(): void {
    const toggleButtons = document.querySelectorAll(
      '[data-toggle="offcanvas"]'
    );
    toggleButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const sidebar = document.querySelector('.sidebar-offcanvas');
        if (sidebar) {
          sidebar.classList.toggle('active');
        }
      });
    });
  }
}
