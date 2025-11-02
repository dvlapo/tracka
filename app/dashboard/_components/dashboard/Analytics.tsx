import {BiCoinStack} from 'react-icons/bi';
import AnalyticsCard from './AnalyticsCard';
import {GoGraph} from 'react-icons/go';
import {LuCalendarRange} from 'react-icons/lu';

interface AnalyticsProps {
  totalExpenses: number;
  thisMonthExpenses: number;
  totalCategories: number;
}

export default function Analytics({analytics}: {analytics?: AnalyticsProps}) {
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
