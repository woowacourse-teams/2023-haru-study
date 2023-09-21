import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import CreateStudy from '@Pages/CreateStudy';

import MemberInfoProvider from '@Contexts/MemberInfoProvider';
import ModalProvider from '@Contexts/ModalProvider';

describe('스터디 개설 페이지 테스트', () => {
  test('폼 입력 후 적절한 예상시간이 나오는지 확인한다.', async () => {
    render(
      <MemoryRouter initialEntries={['/create']}>
        <ModalProvider>
          <MemberInfoProvider>
            <CreateStudy />
          </MemberInfoProvider>
        </ModalProvider>
      </MemoryRouter>,
    );

    const studyNameInput = screen.getByLabelText('스터디의 이름은 무엇인가요?');
    await userEvent.type(studyNameInput, '하루스터디');

    const cycleSelectBox = screen.getByTestId('cycle');
    await userEvent.click(cycleSelectBox);

    const onceElement = screen.getByText('1회');
    await userEvent.click(onceElement);

    const timePerCycleSelectBox = screen.getByTestId('timepercycle');
    await userEvent.click(timePerCycleSelectBox);

    const twentyMinuteElement = screen.getByText('20분');
    await userEvent.click(twentyMinuteElement);

    const estimatedTimeElement = screen.getByText('0시간 40분');

    expect(estimatedTimeElement).toBeInTheDocument();
  });
});
