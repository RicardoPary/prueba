import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {UserFilter} from '../../shared/models/user';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  totalData = 20;
  pageSize = 10;
  page = 1;
  data: any = [];

  constructor(private userService: UserService) {

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
    this.userService.getAllUsers(userFilter)
      .pipe(
        catchError(err => throwError(err))
      )
      .subscribe(res => {
        console.log(res);
        this.data = this.orderData(res.body, 4);
        /*this.totalData = res.body.respuesta.total;*/
      });
  }

  clickViewRepositories(event) {
    console.log(event);
  }

  orderData(data: any, index) {
    const order = [];
    for (let i = 0; i < data.length; i++) {
      if (i % index === 0) {
        order.push([]);
        order[order.length - 1].push(data[i]);
      } else {
        order[order.length - 1].push(data[i]);
      }
    }
    return order;
  }
}
