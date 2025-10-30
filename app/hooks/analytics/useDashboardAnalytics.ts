import {useQuery} from '@tanstack/react-query';
import {useUser} from '../auth/useUser';

export const useDashboardAnalytics = () => {
  const {data: user} = useUser();
  const userId = user?.id;

  const getDashboardAnalyticsQuery = useQuery({
    queryKey: ['dashboard-analytics', userId],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/analytics?userId=${userId}`);

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || 'Failed to fetch analytics data');
        }

        const data = await res.json();
        return data;
      } catch (error: any) {
        throw new Error(
          error?.message || 'An unexpected network error occurred'
        );
      }
    },
  });

  return {
    getDashboardAnalyticsQuery,
  };
};
