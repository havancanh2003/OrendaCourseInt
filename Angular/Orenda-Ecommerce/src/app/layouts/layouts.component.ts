import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { getCookie } from '../helpers/helpers';
import { Observable } from 'rxjs';
import { StateLoadingService } from '../shared/loading/state-loading.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
})
export class LayoutsComponent implements OnInit {
  body!: HTMLElement;
  sidebar!: HTMLElement;
  horizontalMenu!: HTMLElement;
  isLoading$: Observable<boolean>;
  ngOnInit(): void {
    this.body = document.body;
    this.sidebar = document.querySelector('.sidebar')!;
    this.horizontalMenu = document.querySelector('.horizontal-menu')!;

    //this.applyActiveClass();
    this.setupEventListeners();
  }

  constructor(private loadingService: StateLoadingService) {
    this.isLoading$ = this.loadingService.loading$;
  }

  // Add active class to nav-link dynamically
  private applyActiveClass(): void {
    const current = location.pathname
      .split('/')
      .slice(-1)[0]
      .replace(/^\/|\/$/g, '');
    const links = this.sidebar.querySelectorAll('.nav li a');

    links.forEach((link: Element) => {
      const href = (link as HTMLAnchorElement).getAttribute('href') || '';
      if (href.indexOf(current) !== -1) {
        this.addClass(link.closest('.nav-item')!, 'active');
        if (link.closest('.sub-menu')) {
          this.addClass(link.closest('.collapse')!, 'show');
          this.addClass(link, 'active');
        }
      }
    });
  }

  // Setup event listeners
  private setupEventListeners(): void {
    // Sidebar collapse behavior
    this.sidebar.addEventListener('show.bs.collapse', (event: Event) => {
      const shownItems = this.sidebar.querySelectorAll('.collapse.show');
      shownItems.forEach((item) => {
        (item as HTMLElement).classList.remove('show');
      });
    });

    // Minimize sidebar
    document
      .querySelector('[data-toggle="minimize"]')
      ?.addEventListener('click', () => {
        if (
          this.body.classList.contains('sidebar-toggle-display') ||
          this.body.classList.contains('sidebar-absolute')
        ) {
          this.toggleClass(this.body, 'sidebar-hidden');
        } else {
          this.toggleClass(this.body, 'sidebar-icon-only');
        }
      });

    // Horizontal menu toggle
    document
      .querySelector('[data-toggle="horizontal-menu-toggle"]')
      ?.addEventListener('click', () => {
        this.toggleClass(
          document.querySelector('.horizontal-menu .bottom-navbar')!,
          'header-toggled'
        );
      });

    // Focus on search icon click
    document
      .querySelector('#navbar-search-icon')
      ?.addEventListener('click', () => {
        const input = document.querySelector(
          '#navbar-search-input'
        ) as HTMLInputElement;
        input?.focus();
      });
  }

  private addClass(element: Element, className: string): void {
    element.classList.add(className);
  }

  private removeClass(element: Element, className: string): void {
    element.classList.remove(className);
  }

  private toggleClass(element: Element, className: string): void {
    element.classList.toggle(className);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!this.horizontalMenu) {
      return; // Thêm kiểm tra để tránh null
    }
    if (window.matchMedia('(min-width: 992px)').matches) {
      const header = this.horizontalMenu;
      if (window.scrollY >= 70) {
        this.addClass(header, 'fixed-on-scroll');
      } else {
        this.removeClass(header, 'fixed-on-scroll');
      }
    }
  }
}
// isLoading$: Observable<boolean>;
// currenPage: string = 'dashboard';
// isLoginSucces: boolean = true;
// logoutTimeout: any;

// constructor(private loadingService: StateLoadingService) {
//   this.isLoading$ = this.loadingService.loading$;
// }

// ngOnInit(): void {}
