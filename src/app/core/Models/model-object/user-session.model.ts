import { BaseModel } from '../common/base.model';

export interface UserSession extends BaseModel {
  user_id: string;
  token_hash: string;
  expires_at: string;
  revoked_at: string | null;
  replaced_by: string | null;
  is_active: number;
}