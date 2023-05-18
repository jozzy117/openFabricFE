import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/core/interfaces/product.interface';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductFormComponent } from 'src/app/modules/shared/components/product-form/product-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  singleProduct!: Product;

  constructor(
    private dialog: MatDialog,
    private productService: ProductsService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProductList().subscribe(res => {
      this.products = res
    })
  }

  createProduct(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if(!result) return;
      this.productService.createProduct(result).subscribe(res => {
        this.toastr.success('Added Successfully', 'Product');
        this.getProducts();
      })
    });
  }

  viewProduct(product: Product) {
    this.singleProduct = product;
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      data: {
        item: product,
        mode: 'view'
      }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if(!result) return;
      this.productService.updateProduct(this.singleProduct.id, result).subscribe(res => {
        this.toastr.success('Updated Successfully', 'Product');
        this.getProducts();
      })
    });
    
  }

}
