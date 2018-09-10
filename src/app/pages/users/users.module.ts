import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {UserService} from '../../shared/services/user.service';
import {HttpClientModule} from '@angular/common/http';
import {CardModule} from '../../shared/modules/card/card.module';
import {NgBusyModule} from 'ng-busy';
import {RouterModule} from '@angular/router';
import {PaginationModule} from '../../shared/modules/pagination/pagination.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    UsersRoutingModule,
    CardModule,
    PaginationModule,
    NgBusyModule
  ],
  declarations: [
    UsersComponent
  ],
  providers: [
    UserService
  ]
})
export class UsersModule {
}
