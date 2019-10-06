import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddProductComponent} from './components/add-product/add-product.component';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  {path: 'addProduct', component: AddProductComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
