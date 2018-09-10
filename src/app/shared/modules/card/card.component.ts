import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card" style="width: 18rem; min-height: 350px; margin: 10px;">
      <img *ngIf="typeCard === 'user'"
           class="card-img-top"
           [src]="img"
           alt="Card image cap"
           width="30px"
           height="150px">
      <div class="card-body">

        <h5 class="card-title">{{name | uppercase}}</h5>

        <p *ngIf="typeCard === 'repository'"
           class="card-text">
          Description : {{description}}
        </p>

        <ul *ngIf="typeCard === 'repository'">
          <li>Issues : {{issues || 0}}</li>
          <li>Open issues: {{openIssues || 0}}</li>
          <li>Forks : {{forks || 0}}</li>
        </ul>

        <a [href]="linkGithub" target="_blank">link repository</a>

        <button *ngIf="typeCard === 'user'"
                class="btn btn-primary"
                (click)="viewRepositories()">View repositories
        </button>
      </div>
    </div>

  `,
  styles: []
})
export class CardComponent implements OnInit {

  @Input() typeCard: any;

  @Input() img: any = '../../../../assets/images/user.png';
  @Input() name: any;
  @Input() linkGithub: any;
  @Output() repositories = new EventEmitter<any>();

  @Input() description: any;
  @Input() issues: any;
  @Input() openIssues: any;
  @Input() forks: any;

  constructor() {
  }

  ngOnInit() {
  }

  viewRepositories() {
    this.repositories.emit({username: this.name});
  }
}
