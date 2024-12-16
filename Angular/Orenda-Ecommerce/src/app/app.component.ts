import { ChangeDetectorRef, Component } from '@angular/core';
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
    private loadingService: StateLoadingService,
    private cdr: ChangeDetectorRef
  ) {
    this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
}
