import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Menu from '@Components/common/Menu/Menu';
import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';

const LANDING_CONTENTS_MENU_ITEMS = [
  {
    key: 0,
    text: '하루스터디 소개',
    clickEvent: () => {
      alert('우아한테크코스 5기 - 테오, 히이로, 모디, 마코, 룩소, 엽토, 노아');
    },
  },
  {
    key: 1,
    text: '깃허브',
    clickEvent: () => {
      window.open('https://github.com/woowacourse-teams/2023-haru-study', 'blank');
    },
  },
];

const Contents = () => {
  return (
    <ContentsContainer>
      <Menu
        $menuListPosition="left"
        $style={css`
          margin: 0 0 0 auto;
        `}
      >
        {LANDING_CONTENTS_MENU_ITEMS.map((menuItem) => (
          <Menu.Item key={menuItem.key} onClick={menuItem.clickEvent}>
            {menuItem.text}
          </Menu.Item>
        ))}
      </Menu>
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

export default Contents;

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
    line-height: 180%;
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  row-gap: 20px;
`;

const Emphasis = styled.span`
  color: ${color.blue[500]};
`;
