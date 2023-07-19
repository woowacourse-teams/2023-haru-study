import CircleCheckIcon from '@Assets/icons/CircleCheckIcon';
import { styled } from 'styled-components';

import Typography from '../Typography/Typography';

type Props = {
  question: string;
  answer: string;
  iconColor?: string;
};

const QuestionAnswer = ({ question, answer, iconColor }: Props) => {
  return (
    <Layout>
      <IconWrapper>
        <CircleCheckIcon circleColor={iconColor} />
      </IconWrapper>
      <TypographyContainer>
        <Typography variant="h5">{question}</Typography>
        <Typography variant="p2">{answer}</Typography>
      </TypographyContainer>
    </Layout>
  );
};

export default QuestionAnswer;

const Layout = styled.div`
  display: flex;
  gap: 13px;
`;

const IconWrapper = styled.div`
  padding-top: 5px;
`;

const TypographyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
