import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Menu from '@Components/common/Menu/Menu';
import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import LandingShowcaseImage from '@Assets/image/showcase.png';

const Landing = () => {
  return (
    <LandingLayout>
      <ShowcaseContainer>
        <SloganContainer>
          <Typography variant="h3">
            <Emphasis2>스터디</Emphasis2>에<br />
            필요한
            <br /> 시간
            <br /> 단, <Emphasis2>하루</Emphasis2>
          </Typography>
        </SloganContainer>
        <ShowcaseImageContainer>
          <img src={LandingShowcaseImage} alt="랜딩 쇼케이스" />
          <Typography variant="p2">작가 jcomp 출처 Freepik</Typography>
        </ShowcaseImageContainer>
      </ShowcaseContainer>
      <ContentsContainer>
        <Menu
          menuListPosition="left"
          $style={css`
            margin: 0 0 0 auto;
          `}
        >
          <Menu.Item
            onClick={() => {
              alert('우아한테크코스 5기 - 테오, 히이로, 모디, 마코, 룩소, 엽토, 노아');
            }}
          >
            하루 스터디 소개
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              window.open('https://github.com/woowacourse-teams/2023-haru-study', 'blank');
            }}
          >
            깃허브
          </Menu.Item>
        </Menu>
        <TopicSummaryContainer>
          <Typography
            variant="h1"
            $style={css`
              font-weight: 200;
            `}
          >
            <Emphasis>하루</Emphasis> 스터디
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
          <Link to="studyMaking">
            <Button variant="primary">스터디 개설하기</Button>
          </Link>
          <Link to="entrance-study">
            <Button variant="outlined">스터디 입장하기</Button>
          </Link>
        </ButtonContainer>
      </ContentsContainer>
    </LandingLayout>
  );
};

export default Landing;

const LandingLayout = styled.div`
  display: grid;
  grid-template-columns: auto 450px;

  min-height: 100vh;
  max-height: 100vh;
`;

const ShowcaseContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;

  min-width: 100%;
  padding: 40px 40px;

  background-color: ${color.blue[500]};
`;

const SloganContainer = styled.div`
  align-self: flex-end;

  position: relative;
  bottom: -30px;

  padding: 0px 120px;

  h3 {
    font-size: 64px;
    font-weight: 600;
    color: ${color.white};
    line-height: 120%;
  }
`;

const ShowcaseImageContainer = styled.div`
  display: grid;

  padding: 0px 80px;

  p {
    text-align: end;
    opacity: 0.2;
  }
`;

const ContentsContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  row-gap: 100px;

  padding: 40px 40px;
`;

const TopicSummaryContainer = styled.div`
  align-self: flex-end;
  justify-self: flex-end;

  text-align: end;

  p {
    font-weight: 200;
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  row-gap: 20px;
`;

const Emphasis = styled.span`
  color: ${color.blue[500]};
`;

const Emphasis2 = styled.span`
  color: ${color.yellow};
`;
