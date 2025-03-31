import { calculateNextPaymentDate } from '../utils/date';

describe('calculateNextPaymentDate', () => {
  // 테스트에서 사용할 현재 날짜를 고정
  const realDate = global.Date;
  const mockDate = new Date('2024-05-15');

  beforeAll(() => {
    global.Date = class extends Date {
      constructor() {
        super();
        return mockDate;
      }

      static now() {
        return mockDate.getTime();
      }
    } as unknown as DateConstructor;
  });

  afterAll(() => {
    global.Date = realDate;
  });

  test('월간 구독의 다음 결제일이 정확히 계산된다', () => {
    // 구독 시작일이 한 달 전인 경우
    const startDate = '2024-04-15';
    const result = calculateNextPaymentDate(startDate, 'monthly');

    // 현재 날짜(2024-05-15)가 정확히 다음 결제일
    expect(result).toBe('2024년 5월 15일');
  });

  test('주간 구독의 다음 결제일이 정확히 계산된다', () => {
    // 구독 시작일이 일주일 전인 경우
    const startDate = '2024-05-08';
    const result = calculateNextPaymentDate(startDate, 'weekly');

    // 현재 날짜(2024-05-15)가 정확히 다음 결제일
    expect(result).toBe('2024년 5월 15일');
  });

  test('미래 날짜인 경우 구독 시작일이 첫 결제일이 된다', () => {
    // 구독 시작일이 미래인 경우
    const startDate = '2024-06-15';
    const result = calculateNextPaymentDate(startDate, 'monthly');

    // 미래 날짜는 그대로 반환됨
    expect(result).toBe('2024년 6월 15일');
  });

  test('결제일이 지난 후 다음 결제일이 올바르게 계산된다', () => {
    // 구독 시작일이 두 달 전인 경우
    const startDate = '2024-03-15';
    const result = calculateNextPaymentDate(startDate, 'monthly');

    // 현재 날짜(2024-05-15)가 결제일이므로, 다음 달 15일이 다음 결제일
    expect(result).toBe('2024년 6월 15일');
  });

  test('주간 구독에서 결제일이 지난 후 다음 결제일이 올바르게 계산된다', () => {
    // 구독 시작일이 두 주 전인 경우
    const startDate = '2024-05-01';
    const result = calculateNextPaymentDate(startDate, 'weekly');

    // 현재 날짜(2024-05-15)가 결제일이므로, 다음 주 15일이 다음 결제일
    expect(result).toBe('2024년 5월 22일');
  });
});
