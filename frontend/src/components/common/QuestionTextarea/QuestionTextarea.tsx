import type { InputHTMLAttributes } from 'react';
import { styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

type Props = {
  question: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLTextAreaElement>;

const QuestionTextarea = ({ question, errorMessage, ...props }: Props) => {
  return (
    <Layout>
      <Typography variant="h6">{question}</Typography>
      <Seperator />
      <Textarea placeholder="답변을 입력해주세요." {...props} />
      <ErrorMessageWrapper>
        <Typography variant="p2" color={color.red[200]} fontSize="14px">
          {errorMessage}
        </Typography>
      </ErrorMessageWrapper>
    </Layout>
  );
};

export default QuestionTextarea;

const Layout = styled.div`
  width: 100%;
  min-width: 500px;

  padding: 30px 30px 10px 30px;
  background-color: #fff;

  border: 1px solid #fff;
  border-radius: 14px;

  &:focus-within {
    border-color: ${color.blue[500]};
  }
`;

const Seperator = styled.div`
  width: 100%;
  height: 1px;

  margin: 24px 0;

  background-color: ${color.neutral[200]};
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 130px;

  resize: none;
  outline: none;
  border: none;
`;

const ErrorMessageWrapper = styled.div`
  height: 20px;
`;
