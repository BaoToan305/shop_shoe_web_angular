// login.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CookieService } from '../../../core/services/common/cookie.service';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
   private cookieService = inject(CookieService);

  private readonly TOKEN_KEY = 'access_token';
  private readonly REFRESH_KEY = 'refresh_token';


  userName = '';
  passWord = '';
  showPassword = false;
  rememberMe = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.userName || !this.passWord) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin';
      return;
    }

    this.authService.login({ username: this.userName, password: this.passWord }).subscribe({
      next: (response) => {
        if (response.status === 200 && response.data) {


          if(response.data?.accessToken && response.data?.refreshToken){
            this.cookieService.set(this.TOKEN_KEY, response.data.accessToken, 1); 
            this.cookieService.set(this.REFRESH_KEY, response.data.refreshToken, 7);
          }
        
          this.router.navigate(['/']);
        } else {
          this.errorMessage = response.message || 'Sai tài khoản hoặc mật khẩu';
        }
      },
      error: () => {
        this.errorMessage = 'Có lỗi xảy ra. Vui lòng thử lại.';
      }
    });
  }

  onForgotPassword(event: Event) {
    event.preventDefault();
    this.router.navigate(['/forgot-password']);
  }

  onCreateAccount(event: Event) {
    event.preventDefault();
    this.router.navigate(['/register']);
  }

  loginWithGoogle() {
    // TODO: tích hợp OAuth Google sau
  }

  loginWithFacebook() {
    // TODO: tích hợp OAuth Facebook sau
  }
}