import { atom } from 'jotai';

import { User } from '@/types/user';
import { calculateMonthlyTotal, calculateYearlyTotal } from '@/utils/subscriptionCalculator';

export const MySubscriptionsAtom = atom<User[]>([]);

export const subscriptionSummaryAtom = atom((get) => {
  const subscriptions = get(MySubscriptionsAtom);

  const count = subscriptions.length;

  const services = subscriptions.map((sub) => sub.service);

  const monthlyTotal = calculateMonthlyTotal(subscriptions);
  const yearlyTotal = calculateYearlyTotal(subscriptions);

  return {
    count,
    services,
    monthlyTotal,
    yearlyTotal,
  };
});

export const subscriptionCountAtom = atom((get) => get(subscriptionSummaryAtom).count);

export const subscriptionServicesAtom = atom((get) => get(subscriptionSummaryAtom).services);

export const totalMonthlyPriceAtom = atom((get) => get(subscriptionSummaryAtom).monthlyTotal);

export const totalYearlyPriceAtom = atom((get) => get(subscriptionSummaryAtom).yearlyTotal);
