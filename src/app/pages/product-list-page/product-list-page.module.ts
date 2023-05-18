import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListModule } from 'src/app/modules/product-list/product-list.module';
import { ProductListPageRoutingModule } from './product-list-page-routing.module';
import { ProductListPageComponent } from './components/product-list-page/product-list-page.component';



@NgModule({
  declarations: [
    ProductListPageComponent
  ],
  imports: [
    CommonModule,
    ProductListModule,
    ProductListPageRoutingModule,
  ],
  exports: [ProductListPageComponent]
})
export class ProductListPageModule { }
