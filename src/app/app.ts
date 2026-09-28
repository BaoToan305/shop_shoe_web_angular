import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastContainerComponent } from './features/common/toast-notification/toast.container.component';

@Component({
  imports: [RouterOutlet,ToastContainerComponent],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('shoe-shop-web');
}
