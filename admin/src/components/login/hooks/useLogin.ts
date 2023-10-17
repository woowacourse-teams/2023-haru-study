import type { ChangeEventHandler, FormEventHandler } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@Constants/routes';

const useLogin = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAccount(e.target.value);
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    await loginFetch().then((response) => {
      if (response.ok) {
        return navigate(`${ROUTES_PATH.home}`);
      }

      alert('계정 및 비밀번호를 다시 확인해주세요.');
    });
  };

  const loginFetch = () => {
    return fetch('/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        account,
        password,
      }),
    });
  };

  return { account, password, handlePasswordChange, handleUsernameChange, handleSubmit, loginFetch };
};

export default useLogin;
