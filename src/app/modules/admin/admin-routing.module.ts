import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VendorsComponent } from './vendors/vendors.component';
import { OrdersComponent } from './orders/orders.component';
import { MenusComponent } from './menus/menus.component';
import { VendorsViewComponent } from './vendors-view/vendors-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vendors', component: VendorsComponent },
  { path: 'vendors/view/:id', component: VendorsViewComponent },
  { path: 'menus', component: MenusComponent },
  { path: 'orders', component: OrdersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
