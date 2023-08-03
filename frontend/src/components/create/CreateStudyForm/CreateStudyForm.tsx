import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Input from '@Components/common/Input/Input';
import Select from '@Components/common/Select/Select';
import Typography from '@Components/common/Typography/Typography';

import useInput from '@Hooks/common/useInput';
import useSelect from '@Hooks/common/useSelect';
import useCreateStudy from '@Hooks/create/useCreateStudy';

import color from '@Styles/color';

import { ERROR_MESSAGE } from '@Constants/errorMessage';
import { ROUTES_PATH } from '@Constants/routes';
import { STUDY_TIME_PER_CYCLE_OPTIONS, TOTAL_CYCLE_OPTIONS } from '@Constants/study';

import type { StudyTimePerCycleOptions, TotalCycleOptions } from '@Types/study';

const CreateStudyForm = () => {
  const navigate = useNavigate();

  const studyNameInput = useInput(true);
  const timePerCycleSelect = useSelect<StudyTimePerCycleOptions>();
  const totalCycleSelect = useSelect<TotalCycleOptions>();

  const errorHandler = (message: string) => {
    alert(message);
  };

  const { isLoading, createStudy } = useCreateStudy(errorHandler);

  const totalTime = (Number(timePerCycleSelect.state ?? 0) + 20) * Number(totalCycleSelect.state ?? 0);
  const hour = Math.floor(totalTime / 60);
  const minute = totalTime % 60;

  const handleOnClickMakeButton = async () => {
    if (!totalCycleSelect.state || !timePerCycleSelect.state || !studyNameInput.state) {
      throw new Error('이름의 길이와, 사이클 수, 사이클 당 시간을 다시 한번 확인해주세요');
    }

    const data = await createStudy(studyNameInput.state, totalCycleSelect.state, timePerCycleSelect.state);

    if (data) {
      navigate(`${ROUTES_PATH.preparation}/${data.studyId}`, {
        state: { participantCode: data.result.participantCode, studyName: studyNameInput.state, isHost: true },
      });
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
            {TOTAL_CYCLE_OPTIONS.map((el, index) => (
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
            {STUDY_TIME_PER_CYCLE_OPTIONS.map((el, index) => (
              <Select.Item key={index + el} value={el} suffix="분" />
            ))}
          </Select.List>
        </Select>
      </Container>
      {timePerCycleSelect.state && totalCycleSelect.state ? (
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
      ) : (
        <Typography
          variant="p1"
          $style={css`
            text-align: center;
          `}
        >
          사이클 횟수와 사이클 당 학습시간을 선택하세요.
        </Typography>
      )}
      <Button variant="primary" onClick={handleOnClickMakeButton} disabled={isDisabled()} isLoading={isLoading}>
        스터디 개설하기
      </Button>
    </Layout>
  );
};

export default CreateStudyForm;

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
