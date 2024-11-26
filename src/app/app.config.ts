import { ApplicationConfig ,importProvidersFrom} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthService } from './oauth.service';
import { AuthInterceptor } from './interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withViewTransitions(),),
    //provideAnimations(),
    importProvidersFrom(HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
};

