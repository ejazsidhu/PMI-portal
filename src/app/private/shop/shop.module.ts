import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';

import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatSelectModule, MatMenuModule, MatIconModule, MatExpansionModule } from '@angular/material';
import { ModalModule } from 'ngx-bootstrap';
import { ShopDetailsComponent } from './shop-details/shop-details.component';

@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    ModalModule.forRoot()
  ],
  declarations: [
    ShopDetailsComponent
  ]
})
export class ShopModule { }
