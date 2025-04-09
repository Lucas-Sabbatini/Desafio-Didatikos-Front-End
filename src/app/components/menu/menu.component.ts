import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <div class="menu-container">
      <mat-card class="menu-card">
        <mat-card-header>
          <mat-card-title>Menu Principal</mat-card-title>
        </mat-card-header>
        <mat-card-content class="menu-content">
          <button mat-raised-button color="primary" routerLink="/users">
            Gerenciamento de Usuários
          </button>
          <button mat-raised-button color="primary" routerLink="/products">
            Gerenciamento de Produtos
          </button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .menu-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }
    .menu-card {
      width: 100%;
      max-width: 400px;
      padding: 2rem;
    }
    .menu-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem 0;
    }
    button {
      width: 100%;
    }
  `]
})
export class MenuComponent {} 