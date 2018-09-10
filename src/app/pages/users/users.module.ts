import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {UserService} from '../../shared/services/user.service';
import {HttpClientModule} from '@angular/common/http';
import {CardModule} from '../../shared/modules/card/card.module';
import {NgBusyModule} from 'ng-busy';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    UsersRoutingModule,
    CardModule,
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
