import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartDisplayItem } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  @Input({ required: true }) item!: CartDisplayItem;

  @Output() quantityChange = new EventEmitter<{ productId: string; delta: number }>();
  @Output() remove = new EventEmitter<string>();

  get lineTotal(): number {
    return this.item.product.price * this.item.quantity;
  }

  formatVND(value: number): string {
    return value.toLocaleString('vi-VN') + 'đ';
  }

  changeQty(delta: number): void {
    this.quantityChange.emit({ productId: this.item.product.id, delta });
  }

  onRemove(): void {
    this.remove.emit(this.item.product.id);
  }
}
