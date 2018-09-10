import {Component, OnDestroy, OnInit} from '@angular/core';
import {RepositoryService} from '../../shared/services/repository.service';
import {RepositoryFilter} from '../../shared/models/repository';
import {ActivatedRoute} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {Subscription, throwError} from 'rxjs';
import {orderData} from '../../shared/utils/card-util';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-repositories',
  template: `
    <div class="container" [ngBusy]="{busy: subscriptionCard, message: 'Cargando...'}">
      <div class="row" *ngFor="let row of data">
        <div *ngFor="let repository of row" class="col-3">
          <app-card [typeCard]="'repository'"
                    [name]="repository.name"
                    [linkGithub]="repository.html_url"
                    [description]="repository.description"
                    [openIssues]="repository.open_issues"
                    [forks]="repository.forks"
                    [issues]="repository.totalIssues">
          </app-card>
        </div>
      </div>
    </div>
    <app-pagination (clickPagination)="clickPagination($event)"
                    [total]="total"
                    [page]="page"
                    [pageSize]="pageSize">
    </app-pagination>
  `,
  styles: []
})
export class RepositoriesComponent implements OnInit, OnDestroy {

  subscriptionCard: Subscription;
  pageSize: number;
  page: number;
  total: number;
  data: any = [];

  routeData: any;

  constructor(private repositoryService: RepositoryService,
              private route: ActivatedRoute,
              private userService: UserService) {


    /*this.routeData = this.route.data.subscribe((data) => {
      const repositoryFilter = new RepositoryFilter();
      repositoryFilter.page = data.pagingParams.page;
      this.callService(repositoryFilter);
    });*/


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

  ngOnDestroy() {
    this.subscriptionCard.unsubscribe();
    this.repositoryService.sendRepositoryFilter(new RepositoryFilter());
  }

  callService(repositoryFilter: RepositoryFilter) {
    repositoryFilter.repository.username = this.route.snapshot.params.username;
    this.subscriptionCard = this.repositoryService.getAllRepositories(repositoryFilter)
      .pipe(
        catchError(err => throwError(err))
      )
      .subscribe(res => {
        this.userService.getUser(this.route.snapshot.params.username).subscribe(data => this.total = data.body.public_repos);
        this.data = orderData(this.loadIssues(res.body), 4);
      });
  }

  loadIssues(data) {
    data.map(
      item => {
        this.repositoryService.getAllIssues(this.route.snapshot.params.username, item.name).subscribe(
          res => item.totalIssues = res.body.length);
      }
    );
    return data;
  }

  clickPagination(event: any) {
    const filter = this.repositoryService.getRepositoryFilter();
    filter.page = event.newPage;
    this.repositoryService.sendRepositoryFilter(filter);
  }
}
