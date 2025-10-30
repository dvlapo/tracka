import {BiCoinStack} from 'react-icons/bi';
import AnalyticsCard from './AnalyticsCard';
import {GoGraph} from 'react-icons/go';
import {LuCalendarRange} from 'react-icons/lu';
import {useDashboardAnalytics} from '@/app/hooks/analytics/useDashboardAnalytics';

export default function Analytics() {
  const {getDashboardAnalyticsQuery} = useDashboardAnalytics();
  const {data: analytics} = getDashboardAnalyticsQuery;

  return (
    <section className="grid md:grid-cols-3 gap-4">
      <AnalyticsCard
        icon={<BiCoinStack size={20} />}
        title="Total Expenses"
        value={analytics?.totalExpenses}
      />
      <AnalyticsCard
        icon={<LuCalendarRange size={20} />}
        title="This Month"
        value={analytics?.thisMonthExpenses}
      />
      <AnalyticsCard
        icon={<GoGraph size={20} />}
        title="Categories"
        value={analytics?.totalCategories || 0}
        type="unitless"
      />
    </section>
  );
}
