import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from '@user/landing.component';
import { InviteComponent } from '@user/invite.component';
import { SearchComponent } from '@user/search.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'invite', component: InviteComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
