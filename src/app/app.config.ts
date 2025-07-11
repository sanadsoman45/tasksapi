import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './core/Interceptors/auth-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appHttpInterceptor } from './core/Interceptors/error-interceptors';
import { firstValueFrom, tap } from 'rxjs';
import { TokenService } from './core/Services/token-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, appHttpInterceptor])),
    provideAppInitializer(() => {
      const tokenService = inject(TokenService);
      tokenService.startTokenMonitor();
    }),
  ],
};
