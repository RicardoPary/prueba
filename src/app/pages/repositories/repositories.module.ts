import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RepositoriesRoutingModule} from './repositories-routing.module';
import {RepositoriesComponent} from './repositories.component';
import {RepositoryService} from '../../shared/services/repository.service';
import {HttpClientModule} from '@angular/common/http';
import {CardModule} from '../../shared/modules/card/card.module';
import {NgBusyModule} from 'ng-busy';
import {PaginationModule} from '../../shared/modules/pagination/pagination.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RepositoriesRoutingModule,
    CardModule,
    PaginationModule,
    NgBusyModule
  ],
  declarations: [
    RepositoriesComponent
  ],
  providers: [
    RepositoryService
  ]
})
export class RepositoriesModule {
}
