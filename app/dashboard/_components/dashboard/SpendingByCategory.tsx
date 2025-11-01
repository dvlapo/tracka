import {formatCurrency} from '@/app/utils';
import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from 'recharts';

const COLORS = ['#4A90E2', '#50E3C2', '#F5A623', '#D0021B'];

const spendingByCategory = [
  {category: 'Transportation', total: 600, percentage: 60},
  {category: 'Groceries', total: 250, percentage: 25},
  {category: 'Entertainment', total: 150, percentage: 15},
];

export default function SpendingByCategory() {
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
            {spendingByCategory?.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
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
