import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-pagination',
  template: `
    <div class="VDtable_footer">
      <div class="row">

        <div class="col-sm-12 d-flex justify-content-center mb-3 registration-text">
          <ul *ngIf="pager.pages && pager.pages.length" class="pagination">
            <li class="page-item">
              <button [disabled]="pager.currentPage === 1" (click)="updatePagination(1)"
                      style="background: none; border: none;">
                <i class="fa fa-angle-double-left" aria-hidden="true"></i>
              </button>
            </li>
            <li class="page-item">
              <button [disabled]="pager.currentPage === 1" (click)="updatePagination(pager.currentPage - 1)"
                      style="background: none; border: none;">
                <i class="fa fa-angle-left" aria-hidden="true"></i>
              </button>
            </li>
            <li class="page-item" *ngFor="let page of pager.pages" [ngClass]="{active:pager.currentPage === page}">
              <a class="page-link" (click)="updatePagination(page)">{{page}}</a>
            </li>
            <li class="page-item">
              <button [disabled]="pager.currentPage === pager.totalPages" (click)="updatePagination(pager.currentPage + 1)"
                      style="background: none; border: none;">
                <i class="fa fa-angle-right" aria-hidden="true"></i>
              </button>
            </li>
            <li class="page-item">
              <button [disabled]="pager.currentPage >= pager.totalPages" (click)="updatePagination(pager.totalPages)"
                      style="background: none; border: none;">
                <i class="fa fa-angle-double-right" aria-hidden="true"></i>
              </button>
            </li>
          </ul>

        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PaginationComponent implements OnInit, OnChanges {

  @Output() clickPagination = new EventEmitter<any>();
  @Input() total: number;
  @Input() page: number;

  listPerPage: number;
  colFilterIndex = -1;
  pager: any = {};

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {

    if (changes !== undefined && changes.page !== undefined) {
      this.pager = this.getPager(this.total, this.page + 1, this.listPerPage);
    }

    if (changes !== undefined && changes.pageSize !== undefined && changes.pageSize.currentValue) {
      this.listPerPage = changes.pageSize.currentValue;
      this.pager = this.getPager(this.total, 1, changes.pageSize.currentValue);
    }

    if (this.pager.totalItems <= 0) {
      const currentPage = this.pager.currentPage;
      this.pager = this.getPager(this.total, currentPage, this.listPerPage);
      if (this.pager.totalItems > 0) {
        this.pager.currentPage = 1;
      }
    }

    const page = this.pager.currentPage = this.page + 1;
    this.pager = this.getPager(this.total, page, this.listPerPage);
  }

  updatePagination(page: number) {
    this.colFilterIndex = -1;
    this.pager = this.getPager(this.total, page, this.listPerPage);
    this.clickPagination.emit({
      newPage: page
    });
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 11) {
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const pages = _.range(startPage, endPage + 1);
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
