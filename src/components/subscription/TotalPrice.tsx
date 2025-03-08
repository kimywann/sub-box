import { useState } from 'react';
import { DatabaseSubscriptionData } from '../../types/subscriptionData';
import { ModalSubscriptionData } from '../../types/subscriptionData';

interface TotalPriceProps {
  subscriptions: DatabaseSubscriptionData[];
  onDelete: (id: number) => void;
  onEdit: (subscription: ModalSubscriptionData) => void;
}

const TotalPrice = ({ subscriptions, onDelete, onEdit }: TotalPriceProps) => {
  const [showDelete, setShowDelete] = useState(false);

  const totalPrice = subscriptions.reduce((total, subscription) => total + subscription.price, 0);
  const totalPricePerYear = totalPrice * 12;

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    try {
      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day);

      if (isNaN(date.getTime())) {
        return '유효하지 않은 날짜';
      }

      return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return '유효하지 않은 날짜';
    }
  };

  // 만료일 계산 함수 (한 달 뒤)
  const calculateExpiryDate = (dateString: string) => {
    try {
      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day);

      if (isNaN(date.getTime())) {
        return '유효하지 않은 날짜';
      }

      const expiryDate = new Date(year, month, day);
      return formatDate(expiryDate.toISOString().split('T')[0]);
    } catch {
      return '유효하지 않은 날짜';
    }
  };

  const handleDeleteSubscription = (id: number) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="my-4 rounded-lg bg-blue-100 p-4">
        <h2 className="mb-2 flex items-center justify-between text-xl font-bold">
          내 구독 목록
          <button
            onClick={() => setShowDelete(!showDelete)}
            className="cursor-pointer text-lg font-normal text-gray-500"
          >
            편집
          </button>
        </h2>
        {subscriptions.length > 0 ? (
          <>
            <ul className="mb-4">
              {subscriptions.map((subscription) => (
                <li key={subscription.service} className="py-2">
                  <div className="flex justify-between">
                    <span className="font-extrabold">{subscription.service}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{subscription.price.toLocaleString()}원</span>
                      {showDelete && (
                        <>
                          <button
                            onClick={() => onEdit(subscription)}
                            className="cursor-pointer px-2 font-bold text-blue-400"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleDeleteSubscription(subscription.id)}
                            className="cursor-pointer px-1 font-bold text-red-400"
                          >
                            삭제
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>구독 시작일 : {formatDate(subscription.subscription_date)}</div>
                    <div>다음 결제일 : {calculateExpiryDate(subscription.subscription_date)}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between border-t border-gray-400 pt-2 font-bold">
              <span>매월 구독 비용</span>
              <span>{totalPrice.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between pt-2 font-bold">
              <span>1년 합산 비용</span>
              <span>{totalPricePerYear.toLocaleString()}원</span>
            </div>
          </>
        ) : (
          <p>아직 등록된 구독이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default TotalPrice;
