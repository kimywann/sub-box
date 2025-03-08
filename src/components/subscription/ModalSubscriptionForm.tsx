import { useState, useEffect } from 'react';
import { ServiceType } from '../../constants/serviceCategory';
import { ModalSubscriptionData, BillingCycle } from '../../types/subscriptionData';

interface ModalSubscriptionFormProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceType;
  onSave?: (data: ModalSubscriptionData) => void;
  initialData?: ModalSubscriptionData;
}

const ModalSubscriptionForm = ({ isOpen, onClose, service, onSave, initialData }: ModalSubscriptionFormProps) => {
  const [subscriptionDate, setSubscriptionDate] = useState(initialData?.subscription_date || '');
  const [price, setPrice] = useState(initialData?.price ? String(initialData.price) : '');
  const [formattedPrice, setFormattedPrice] = useState(initialData?.price ? initialData.price.toLocaleString() : '');
  const [serviceName, setServiceName] = useState(initialData?.service || service.name);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(initialData?.billing_cycle || 'monthly');

  const isCustomService = !service.image || service.image === '';

  // 모달이 열릴 때마다 초기값 설정
  useEffect(() => {
    if (isOpen) {
      setSubscriptionDate(initialData?.subscription_date || '');
      setPrice(initialData?.price ? String(initialData.price) : '');
      setFormattedPrice(initialData?.price ? initialData.price.toLocaleString() : '');
      setServiceName(initialData?.service || service.name);
      setBillingCycle(initialData?.billing_cycle || 'monthly');
    }
  }, [isOpen, initialData, service.name]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 쉼표 제거 후 숫자만 추출
    const numericValue = value.replace(/,/g, '');

    if (numericValue === '' || /^\d+$/.test(numericValue)) {
      setPrice(numericValue);
      // 천 단위 구분자 추가
      setFormattedPrice(numericValue === '' ? '' : Number(numericValue).toLocaleString());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subscriptionData: ModalSubscriptionData = {
      service: serviceName.trim(),
      subscription_date: subscriptionDate,
      price: Number(price),
      billing_cycle: billingCycle,
    };

    // 상위 컴포넌트로 구독 정보 전달
    if (onSave) {
      onSave(subscriptionData);
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20">
      <div className="w-96 rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{serviceName} 구독 정보</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isCustomService && (
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">서비스 이름</label>
              <input
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
                placeholder="서비스 이름을 입력하세요"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">구독 시작일</label>
            <input
              type="date"
              value={subscriptionDate}
              onChange={(e) => setSubscriptionDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">결제 주기</label>
            <select
              value={billingCycle}
              onChange={(e) => setBillingCycle(e.target.value as BillingCycle)}
              className="w-full rounded-md border border-gray-300 p-2"
              required
            >
              <option value="weekly">매주</option>
              <option value="biweekly">2주마다</option>
              <option value="monthly">매월</option>
              <option value="yearly">매년</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">구독 요금</label>
            <input
              type="text"
              value={formattedPrice}
              onChange={handlePriceChange}
              className="w-full rounded-md border border-gray-300 p-2"
              placeholder="구독 요금을 입력하세요"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
            >
              취소
            </button>
            <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalSubscriptionForm;
