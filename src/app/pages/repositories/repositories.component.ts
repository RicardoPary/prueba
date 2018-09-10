import {Component, OnInit} from '@angular/core';
import {RepositoryService} from '../../shared/services/repository.service';
import {RepositoryFilter} from '../../shared/models/repository';
import {ActivatedRoute} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {Subscription, throwError} from 'rxjs';
import {orderData} from '../../shared/utils/card-util';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {

  subscriptionTable: Subscription;
  totalData = 20;
  pageSize: number;
  page: number;
  data: any = [];

  constructor(private repositoryService: RepositoryService,
              private route: ActivatedRoute) {

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
        console.log(res);
        this.data = orderData(res.body, 4);
        /*this.totalData = res.body.respuesta.total;*/
      });
  }

  clickPagination() {
    this.page++;
    const filter = this.repositoryService.getRepositoryFilter();
    filter.page = 20;
    console.log(this.page);
    this.repositoryService.sendRepositoryFilter(filter);
  }
}
