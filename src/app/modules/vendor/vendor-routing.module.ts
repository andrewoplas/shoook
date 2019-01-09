import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from 'src/app/modules/vendor/landing/landing.component';
import { RegisterComponent } from 'src/app/modules/vendor/register/register.component';
import { MenuComponent } from 'src/app/modules/vendor/menu/menu.component';
import { LoginComponent } from './login/login.component';
import { VendorGuard } from '@core/authentication/vendor.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'menu', component: MenuComponent, canActivate: [VendorGuard]},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    VendorGuard,
  ]
})
export class VendorRoutingModule { }
