import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Input from '@Components/common/Input/Input';
import Select from '@Components/common/Select/Select';
import Typography from '@Components/common/Typography/Typography';

import useStudyMaking from '@Hooks/useStudyMaking';

import color from '@Styles/color';

import { ERROR_MESSAGE } from '@Constants/errorMessage';

import { createStudy } from '../../../api/index';

const SubmitContents = () => {
  const {
    studyName,
    totalCycle,
    timePerCycle,
    isDisabled,
    isInputValidate,
    handleOnTotalCycleChange,
    handleOnTimePerCycleChange,
    handleOnChangeInput,
  } = useStudyMaking();

  const navigator = useNavigate();

  const totalTime = ((timePerCycle ?? 0) + 20) * (totalCycle ?? 0);
  const hour = Math.floor(totalTime / 60);
  const minute = totalTime % 60;

  const handleOnClickMakeButton = () => {
    createStudy(studyName, totalCycle, timePerCycle).then((result) => {
      navigator('/study-participating-host', { state: { participantCode: result.participantCode, studyName } });
    });
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
            error={isInputValidate}
            onChange={handleOnChangeInput}
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
            onChange={handleOnTotalCycleChange}
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
            onChange={handleOnTimePerCycleChange}
          >
            {[20, 25, 30, 35, 40].map((el, index) => (
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

export default SubmitContents;

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
