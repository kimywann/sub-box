import { User } from '@type/user';
import { getYearlyPaymentCount } from '@utils/date';

export const calculateMonthlyTotal = (subscriptions: User[]): number => {
  return subscriptions.reduce((total, subscription) => total + subscription.price, 0);
};

export const calculateYearlyTotal = (subscriptions: User[]): number => {
  return subscriptions.reduce((total, subscription) => {
    const yearlyCount = getYearlyPaymentCount(subscription.billing_cycle);

    return total + subscription.price * yearlyCount;
  }, 0);
};
