import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';

import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    PublicRoutingModule,MatInputModule,MatButtonModule,
    MatDialogModule
  ],
  declarations: [LoginComponent],

})
export class PublicModule { }
