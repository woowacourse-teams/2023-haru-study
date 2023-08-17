import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';

import MemberProfile from '../MemberProfile/MemberProfile';

const LandingContents = () => {
  return (
    <ContentsContainer>
      <MemberProfile />
      <TopicSummaryContainer>
        <Typography
          variant="h1"
          $style={css`
            font-weight: 200;
          `}
        >
          <Emphasis>하루</Emphasis>스터디
        </Typography>
        <Typography variant="p2">
          하루스터디만의 <Emphasis>학습 사이클</Emphasis>을 통해
          <br />
          여러분의 스터디 효율성을
          <br />
          끌어올립니다.
        </Typography>
      </TopicSummaryContainer>
      <ButtonContainer>
        <Link to={ROUTES_PATH.create}>
          <Button variant="primary">스터디 개설하기</Button>
        </Link>
        <Link to={ROUTES_PATH.participation}>
          <Button variant="outlined">스터디 참여하기</Button>
        </Link>
      </ButtonContainer>
    </ContentsContainer>
  );
};

export default LandingContents;

const ContentsContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  row-gap: 100px;

  padding: 40px 60px;

  ${({ theme }) => css`
    background-color: ${theme.background};
  `}
`;

const TopicSummaryContainer = styled.div`
  align-self: flex-end;
  justify-self: flex-end;

  text-align: end;

  p {
    font-size: 2rem;
    font-weight: 200;
    line-height: 150%;
  }

  svg {
    font-size: 4rem;
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  row-gap: 20px;
`;

const Emphasis = styled.span`
  color: ${color.blue[500]};
`;
