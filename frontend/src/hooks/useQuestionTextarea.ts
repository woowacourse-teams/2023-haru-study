import { ChangeEventHandler, useState } from 'react';

type Parameters = {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
};

const useQuestionTextarea = ({ minLength, maxLength, required }: Parameters) => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(required ? '* 필수입력' : '');

  const validateValue = (updatedValue: string) => {
    if (required && updatedValue.length === 0) {
      setErrorMessage('* 필수입력');
      return;
    }

    if (minLength && updatedValue.length < minLength) {
      setErrorMessage(`최소 ${minLength}자 이상 입력해주세요.`);
      return;
    }

    setErrorMessage('');
  };

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const updatedValue = event.target.value;

    validateValue(updatedValue);
    setValue(updatedValue);
  };

  return { value, errorMessage, minLength, maxLength, required, onChange };
};

export default useQuestionTextarea;
