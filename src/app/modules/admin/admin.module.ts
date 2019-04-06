import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from '@modules/admin/dashboard/dashboard.component';
import { LoginComponent } from '@modules/admin/login/login.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent, 
    LoginComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
