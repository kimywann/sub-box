import { useState } from 'react';
import { OttService, MusicService, AiService, EtcService, ServiceType } from '../../constants/serviceCategory';
import ModalSubscriptionForm from './ModalSubscriptionForm';
import ModalCustomForm from './ModalCustomForm';
import ServiceCategory from './ServiceCategory';
import { ModalSubscriptionData } from '../../types/subscriptionData';

interface ServiceBoxProps {
  onSaveSubscription?: (data: ModalSubscriptionData) => void;
}

const ServiceBox = ({ onSaveSubscription }: ServiceBoxProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isCustomService, setIsCustomService] = useState(false);

  const handleServiceClick = (service: ServiceType) => {
    setSelectedService(service);
    setIsCustomService(false);
    setIsModalOpen(true);
  };

  const handleCustomServiceClick = () => {
    setIsCustomService(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsCustomService(false);
  };

  const handleSaveSubscription = (data: ModalSubscriptionData) => {
    if (onSaveSubscription) {
      onSaveSubscription(data);
    }
    handleCloseModal();
  };

  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mt-8 mb-6">
          <ServiceCategory title="OTT" services={OttService} onServiceClick={handleServiceClick} />
          <ServiceCategory title="Music" services={MusicService} onServiceClick={handleServiceClick} />
          <ServiceCategory title="AI" services={AiService} onServiceClick={handleServiceClick} />
          <ServiceCategory
            title="Etc"
            services={EtcService}
            onServiceClick={handleServiceClick}
            showCustomButton={true}
            onCustomClick={handleCustomServiceClick}
          />
        </div>
      </div>

      {/* 커스텀 서비스 입력 모달 */}
      <ModalCustomForm
        isOpen={isCustomService}
        onClose={handleCloseModal}
        onSubmit={(customService) => {
          setSelectedService(customService);
          setIsCustomService(false);
        }}
      />

      {selectedService && !isCustomService && (
        <ModalSubscriptionForm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          service={selectedService}
          onSave={handleSaveSubscription}
        />
      )}
    </>
  );
};

export default ServiceBox;
