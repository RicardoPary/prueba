import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {UserFilter} from '../../shared/models/user';
import {catchError} from 'rxjs/operators';
import {Subscription, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {orderData} from '../../shared/utils/card-util';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  subscriptionTable: Subscription;
  totalData = 20;
  pageSize: number;
  page: number;
  data: any = [];

  constructor(private userService: UserService,
              private router: Router) {

    this.userService.currentUserFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page - 1;
        this.callService(dates);
      }
    );

  }

  ngOnInit() {
  }

  callService(userFilter: UserFilter) {
    this.subscriptionTable = this.userService.getAllUsers(userFilter)
      .pipe(
        catchError(err => throwError(err))
      )
      .subscribe(res => {
        this.data = orderData(res.body, 4);
        /*this.totalData = res.body.respuesta.total;*/
      });
  }

  clickViewRepositories(event) {
    this.router.navigate(['users/repositories', event.username]);
  }

  clickPagination() {
    this.page++;
    const filter = this.userService.getUserFilter();
    filter.page = 20;
    this.userService.sendUserFilter(filter);
  }
}
