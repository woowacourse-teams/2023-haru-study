import type { ChangeEventHandler, FormEventHandler } from 'react';
import { useState } from 'react';
import { styled } from 'styled-components';

const LoginForm = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAccount(e.target.value);
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputField type="text" placeholder="아이디" value={account} onChange={handleUsernameChange} />
      <InputField type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} />
      <SubmitButton type="submit">로그인</SubmitButton>
    </FormContainer>
  );
};

export default LoginForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 1.2rem;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
`;
