import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../services/product.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
  standalone: true,
  imports: [ProductDialogComponent, CommonModule,MatIconModule,MatTableModule,MatButtonModule]
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['name', 'price', 'stock','cityId', 'actions'];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  openDialog(product?: Product): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '400px',
      data: { product: product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }
}
