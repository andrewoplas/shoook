import { NgModule } from '@angular/core';

import { InviteRoutingModule } from './invite-routing.module';
import { InviteComponent } from './invite.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    InviteComponent
  ],
  imports: [
    SharedModule,
    InviteRoutingModule
  ]
})
export class InviteModule { }
