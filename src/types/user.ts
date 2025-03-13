import { Subscription } from '@/types/subscription';

export interface User extends Subscription {
  id: number;
  user_email: string;
  created_at: string;
}
