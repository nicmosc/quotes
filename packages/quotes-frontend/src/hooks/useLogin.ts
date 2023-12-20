import { LoginRequest, LoginResponse } from '@quotes/schema';
import { useMutation } from 'react-query';

import { buildAPIUrl } from '../providers';

export const useLogin = () => {
  const { isLoading, mutateAsync, error } = useMutation<
    LoginResponse,
    { message: string },
    LoginRequest
  >(async (variables) => {
    const response = await fetch(buildAPIUrl('/auth/login'), {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(variables),
    });
    if (!response.ok && response.status === 404) {
      throw new Error('The email or password combination is wrong');
    }
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    return await response.json();
  });

  return {
    login: (variables: LoginRequest) => mutateAsync(variables),
    isLoading,
    error,
  };
};
