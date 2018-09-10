import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RepositoriesRoutingModule} from './repositories-routing.module';
import {RepositoriesComponent} from './repositories.component';

@NgModule({
  imports: [
    CommonModule,
    RepositoriesRoutingModule
  ],
  declarations: [
    RepositoriesComponent
  ]
})
export class RepositoriesModule {
}
