import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PagesModule } from '../pages/pages.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarSkinsComponent } from './sidebar-skins/sidebar-skins.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutsRoutingModule } from './layouts-routing.module';

@NgModule({
  declarations: [
    LayoutsComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SidebarSkinsComponent,
  ],
  imports: [CommonModule, PagesModule, SharedModule, LayoutsRoutingModule],
  exports: [LayoutsComponent],
})
export class LayoutsModule {}
