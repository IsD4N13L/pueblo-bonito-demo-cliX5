import { bootstrapApplication } from '@angular/platform-browser';

import { CoreComponent } from './app/application/core/core.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { coreRoutes } from './app/application/core/core.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(CoreComponent, {
    providers: [
        importProvidersFrom(
            RouterModule.forRoot(coreRoutes),
            BrowserAnimationsModule,

        ),
        provideHttpClient()
    ],
}).catch(err => console.error(err));
