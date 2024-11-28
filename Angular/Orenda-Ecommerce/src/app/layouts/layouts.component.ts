import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
})
export class LayoutsComponent implements OnInit {
  currenPage: string = 'dashboard';
  isLoginSucces: boolean = false;
  logoutTimeout: any;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.isLoginSucces = this.auth.isLoggedIn();
  }

  handleLoginSuccess(sesstionLogin: boolean): void {
    this.isLoginSucces = sesstionLogin;
  }
}
