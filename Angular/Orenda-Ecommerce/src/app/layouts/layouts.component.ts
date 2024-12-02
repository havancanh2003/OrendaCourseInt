import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  isLoading$: Observable<boolean>;
  currenPage: string = 'dashboard';
  isLoginSucces: boolean = true;
  logoutTimeout: any;

  constructor(private loadingService: StateLoadingService) {
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    // const access_token = getCookie('access_token');
    // if (access_token) {
    //   this.isLoginSucces = true;
    // } else {
    //   this.isLoginSucces = false;
    // }
  }

  handleLoginSuccess(sesstionLogin: boolean): void {
    this.isLoginSucces = sesstionLogin;
  }
}
