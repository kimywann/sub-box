// 모달에서 사용하는 구독 데이터 인터페이스
export interface ModalSubscriptionData {
  service: string;
  subscription_date: string;
  price: number;
}

// 데이터베이스용 구독 데이터 인터페이스
export interface DatabaseSubscriptionData extends ModalSubscriptionData {
  id: number;
  user_email: string;
  created_at: string;
}
