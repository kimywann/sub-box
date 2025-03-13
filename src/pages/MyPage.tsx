import { useAuth } from '@hooks/useAuth';
import { useState, useEffect, useCallback } from 'react';

import { supabase } from '@/supabaseClient';

import { User } from '@/types/user';
import { Subscription } from '@/types/subscription';
import { Service } from '@/types/service';
import { SERVICES } from '@constants/serviceCategory';

import { useAtom } from 'jotai';
import { MySubscriptionsAtom } from '@/store/subscriptionAtoms';

import ServiceBox from '@/components/subscription/service/ServiceBox';
import SubscriptionList from '@/components/subscription/my/SubscriptionList';

import ModalSubscriptionForm from '@/components/subscription/modal/ModalSubscriptionForm';

import Home from '@pages/Home';
import SubscriptionSummary from '@/components/subscription/my/SubscriptionSummary';

const MyPage = () => {
  const { user } = useAuth();

  const [subscriptions, setSubscriptions] = useState<User[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [, setMySubscriptions] = useAtom(MySubscriptionsAtom);

  const loadSubscriptions = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('subscriptions').select('*').eq('user_email', user?.email);

      if (error) {
        console.error('구독 정보 로딩 에러:', error);
        return;
      }

      if (data) {
        setSubscriptions(data);
        setMySubscriptions(data);
      }
    } catch (error) {
      console.error('에러:', error);
    }
  }, [user?.email, setMySubscriptions]);

  useEffect(() => {
    if (user?.email) {
      loadSubscriptions();
    }
  }, [user?.email, loadSubscriptions]);

  const handleSaveSubscription = async (data: Subscription) => {
    try {
      const subscriptionData = {
        user_email: user?.email || '',
        service: data.service,
        subscription_date: data.subscription_date,
        price: data.price,
        billing_cycle: data.billing_cycle,
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

  const handleEditSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubscription(null);
  };

  const handleSaveEditedSubscription = async (data: Subscription) => {
    await handleSaveSubscription(data);
    handleCloseModal();
  };

  const findServiceByName = (serviceName: string): Service => {
    const allServices = Object.values(SERVICES).flat();
    const foundService = allServices.find((service) => service.name === serviceName);

    if (!foundService) {
      return { name: serviceName, image: '' };
    }

    return foundService;
  };

  return (
    <div className="mx-auto max-w-6xl">
      {user ? (
        <>
          <span className="mb-4 text-2xl font-bold md:text-3xl">안녕하세요, {user.email}님!</span>
          <p className="mb-4 text-sm font-medium text-gray-400 md:text-xl">서비스를 선택하여 구독 정보를 등록하세요.</p>
          <SubscriptionSummary />
          <ServiceBox onSaveSubscription={handleSaveSubscription} />
          <SubscriptionList
            subscriptions={subscriptions}
            onDelete={handleDeleteSubscription}
            onEdit={handleEditSubscription}
          />
        </>
      ) : (
        <Home />
      )}

      {selectedSubscription && (
        <ModalSubscriptionForm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          service={findServiceByName(selectedSubscription.service)}
          onSave={handleSaveEditedSubscription}
          initialData={selectedSubscription}
        />
      )}
    </div>
  );
};

export default MyPage;
