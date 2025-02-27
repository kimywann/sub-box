import { SubscriptionData } from '../types/subscriptionData';

interface TotalPriceProps {
  subscriptions: SubscriptionData[];
}

const TotalPrice = ({ subscriptions }: TotalPriceProps) => {
  // 총 구독 비용 계산
  const totalPrice = subscriptions.reduce((total, subscription) => total + subscription.price, 0);
  const totalPricePerYear = totalPrice * 12;

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // 만료일 계산 함수 (한 달 뒤)
  const calculateExpiryDate = (dateString: string) => {
    const date = new Date(dateString);
    const expiryDate = new Date(date);
    expiryDate.setMonth(date.getMonth() + 1);
    return formatDate(expiryDate.toISOString().split('T')[0]);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="my-4 rounded-lg bg-blue-100 p-4">
        <h2 className="mb-2 text-xl font-bold">내 구독 목록</h2>
        {subscriptions.length > 0 ? (
          <>
            <ul className="mb-4">
              {subscriptions.map((subscription) => (
                <li key={subscription.service} className="border-b border-gray-200 py-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{subscription.service}</span>
                    <span className="font-medium">{subscription.price.toLocaleString()}원</span>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    <div>구독 시작일: {formatDate(subscription.subscriptionDate)}</div>
                    <div>다음 결제일: {calculateExpiryDate(subscription.subscriptionDate)}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between border-t border-gray-300 pt-2 font-bold">
              <span>총 구독 비용</span>
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
