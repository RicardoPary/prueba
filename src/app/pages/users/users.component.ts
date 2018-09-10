import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {UserFilter} from '../../shared/models/user';
import {catchError} from 'rxjs/operators';
import {Subscription, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {orderData} from '../../shared/utils/card-util';

@Component({
  selector: 'app-users',
  template: `
    <div class="container" [ngBusy]="{busy: subscriptionCard, message: 'Cargando...'}">
      <div class="row" *ngFor="let row of data">
        <div *ngFor="let user of row" class="col-3">
          <app-card [typeCard]="'user'"
                    [img]="user.avatar_url"
                    [name]="user.login"
                    [linkGithub]="user.html_url"
                    (repositories)="clickViewRepositories($event)">
          </app-card>
        </div>
      </div>
    </div>

    <button (click)="clickPagination()">Next {{ page}}</button>
  `,
  styles: []
})
export class UsersComponent implements OnInit, OnDestroy {

  subscriptionCard: Subscription;
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

  ngOnDestroy() {
    this.subscriptionCard.unsubscribe();
  }

  callService(userFilter: UserFilter) {
    this.subscriptionCard = this.userService.getAllUsers(userFilter)
      .pipe(
        catchError(err => throwError(err))
      )
      .subscribe(res => {
        this.data = orderData(res.body, 4);
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
