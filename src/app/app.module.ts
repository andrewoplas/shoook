import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from '@user/landing.component';
import { NavbarComponent } from '@user/navbar.component';
import { InviteComponent } from '@user/invite.component';
import { FooterComponent } from '@user/footer.component';
import { SearchComponent } from '@user/search.component';
import { PaymentComponent } from '@user/payment.component';
import { CheckoutComponent } from '@user/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    InviteComponent,
    FooterComponent,
    SearchComponent,
    PaymentComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
