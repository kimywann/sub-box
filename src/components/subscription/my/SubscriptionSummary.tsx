import { useAtom } from 'jotai';

import {
  subscriptionCountAtom,
  subscriptionServicesAtom,
  totalMonthlyPriceAtom,
  totalYearlyPriceAtom,
} from '@/store/subscriptionAtoms';

const SubscriptionSummary = () => {
  const [subscriptionCount] = useAtom(subscriptionCountAtom);
  const [subscriptionServices] = useAtom(subscriptionServicesAtom);

  const [totalMonthlyPrice] = useAtom(totalMonthlyPriceAtom);
  const [totalYearlyPrice] = useAtom(totalYearlyPriceAtom);

  return (
    <div className="w-full rounded-2xl border border-gray-300 bg-white p-6">
      <h2 className="mb-6 text-xl font-bold text-gray-800">내 구독 요약</h2>

      {/* 구독 서비스 목록 */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base text-gray-600">구독중인 서비스</h3>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-blue-600">
            총 {subscriptionCount}개
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {subscriptionServices.map((service, index) => (
            <span
              key={index}
              className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700 ring-1 ring-gray-200/50"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* 비용 요약 */}
      <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-gray-100 p-4 md:grid-cols-2">
        <div>
          <h3 className="mb-1 text-sm text-gray-500">월 구독 비용</h3>
          <p className="text-lg font-medium text-gray-900">
            {totalMonthlyPrice.toLocaleString()}
            <span className="text-sm text-gray-600"> 원</span>
          </p>
        </div>

        <div className="md:border-l md:border-gray-200 md:pl-4">
          <h3 className="mb-1 text-sm text-gray-500">연간 구독 비용</h3>
          <p className="text-lg font-medium text-gray-900">
            {totalYearlyPrice.toLocaleString()}
            <span className="text-sm text-gray-600"> 원</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSummary;
