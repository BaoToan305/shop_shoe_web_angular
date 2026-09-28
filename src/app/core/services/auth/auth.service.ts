// features/auth/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../common/api.service';
import { CookieService } from '../common/cookie.service';
import { AuthEndpoints } from '../../../endpoint/endpoints'
import { LoginResponse } from '../../models/ResquestResponse/Login/login-response';
import { LoginResquest } from '../../models/ResquestResponse/Login/login-request';
import { RegistRequest } from '../../models/ResquestResponse/Regist/regist-request';
import { BaseResponse } from '../../models/common/base-response';
import { RefreshTokenResponse } from '../../models/ResquestResponse/RefreshToken/refresh-token-response';
import { RefreshTokenRequest } from '../../models/ResquestResponse/RefreshToken/refresh-token-request';

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

  register(request: RegistRequest): Observable<BaseResponse<void>> {
    return this.api.post<BaseResponse<void>>(
      AuthEndpoints.register,
      request
    );
  }

  refreshToken(): Observable<BaseResponse<RefreshTokenResponse>> {

     const request: RefreshTokenRequest = {
    refreshToken: this.cookieService.get(this.REFRESH_KEY)!
  };

     return this.api.post<BaseResponse<RefreshTokenResponse>>(
    AuthEndpoints.refreshToken,
    request
  ).pipe(
    tap(res => {
      if (res.status === 200 && res.data){
        this.cookieService.set(this.TOKEN_KEY, res.data.accessToken, 1);
        this.cookieService.set(this.REFRESH_KEY, res.data.refreshToken, 7);
      }
      
    })
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