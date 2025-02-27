import { useRouteGuard } from '../hooks/useRouteGuard';
import { useAuth } from '../hooks/useAuth';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';

import { SubscriptionData } from '../types/subscriptionData';

import ServiceBox from '../components/ServiceBox';
import TotalPrice from '../components/TotalPrice';

const MySubscriptions = () => {
  useRouteGuard();
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);

  const loadSubscriptions = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('subscriptions').select('*').eq('user_email', user?.email);

      if (error) {
        console.error('구독 정보 로딩 에러:', error);
        return;
      }

      if (data) {
        setSubscriptions(data);
      }
    } catch (error) {
      console.error('에러:', error);
    }
  }, [user?.email]);

  useEffect(() => {
    if (user?.email) {
      loadSubscriptions();
    }
  }, [user?.email, loadSubscriptions]);

  // 새로운 구독 저장 함수
  const handleSaveSubscription = async (data: SubscriptionData) => {
    try {
      const subscriptionData = {
        user_email: user?.email,
        service: data.service,
        subscription_date: data.subscription_date,
        price: data.price,
      };

      const { error } = await supabase.from('subscriptions').upsert([subscriptionData], {
        onConflict: 'user_email,service',
      });

      if (error) {
        console.error('구독 저장 에러:', error);
        return;
      }

      // 저장 성공 후 목록 새로고침
      loadSubscriptions();
    } catch (error) {
      console.error('에러:', error);
    }
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
