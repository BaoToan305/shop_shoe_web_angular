import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Category } from '../../core/models/model-object/category.model';

@Component({
  selector: 'app-filters',
  standalone: true,
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  @Input() categories: Category[] = [];
  @Output() categoryChange = new EventEmitter<Category | null>();

  readonly active = signal<string | null>(null);

  select(category: Category | null): void {
    this.active.set(category?.id ?? null);
    this.categoryChange.emit(category);
  }
}
