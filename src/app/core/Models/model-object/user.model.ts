import { BaseModel } from '../common/base.model';

export interface User extends BaseModel {
  full_name: string;
  user_name: string;
  password: string;
  email: string | null;
  phone: string | null;
  role_id: string;
  is_active: number;
}