import {BiCoinStack} from 'react-icons/bi';
import AnalyticsCard from './AnalyticsCard';
import {GoGraph} from 'react-icons/go';
import {LuCalendarRange} from 'react-icons/lu';

export default function Analytics() {
  return (
    <section className="grid md:grid-cols-3 gap-4">
      <AnalyticsCard
        icon={<BiCoinStack size={20} />}
        title="Total Expenses"
        value={25.42}
      />
      <AnalyticsCard
        icon={<LuCalendarRange size={20} />}
        title="This Month"
        value={300}
      />
      <AnalyticsCard
        icon={<GoGraph size={20} />}
        title="Categories"
        value={6}
        type="unitless"
      />
    </section>
  );
}
