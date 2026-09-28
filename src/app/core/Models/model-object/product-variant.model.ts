import { BaseModel } from '../common/base.model';

export interface ProductVariant extends BaseModel {
  product_id: string;
  sku: string;
  size: string;
  color: string;
  price_modifier: number;
  stock_quantity: number;
  is_active: number;
}