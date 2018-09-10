import {Component, OnInit} from '@angular/core';
import {RepositoryService} from '../../shared/services/repository.service';
import {RepositoryFilter} from '../../shared/models/repository';
import {ActivatedRoute} from '@angular/router';
import {UserFilter} from '../../shared/models/user';
import {catchError} from 'rxjs/operators';
import {Subscription, throwError} from 'rxjs';

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
        this.data = this.orderData(res.body, 4);
        /*this.totalData = res.body.respuesta.total;*/
      });
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
