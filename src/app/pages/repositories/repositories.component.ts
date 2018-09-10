import {Component, OnDestroy, OnInit} from '@angular/core';
import {RepositoryService} from '../../shared/services/repository.service';
import {RepositoryFilter} from '../../shared/models/repository';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {Subscription, throwError} from 'rxjs';
import {orderData} from '../../shared/utils/card-util';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-repositories',
  template: `
    <button (click)="previus()">Previus</button>
    <div class="container" [ngBusy]="{busy: subscriptionRepositories, message: 'Cargando...'}">
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

  subscriptionRepositories: Subscription;
  subscriptionRepositoryService: Subscription;
  pageSize: number;
  page: number;
  total: number;
  data: any = [];

  routeData: any;

  constructor(private repositoryService: RepositoryService,
              private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) {


    /*this.routeData = this.route.data.subscribe((data) => {
      const repositoryFilter = new RepositoryFilter();
      repositoryFilter.page = data.pagingParams.page;
      this.callService(repositoryFilter);
    });*/


    this.subscriptionRepositoryService = this.repositoryService.currentRepositoryFilter().subscribe(
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
    this.subscriptionRepositories.unsubscribe();
    this.subscriptionRepositoryService.unsubscribe();
    this.userService.sendUser(null);
  }

  callService(repositoryFilter: RepositoryFilter) {
    repositoryFilter.repository.username = this.route.snapshot.params.username;
    this.subscriptionRepositories = this.repositoryService.getAllRepositories(repositoryFilter)
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

  previus() {
    this.router.navigate(['']);
  }
}
