export interface Subscription {
  service: string;
  subscription_date: string;
  price: number;
  billing_cycle: BillingCycle;
}

export type BillingCycle = 'weekly' | 'biweekly' | 'monthly' | 'yearly';
