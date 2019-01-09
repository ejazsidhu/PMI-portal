import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from '../public/layout/navbar/navbar.component';
import { BodyComponent } from './body/body.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


import {NgxPaginationModule} from 'ngx-pagination';
import {CalendarModule} from 'primeng/calendar';
import {AccordionModule} from 'primeng/accordion';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import {FormsModule} from '@angular/forms';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxMatDrpModule } from 'ngx-mat-daterange-picker';
import { ModrenBodyComponent } from './modren-body/modren-body.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ModalModule } from 'ngx-bootstrap';







@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PrivateRoutingModule,
    // BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,

    
    MultiSelectModule,
    DropdownModule,
    NgxPaginationModule,
    CalendarModule,
    AccordionModule,
    Ng2SearchPipeModule,
    NgxMatDrpModule,
    NgbModule,

    ModalModule.forRoot()
  ],
  declarations: [HomeComponent, NavbarComponent, BodyComponent, ModrenBodyComponent, UserProfileComponent]
})
export class PrivateModule { }
