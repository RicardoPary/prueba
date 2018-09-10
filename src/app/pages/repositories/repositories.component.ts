import {Component, OnInit} from '@angular/core';
import {RepositoryService} from '../../shared/services/repository.service';
import {RepositoryFilter} from '../../shared/models/repository';
import {ActivatedRoute} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {Subscription, throwError} from 'rxjs';
import {orderData} from '../../shared/utils/card-util';

@Component({
  selector: 'app-repositories',
  template: `
    <div class="container" [ngBusy]="{busy: subscriptionTable, message: 'Cargando...'}">
      <div class="row" *ngFor="let row of data">
        <div *ngFor="let user of row" class="col-3">
          <app-card [typeCard]="'repository'"
                    [name]="user.name"
                    [linkGithub]="user.html_url"
                    [description]="user.description"
                    [openIssues]="user.open_issues"
                    [forks]="user.forks">
          </app-card>
        </div>
      </div>
    </div>

    <button (click)="clickPagination()">Next Repository {{ page}}</button>

  `,
  styles: []
})
export class RepositoriesComponent implements OnInit {

  subscriptionTable: Subscription;
  totalData = 20;
  pageSize: number;
  page: number;
  data: any = [];

  routeData: any;

  constructor(private repositoryService: RepositoryService,
              private route: ActivatedRoute) {

    this.routeData = this.route.data.subscribe((data) => {
      console.log(data.pagingParams.page);
      this.page = data.pagingParams.page;
    });


    this.repositoryService.currentRepositoryFilter().subscribe(
      dates => {
        this.pageSize = dates.size;
        this.page = dates.page - 1;
        this.callService(dates);
      }
    );

  }

  ngOnInit() {
  }

  callService(repositoryFilter: RepositoryFilter) {
    repositoryFilter.repository.username = this.route.snapshot.params.username;
    this.subscriptionTable = this.repositoryService.getAllRepositories(repositoryFilter)
      .pipe(
        catchError(err => throwError(err))
      )
      .subscribe(res => {
        this.data = orderData(res.body, 4);
        /*this.totalData = res.body.respuesta.total;*/
      });
  }

  clickPagination() {
    this.page++;
    const filter = this.repositoryService.getRepositoryFilter();
    filter.page = 20;
    this.repositoryService.sendRepositoryFilter(filter);
  }
}
