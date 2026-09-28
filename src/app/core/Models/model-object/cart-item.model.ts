import { BaseModel } from '../common/base.model';

export interface CartItem extends BaseModel {
  cart_id: string;
  product_variant_id: string;
  quantity: number;
}