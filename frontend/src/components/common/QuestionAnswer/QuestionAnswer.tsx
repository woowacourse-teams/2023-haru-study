import { styled } from 'styled-components';

import color from '@Styles/color';

import CircleCheckIcon from '@Assets/icons/CircleCheckIcon';

import Typography from '../Typography/Typography';

type Props = {
  question: string;
  answer?: string;
  iconColor?: string;
};

const QuestionAnswer = ({ question, answer, iconColor }: Props) => {
  const answerText = answer || '답변이 입력되지 않았습니다.';
  const answerTextColor = answer ? color.black : color.neutral[400];
  return (
    <Layout>
      <IconWrapper>
        <CircleCheckIcon circleColor={iconColor} />
      </IconWrapper>
      <TypographyContainer>
        <Typography variant="h5">{question}</Typography>
        <Typography variant="p2" color={answerTextColor}>
          {answerText}
        </Typography>
      </TypographyContainer>
    </Layout>
  );
};

export default QuestionAnswer;

const Layout = styled.div`
  width: 100%;
  display: flex;
  /* gap: 13px; */

  justify-content: space-between;
`;

const IconWrapper = styled.div`
  padding-top: 5px;
`;

const TypographyContainer = styled.div`
  width: 92%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  p {
    word-break: break-all;
  }
`;
