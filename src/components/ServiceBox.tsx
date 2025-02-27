import { useState } from 'react';
import { OttService } from '../constants/serviceCategory';
import SubscriptionModal from './modal/SubscriptionModal';
import { SubscriptionData } from '../types/subscriptionData';
interface ServiceBoxProps {
  onSaveSubscription?: (data: SubscriptionData) => void;
}

const ServiceBox = ({ onSaveSubscription }: ServiceBoxProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<(typeof OttService)[0] | null>(null);

  const handleServiceClick = (service: (typeof OttService)[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleSaveSubscription = (data: SubscriptionData) => {
    if (onSaveSubscription) {
      onSaveSubscription(data);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mt-16 mb-6">
          <h2 className="mb-4 text-xl font-bold text-gray-800">OTT</h2>
          <div className="flex flex-row gap-4 overflow-x-auto pb-4">
            {OttService.map((service) => (
              <div
                key={service.name}
                className="flex h-32 w-32 flex-shrink-0 flex-col items-center justify-center rounded-md border border-gray-300 p-6 transition-colors hover:border-blue-500 hover:shadow-md"
                onClick={() => handleServiceClick(service)}
              >
                <img src={service.image} alt={service.name} className="h-16 w-16 cursor-pointer object-contain" />
                <span className="mt-2 text-sm">{service.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedService && (
        <SubscriptionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          service={selectedService}
          onSave={handleSaveSubscription}
        />
      )}
    </>
  );
};

export default ServiceBox;
