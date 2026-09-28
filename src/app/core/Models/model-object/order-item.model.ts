import { BaseModel } from '../common/base.model';

export interface OrderItem extends BaseModel {
  order_id: string;
  product_variant_id: string;
  product_name: string;
  size: string;
  color: string;
  unit_price: number;
  quantity: number;
}