import { useRouteGuard } from '../hooks/useRouteGuard';
import { useAuth } from '../hooks/useAuth';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';

import { DatabaseSubscriptionData } from '../types/subscriptionData';
import { ModalSubscriptionData } from '../types/subscriptionData';
import { OttService, MusicService, ServiceType } from '../constants/serviceCategory';
import { AiService, EtcService } from '../constants/serviceCategory';

import ServiceBox from '../components/ServiceBox';
import TotalPrice from '../components/TotalPrice';
import SubscriptionModal from '../components/modal/SubscriptionModal';

const MySubscriptions = () => {
  useRouteGuard();
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<DatabaseSubscriptionData[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState<ModalSubscriptionData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSaveSubscription = async (data: ModalSubscriptionData) => {
    try {
      const subscriptionData = {
        user_email: user?.email || '',
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
      loadSubscriptions();
    } catch (error) {
      console.error('에러:', error);
    }
  };

  const handleDeleteSubscription = async (id: number) => {
    try {
      const { error } = await supabase.from('subscriptions').delete().eq('id', id);

      if (error) {
        console.error('구독 삭제 에러:', error);
        return;
      }
      loadSubscriptions();
    } catch (error) {
      console.error('에러:', error);
    }
  };

  const handleEditSubscription = (subscription: ModalSubscriptionData) => {
    setSelectedSubscription(subscription);
    setIsModalOpen(true);
  };

  const handleSaveEditedSubscription = async (data: ModalSubscriptionData) => {
    await handleSaveSubscription(data);
    setIsModalOpen(false);
  };

  // 서비스 이름으로 ServiceType 객체 찾기
  const findServiceByName = (serviceName: string): ServiceType => {
    const allServices = [...OttService, ...MusicService, ...AiService, ...EtcService];
    const foundService = allServices.find((service) => service.name === serviceName);

    if (!foundService) {
      // 서비스를 찾지 못한 경우 이미지 없이 이름만 반환
      return { name: serviceName, image: '' };
    }

    return foundService;
  };

  return (
    <>
      {user && (
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-2xl font-bold">안녕하세요, {user.email}님!</h1>
          <p className="mb-4 font-medium text-gray-400">서비스를 선택하여 구독 정보를 등록하세요.</p>
        </div>
      )}
      <ServiceBox onSaveSubscription={handleSaveSubscription} />
      <TotalPrice subscriptions={subscriptions} onDelete={handleDeleteSubscription} onEdit={handleEditSubscription} />

      {selectedSubscription && (
        <SubscriptionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          service={findServiceByName(selectedSubscription.service)}
          onSave={handleSaveEditedSubscription}
          initialData={selectedSubscription}
        />
      )}
    </>
  );
};

export default MySubscriptions;
