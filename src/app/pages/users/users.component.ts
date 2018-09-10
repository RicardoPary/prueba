import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  ngOnInit() {

    this.userService.getAllUsers().subscribe(res => console.log(res));

  }

}
