import { Component } from '@angular/core';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
})
export class LayoutsComponent {
  currenPage: string = 'dashboard';
  isLoginSucces: boolean = false;
}
