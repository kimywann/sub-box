import { useRouteGuard } from '../hooks/useRouteGuard';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

import { SubscriptionData } from '../types/subscriptionData';

import ServiceBox from '../components/ServiceBox';
import TotalPrice from '../components/TotalPrice';

const MySubscriptions = () => {
  useRouteGuard();
  const { user } = useAuth();
  // 구독 정보를 저장할 상태 추가
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);

  // 구독 정보 저장 함수
  const handleSaveSubscription = (data: SubscriptionData) => {
    // 이미 존재하는 서비스인 경우 업데이트, 아니면 추가
    setSubscriptions((prev) => {
      const existingIndex = prev.findIndex((sub) => sub.service === data.service);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = data;
        return updated;
      } else {
        return [...prev, data];
      }
    });
  };

  return (
    <>
      {user && (
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-2xl font-bold">안녕하세요, {user.email}님!</h1>
        </div>
      )}
      <ServiceBox onSaveSubscription={handleSaveSubscription} />
      <TotalPrice subscriptions={subscriptions} />
    </>
  );
};

export default MySubscriptions;
