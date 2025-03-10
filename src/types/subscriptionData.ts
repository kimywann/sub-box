export interface SubscriptionData {
  service: string;
  subscription_date: string;
  price: number;
  billing_cycle: BillingCycle;
}

export interface User extends SubscriptionData {
  id: number;
  user_email: string;
  created_at: string;
}

export type BillingCycle = 'weekly' | 'biweekly' | 'monthly' | 'yearly';
