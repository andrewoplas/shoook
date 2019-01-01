import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { VendorRoutingModule } from './vendor-routing.module';
import { LandingComponent } from 'src/app/modules/vendor/landing/landing.component';
import { RegisterComponent } from 'src/app/modules/vendor/register/register.component';
import { MenuComponent } from 'src/app/modules/vendor/menu/menu.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    LandingComponent,
    RegisterComponent,
    MenuComponent
  ],
  imports: [
    SharedModule,
    VendorRoutingModule,
    SweetAlert2Module.forRoot()
  ]
})
export class VendorModule { }
