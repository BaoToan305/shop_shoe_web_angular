import { BaseModel } from '../common/base.model';

export interface Address extends BaseModel {
  user_id: string;
  recipient_name: string;
  phone: string;
  province: string;
  district: string;
  ward: string | null;
  detail_address: string;
  is_default: number;
}