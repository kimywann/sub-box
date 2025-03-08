import { useState } from 'react';
import { OttService, MusicService, AiService, EtcService, ServiceType } from '../../constants/serviceCategory';
import SubscriptionModal from './modal/SubscriptionModal';
import { ModalSubscriptionData } from '../../types/subscriptionData';

interface ServiceBoxProps {
  onSaveSubscription?: (data: ModalSubscriptionData) => void;
}

const ServiceBox = ({ onSaveSubscription }: ServiceBoxProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isCustomService, setIsCustomService] = useState(false);
  const [customServiceName, setCustomServiceName] = useState('');

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
    setCustomServiceName('');
  };

  const handleSaveSubscription = (data: ModalSubscriptionData) => {
    if (onSaveSubscription) {
      onSaveSubscription(data);
    }
    handleCloseModal();
  };

  const handleCustomServiceNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomServiceName(e.target.value);
  };

  const handleCustomServiceSubmit = () => {
    if (customServiceName.trim()) {
      const customService: ServiceType = {
        name: customServiceName.trim(),
        image: '', // 이미지 경로를 빈 문자열로 설정
      };
      setSelectedService(customService);
      setIsCustomService(false);
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

          <h2 className="mb-4 text-xl font-bold text-gray-800">Music</h2>
          <div className="flex flex-row gap-4 overflow-x-auto pb-4">
            {MusicService.map((service) => (
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

          <h2 className="mb-4 text-xl font-bold text-gray-800">AI</h2>
          <div className="flex flex-row gap-4 overflow-x-auto pb-4">
            {AiService.map((service) => (
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

          <h2 className="mb-4 text-xl font-bold text-gray-800">Etc</h2>
          <div className="flex flex-row gap-4 overflow-x-auto pb-4">
            {EtcService.map((service) => (
              <div
                key={service.name}
                className="flex h-32 w-32 flex-shrink-0 flex-col items-center justify-center rounded-md border border-gray-300 p-6 transition-colors hover:border-blue-500 hover:shadow-md"
                onClick={() => handleServiceClick(service)}
              >
                <img src={service.image} alt={service.name} className="h-16 w-16 cursor-pointer object-contain" />
                <span className="mt-2 text-sm">{service.name}</span>
              </div>
            ))}

            {/* 직접 입력 버튼 */}
            <div
              className="flex h-32 w-32 flex-shrink-0 flex-col items-center justify-center rounded-md border border-dashed border-blue-500 p-6 transition-colors hover:bg-blue-50 hover:shadow-md"
              onClick={handleCustomServiceClick}
            >
              <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-500">
                +
              </div>
              <span className="mt-2 text-sm">직접 입력</span>
            </div>
          </div>
        </div>
      </div>

      {/* 커스텀 서비스 입력 모달 */}
      {isCustomService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20">
          <div className="w-96 rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">서비스 직접 입력</h2>
              <button onClick={handleCloseModal} className="cursor-pointer text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">서비스 이름</label>
              <input
                type="text"
                value={customServiceName}
                onChange={handleCustomServiceNameChange}
                className="w-full rounded-md border border-gray-300 p-2"
                placeholder="서비스 이름을 입력하세요"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleCustomServiceSubmit}
                className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                disabled={!customServiceName.trim()}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedService && !isCustomService && (
        <SubscriptionModal
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
