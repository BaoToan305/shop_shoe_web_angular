// toast.service.ts
import { Injectable, signal } from '@angular/core';
import { Toast, ToastType, ToastOptions, ToastPosition } from '../../models/common/toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private defaultPosition: ToastPosition = 'top-right';
  toasts = signal<Toast[]>([]);

  setDefaultPosition(position: ToastPosition) {
    this.defaultPosition = position;
  }

  show(message: string, type: ToastType = 'info', options?: ToastOptions): string {
    const toast: Toast = {
      id: crypto.randomUUID(),
      type,
      message,
      title: options?.title,
      duration: options?.duration ?? 3000,
      dismissible: options?.dismissible ?? true,
      position: options?.position ?? this.defaultPosition,
    };

    this.toasts.update(list => [...list, toast]);

    if (toast.duration != null && toast.duration > 0) {
      setTimeout(() => this.dismiss(toast.id), toast.duration);
    }
    return toast.id;
  }

  success(message: string, options?: ToastOptions) { return this.show(message, 'success', options); }
  error(message: string, options?: ToastOptions)   { return this.show(message, 'error', options); }
  warning(message: string, options?: ToastOptions) { return this.show(message, 'warning', options); }
  info(message: string, options?: ToastOptions)    { return this.show(message, 'info', options); }

  dismiss(id: string) {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }

  clearAll() {
    this.toasts.set([]);
  }

  // Lấy toast theo từng vị trí để render riêng từng nhóm
  getByPosition(position: ToastPosition) {
    return () => this.toasts().filter(t => t.position === position);
  }
}