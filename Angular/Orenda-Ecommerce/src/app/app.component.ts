import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { getCookie } from './helpers/helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Orenda-Ecommerce';
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!this.isAuthenticated() && event.url !== '/login') {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  isAuthenticated(): boolean {
    const token = getCookie('access_token');
    return !!token;
  }
}
