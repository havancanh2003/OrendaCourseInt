import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-skins',
  templateUrl: './sidebar-skins.component.html',
  styleUrl: './sidebar-skins.component.scss',
})
export class SidebarSkinsComponent {
  private navbarClasses: string[] = [
    'navbar-danger',
    'navbar-success',
    'navbar-warning',
    'navbar-dark',
    'navbar-light',
    'navbar-primary',
    'navbar-info',
    'navbar-pink',
  ];
  private sidebarClasses: string[] = ['sidebar-light', 'sidebar-dark'];

  constructor() {}

  ngOnInit(): void {
    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    const body = document.body;

    // Right sidebar toggle
    this.addClickListener('.nav-settings', () => {
      this.toggleClass('#right-sidebar', 'open');
    });
    this.addClickListener('.settings-close', () => {
      this.removeClass('#right-sidebar', 'open');
      this.removeClass('#theme-settings', 'open');
    });
    this.addClickListener('#settings-trigger', () => {
      this.toggleClass('#theme-settings', 'open');
    });

    // Sidebar themes
    this.addClickListener('#sidebar-light-theme', () => {
      this.applyClass(body, this.sidebarClasses, 'sidebar-light');
      this.highlightOption('#sidebar-light-theme', '.sidebar-bg-options');
    });
    this.addClickListener('#sidebar-dark-theme', () => {
      this.applyClass(body, this.sidebarClasses, 'sidebar-dark');
      this.highlightOption('#sidebar-dark-theme', '.sidebar-bg-options');
    });

    // Navbar themes
    this.addTileListener('.tiles.primary', 'navbar-primary');
    this.addTileListener('.tiles.success', 'navbar-success');
    this.addTileListener('.tiles.warning', 'navbar-warning');
    this.addTileListener('.tiles.danger', 'navbar-danger');
    this.addTileListener('.tiles.light', 'navbar-light');
    this.addTileListener('.tiles.info', 'navbar-info');
    this.addTileListener('.tiles.dark', 'navbar-dark');
    this.addTileListener('.tiles.default', '');
  }

  private addClickListener(selector: string, callback: () => void): void {
    const element = document.querySelector(selector);
    if (element) {
      element.addEventListener('click', callback);
    }
  }

  private toggleClass(selector: string, className: string): void {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.toggle(className);
    }
  }

  private removeClass(selector: string, className: string): void {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.remove(className);
    }
  }

  private applyClass(
    target: Element,
    classesToRemove: string[],
    classToAdd: string
  ): void {
    classesToRemove.forEach((className) => target.classList.remove(className));
    target.classList.add(classToAdd);
  }

  private highlightOption(
    selectedSelector: string,
    groupSelector: string
  ): void {
    const groupElements = document.querySelectorAll(groupSelector);
    groupElements.forEach((element) => element.classList.remove('selected'));

    const selectedElement = document.querySelector(selectedSelector);
    if (selectedElement) {
      selectedElement.classList.add('selected');
    }
  }

  private addTileListener(tileSelector: string, navbarClass: string): void {
    this.addClickListener(tileSelector, () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        this.applyClass(navbar, this.navbarClasses, navbarClass);
      }
      this.highlightOption(tileSelector, '.tiles');
    });
  }
}
