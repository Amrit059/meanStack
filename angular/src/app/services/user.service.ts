import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpUtillService } from './http-utill.service';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { LS_KEY } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  emailPattern: string = String('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z-.]+$');
  numberPattern: string = String('^[0-9]+$');

  userFormGroup: FormGroup;
  loginFormGroup: FormGroup;

  constructor(
    private httpUtillService: HttpUtillService,
    private localStorageService: LocalStorageService) { }

  getUsers(): Observable<UserModel[]> {
    return this.httpUtillService.get(`users`, {});
  }

  getUserById(id: string): Observable<UserModel> {
    return this.httpUtillService.get(`user/${id}`, {});
  }

  login(userModel: UserModel): Observable<any> {
    return this.httpUtillService.post(`login`, userModel, {});
  }

  signup(userModel: UserModel): Observable<any> {
    return this.httpUtillService.post(`user`, userModel, {});
  }

  updateUser(id: string, userModel: UserModel): Observable<UserModel> {
    return this.httpUtillService.put(`user/${id}`, userModel, {});
  }

  deleteUser(id: string): Observable<UserModel> {
    return this.httpUtillService.delete(`user/${id}`, {});
  }

  setTokenInLocalStorage(value: UserModel) {
    this.localStorageService.set(LS_KEY.API_TOKEN, value);
  }

  isLogIn() {
    return localStorage.getItem(LS_KEY.API_TOKEN);
  }

  logout() {
    this.localStorageService.clear();
  }

  createLoginForm(): FormGroup {
    console.log('createLoginForm');
    this.loginFormGroup = new FormGroup({
      emailId: new FormControl(null),
      password: new FormControl(null),
    });
    console.log('createLoginForm form group is', this.loginFormGroup);
    return this.loginFormGroup;
  }


  createUserForm(userModel: UserModel): FormGroup {
    this.userFormGroup = new FormGroup({
      '_id': new FormControl(userModel._id),
      'emailId': new FormControl(userModel.emailId,
        [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]
      ),
      'mNo': new FormControl(userModel.mNo,
        [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.numberPattern)]),
      'dob': new FormControl(userModel.dob, Validators.required),
      'bio': new FormControl(userModel.bio),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      'maritalStatus': new FormControl(userModel.maritalStatus, Validators.required),
      'gender': new FormControl(userModel.gender, Validators.required)
    });
    return this.userFormGroup;
  }
}







