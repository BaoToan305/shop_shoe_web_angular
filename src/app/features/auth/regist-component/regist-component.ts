import  { Component, EventEmitter, Input, Output }  from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastService } from '../../../core/services/common/toast.service';


@Component({
  imports: [FormsModule],
  selector: 'app-regist-component',
  styleUrl: './regist-component.scss',
  templateUrl: './regist-component.html',
})
export class RegistComponent {


 constructor(
    private authService: AuthService,
    private toastService: ToastService,
  ) {}

  username: string = '';
  password: string = '';
  email: string = '';
  fullName: string = '';
  confirmPassword: string = '';
  phoneNumber: string = '';
  invalidFields = {
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
    fullName: false,
    phoneNumber: false,
  };

  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<void>();
  @Output() loginClick = new EventEmitter<void>();

  onClose() { this.closed.emit(); }
  onLogin() { this.loginClick.emit(); }

  clearFieldError(field: keyof typeof this.invalidFields) {
    this.invalidFields = {
      ...this.invalidFields,
      [field]: false,
    };
  }


  OnCreate() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernamePattern = /^[A-Za-z0-9._-]+$/;
    const fullNamePattern = /^[\p{L} ]+$/u;
    const phonePattern = /^0\d{9,10}$/;

    this.invalidFields = {
      email: !this.email.trim() || !emailPattern.test(this.email.trim()),
      username: !this.username.trim() || this.username.trim().length > 255 || !usernamePattern.test(this.username.trim()),
      password: this.password.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(this.password),
      confirmPassword: this.password !== this.confirmPassword,
      fullName: !this.fullName.trim() || !fullNamePattern.test(this.fullName.trim()),
      phoneNumber: !phonePattern.test(this.phoneNumber.trim()),
    };

    if (this.invalidFields.email) {
      this.toastService.error('Vui lòng nhập email hợp lệ.');
      return;
    }
    if (this.invalidFields.username) {
      this.toastService.error('Tên tài khoản phải có ít nhất 3 ký tự và không được vượt quá 255 ký tự.');
      return;
    }
    if (this.invalidFields.password) {
      this.toastService.error('Mật khẩu cần ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số.');
      return;
    }
    if (this.invalidFields.confirmPassword) {
      this.toastService.error('Mật khẩu xác nhận không khớp.');
      return;
    }
    if (this.invalidFields.fullName) {
      this.toastService.error('Vui lòng nhập họ tên hợp lệ.');
      return;
    }
    if (this.invalidFields.phoneNumber) {
      this.toastService.error('Số điện thoại phải bắt đầu bằng 0 và có 10 hoặc 11 chữ số.');
      return;
    }

    this.authService.register({
      username: this.username,
      password: this.password,
      email: this.email,
      fullName: this.fullName,
      confirmPassword: this.confirmPassword,
      phoneNumber: this.phoneNumber

    }).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.toastService.success('Đăng ký tài khoản thành công.');
          this.submitted.emit();
          this.closed.emit();
        } else {
          this.toastService.error(response.message);
        }
      },
      error: (error) => {
        console.error('Registration failed', error);
        const message = error?.error?.message || error?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
        this.toastService.error(message);
      }
    });
  }
}
