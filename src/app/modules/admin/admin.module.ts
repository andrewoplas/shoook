import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from '@modules/admin/dashboard/dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { VendorsComponent } from './vendors/vendors.component';
import { MenusComponent } from './menus/menus.component';
import { OrdersComponent } from './orders/orders.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { VendorsViewComponent } from './vendors-view/vendors-view.component';

@NgModule({
  declarations: [
    DashboardComponent,
    VendorsComponent,
    VendorsViewComponent, 
    MenusComponent,
    OrdersComponent,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ]
})
export class AdminModule { }
