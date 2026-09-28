// toast.model.ts
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type ToastPosition =
  | 'top-right' | 'top-left' | 'top-center'
  | 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  dismissible?: boolean;
  position: ToastPosition;
}

export interface ToastOptions {
  title?: string;
  duration?: number;
  dismissible?: boolean;
  position?: ToastPosition;
}