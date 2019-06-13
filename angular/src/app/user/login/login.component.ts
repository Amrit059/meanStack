import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LS_KEY } from 'src/app/constants/constants';
import { FormGroup } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  userModel: UserModel = new UserModel();

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.userService.createLoginForm();
  }

  submit() {
    console.log('submit is ', this.loginForm);
    this.userModel = this.loginForm.getRawValue();
    this.userService.login(this.userModel).subscribe(
      (data: any) => {
        console.log('finale data is ', data);
        this.userService.setTokenInLocalStorage(data);
        this.router.navigate(['/users']);
      }, (error: Error) => {
        console.log('error while creating User ', error);
      });
  }
}
