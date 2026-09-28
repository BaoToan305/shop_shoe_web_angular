import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Product } from '../../core/models/model-object/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  /** true trong ~0.9s sau khi bấm, để đổi nhãn nút thành "Đã thêm ✓" */
  readonly justAdded = signal(false);

  formatVND(value: number): string {
    return value.toLocaleString('vi-VN') + 'đ';
  }

  onAdd(): void {
    this.addToCart.emit(this.product);
    this.justAdded.set(true);
    setTimeout(() => this.justAdded.set(false), 900);
  }
}
