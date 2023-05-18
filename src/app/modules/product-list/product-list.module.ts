import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductListItemModule } from '../product-list-item/product-list-item.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ProductListComponent],
  imports: [CommonModule, ProductListItemModule, SharedModule],
  exports: [ProductListComponent]
})
export class ProductListModule { }
