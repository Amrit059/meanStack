import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpUtillService {

  httpDomain: string = environment.httpBaseHref;
  restApi: string = environment.restAPI;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  get(url: string, options: any): Observable<any> {
    return this.httpClient.get(this.httpDomain + this.restApi + url, options);
  }

  post(url: string, body: any, options: any): Observable<any> {
    return this.httpClient.post(this.httpDomain + this.restApi + url, body, options);
  }

  put(url: string, body: any, options: any): Observable<any> {
    return this.httpClient.put(this.httpDomain + this.restApi + url, body, options);
  }

  delete(url: string, options: any): Observable<any> {
    return this.httpClient.delete(this.httpDomain + this.restApi + url, options);
  }

}
