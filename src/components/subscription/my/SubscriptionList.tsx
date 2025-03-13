import { useState } from 'react';

import { useAtom } from 'jotai';
import { totalMonthlyPriceAtom, totalYearlyPriceAtom } from '@/store/subscriptionAtoms';

import { User } from '@type/user';
import { Subscription } from '@type/subscription';

import { formatDate, calculateNextPaymentDate, getBillingCycleText } from '@utils/date';

interface SubscriptionListProps {
  subscriptions: User[];
  onDelete: (id: number) => void;
  onEdit: (subscription: Subscription) => void;
}

const SubscriptionList = ({ subscriptions, onDelete, onEdit }: SubscriptionListProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [totalMonthlyPrice] = useAtom(totalMonthlyPriceAtom);
  const [totalYearlyPrice] = useAtom(totalYearlyPriceAtom);

  const DeleteSubscription = (id: number) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="my-6 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">내 구독 목록</h2>
          {subscriptions.length > 0 && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-md cursor-pointer rounded-md bg-gray-100 px-3 py-1.5 font-medium text-gray-500 active:bg-gray-200"
            >
              {isEditing ? '완료' : '편집'}
            </button>
          )}
        </div>

        {subscriptions.length > 0 ? (
          <>
            <ul className="mb-6">
              {subscriptions.map((subscription) => (
                <li
                  key={subscription.service}
                  onClick={() => !isEditing && onEdit(subscription)}
                  className={`p-4 transition-all duration-200 ${
                    !isEditing
                      ? 'cursor-pointer hover:rounded-2xl hover:bg-blue-100 active:scale-95 active:bg-blue-200 active:shadow-inner'
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-800">{subscription.service}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900">{subscription.price.toLocaleString()}원</span>
                      {isEditing && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => onEdit(subscription)}
                            className="cursor-pointer rounded px-3 py-1 text-sm font-medium text-blue-600"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => DeleteSubscription(subscription.id)}
                            className="cursor-pointer rounded px-3 py-1 text-sm font-medium text-red-600"
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-1 gap-2 text-sm text-gray-500 md:grid-cols-3">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">구독 시작:</span>
                      <span>{formatDate(subscription.subscription_date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">다음 결제:</span>
                      <span>
                        {calculateNextPaymentDate(subscription.subscription_date, subscription.billing_cycle)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">결제 주기:</span>
                      <span>{getBillingCycleText(subscription.billing_cycle)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl bg-gray-100 p-4">
              <div className="flex justify-between pb-3">
                <span className="font-medium text-gray-500">월 구독 비용</span>
                <span className="font-semibold text-gray-900">{totalMonthlyPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between pt-3">
                <span className="font-medium text-gray-500">연간 구독 비용</span>
                <span className="font-semibold text-gray-900">{totalYearlyPrice.toLocaleString()}원</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
            <p className="text-center text-gray-500">
              아직 등록된 구독이 없습니다.
              <br />
              서비스를 선택하여 구독 정보를 추가해보세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionList;
