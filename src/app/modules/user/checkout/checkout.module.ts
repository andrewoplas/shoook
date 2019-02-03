import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
