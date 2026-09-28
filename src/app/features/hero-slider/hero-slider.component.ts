import {
  Component, Input, OnDestroy, OnInit, computed, signal,
} from '@angular/core';

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  templateUrl: './hero-slider.component.html',
  styleUrl: './hero-slider.component.css',
})
export class HeroSliderComponent implements OnInit, OnDestroy {
  @Input({ required: true }) set slides(value: string[]) {
    this._slides.set(value ?? []);
    this.current.set(0);
  }

  /** Thời gian tự động chuyển slide (ms) */
  @Input() autoPlayInterval = 4500;

  private readonly _slides = signal<string[]>([]);
  readonly slideList = this._slides.asReadonly();
  readonly current = signal(0);

  private timer?: ReturnType<typeof setInterval>;

  /** Nhãn hiển thị góc trái của slide hiện tại. */
  readonly label = computed(() => {
    const list = this._slides();
    if (!list.length) return '';
    const i = this.current();
    return `0${i + 1} / SHOE ${i + 1}`;
  });

  readonly trackStyle = computed(() => `translateX(-${this.current() * 100}%)`);

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  goTo(index: number): void {
    const count = this._slides().length;
    if (!count) return;
    this.current.set(((index % count) + count) % count);
    this.restartAutoPlay();
  }

  next(): void { this.goTo(this.current() + 1); }
  prev(): void { this.goTo(this.current() - 1); }

  private startAutoPlay(): void {
    if (this.autoPlayInterval <= 0) return;
    this.timer = setInterval(() => {
      const count = this._slides().length;
      if (count) this.current.update(i => (i + 1) % count);
    }, this.autoPlayInterval);
  }

  private stopAutoPlay(): void {
    if (this.timer) clearInterval(this.timer);
  }

  private restartAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
