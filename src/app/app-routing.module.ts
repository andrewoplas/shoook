import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from '@user/landing.component';
import { InviteComponent } from '@user/invite.component';
import { SearchComponent } from '@user/search.component';
import { CheckoutComponent } from '@user/checkout.component';
import { PaymentComponent } from '@user/payment.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'invite', component: InviteComponent },
  { path: 'search', component: SearchComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'payment', component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
