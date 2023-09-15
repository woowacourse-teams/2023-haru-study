import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Input from '@Components/common/Input/Input';
import Select from '@Components/common/Select/Select';
import Typography from '@Components/common/Typography/Typography';

import useCreateStudy from '@Hooks/create/useCreateStudy';
import useCreateStudyForm from '@Hooks/create/useCreateStudyForm';

import color from '@Styles/color';

import { ERROR_MESSAGE } from '@Constants/errorMessage';
import { ROUTES_PATH } from '@Constants/routes';
import { STUDY_TIME_PER_CYCLE_OPTIONS, TOTAL_CYCLE_OPTIONS } from '@Constants/study';

import { useModal } from '@Contexts/ModalProvider';

const CreateStudyForm = () => {
  const navigate = useNavigate();

  const { openAlert } = useModal();

  const {
    studyName,
    totalCycle,
    timePerCycle,
    isStudyNameError,
    changeStudyName,
    changeTotalCycle,
    changeTimePerCycle,
    hour,
    minute,
    isDisabled,
    isSelectedOptions,
  } = useCreateStudyForm();

  const { mutate, isLoading } = useCreateStudy(studyName, totalCycle, timePerCycle);

  const handleClickCreateStudyButton = async () => {
    const result = await mutate();

    if (result) {
      const { studyId, data } = result;

      navigate(`${ROUTES_PATH.preparation}/${studyId}`, {
        state: { participantCode: data.participantCode, studyName, isHost: true },
      });
    }
  };

  const handleClickExpectedTime = () => {
    openAlert('예상 시간에는 학습 시간 외에 각 사이클 당 목표설정 시간 10분, 회고 시간 10분이 포함되어있습니다.');
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
            maxLength={10}
            error={isStudyNameError}
            onChange={changeStudyName}
          />
        </Input>
        <Select
          label={<Typography variant="p1">사이클 횟수는 어떻게 되나요?</Typography>}
          $style={css`
            position: relative;
          `}
        >
          <Select.Trigger triggerText="횟수를 선택해주세요" testId="cycle" />
          <Select.List
            $style={css`
              position: absolute;
              left: 0;
              right: 0;
              z-index: 10;
            `}
            onChange={changeTotalCycle}
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
          <Select.Trigger triggerText="학습 시간을 선택해주세요" testId="timepercycle" />
          <Select.List
            $style={css`
              position: absolute;
              left: 0;
              right: 0;
              z-index: 10;
            `}
            onChange={changeTimePerCycle}
          >
            {STUDY_TIME_PER_CYCLE_OPTIONS.map((el, index) => (
              <Select.Item key={index + el} value={el} suffix="분" />
            ))}
          </Select.List>
        </Select>
      </Container>
      <Typography
        variant="p2"
        $style={css`
          text-align: center;
        `}
      >
        {isSelectedOptions ? (
          <>
            예상 스터디 시간은{' '}
            <TimeText onClick={handleClickExpectedTime}>
              {hour}시간 {minute}분
            </TimeText>
            이에요.
          </>
        ) : (
          '사이클 횟수와 사이클 당 학습 시간을 선택하세요.'
        )}
      </Typography>
      <Button variant="primary" onClick={handleClickCreateStudyButton} disabled={isDisabled()} isLoading={isLoading}>
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
