import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListItemComponent } from './component/product-list-item/product-list-item.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ProductListItemComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ProductListItemComponent]
})
export class ProductListItemModule { }
