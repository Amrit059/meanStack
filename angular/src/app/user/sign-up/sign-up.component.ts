import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { REF_DATA, ERROR_MESSAGES } from 'src/app/constants/constants';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  userForm: FormGroup;
  userModel: UserModel = new UserModel();
  genders: any = REF_DATA.GENDERS;
  maritalStatus: any = REF_DATA.MARITAL_STATUS;
  errorMessages: any = ERROR_MESSAGES;
  id: string;

  public maxDOB = moment().subtract(18, 'years').toDate();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.params.id;
    console.log('this.id ', this.id);
    if (this.id) {
      this.getUserById(this.id);
    } else {
      this.userForm = this.userService.createUserForm(this.userModel);
    }
  }

  ngOnInit() {

  }
  submit() {
    console.log('submit is ', this.userForm);
    if (this.id) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createUser() {
    this.userModel = this.userForm.getRawValue();
    this.userService.signup(this.userModel).subscribe(
      (data: any) => {
        console.log('finale data creating User is ', data);
        this.userService.setTokenInLocalStorage(data);
        this.router.navigate(['/users']);
      }, (error: Error) => {
        console.log('error while creating User ', error);
      });
  }

  updateUser() {
    this.userModel = this.userForm.getRawValue();
    this.userService.updateUser(this.id, this.userModel).subscribe(
      (user: any) => {
        console.log('finale data updating user is ', user);
        this.router.navigate(['/users']);
      }, (error: Error) => {
        console.log('error while updating User ', error);
      });
  }

  getUserById(id: string) {
    this.userService.getUserById(id).subscribe(
      (userModel: UserModel) => {
        console.log('get user by id is ', userModel);
        this.userForm = this.userService.createUserForm(userModel);
        console.log('userForm is ', this.userForm.value);
      }, (error: Error) => {
        console.log('error while geting by id User ', error);
      });
  }
  resetForm() {
    console.log('reset form');
    this.userForm.reset();
  }

}
