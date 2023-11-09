import { css, styled } from 'styled-components';

import Menu from '@Components/common/Menu/Menu';

import color from '@Styles/color';

import ArrowIcon from '@Assets/icons/ArrowIcon';

import { useDatePicker } from '../DatePickerContext/DatePickerProvider';

const MENU_STYLE = css`
  & > div {
    padding: 0;
  }
`;

const MENU_ITEM_STYLE = css`
  row-gap: 3px;
  max-height: 320px;
  overflow: auto;

  font-size: 1.6rem;
  font-weight: 300;

  top: 40px;
  left: 5px;
`;

const ControlBar = () => {
  const { year, month, handleMonthShift, handleNavigationYear, handleNavigationMonth } = useDatePicker();

  const today = new Date();

  return (
    <Layout>
      <CurrentYearMonth>
        <span>
          <Menu
            trigger={
              <MenuTrigger>
                {year}년 <ArrowIcon direction="down" />
              </MenuTrigger>
            }
            $menuListStyle={MENU_ITEM_STYLE}
            $style={MENU_STYLE}
          >
            {Array.from({ length: today.getFullYear() - 2023 + 2 }).map((_, index) => (
              <Menu.Item key={index} onClick={() => handleNavigationYear(2023 + index)}>
                {2023 + index}년
              </Menu.Item>
            ))}
          </Menu>
        </span>
        <span>
          <Menu
            trigger={
              <MenuTrigger>
                {month}월 <ArrowIcon direction="down" />
              </MenuTrigger>
            }
            $menuListStyle={MENU_ITEM_STYLE}
            $style={MENU_STYLE}
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <Menu.Item key={index} onClick={() => handleNavigationMonth(index + 1)}>
                {index + 1}월
              </Menu.Item>
            ))}
          </Menu>
        </span>
      </CurrentYearMonth>
      <ShiftButton>
        <ArrowIcon direction="left" onClick={() => handleMonthShift('prev')} />
        <TodayButton onClick={() => handleMonthShift('today')}>●</TodayButton>
        <ArrowIcon direction="right" onClick={() => handleMonthShift('next')} />
      </ShiftButton>
    </Layout>
  );
};

export default ControlBar;

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  padding: 0px 5px;
  margin-bottom: 20px;

  svg {
    cursor: pointer;
  }
`;

const MenuTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;

  border-radius: 8px;
  padding: 2px 5px;

  svg {
    width: 6px;
    height: 6px;

    opacity: 0.6;
  }

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${color.neutral[100]};
  }
`;

const ShiftButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  opacity: 0.6;
`;

const TodayButton = styled.div`
  position: relative;
  top: 2px;

  cursor: pointer;
`;

const CurrentYearMonth = styled.span`
  display: flex;

  font-size: 2rem;
  font-weight: 500;

  cursor: pointer;
`;
