import {CATEGORY_COLORS} from '@/app/constants';
import {Spending} from '@/app/hooks/analytics/useDashboardAnalytics';
import {formatCurrency} from '@/app/utils';
import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from 'recharts';

export default function SpendingByCategory({
  spendingByCategory,
}: {
  spendingByCategory: Spending[];
}) {
  return (
    <div className="squircle border border-gray-300 rounded-2xl p-4">
      <h3 className="text-sm mb-6">Spending by Category</h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={spendingByCategory}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({name, percent}: any) =>
              `${name} ${(percent * 100).toFixed(1)}%`
            }
            className="text-xs"
          >
            {spendingByCategory?.map((category, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CATEGORY_COLORS[category.category]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => {
              return [formatCurrency(value as number), name];
            }}
            labelClassName="text-sm"
            contentStyle={{
              fontSize: '0.875rem',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
