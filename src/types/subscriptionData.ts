export interface ModalSubscriptionData {
  service: string;
  subscription_date: string;
  price: number;
  billing_cycle: BillingCycle;
}

export interface DatabaseSubscriptionData extends ModalSubscriptionData {
  id: number;
  user_email: string;
  created_at: string;
}

export type BillingCycle = 'weekly' | 'biweekly' | 'monthly' | 'yearly';
