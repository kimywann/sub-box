import { useState } from 'react';

import { Service } from '@type/service';
import { Subscription } from '@type/subscription';

import { SERVICES } from '@/constants/serviceCategory';

import ModalSubscriptionForm from '@/components/subscription/modal/ModalSubscriptionForm';
import ModalCustomForm from '@/components/subscription/modal/ModalCustomForm';

import ServiceCategory from '@/components/subscription/service/ServiceCategory';

interface ServiceBoxProps {
  onSaveSubscription?: (data: Subscription) => void;
}

const ServiceBox = ({ onSaveSubscription }: ServiceBoxProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isCustomService, setIsCustomService] = useState(false);

  const selectService = (service: Service) => {
    setSelectedService(service);
    setIsCustomService(false);
    setIsModalOpen(true);
  };

  const selectCustomService = () => {
    setIsCustomService(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsCustomService(false);
  };

  const saveSubscription = (data: Subscription) => {
    if (onSaveSubscription) {
      onSaveSubscription(data);
    }
    closeModal();
  };

  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mt-8 mb-6">
          <ServiceCategory title="OTT" services={SERVICES.OTT} onClick={selectService} />
          <ServiceCategory title="Music" services={SERVICES.MUSIC} onClick={selectService} />
          <ServiceCategory title="AI" services={SERVICES.AI} onClick={selectService} />
          <ServiceCategory
            title="Etc"
            services={SERVICES.ETC}
            onClick={selectService}
            showCustomButton={true}
            onCustomClick={selectCustomService}
          />
        </div>
      </div>

      <ModalCustomForm
        isOpen={isCustomService}
        onClose={closeModal}
        onSubmit={(customService) => {
          setSelectedService(customService);
          setIsCustomService(false);
        }}
      />

      {selectedService && !isCustomService && (
        <ModalSubscriptionForm
          isOpen={isModalOpen}
          onClose={closeModal}
          service={selectedService}
          onSave={saveSubscription}
        />
      )}
    </>
  );
};

export default ServiceBox;
