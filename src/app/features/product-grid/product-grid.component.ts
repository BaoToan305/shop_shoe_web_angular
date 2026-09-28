import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../core/models/model-object/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css',
})
export class ProductGridComponent {
  @Input({ required: true }) products: Product[] = [];
  @Input() title = 'Sản phẩm nổi bật';
  @Output() addToCart = new EventEmitter<Product>();
}
