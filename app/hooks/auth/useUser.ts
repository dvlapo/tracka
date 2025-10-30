import {getCookie} from 'cookies-next';
import {useQuery} from '@tanstack/react-query';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const cookie = getCookie('tracka-user');
      return cookie ? JSON.parse(cookie.toString()) : null;
    },
    staleTime: Infinity,
  });
};
