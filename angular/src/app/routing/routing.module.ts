import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingComponent } from './routing.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { UserModule } from '../user/user.module';
import { MatIconModule } from '@angular/material/icon';
import { AuthGuardService } from '../services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: '../home/home.module#HomeModule', canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    UserModule,
    HomeModule,
    MatIconModule
  ],
  declarations: [RoutingComponent],
  providers: [AuthGuardService],
  exports: [RoutingComponent]
})
export class RoutingModule { }
