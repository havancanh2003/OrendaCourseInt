import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { getCookie } from './helpers/helpers';
import { StateLoadingService } from './shared/loading/state-loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Orenda-Ecommerce';
  isLoading: boolean = false;
  constructor(
    private router: Router,
    private loadingService: StateLoadingService,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!this.isAuthenticated() && event.url !== '/login') {
          this.router.navigate(['/login']);
        }
      }
    });

    this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  isAuthenticated(): boolean {
    const token = getCookie('access_token');
    return !!token;
  }
}
