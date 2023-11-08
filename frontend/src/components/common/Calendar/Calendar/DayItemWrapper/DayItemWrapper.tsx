import type { PropsWithChildren } from 'react';

type Props = {
  /**
   * 달력에 데이터를 렌더링하기 위한 필수 값. "yyyy-mm-dd" 형식으로 이와 일치하는 곳에 자식 컴포넌트가 렌더링 됨.
   *
   */
  date: string;
  /**
   * 남은 데이터의 개수를 보여주기 위한 값. 0보다 크면 Day 오른쪽에 해당 값이 렌더링 됨.
   *
   */
  restDataCount?: number;
  /**
   * 남은 데이터의 개수를 클릭하면 발생되는 이벤트. 남은 데이터의 개수가 0보다 클 경우 이벤트를 등록할 수 있음.
   *
   */
  onClickRestDataCount?: () => void;
  /**
   * Day을 클릭하면 발생되는 이벤트. Day에 해당하는 데이터가 있는 경우 이벤트를 등록할 수 있음.
   *
   */
  onClickDay?: () => void;
};

const DayItemWrapper = ({ children }: PropsWithChildren<Props>) => {
  return <div>{children}</div>;
};

export default DayItemWrapper;
