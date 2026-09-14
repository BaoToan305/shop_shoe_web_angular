export interface LoginResponse {
userId?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  roleId?: string;
  isActive: number;
  accessToken?: string;
  refreshToken?: string;
  expiresIn: number;
}