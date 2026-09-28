// toast-container.component.ts
import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { ToastService } from '../../../core/services/common/toast.service';
import { ToastPosition } from '../../../core/models/common/toast.model';

const POSITIONS: ToastPosition[] = [
  'top-right', 'top-left', 'top-center',
  'bottom-right', 'bottom-left', 'bottom-center',
];

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    @for (position of positions; track position) {
      @if (grouped()[position]?.length) {
        <div class="toast-zone toast-zone--{{ position }}">
          <div class="toast-list" [@toastAnim]="grouped()[position].length">
            @for (toast of grouped()[position]; track toast.id) {
              <div class="toast toast--{{ toast.type }}">
                @if (toast.title) { <strong class="toast__title">{{ toast.title }}</strong> }
                <span class="toast__message">{{ toast.message }}</span>
                @if (toast.dismissible) {
                  <button class="toast__close" (click)="toastService.dismiss(toast.id)">&times;</button>
                }
              </div>
            }
          </div>
        </div>
      }
    }
  `,
  styleUrl: './toast-container.component.scss'  ,
  animations: [
    trigger('toastAnim', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-16px) scale(0.95)' }),
          stagger(80, [
            animate('220ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
          ])
        ], { optional: true }),
        query(':leave', [
          animate('180ms ease-in',
            style({ opacity: 0, transform: 'translateX(40px)' }))
        ], { optional: true }),
      ])
    ])
  ]
})
export class ToastContainerComponent {
  toastService = inject(ToastService);
  positions = POSITIONS;

  grouped = computed(() => {
    const map: Record<string, any[]> = {};
    for (const p of this.positions) {
      map[p] = this.toastService.toasts().filter(t => t.position === p);
    }
    return map;
  });
}