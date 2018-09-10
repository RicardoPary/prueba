import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { UsersComponent } from './pages/users/users.component';
import { RepositoriesComponent } from './pages/repositories/repositories.component';
import { CardComponent } from './shared/modules/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    RepositoriesComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
