import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopDetailsComponent } from './shop-details/shop-details.component';


const routes: Routes = [

  
  // { path: '/:id', redirectTo:'shop-detail' ,pathMatch:'full' },
  {
    path:'',component:ShopDetailsComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
