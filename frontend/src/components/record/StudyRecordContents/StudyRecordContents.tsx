import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { css, keyframes, styled } from 'styled-components';

import useStudyRecord from '@Hooks/record/useStudyRecord';

import color from '@Styles/color';

import ResetIcon from '@Assets/icons/ResetIcon';

import ProgressRecordList from '../ProgressRecordList/ProgressRecordList';
import StudyInformation from '../StudyInformation/StudyInformation';

const StudyRecordContents = () => {
  const { studyId } = useParams<{ studyId: string }>();
  const [$rotateAnimation, setRotateAnimation] = useState(false);

  if (!studyId) throw Error('잘못된 접근입니다.');

  const { isLoading, studyBasicInfo, memberProgresses, refetchStudyRecordData } = useStudyRecord(studyId);

  const handleClickResetButton = () => {
    if (isLoading || $rotateAnimation) return;
    setRotateAnimation(true);
    refetchStudyRecordData();
  };

  useEffect(() => {
    const clearAnimation = setTimeout(() => {
      setRotateAnimation(false);
    }, 1000);

    return () => clearTimeout(clearAnimation);
  }, [$rotateAnimation]);

  return (
    <Layout>
      <StudyInformation
        studyName={studyBasicInfo?.name}
        totalCycle={studyBasicInfo?.totalCycle}
        timePerCycle={studyBasicInfo?.timePerCycle}
        createdDateTime={studyBasicInfo?.createdDateTime}
        $isLoading={isLoading}
      />
      <ResetButton onClick={handleClickResetButton} role="presentation" $rotateAnimation={$rotateAnimation}>
        <ResetIcon color={color.neutral[500]} />
      </ResetButton>
      <ProgressRecordList studyId={studyId} memberProgresses={memberProgresses} isLoading={isLoading} />
    </Layout>
  );
};

export default StudyRecordContents;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 40px;

  ul {
    grid-column: 1 / -1;
  }
`;

const Rotation = keyframes`
  0% {
    transform:rotate(0deg);
  }
  100%{
    transform:rotate(-360deg);
  }
`;

type ResetButton = {
  $rotateAnimation: boolean;
};

const ResetButton = styled.div<ResetButton>`
  justify-self: flex-end;
  align-self: flex-start;
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  svg {
    width: 30px;
    height: 30px;

    transition: transform 1s ease;
  }

  ${({ $rotateAnimation }) => css`
    ${$rotateAnimation &&
    css`
      animation: ${Rotation} 1s ease forwards;
      cursor: default;
    `}
  `}
`;
