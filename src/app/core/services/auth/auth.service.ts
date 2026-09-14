// features/auth/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../common/api.service';
import { CookieService } from '../common/cookie.service';
import { AuthEndpoints } from '../../../endpoint/auth-endpoints'
import { LoginResponse } from '../../Models/ResquestResponse/Login/login-response';
import { LoginResquest } from '../../Models/ResquestResponse/Login/login-request';
import { BaseResponse } from '../../Models/Common/base-response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(ApiService);
  private cookieService = inject(CookieService);

  private readonly TOKEN_KEY = 'access_token';
  private readonly REFRESH_KEY = 'refresh_token';


  login(request: LoginResquest): Observable<BaseResponse<LoginResponse>> {
    return this.api.post<BaseResponse<LoginResponse>>(
      AuthEndpoints.login,
      request
    );
  }

  logout(): void {
    this.cookieService.delete(this.TOKEN_KEY);
    this.cookieService.delete(this.REFRESH_KEY);
  }

  getAccessToken(): string | null {
    return this.cookieService.get(this.TOKEN_KEY);
  }
}