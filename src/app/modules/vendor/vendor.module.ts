import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { LandingComponent } from '@vendor/landing.component';
import { NavbarComponent } from '@vendor/navbar.component';
import { FooterComponent } from '@vendor/footer.component';

@NgModule({
  declarations: [
    LandingComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule
  ]
})
export class VendorModule { }
