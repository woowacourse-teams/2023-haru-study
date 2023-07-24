import { css, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import CheckRound from '@Assets/icons/CheckRound';

type Props = {
  answer: string;
  question: string;
  topic: 'plan' | 'retrospect';
};

const AnswerQuestion = ({ answer, question, topic }: Props) => {
  const iconBackgroundColor = topic === 'plan' ? color.blue[500] : color.teal[500];

  return (
    <AnswerQuestionLayout iconBackgroundColor={iconBackgroundColor}>
      <CheckRound color={color.white} />
      <Typography variant="h6">{question}</Typography>
      <Typography variant="p2">{answer}</Typography>
    </AnswerQuestionLayout>
  );
};

export default AnswerQuestion;

type AnswerQuestionProps = {
  iconBackgroundColor: string;
};

const AnswerQuestionLayout = styled.div<AnswerQuestionProps>`
  display: grid;
  grid-template-columns: 30px 1fr;
  align-items: center;
  row-gap: 24px;

  p {
    grid-column: 2 / 3;
  }

  svg {
    border-radius: 50%;
    ${({ iconBackgroundColor }) => css`
      background-color: ${iconBackgroundColor};
    `}
  }
`;
