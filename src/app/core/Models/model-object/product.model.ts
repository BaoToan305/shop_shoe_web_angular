import { BaseModel } from '../common/base.model';

export interface Product extends BaseModel {
  name: string;
  brand_id: string;
  category_id: string;
  slug?: string | null;
  description?: string | null;
  price: number;
  gender?: number | null;
  is_active: number;
  imageUrl: string
}