import Analytics from './Analytics';
import DailySpending from './DailySpending';
import SpendingByCategory from './SpendingByCategory';

export default function Dashboard() {
  return (
    <section>
      <Analytics />

      <section className="mt-8 grid md:grid-cols-2 gap-4">
        <SpendingByCategory />
        <DailySpending />
      </section>
    </section>
  );
}
