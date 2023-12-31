import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Typography from '@Components/common/Typography/Typography';

import useFetch from '@Hooks/api/useFetch';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';
import { STEP_KEYWORDS } from '@Constants/study';

import { useModal } from '@Contexts/ModalProvider';

import { requestGetMemberSubmitStatus } from '@Apis/index';

import type { Step, StudyInfo } from '@Types/study';

type Props = {
  studyInfo: StudyInfo;
};

const StudyInfoModal = ({ studyInfo }: Props) => {
  const { studyId, name, totalCycle, timePerCycle, currentCycle, progressStep } = studyInfo;

  const navigate = useNavigate();
  const { closeModal } = useModal();

  const { result: studySubmitStatus } = useFetch(
    async () => {
      const { data } = await requestGetMemberSubmitStatus(studyId);

      return data.status;
    },
    { suspense: false, refetchInterval: 2000, errorBoundary: false },
  );

  const handleExitStudy = () => {
    navigate(ROUTES_PATH.landing);
  };

  const getSubmitStatusText = (progressStep: Step, isSubmitted: boolean) => {
    if (progressStep === 'studying') return '학습 중';

    const keyword = progressStep === 'planning' ? '목표' : '회고';
    const submitStatus = isSubmitted ? '작성 완료' : '작성 중';

    return `${keyword} ${submitStatus}`;
  };

  return (
    <Layout>
      <Section>
        <TitleContainer>
          <Typography variant="h5" fontWeight="700">
            {name} 스터디
          </Typography>
          <ExitButton variant="outlined" size="x-small" onClick={handleExitStudy}>
            스터디 나가기
          </ExitButton>
        </TitleContainer>
        <InfoContainer>
          <Typography variant="h6">총 사이클 횟수</Typography>
          <Typography variant="h6">{totalCycle}회</Typography>
        </InfoContainer>
        <InfoContainer>
          <Typography variant="h6">사이클 당 학습 시간</Typography>
          <Typography variant="h6">{timePerCycle}분</Typography>
        </InfoContainer>
      </Section>
      <Separator />
      <Section>
        <Typography variant="h5" fontWeight="700">
          스터디원 현황
        </Typography>

        <ParticipantContainer>
          {studySubmitStatus === null ? (
            <>
              <InfoContainer>
                <ParticipantSkeleton />
                <ParticipantSkeleton />
              </InfoContainer>
              <InfoContainer>
                <ParticipantSkeleton />
                <ParticipantSkeleton />
              </InfoContainer>
            </>
          ) : (
            studySubmitStatus?.map(({ nickname, submitted }) => (
              <InfoContainer key={nickname}>
                <Typography variant="h6">{nickname}</Typography>
                <Typography variant="h6">{getSubmitStatusText(progressStep, submitted)}</Typography>
              </InfoContainer>
            ))
          )}
        </ParticipantContainer>
        <CurrentStep variant="p3">
          {currentCycle}번째 사이클 - {STEP_KEYWORDS[progressStep]} 단계
        </CurrentStep>
      </Section>
      <CloseButton variant="secondary" size="x-small" $block={false} onClick={closeModal}>
        닫기
      </CloseButton>
    </Layout>
  );
};

export default StudyInfoModal;

const Layout = styled.div`
  padding: 5px 10px;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;

  margin: 24px 0;

  background-color: ${color.neutral[200]};
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ParticipantContainer = styled.div`
  height: 270px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 20px 30px;

  border-radius: 8px;
  background-color: ${color.neutral[100]};

  overflow-y: auto;
`;

const CurrentStep = styled(Typography)`
  text-align: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const ExitButton = styled(Button)`
  width: fit-content;

  border: none;

  padding-left: 6px;
  padding-right: 6px;

  color: ${color.red[500]};
`;

const CloseButton = styled(Button)`
  width: fit-content;
  font-weight: 500;

  float: right;
  margin-top: 18px;
`;

const ParticipantSkeleton = styled.div`
  width: 60px;
  height: 30px;

  background-color: ${color.neutral[300]};
  border-radius: 10px;
`;
