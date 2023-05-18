import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/core/interfaces/product.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  ngOnInit(): void {
    if(this.data) {
      this.productForm.patchValue(this.data.item);
    }
    if (this.data?.mode === 'view') this.disableAllControls();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      // Process the form data and save the product
      this.dialogRef.close(this.productForm.value);
    }
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }

  disableAllControls() {
    this.isEditMode = false;
    if (this.productForm.controls) {
      Object.keys(this.productForm.controls).forEach(controlName => {
        this.productForm?.get(controlName)?.disable();
      });
    }  
  }

  editMode() {
    this.isEditMode = true;
    if (this.productForm.controls) {
      Object.keys(this.productForm.controls).forEach(controlName => {
        this.productForm?.get(controlName)?.enable();
      });
    }
  }

}
