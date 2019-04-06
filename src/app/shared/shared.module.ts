import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Shared Components
import { VendorFooterComponent } from '@shared/components/vendor/footer/footer.component';
import { VendorNavbarComponent } from '@shared/components/vendor/navbar/navbar.component';
import { FooterComponent } from '@shared/components/user/footer/footer.component';
import { NavbarComponent } from '@shared/components/user/navbar/navbar.component';
import { AdminFooterComponent } from '@shared/components/admin/footer/footer.component';
import { AdminNavbarComponent } from '@shared/components/admin/navbar/navbar.component';

// Global
import { Globals } from './models/Global';
import { EmailAddressValidator } from './validator/email-address';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AdminNavbarComponent,
    AdminFooterComponent,
    SidebarComponent,
    VendorNavbarComponent,
    VendorFooterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    AdminNavbarComponent,
    AdminFooterComponent,
    SidebarComponent,
    VendorNavbarComponent,
    VendorFooterComponent,
    NavbarComponent,
    FooterComponent,
  ],
  providers: [
    Globals,
    EmailAddressValidator
  ]
})
export class SharedModule { }
