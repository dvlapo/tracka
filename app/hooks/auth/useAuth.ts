import {useMutation} from '@tanstack/react-query';

interface SignInPayload {
  email: string;
  password: string;
}

interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const signInMutation = useMutation({
    mutationFn: async (payload: SignInPayload) => {
      try {
        const res = await fetch('/api/auth/sign-in', {
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
        const res = await fetch('/api/auth/register', {
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
