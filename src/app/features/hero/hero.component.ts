import { Component, Input } from '@angular/core';
import { HeroSliderComponent } from '../hero-slider/hero-slider.component';

interface HeroStat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [HeroSliderComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  @Input({ required: true }) slides: string[] = [];

  readonly stats: HeroStat[] = [
    { value: '12k+', label: 'đôi đã bán tuần này' },
    { value: '4.9/5', label: 'đánh giá từ khách' },
    { value: '24h', label: 'giao hàng nội thành' },
  ];
}
