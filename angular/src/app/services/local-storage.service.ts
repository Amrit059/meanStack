import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    // @Inject(PLATFORM_ID) private platformId: any,
    @Inject('LOCALSTORAGE') private localStorage: any
  ) { }

  get(key: string) {
    return this.localStorage.getItem(key);
  }

  set(key: string, value: UserModel) {
    this.localStorage.setItem(key, value);
  }

  remove(key: string) {
    this.localStorage.removeItem(key);
  }

  clear() {
    this.localStorage.clear();
  }
}
