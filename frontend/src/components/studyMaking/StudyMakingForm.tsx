import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Input from '@Components/common/Input/Input';
import Select from '@Components/common/Select/Select';
import Typography from '@Components/common/Typography/Typography';

import useInput from '@Hooks/useInput';
import useSelect from '@Hooks/useSelect';

import color from '@Styles/color';

import { ERROR_MESSAGE } from '@Constants/errorMessage';

import { setCookie } from '@Utils/cookie';

import { createStudy } from '@Apis/index';

const StudyMakingForm = () => {
  const navigator = useNavigate();

  const studyNameInput = useInput(true);
  const timePerCycleSelect = useSelect();
  const totalCycleSelect = useSelect();

  const totalTime = (Number(timePerCycleSelect.state ?? 0) + 20) * Number(totalCycleSelect.state ?? 0);
  const hour = Math.floor(totalTime / 60);
  const minute = totalTime % 60;

  const handleOnClickMakeButton = async () => {
    try {
      const response = await createStudy(
        studyNameInput.state ?? '',
        Number(timePerCycleSelect.state ?? 0),
        Number(totalCycleSelect.state ?? 0),
      );

      const locationHeader = response.headers.get('Location');
      const studyId = locationHeader?.split('/').pop() as string;

      setCookie('studyId', studyId, 1);

      const result = (await response.json()) as { participantCode: string; studyName: string };

      navigator('/study-participating-host', {
        state: { participantCode: result.participantCode, studyName: studyNameInput.state },
      });
    } catch (error) {
      console.error(error);
      alert('이름의 길이와, 사이클 수, 사이클 당 시간을 다시 한번 확인해주세요');
    }
  };

  const isDisabled = () => {
    if (!studyNameInput.state || !timePerCycleSelect.state || !totalCycleSelect.state) return true;
    if ((studyNameInput.state ?? '').length < 1 || (studyNameInput.state ?? '').length > 10) return true;
    if (studyNameInput.isInputError) return true;

    return false;
  };

  return (
    <Layout>
      <Container>
        <Input
          label={<Typography variant="p1">스터디의 이름은 무엇인가요?</Typography>}
          errorMessage={ERROR_MESSAGE.studyName}
        >
          <Input.TextField
            $style={css`
              padding: 10px;
              border-radius: 0px;
              border: none;
              border-bottom: 1px solid ${color.blue[500]};
            `}
            error={studyNameInput.isInputError}
            onChange={studyNameInput.onChangeInput}
          />
        </Input>
        <Select
          label={<Typography variant="p1">사이클 횟수는 어떻게 되나요?</Typography>}
          $style={css`
            position: relative;
          `}
        >
          <Select.Trigger triggerText="횟수를 선택해주세요" />
          <Select.List
            $style={css`
              position: absolute;
              left: 0;
              right: 0;
              z-index: 10;
            `}
            onChange={totalCycleSelect.onChangeSelectItem}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((el, index) => (
              <Select.Item key={index + el} value={el} suffix="회" />
            ))}
          </Select.List>
        </Select>
        <Select
          label={<Typography variant="p1">한 사이클 당 학습 시간은 어떻게 되나요?</Typography>}
          $style={css`
            position: relative;
          `}
        >
          <Select.Trigger triggerText="학습 시간을 선택해주세요" />
          <Select.List
            $style={css`
              position: absolute;
              left: 0;
              right: 0;
              z-index: 10;
            `}
            onChange={timePerCycleSelect.onChangeSelectItem}
          >
            {[20, 25, 30, 35, 40, 45, 50, 55, 60].map((el, index) => (
              <Select.Item key={index + el} value={el} suffix="분" />
            ))}
          </Select.List>
        </Select>
      </Container>
      <Typography
        variant="p1"
        $style={css`
          text-align: center;
        `}
      >
        예상 스터디 시간은{' '}
        <TimeText
          onClick={() => {
            alert('예상시간에는 학습시간 외에 목표설정시간(10분)과 회고시간(10분)이 포함되어있습니다.');
          }}
        >
          {hour}시간 {minute}분
        </TimeText>
        이에요.
      </Typography>
      <Button variant="primary" onClick={handleOnClickMakeButton} disabled={isDisabled()}>
        스터디 개설하기
      </Button>
    </Layout>
  );
};

export default StudyMakingForm;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
`;

const TimeText = styled.span`
  color: ${color.blue[500]};
  text-decoration: underline;
  cursor: pointer;
`;
