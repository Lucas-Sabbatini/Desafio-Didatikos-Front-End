import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent {
  productForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product?: Product }
  ) {
    this.isEditMode = !!data.product;
    this.productForm = this.fb.group({
      name: [data.product?.name || '', Validators.required],
      price: [data.product?.price || 0, [Validators.required, Validators.min(0)]],
      stock: [data.product?.stock || 0, [Validators.required, Validators.min(0)]],
      cityId: [data.product?.cityId|| 0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      if (this.isEditMode && this.data.product) {
        this.productService.updateProduct(this.data.product.id, productData).subscribe({
          next: () => this.dialogRef.close(true),
          error: (error) => console.error('Error updating product:', error)
        });
      } else {
        this.productService.createProduct(productData).subscribe({
          next: () => this.dialogRef.close(true),
          error: (error) => console.error('Error creating product:', error)
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
