import {getCookie} from 'cookies-next';
import {useQuery} from '@tanstack/react-query';

interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const cookie = getCookie('tracka-user');
      return cookie ? (JSON.parse(cookie.toString()) as User) : null;
    },
    staleTime: Infinity,
  });
};
