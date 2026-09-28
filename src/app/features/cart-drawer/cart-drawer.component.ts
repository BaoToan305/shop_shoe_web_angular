import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastService } from '../../core/services/common/toast.service';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CartItemComponent],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.css',
})
export class CartDrawerComponent {
  private cartService = inject(CartService);
  private toast = inject(ToastService);

  readonly items = this.cartService.items;
  readonly isOpen = this.cartService.isOpen;
  readonly isEmpty = this.cartService.isEmpty;
  readonly subtotal = this.cartService.subtotal;

  formatVND(value: number): string {
    return value.toLocaleString('vi-VN') + 'đ';
  }

  close(): void { this.cartService.closeDrawer(); }

  onQuantityChange(event: { productId: string; delta: number }): void {
    this.cartService.changeQuantity(event.productId, event.delta);
  }

  onRemove(productId: string): void {
    this.cartService.removeItem(productId);
  }

  checkout(): void {
    // TODO: gọi API tạo đơn hàng của shoe_shop_productAPI ở đây
    this.toast.show('Đang chuyển tới trang thanh toán…');
  }
}
