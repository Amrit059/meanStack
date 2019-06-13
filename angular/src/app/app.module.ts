import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing/routing.module';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RoutingModule
  ],
  providers: [
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {

  }

}

export function getLocalStorage() {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}
