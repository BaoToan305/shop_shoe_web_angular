import { BaseModel } from '../common/base.model';

export interface Category extends BaseModel {
  name: string;
  slug: string | null;
}