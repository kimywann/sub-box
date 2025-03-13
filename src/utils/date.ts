import { BillingCycle } from '@type/subscription';

/**
 * YYYY-MM-DD 형식의 문자열을 한국어 날짜 형식으로 변환
 */
export const formatDate = (dateString: string): string => {
  try {
    const [year, month, day] = dateString.split('-').map(Number);

    // 유효한 날짜인지 확인
    if (isNaN(year) || isNaN(month) || isNaN(day) || month < 1 || month > 12 || day < 1 || day > 31) {
      return '유효하지 않은 날짜';
    }

    // 한국어 날짜 형식으로 변환
    return `${year}년 ${month}월 ${day}일`;
  } catch {
    return '유효하지 않은 날짜';
  }
};

/**
 * 결제 주기에 따른 다음 결제일 계산
 */
export const calculateNextPaymentDate = (dateString: string, billingCycle: BillingCycle): string => {
  try {
    // 입력된 날짜 파싱
    const [year, month, day] = dateString.split('-').map(Number);

    // 유효한 날짜인지 확인
    if (isNaN(year) || isNaN(month) || isNaN(day) || month < 1 || month > 12 || day < 1 || day > 31) {
      return '유효하지 않은 날짜';
    }

    // 현재 날짜
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

    // 구독 시작일이 미래인지 확인 (오늘 날짜는 제외)
    const isFutureDate =
      year > todayYear ||
      (year === todayYear && month > todayMonth) ||
      (year === todayYear && month === todayMonth && day > todayDay);

    // 구독 시작일이 오늘인지 확인
    const isToday = year === todayYear && month === todayMonth && day === todayDay;

    // 구독 시작일이 미래인 경우, 첫 결제일은 구독 시작일 자체
    if (isFutureDate) {
      return formatDate(dateString);
    }

    // 구독 시작일이 오늘인 경우, 다음 결제일은 한 주기 뒤
    if (isToday) {
      let nextYear = year;
      let nextMonth = month;
      let nextDay = day;
      let tempDate;

      switch (billingCycle) {
        case 'weekly': {
          // 7일 추가
          tempDate = new Date(nextYear, nextMonth - 1, nextDay + 7);
          nextYear = tempDate.getFullYear();
          nextMonth = tempDate.getMonth() + 1;
          nextDay = tempDate.getDate();
          break;
        }
        case 'biweekly': {
          // 14일 추가
          tempDate = new Date(nextYear, nextMonth - 1, nextDay + 14);
          nextYear = tempDate.getFullYear();
          nextMonth = tempDate.getMonth() + 1;
          nextDay = tempDate.getDate();
          break;
        }
        case 'monthly': {
          // 한 달 추가
          nextMonth++;
          if (nextMonth > 12) {
            nextMonth = 1;
            nextYear++;
          }
          // 월말 날짜 처리
          const lastDayOfMonth = new Date(nextYear, nextMonth, 0).getDate();
          if (nextDay > lastDayOfMonth) {
            nextDay = lastDayOfMonth;
          }
          break;
        }
        case 'yearly': {
          // 1년 추가
          nextYear++;
          // 윤년 처리
          if (nextMonth === 2 && nextDay === 29) {
            const isLeapYear = (nextYear % 4 === 0 && nextYear % 100 !== 0) || nextYear % 400 === 0;
            if (!isLeapYear) {
              nextDay = 28;
            }
          }
          break;
        }
      }

      const nextMonthStr = String(nextMonth).padStart(2, '0');
      const nextDayStr = String(nextDay).padStart(2, '0');
      return formatDate(`${nextYear}-${nextMonthStr}-${nextDayStr}`);
    }

    // 과거 날짜인 경우, 다음 결제일 계산
    let nextYear = year;
    let nextMonth = month;
    let nextDay = day;

    // 결제 주기에 따라 다음 결제일 계산
    switch (billingCycle) {
      case 'weekly': {
        // 매주 결제: 시작일로부터 7일씩 증가하면서 현재 날짜 이후의 날짜 찾기
        while (
          nextYear < todayYear ||
          (nextYear === todayYear && nextMonth < todayMonth) ||
          (nextYear === todayYear && nextMonth === todayMonth && nextDay < todayDay)
        ) {
          // 7일 추가
          const tempDate = new Date(nextYear, nextMonth - 1, nextDay + 7);
          nextYear = tempDate.getFullYear();
          nextMonth = tempDate.getMonth() + 1;
          nextDay = tempDate.getDate();
        }
        break;
      }
      case 'biweekly': {
        // 2주 결제: 시작일로부터 14일씩 증가하면서 현재 날짜 이후의 날짜 찾기
        while (
          nextYear < todayYear ||
          (nextYear === todayYear && nextMonth < todayMonth) ||
          (nextYear === todayYear && nextMonth === todayMonth && nextDay < todayDay)
        ) {
          // 14일 추가
          const tempDate = new Date(nextYear, nextMonth - 1, nextDay + 14);
          nextYear = tempDate.getFullYear();
          nextMonth = tempDate.getMonth() + 1;
          nextDay = tempDate.getDate();
        }
        break;
      }
      case 'monthly': {
        // 월간 결제: 시작일의 월을 증가시키면서 현재 날짜 이후의 날짜 찾기
        while (
          nextYear < todayYear ||
          (nextYear === todayYear && nextMonth < todayMonth) ||
          (nextYear === todayYear && nextMonth === todayMonth && nextDay < todayDay)
        ) {
          // 한 달 추가
          nextMonth++;
          if (nextMonth > 12) {
            nextMonth = 1;
            nextYear++;
          }

          // 월말 날짜 처리 (예: 1월 31일 -> 2월 28일)
          const lastDayOfMonth = new Date(nextYear, nextMonth, 0).getDate();
          if (nextDay > lastDayOfMonth) {
            nextDay = lastDayOfMonth;
          }
        }
        break;
      }
      case 'yearly': {
        // 연간 결제: 시작일의 연도를 증가시키면서 현재 날짜 이후의 날짜 찾기
        while (
          nextYear < todayYear ||
          (nextYear === todayYear && nextMonth < todayMonth) ||
          (nextYear === todayYear && nextMonth === todayMonth && nextDay < todayDay)
        ) {
          // 1년 추가
          nextYear++;

          // 윤년 처리 (2월 29일 -> 2월 28일)
          if (nextMonth === 2 && nextDay === 29) {
            const isLeapYear = (nextYear % 4 === 0 && nextYear % 100 !== 0) || nextYear % 400 === 0;
            if (!isLeapYear) {
              nextDay = 28;
            }
          }
        }
        break;
      }
    }

    // YYYY-MM-DD 형식으로 변환
    const nextMonthStr = String(nextMonth).padStart(2, '0');
    const nextDayStr = String(nextDay).padStart(2, '0');
    const nextDateString = `${nextYear}-${nextMonthStr}-${nextDayStr}`;

    return formatDate(nextDateString);
  } catch (error) {
    console.error('날짜 계산 오류:', error);
    return '유효하지 않은 날짜';
  }
};

/**
 * 결제 주기에 따른 연간 결제 횟수 계산
 */
export const getYearlyPaymentCount = (billingCycle: BillingCycle): number => {
  switch (billingCycle) {
    case 'weekly':
      return 52; // 1년 = 52주
    case 'biweekly':
      return 26; // 1년 = 26 2주
    case 'monthly':
      return 12; // 1년 = 12개월
    case 'yearly':
      return 1; // 1년 = 1회
    default:
      return 12; // 기본값은 월간 결제
  }
};

/**
 * 결제 주기 텍스트 변환
 */
export const getBillingCycleText = (billingCycle: BillingCycle): string => {
  switch (billingCycle) {
    case 'weekly':
      return '매주';
    case 'biweekly':
      return '2주마다';
    case 'monthly':
      return '매월';
    case 'yearly':
      return '매년';
    default:
      return '매월';
  }
};
