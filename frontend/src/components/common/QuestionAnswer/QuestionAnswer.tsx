import { css, styled } from 'styled-components';

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
      <CircleCheckIcon circleColor={iconColor} />
      <TypographyContainer>
        <Typography variant="h5">{question}</Typography>
        <Typography
          variant="p2"
          color={answerTextColor}
          $style={css`
            white-space: pre-wrap;
          `}
        >
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
  gap: 12px;

  justify-content: space-between;
`;

const TypographyContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;

  p {
    word-break: break-all;
  }

  h5 {
    line-height: 100%;
  }
`;
