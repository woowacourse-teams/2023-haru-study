import { useNavigate, useParams } from 'react-router-dom';
import { styled, css } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';

import { useMemberInfo } from '@Contexts/MemberInfoProvider';

import MemberRecordMode from '../MemberRecordMode/MemberRecordMode';

const MemberRecordContents = () => {
  const { mode: viewMode } = useParams<{ mode: 'calendar' | 'list' }>();

  const navigate = useNavigate();

  const memberInfo = useMemberInfo();

  const today = new Date();

  const handleClickViewModeButton = (mode: 'calendar' | 'list') => {
    if (viewMode === mode) return;

    if (mode === 'calendar')
      navigate(`${ROUTES_PATH.memberRecord}/calendar?year=${today.getFullYear()}&month=${today.getMonth() + 1}`);
    else navigate(`${ROUTES_PATH.memberRecord}/${mode}?period=entire&page=1`);
  };

  if (memberInfo?.loginType === 'guest') {
    navigate('/404');
  }

  return (
    memberInfo && (
      <>
        <Title>
          <Typography
            variant="h2"
            $style={css`
              font-weight: 700;
            `}
          >
            {memberInfo.name}님의 스터디 기록
          </Typography>
          <ViewModeButtonContainer>
            <ViewModeButton $isSelected={viewMode === 'list'} onClick={() => handleClickViewModeButton('list')}>
              목록
            </ViewModeButton>
            <ViewModeButton $isSelected={viewMode === 'calendar'} onClick={() => handleClickViewModeButton('calendar')}>
              달력
            </ViewModeButton>
          </ViewModeButtonContainer>
        </Title>
        <MemberRecordMode memberId={memberInfo.memberId} viewMode={viewMode!} />
      </>
    )
  );
};

export default MemberRecordContents;

const Title = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    h2 {
      font-size: 3.2rem;
    }
  }
`;

const ViewModeButtonContainer = styled.div`
  display: flex;
  gap: 2px;

  :nth-child(1) {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  :nth-child(2) {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`;

type ViewModeButtonProps = {
  $isSelected: boolean;
};

const ViewModeButton = styled.button<ViewModeButtonProps>`
  flex: 1;

  padding: 10px 25px;

  transition: all 0.2s ease;

  ${({ $isSelected }) => css`
    background-color: ${$isSelected ? color.blue[200] : color.neutral[100]};
    font-weight: ${$isSelected ? 500 : 300};
  `}
`;
