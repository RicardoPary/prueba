import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {UserService} from '../../shared/services/user.service';
import {HttpClientModule} from '@angular/common/http';
import {CardModule} from '../../shared/modules/card/card.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    UsersRoutingModule,
    CardModule
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
