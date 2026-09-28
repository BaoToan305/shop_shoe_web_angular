import { Component } from '@angular/core';
import { HeaderComponent } from '../../features/header/header.component';
import { FooterComponent } from '../../features/footer/footer.component';
import { CartDrawerComponent } from '../../features/cart-drawer/cart-drawer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [
    HeaderComponent,
    FooterComponent,
    CartDrawerComponent,
    RouterOutlet
  ],
  selector: 'app-shop-component',
  styleUrl: './shop-component.scss',
  templateUrl: './shop-component.html',
})
export class ShopComponent {}
