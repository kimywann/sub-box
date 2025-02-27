import { useState } from 'react';
import { OttService } from '../../constants/serviceCategory';
import { SubscriptionData } from '../../types/subscriptionData';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: (typeof OttService)[0];
  onSave?: (data: SubscriptionData) => void;
}

const SubscriptionModal = ({ isOpen, onClose, service, onSave }: SubscriptionModalProps) => {
  const [subscriptionDate, setSubscriptionDate] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subscriptionData: SubscriptionData = {
      service: service.name,
      subscriptionDate,
      price: Number(price),
    };

    // 상위 컴포넌트로 구독 정보 전달
    if (onSave) {
      onSave(subscriptionData);
    }

    console.log(subscriptionData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20">
      <div className="w-96 rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{service.name} 구독 정보</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
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

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">월 구독료 (원)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
              placeholder="예: 9900"
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

export default SubscriptionModal;
