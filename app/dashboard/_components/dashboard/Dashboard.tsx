import {Button} from '@/app/components/ui/Button';
import Analytics from './Analytics';
import DailySpending from './DailySpending';
import SpendingByCategory from './SpendingByCategory';
import {FiPlus} from 'react-icons/fi';
import {Dispatch, SetStateAction} from 'react';
import {
  Spending,
  useDashboardAnalytics,
} from '@/app/hooks/analytics/useDashboardAnalytics';

export default function Dashboard({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  const {getDashboardAnalyticsQuery} = useDashboardAnalytics();
  const {data: analytics} = getDashboardAnalyticsQuery;

  return (
    <section>
      <section className="my-7 md:flex justify-between items-start">
        <div className="mb-4 md:mb-0">
          <h2 className="mb-1 text-base">Tracka</h2>
          <p className="text-sm text-gray-400">
            Track your spending and stay within budget
          </p>
        </div>

        <Button
          label="Add Expense"
          icon={<FiPlus />}
          className="!text-sm !font-normal !px-2 !py-1 !w-fit"
          onClick={() => setActiveTab('Add Expense')}
        />
      </section>

      <Analytics analytics={analytics} />

      <section className="mt-8 grid md:grid-cols-2 gap-4">
        <SpendingByCategory
          spendingByCategory={analytics?.spendingByCategory as Spending[]}
        />
        <DailySpending dailySpending={analytics?.dailySpending as []} />
      </section>
    </section>
  );
}
