import { BaseModel } from '../common/base.model';

export interface Brand extends BaseModel {
  name: string;
  logo_url: string | null;
  description: string | null;
}