import {API_BASE_URL} from '@/app/config/api';
import {useMutation} from '@tanstack/react-query';
import {setCookie} from 'cookies-next';

interface SignInPayload {
  email: string;
  password: string;
}

interface SignUpPayload {
  username: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const signInMutation = useMutation({
    mutationFn: async (payload: SignInPayload) => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Sign-in failed');
        }

        setCookie('tracka-token', data.token.access_token);
        const user = data.data;
        setCookie('tracka-user', JSON.stringify(user), {
          maxAge: 60 * 60 * 24,
        });

        return data;
      } catch (error: any) {
        throw new Error(
          error?.message || 'An unexpected network error occurred'
        );
      }
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async (payload: SignUpPayload) => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Sign-up failed');
        }

        return data;
      } catch (error: any) {
        throw new Error(
          error?.message || 'An unexpected network error occurred'
        );
      }
    },
  });

  return {
    signInMutation,
    signUpMutation,
  };
};
