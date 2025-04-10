import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../../services/product.service';
import { CityService, City } from '../../../services/city.service';
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
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {
  productForm: FormGroup;
  isEditMode: boolean;
  cities: City[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private cityService: CityService,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product?: Product }
  ) {
    this.isEditMode = !!data.product;
    this.productForm = this.fb.group({
      name: [data.product?.name || '', Validators.required],
      price: [data.product?.price || 0, [Validators.required, Validators.min(0)]],
      stock: [data.product?.stock || 0, [Validators.required, Validators.min(0)]],
      cityId: [data.product?.cityId || null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities(): void {
    this.cityService.getCities().subscribe({
      next: (cities) => {
        this.cities = cities;
      },
      error: (error) => {
        console.error('Error loading cities:', error);
      }
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
