import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from '@core/authentication/admin.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AdminGuard,
  ]
})
export class AdminRoutingModule { }
