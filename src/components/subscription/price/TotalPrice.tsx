import { useState } from 'react';
import { User } from '@type/user';
import { Subscription } from '@type/subscription';
import { formatDate, calculateNextPaymentDate, getBillingCycleText } from '@utils/date';
import { useAtom } from 'jotai';
import { totalMonthlyPriceAtom, totalYearlyPriceAtom } from '@store/subscriptionDetail';

interface TotalPriceProps {
  subscriptions: User[];
  onDelete: (id: number) => void;
  onEdit: (subscription: Subscription) => void;
}

const TotalPrice = ({ subscriptions, onDelete, onEdit }: TotalPriceProps) => {
  const [showDelete, setShowDelete] = useState(false);

  const [totalMonthlyPrice] = useAtom(totalMonthlyPriceAtom);
  const [totalYearlyPrice] = useAtom(totalYearlyPriceAtom);

  const DeleteSubscription = (id: number) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="my-4 rounded-2xl bg-gray-100 p-4">
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
                            onClick={() => DeleteSubscription(subscription.id)}
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
                    <div>
                      다음 결제일 :{' '}
                      {calculateNextPaymentDate(subscription.subscription_date, subscription.billing_cycle)}
                    </div>
                    <div>결제 주기 : {getBillingCycleText(subscription.billing_cycle)}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between border-t border-gray-400 pt-2 font-bold">
              <span>매월 구독 비용</span>
              <span>{totalMonthlyPrice.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between pt-2 font-bold">
              <span>1년 합산 비용</span>
              <span>{totalYearlyPrice.toLocaleString()}원</span>
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
