import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProductFormComponent } from './components/product-form/product-form.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';

const MATERIAL_MODULE = [
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  MatInputModule,
];

@NgModule({
  declarations: [
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    ...[MATERIAL_MODULE]
  ],
  exports: [
    NgxSpinnerModule,
    ...[MATERIAL_MODULE]
  ]
})
export class SharedModule { }
