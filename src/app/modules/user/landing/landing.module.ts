import { NgModule } from '@angular/core';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LandingComponent,
  ],
  imports: [
    SharedModule,
    LandingRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LandingModule { }
