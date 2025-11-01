import {formatCurrency} from '@/app/utils';
import {
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const dailySpending = [
  {date: '2025-10-20', total: 400},
  {date: '2025-10-21', total: 200},
  {date: '2025-10-22', total: 10},
  {date: '2025-10-23', total: 0},
  {date: '2025-10-24', total: 900},
  {date: '2025-10-25', total: 1300},
  {date: '2025-10-26', total: 1000},
];

export default function DailySpending() {
  return (
    <div className="squircle border border-gray-300 rounded-2xl p-4">
      <h3 className="text-sm mb-6">Daily Spending (last 7 days)</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={dailySpending} className="text-sm">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            // formatter={(value, name) => {
            //   return [formatCurrency(value as number), name];
            // }}
            labelClassName="text-sm text-foreground"
            contentStyle={{
              fontSize: '0.875rem',
            }}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="currentColor"
            strokeWidth={2}
            dot={{r: 4}}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
