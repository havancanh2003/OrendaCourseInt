import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() defaltLink = 'dashboard';
  @Output() checkedChangePage = new EventEmitter<string>();
  switchPage(page: string) {
    this.checkedChangePage.emit(page);
  }
}
