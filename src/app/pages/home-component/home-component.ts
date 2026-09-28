import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../core/models/model-object/product.model';
import { Category } from '../../core/models/model-object/category.model';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastService } from '../../core/services/common/toast.service';
 
import { HeroComponent } from '../../features/hero/hero.component';
import { FiltersComponent } from '../../features/filters/filters.component';
import { ProductGridComponent } from '../../features/product-grid/product-grid.component';
import { InfoStripComponent } from '../../features/info-strip/info-strip.component';


@Component({
  imports: [
    HeroComponent,
    FiltersComponent,
    ProductGridComponent,
    InfoStripComponent
  ],
  selector: 'app-home-component',
  styleUrl: './home-component.scss',
  templateUrl: './home-component.html',
})
export class HomeComponent {
  private cartService = inject(CartService);
  private toast = inject(ToastService);

  readonly products = signal<Product[]>([]);
  readonly slides = signal<string[]>([
    '/images/shoe_1.png',
    '/images/shoe_2.png',
    '/images/shoe_3.png',
    '/images/shoe_4.png',
  ]);

  readonly categories = signal<Category[]>([]);
  readonly activeCategory = signal<Category | null>(null);

  readonly filteredProducts = computed(() => {
    const category = this.activeCategory();
    const all = this.products();
    return category === null ? all : all.filter(p => p.category_id === category.id);
  });

  onCategoryChange(category: Category | null): void {
    this.activeCategory.set(category);
  }

  onAddToCart(product: Product): void {
    this.cartService.addItem(product);
    this.toast.show('Đã thêm vào giỏ hàng');
  }
}

