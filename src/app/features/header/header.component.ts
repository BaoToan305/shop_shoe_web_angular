import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private cartService = inject(CartService);
  readonly cartCount = this.cartService.totalQuantity;

  openCart(): void {
    this.cartService.openDrawer();
  }
}
