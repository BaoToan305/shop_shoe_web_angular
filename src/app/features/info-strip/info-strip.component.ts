import { Component } from '@angular/core';

interface InfoItem {
  title: string;
  description: string;
}

@Component({
  selector: 'app-info-strip',
  standalone: true,
  templateUrl: './info-strip.component.html',
  styleUrl: './info-strip.component.css',
})
export class InfoStripComponent {
  readonly items: InfoItem[] = [
    { title: 'Giao hàng 48 giờ', description: 'Áp dụng tại các thành phố lớn, freeship cho đơn từ 500.000đ.' },
    { title: 'Đổi trả trong 14 ngày', description: 'Chưa vừa chân, chưa hợp phong cách — đổi mới miễn phí lần đầu.' },
    { title: 'Bảo hành đế giày 6 tháng', description: 'Lỗi keo, lỗi đường chỉ được xử lý miễn phí trong thời hạn bảo hành.' },
  ];
}
