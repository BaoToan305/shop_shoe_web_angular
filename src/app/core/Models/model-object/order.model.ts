import { BaseModel } from '../common/base.model';

export interface Order extends BaseModel {
  user_id: string;
  address_id: string;
  order_code: string;
  status: number;
  payment_method: number;
  payment_status: number;
  subamount: number;
  discount_amount: number;
  total_amount: number;
  notes: string | null;
}