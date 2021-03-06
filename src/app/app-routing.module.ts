import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // {
  //   path:'login',
  //   loadChildren:'./public/public.module#PublicModule',
  //   //  canActivate:[AuthGuard] 
  // },

  {
    path: 'home',
    loadChildren: './private/private.module#PrivateModule',
  }

  ,
  {
    path: 'shop/:id',
    loadChildren: './private/shop/shop.module#ShopModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
