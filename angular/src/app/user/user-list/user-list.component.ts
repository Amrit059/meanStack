import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LS_KEY } from 'src/app/constants/constants';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList: UserModel[] = [];
  constructor(
    private userService: UserService,
    private router: Router,
    private localStorargeService: LocalStorageService
  ) {
    this.localStorargeService.get(LS_KEY.API_TOKEN);
    // console.log('user is', user);
  }

  ngOnInit() {
    this.getAllUsers();
  }

  delete(id: string) {
    console.log('id is ', id);
    if (confirm('Are you sure you want to delete ' + id + '?')) {
      this.userService.deleteUser(id).subscribe((res) => {
        this.getAllUsers();
        console.log(res);
      });
    }
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(
      (list: UserModel[]) => {
        console.log('get user list', list);
        this.userList = list;
      });
  }
}
