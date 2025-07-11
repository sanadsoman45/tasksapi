import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private activeRequests = 0;
  readonly loading = signal(false);

  show(): void {
    this.activeRequests++;
    this.loading.set(true);
  }

  hide(): void {
    if (this.activeRequests > 0) {
      this.activeRequests--;
    }

    if (this.activeRequests === 0) {
      this.loading.set(false);
    }
  }

  reset(): void {
    this.activeRequests = 0;
    this.loading.set(false);
  }
}
