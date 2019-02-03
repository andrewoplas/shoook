import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    PaymentRoutingModule
  ], 
  exports: [
    DatePipe
  ]
})
export class PaymentModule { }
