import { useState } from 'react';
import { Button, Input, Toast } from 'react-daisyui';
import { useNavigate } from 'react-router';

import { useLogin } from '../../hooks';
import { useAuthToken } from '../../providers';

export const Login = () => {
  const { login, isLoading, error } = useLogin();
  const { setToken } = useAuthToken();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });

  const onChange = (key: keyof typeof values, value: string) => {
    setValues({ ...values, [key]: value });
  };

  const onLogin = async () => {
    try {
      const res = await login(values);
      setToken(res.token);
      navigate('/');
    } catch (e) {
      return;
    }
  };

  return (
    <div className="p-4 flex flex-col gap-2">
      <h1 className="prose prose-xl">Login</h1>
      <Input
        color="ghost"
        placeholder="Email"
        value={values.email}
        onChange={(v) => onChange('email', v.target.value)}
        type="email"
      />
      <Input
        color="ghost"
        placeholder="Password"
        value={values.password}
        onChange={(v) => onChange('password', v.target.value)}
        type="password"
      />
      <Button color="primary" onClick={onLogin} loading={isLoading}>
        Enter
      </Button>
      {error != null && <Toast>{error.message}</Toast>}
    </div>
  );
};
