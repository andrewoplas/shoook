import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './modules/user/landing/landing.module#LandingModule' },
  { path: 'invite', loadChildren: './modules/user/invite/invite.module#InviteModule' },
  { path: 'search', loadChildren: './modules/user/search/search.module#SearchModule' },
  { path: 'checkout', loadChildren: './modules/user/checkout/checkout.module#CheckoutModule' },
  { path: 'payment', loadChildren: './modules/user/payment/payment.module#PaymentModule' },
  { path: 'vendor', loadChildren: './modules/vendor/vendor.module#VendorModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
