import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Shared Components
import { VendorFooterComponent } from '@shared/components/vendor/footer/footer.component';
import { VendorNavbarComponent } from '@shared/components/vendor/navbar/navbar.component';
import { FooterComponent } from './components/user/footer/footer.component';
import { NavbarComponent } from './components/user/navbar/navbar.component';

@NgModule({
  declarations: [
    VendorNavbarComponent,
    VendorFooterComponent,
    NavbarComponent,
    FooterComponent,
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
    VendorNavbarComponent,
    VendorFooterComponent,
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
